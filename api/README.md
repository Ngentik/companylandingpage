# Ngentik Contact API

ASP.NET Core 10 minimal API for the website contact form. It preserves the existing `POST /api/contact` endpoint and stores valid submissions in the configured SharePoint list through Microsoft Graph.

## Configuration

Set these environment variables in the server or container. ASP.NET Core maps double underscores to nested configuration keys.

- `Api__TurnstileSecretKey`
- `Api__GraphTenantId`
- `Api__GraphClientId`
- `Api__GraphClientSecret`
- `Api__SharePointSiteId`
- `Api__SharePointListId`
- `Api__AllowedOrigins__0` and `Api__AllowedOrigins__1` for the website origins

The Microsoft Entra application needs permission to create items in the target SharePoint list through Microsoft Graph, with admin consent granted.

## Run locally

```powershell
dotnet run --project api\Ngentik.ContactApi.csproj
```

The API listens on the URL printed by ASP.NET Core. The development CORS configuration allows the Vite development server origins.

## Deploy with Docker on Contabo

From the repository root:

```sh
docker build -t ngentik-contact-api ./api
docker run -d --name ngentik-contact-api --restart unless-stopped -p 127.0.0.1:8080:8080 --env-file api/.env ngentik-contact-api
```

Put a reverse proxy such as Caddy or Nginx in front of the container, terminate HTTPS there, and proxy `/api/*` to `127.0.0.1:8080`. Do not commit the real `.env` file.

The endpoint returns `201` on success, `400` for invalid input, `403` when Turnstile rejects the token, `502` when Microsoft Graph cannot save the item, and `500` for unexpected failures.