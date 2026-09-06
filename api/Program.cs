using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow;
});

builder.Services.AddOptions<ApiOptions>()
    .Bind(builder.Configuration.GetSection(ApiOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

builder.Services.AddHttpClient("external", client =>
{
    client.Timeout = TimeSpan.FromSeconds(15);
});

var apiOptions = builder.Configuration.GetSection(ApiOptions.SectionName).Get<ApiOptions>() ?? new ApiOptions();
var allowedOrigins = apiOptions.AllowedOrigins
    .Where(origin => Uri.TryCreate(origin, UriKind.Absolute, out _))
    .ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy("website", policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .WithMethods("POST", "OPTIONS")
            .WithHeaders("Content-Type");
    });
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

app.UseForwardedHeaders();
app.UseCors("website");

app.MapMethods("/api/contact", ["POST", "OPTIONS"], async (
    HttpContext context,
    IHttpClientFactory httpClientFactory,
    IOptions<ApiOptions> options,
    ILogger<Program> logger,
    CancellationToken cancellationToken) =>
{
    if (HttpMethods.IsOptions(context.Request.Method))
    {
        return Results.NoContent();
    }

    ContactRequest? request;

    try
    {
        request = await context.Request.ReadFromJsonAsync<ContactRequest>(cancellationToken);
    }
    catch (JsonException)
    {
        request = null;
    }

    string? validationError = null;
    var requestIsValid = request is not null && request.IsValid(out validationError);

    if (!requestIsValid)
    {
        return Results.Json(new { error = validationError ?? "Invalid contact form submission." }, statusCode: StatusCodes.Status400BadRequest);
    }

    var validRequest = request!;

    try
    {
        var client = httpClientFactory.CreateClient("external");
        var turnstileValid = await VerifyTurnstileAsync(client, validRequest.TurnstileToken!, options.Value, cancellationToken);

        if (!turnstileValid)
        {
            return Results.Json(new { error = "Turnstile verification failed." }, statusCode: StatusCodes.Status403Forbidden);
        }

        var accessToken = await GetGraphAccessTokenAsync(client, options.Value, cancellationToken);
        var graphPayload = new
        {
            fields = new
            {
                Title = validRequest.Subject!.Trim(),
                FirstName = validRequest.FirstName!.Trim(),
                LastName = validRequest.LastName?.Trim() ?? string.Empty,
                Email = validRequest.Email!.Trim(),
                Phone = validRequest.Phone?.Trim() ?? string.Empty,
                Company = validRequest.Company!.Trim(),
                Message = validRequest.Message!.Trim(),
                Consent = true,
                Source = "NGentik Website",
                Status = "New"
            }
        };

        using var graphRequest = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://graph.microsoft.com/v1.0/sites/{Uri.EscapeDataString(options.Value.SharePointSiteId)}/lists/{Uri.EscapeDataString(options.Value.SharePointListId)}/items")
        {
            Content = JsonContent.Create(graphPayload)
        };
        graphRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        using var graphResponse = await client.SendAsync(graphRequest, cancellationToken);

        if (!graphResponse.IsSuccessStatusCode)
        {
            logger.LogError("Microsoft Graph returned status code {StatusCode} while saving a contact request.", (int)graphResponse.StatusCode);
            return Results.Json(new { error = "Unable to save contact request." }, statusCode: StatusCodes.Status502BadGateway);
        }

        return Results.Json(new
        {
            success = true,
            message = "Contact request submitted successfully."
        }, statusCode: StatusCodes.Status201Created);
    }
    catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
    {
        throw;
    }
    catch (Exception exception)
    {
        logger.LogError(exception, "Contact request failed.");
        return Results.Json(new { error = "Unable to process contact request." }, statusCode: StatusCodes.Status500InternalServerError);
    }
});

app.Run();

static async Task<bool> VerifyTurnstileAsync(
    HttpClient client,
    string token,
    ApiOptions options,
    CancellationToken cancellationToken)
{
    using var response = await client.PostAsJsonAsync(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        new { secret = options.TurnstileSecretKey, response = token },
        cancellationToken);

    if (!response.IsSuccessStatusCode)
    {
        return false;
    }

    var result = await response.Content.ReadFromJsonAsync<TurnstileResponse>(cancellationToken);
    return result?.Success == true;
}

static async Task<string> GetGraphAccessTokenAsync(
    HttpClient client,
    ApiOptions options,
    CancellationToken cancellationToken)
{
    using var content = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        ["client_id"] = options.GraphClientId,
        ["client_secret"] = options.GraphClientSecret,
        ["scope"] = "https://graph.microsoft.com/.default",
        ["grant_type"] = "client_credentials"
    });

    using var response = await client.PostAsync(
        $"https://login.microsoftonline.com/{Uri.EscapeDataString(options.GraphTenantId)}/oauth2/v2.0/token",
        content,
        cancellationToken);

    if (!response.IsSuccessStatusCode)
    {
        throw new InvalidOperationException("Unable to obtain a Microsoft Graph access token.");
    }

    var result = await response.Content.ReadFromJsonAsync<GraphTokenResponse>(cancellationToken);

    if (string.IsNullOrWhiteSpace(result?.AccessToken))
    {
        throw new InvalidOperationException("Microsoft Graph returned an empty access token.");
    }

    return result.AccessToken;
}

public sealed class ApiOptions
{
    public const string SectionName = "Api";

    [Required]
    public string TurnstileSecretKey { get; set; } = string.Empty;

    [Required]
    public string GraphTenantId { get; set; } = string.Empty;

    [Required]
    public string GraphClientId { get; set; } = string.Empty;

    [Required]
    public string GraphClientSecret { get; set; } = string.Empty;

    [Required]
    public string SharePointSiteId { get; set; } = string.Empty;

    [Required]
    public string SharePointListId { get; set; } = string.Empty;

    [MinLength(1)]
    public string[] AllowedOrigins { get; set; } =
    [
        "https://ngentik.com",
        "https://www.ngentik.com"
    ];
}

public sealed record ContactRequest(
    string? FirstName,
    string? LastName,
    string? Email,
    string? Phone,
    string? Company,
    string? Subject,
    string? Message,
    bool Consent,
    string? TurnstileToken)
{
    public bool IsValid(out string? error)
    {
        if (!HasLength(FirstName, 1, 100) ||
            !HasLength(Email, 1, 254) ||
            !HasLength(Company, 1, 200) ||
            !HasLength(Subject, 1, 200) ||
            !HasLength(Message, 10, 5000) ||
            !HasLength(TurnstileToken, 1, 2048) ||
            !HasLength(LastName, 0, 100) ||
            !HasLength(Phone, 0, 50) ||
            !Consent ||
            !IsEmail(Email))
        {
            error = "Invalid contact form submission.";
            return false;
        }

        error = null;
        return true;
    }

    private static bool HasLength(string? value, int minimum, int maximum)
    {
        var length = value?.Trim().Length ?? 0;
        return length >= minimum && length <= maximum;
    }

    private static bool IsEmail(string? value)
    {
        return value is not null && new EmailAddressAttribute().IsValid(value.Trim());
    }
}

public sealed record TurnstileResponse([property: JsonPropertyName("success")] bool Success);

public sealed record GraphTokenResponse([property: JsonPropertyName("access_token")] string? AccessToken);

public partial class Program;