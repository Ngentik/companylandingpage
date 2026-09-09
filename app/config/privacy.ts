import { siteConfig } from './site';

// TODO(PRIVACY-CONTROLLER): Replace the temporary controller identification
// below with the current legal controller's full name before publishing this
// notice. Once confirmed, add the legal name and Business ID here.
// Do not infer either value from the NGentik trading name.
export const privacyConfig = {
  displayName: siteConfig.name,
  legalName: null as string | null,
  businessId: null as string | null,
  location: 'Jyväskylä, Finland',
  email: siteConfig.email,
  lastUpdated: {
    en: '7 September 2026',
    fi: '7. syyskuuta 2026',
  },
  retentionPolicyConfirmed: false,
} as const;

export const privacyExternalLinks = {
  dataProtectionAuthority: 'https://tietosuoja.fi/en/home',
  cloudflareTurnstile: 'https://www.cloudflare.com/turnstile-privacy-policy/',
  microsoftPrivacy: 'https://www.microsoft.com/privacy/privacystatement',
} as const;
