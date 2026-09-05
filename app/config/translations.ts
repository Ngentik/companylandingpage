export type Language = 'en' | 'fi';
export const translations = {
  en: {
    skip: 'Skip to main content',
    homeLabel: 'Ngentik homepage',
    contactLink: 'Contact',
    heroTitle: 'Launching soon.',
    heroIntro:
      "We're building something practical for businesses that expect more from technology.",
    heroCta: 'Contact us',
    country: 'Finland',
    contactLabel: 'Contact',
    contactTitle: 'Contact us.',
    contactIntro: 'Want to talk before we launch? Send us a message.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    formNote:
      'Tell us how we can help. We’ll review your enquiry and get back to you shortly.',
    send: 'Send message',
    emailSubject: 'Website enquiry from',
    from: 'From',
    privacy: 'Privacy',
    privacyPending: 'Privacy policy pending',
    languageLabel: 'Language',
  },
  fi: {
    skip: 'Siirry pääsisältöön',
    homeLabel: 'Ngentikin etusivu',
    contactLink: 'Yhteystiedot',
    heroTitle: 'Tulossa pian.',
    heroIntro:
      'Rakennamme jotain käytännöllistä yrityksille, jotka odottavat teknologialta enemmän.',
    heroCta: 'Ota yhteyttä',
    country: 'Suomi',
    contactLabel: 'Yhteystiedot',
    contactTitle: 'Ota yhteyttä.',
    contactIntro:
      'Haluatko keskustella jo ennen julkaisua? Lähetä meille viesti.',
    name: 'Nimi',
    email: 'Sähköposti',
    message: 'Viesti',
    formNote:
      'Lähettäminen avaa sähköpostisovelluksesi. Sivusto ei tallenna viestiäsi.',
    send: 'Lähetä viesti',
    emailSubject: 'Verkkosivuston yhteydenotto henkilöltä',
    from: 'Lähettäjä',
    privacy: 'Tietosuoja',
    privacyPending: 'Tietosuojaseloste valmisteilla',
    languageLabel: 'Kieli',
  },
} as const;
