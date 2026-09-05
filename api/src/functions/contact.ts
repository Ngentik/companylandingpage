import { app } from '@azure/functions';
import { contactSchema } from './schemas/contact.schema';
import type {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

const allowedOrigins = new Set([
  'https://ngentik.com',
  'https://www.ngentik.com',
]);

function getCorsHeaders(request: HttpRequest): Record<string, string> {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };

  if (origin && allowedOrigins.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

function jsonResponse(
  status: number,
  jsonBody: Record<string, unknown>,
  headers: Record<string, string>,
): HttpResponseInit {
  return { status, headers, jsonBody };
}

async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.NGENTIK_TENANT_ID;
  const clientId = process.env.NGENTIK_CLIENT_ID;
  const clientSecret = process.env.NGENTIK_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Microsoft Graph authentication configuration is missing.');
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Unable to obtain Microsoft Graph token: ${response.status} ${error}`,
    );
  }

  const result = (await response.json()) as {
    access_token: string;
  };

  return result.access_token;
}
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Turnstile configuration is missing.');
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as {
    success: boolean;
    'error-codes'?: string[];
  };

  return result.success;
}
export async function contact(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders };
  }

  try {
    const requestBody = await request.json();

    const validation = contactSchema.safeParse(requestBody);

    if (!validation.success) {
      return jsonResponse(
        400,
        {
          error: 'Invalid contact form submission.',
        },
        corsHeaders,
      );
    }

    const body = validation.data;
    const turnstileValid = await verifyTurnstileToken(body.turnstileToken);

    if (!turnstileValid) {
      return jsonResponse(
        403,
        {
          error: 'Turnstile verification failed.',
        },
        corsHeaders,
      );
    }
    const siteId = process.env.SHAREPOINT_SITE_ID;
    const listId = process.env.SHAREPOINT_LIST_ID;

    if (!siteId || !listId) {
      throw new Error('SharePoint configuration is missing.');
    }

    const accessToken = await getGraphAccessToken();

    const sharePointPayload = {
      fields: {
        Title: body.subject,
        FirstName: body.firstName,
        LastName: body.lastName ?? '',
        Email: body.email,
        Phone: body.phone ?? '',
        Company: body.company,
        Message: body.message,
        Consent: true,

        // Internal NGentik values — visitor cannot control these.
        Source: 'NGentik Website',
        Status: 'New',
      },
    };

    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sharePointPayload),
      },
    );

    if (!graphResponse.ok) {
      const graphError = await graphResponse.text();

      context.error(
        `Microsoft Graph failed: ${graphResponse.status} ${graphError}`,
      );

      return jsonResponse(
        502,
        {
          error: 'Unable to save contact request.',
        },
        corsHeaders,
      );
    }

    return jsonResponse(
      201,
      {
        success: true,
        message: 'Contact request submitted successfully.',
      },
      corsHeaders,
    );
  } catch (error) {
    context.error('Contact request failed.', error);

    return jsonResponse(
      500,
      {
        error: 'Unable to process contact request.',
      },
      corsHeaders,
    );
  }
}

app.http('contact', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: contact,
});
