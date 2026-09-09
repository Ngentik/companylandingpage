export const privacyTranslations = {
  en: {
    pageLabel: 'Privacy',
    title: 'How NGentik handles your information.',
    metaTitle: 'Privacy | NGentik',
    metaDescription:
      'Learn how NGentik processes and protects personal data when you use our website or contact us.',
    locale: 'en_US',
    lastUpdatedLabel: 'Last updated',
    backHome: 'Back to home',
    sections: {
      controller: {
        number: '01',
        title: 'Who is responsible for your data?',
        paragraphs: [
          'This notice explains how personal data is processed when you use the NGentik website or contact us.',
          'NGentik is the business name used for this website. The complete legal identity of the controller will be added when it has been confirmed.',
        ],
        emailLabel: 'Privacy enquiries',
      },
      information: {
        number: '02',
        title: 'Information we collect',
        intro: 'Depending on how you use the website, we process:',
        items: [
          'Contact details: first name, last name, email address and optional telephone number.',
          'Professional information: company name.',
          'Enquiry content: subject and the information you include in your message.',
          'Form acknowledgement: confirmation that you agree to the processing needed to respond to your enquiry.',
          'Technical and security information processed by our hosting, diagnostic and anti-abuse services, such as request and browser information and security signals.',
          'Your EN/FI language choice, stored locally in your browser.',
        ],
      },
      purposes: {
        number: '03',
        title: 'Why we process information',
        columns: ['Purpose', 'Information', 'Legal basis'],
        rows: [
          [
            'Respond to enquiries and discuss possible work',
            'Contact, professional and message information',
            'Steps requested before a possible contract (GDPR 6(1)(b)) and our legitimate interest in handling business enquiries (GDPR 6(1)(f)), depending on the enquiry',
          ],
          [
            'Protect the form against spam and automated abuse',
            'Turnstile token and technical security signals',
            'Our legitimate interest in protecting the website and communications (GDPR 6(1)(f))',
          ],
          [
            'Operate, secure and diagnose the website and API',
            'Technical request, diagnostic and error information',
            'Our legitimate interest in maintaining a secure and reliable service (GDPR 6(1)(f))',
          ],
          [
            'Remember your language selection',
            'EN/FI preference in browser storage',
            'Necessary to provide the language choice you request',
          ],
        ],
        acknowledgement:
          'The contact-form checkbox records your acknowledgement of processing for the enquiry. It is not presented as the legal basis for every processing activity described in this notice.',
      },
      contactForm: {
        number: '04',
        title: 'What happens when you contact us',
        paragraphs: [
          'Your submission is sent to the NGentik backend. It is validated, checked for automated abuse using Cloudflare Turnstile, and then stored in a Microsoft SharePoint list through Microsoft Graph.',
          'Required form fields must be provided if you want to send the form. Last name and telephone number are optional. You can instead contact us by email, although we still need enough information to respond.',
        ],
      },
      providers: {
        number: '05',
        title: 'Service providers and recipients',
        intro:
          'Access is limited to people and providers who need it to operate the website or handle your enquiry. The implementation currently uses:',
        providers: [
          {
            name: 'Microsoft',
            description:
              'Azure Static Web Apps hosts the website, Azure Functions processes form requests, and Microsoft Graph and SharePoint transmit and store enquiries. Azure diagnostic services may process operational logs.',
            linkLabel: 'Microsoft privacy information',
            linkKey: 'microsoftPrivacy' as const,
          },
          {
            name: 'Cloudflare',
            description:
              'Turnstile runs a browser challenge and validates a short-lived token to help distinguish legitimate visitors from automated abuse. It processes technical security signals for this purpose.',
            linkLabel: 'Cloudflare Turnstile privacy information',
            linkKey: 'cloudflareTurnstile' as const,
          },
        ],
      },
      transfers: {
        number: '06',
        title: 'International transfers',
        paragraphs: [
          'Microsoft and Cloudflare operate internationally. Their services may involve processing personal data outside Finland or the European Economic Area.',
          'The exact processing locations and applicable transfer safeguards depend on NGentik’s service configuration and contractual arrangements. These arrangements must be confirmed as part of the legal review of this notice.',
        ],
      },
      retention: {
        number: '07',
        title: 'How long we keep information',
        paragraphs: [
          'Enquiry information is intended to be kept only for as long as necessary to respond, manage any resulting business relationship, resolve disputes and meet applicable legal obligations.',
          'A specific operational retention and deletion schedule has not yet been confirmed. NGentik must define that schedule and ensure SharePoint and diagnostic-data deletion practices match it before this notice is published.',
        ],
      },
      rights: {
        number: '08',
        title: 'Your data protection rights',
        intro:
          'Depending on the circumstances and legal basis, you may have the right to:',
        items: [
          'request access to your personal data',
          'ask us to correct inaccurate or incomplete data',
          'request erasure or restriction of processing where applicable',
          'object to processing based on legitimate interests',
          'receive data you provided in a portable format where applicable',
          'withdraw consent where a specific activity relies on consent, without affecting earlier lawful processing',
          'not be subject to certain solely automated decisions with legal or similarly significant effects',
        ],
        closing:
          'Send an initial request by email. We may need to verify your identity before fulfilling it. You may also lodge a complaint with the Office of the Data Protection Ombudsman in Finland.',
        authorityLink: 'Office of the Data Protection Ombudsman',
      },
      technologies: {
        number: '09',
        title: 'Cookies and similar technologies',
        paragraphs: [
          'No analytics, advertising pixels or marketing trackers are implemented in the current website code. The site stores your language preference in localStorage so it can remember your EN/FI choice.',
          'Cloudflare Turnstile uses browser-based security technology to detect automated abuse. Technologies strictly necessary for security and requested functionality do not require a marketing-cookie banner. If non-essential tracking is added later, this notice and the consent mechanism must be reviewed before it is enabled.',
        ],
      },
      other: {
        number: '10',
        title: 'Other important information',
        subsections: [
          {
            title: 'Automated decisions',
            text: 'Turnstile automatically assesses whether traffic appears legitimate, but NGentik does not use information submitted through this website for automated decision-making or profiling that produces legal or similarly significant effects.',
          },
          {
            title: 'Children',
            text: 'The website is intended for business and professional enquiries and is not specifically directed at children.',
          },
          {
            title: 'Security',
            text: 'We use appropriate technical and organisational measures intended to protect personal data. No internet-based service can be guaranteed to be completely secure.',
          },
          {
            title: 'Changes to this notice',
            text: 'We may update this notice when our processing practices, services or legal obligations change. The explicitly maintained date at the top shows when it was last updated.',
          },
        ],
      },
    },
  },
  fi: {
    pageLabel: 'Tietosuoja',
    title: 'Näin NGentik käsittelee tietojasi.',
    metaTitle: 'Tietosuoja | NGentik',
    metaDescription:
      'Lue, miten NGentik käsittelee ja suojaa henkilötietoja käyttäessäsi verkkosivustoamme tai ottaessasi meihin yhteyttä.',
    locale: 'fi_FI',
    lastUpdatedLabel: 'Päivitetty viimeksi',
    backHome: 'Takaisin etusivulle',
    sections: {
      controller: {
        number: '01',
        title: 'Kuka vastaa henkilötiedoistasi?',
        paragraphs: [
          'Tässä selosteessa kerrotaan, miten henkilötietoja käsitellään, kun käytät NGentik-verkkosivustoa tai otat meihin yhteyttä.',
          'NGentik on tällä verkkosivustolla käytetty nimi. Rekisterinpitäjän täydellinen oikeudellinen henkilöllisyys lisätään, kun se on vahvistettu.',
        ],
        emailLabel: 'Tietosuojakysymykset',
      },
      information: {
        number: '02',
        title: 'Mitä tietoja keräämme',
        intro:
          'Käsittelemme verkkosivuston käyttötavasta riippuen seuraavia tietoja:',
        items: [
          'Yhteystiedot: etunimi, sukunimi, sähköpostiosoite ja valinnainen puhelinnumero.',
          'Ammatilliset tiedot: yrityksen nimi.',
          'Yhteydenoton sisältö: aihe ja viestiin sisällyttämäsi tiedot.',
          'Lomakkeen kuittaus: vahvistus siitä, että hyväksyt yhteydenottoon vastaamiseksi tarvittavan käsittelyn.',
          'Isännöinti-, diagnostiikka- ja väärinkäytön estopalvelujen käsittelemät tekniset ja turvallisuustiedot, kuten pyyntö- ja selaintiedot sekä turvallisuussignaalit.',
          'Selaimeesi paikallisesti tallennettava EN/FI-kielivalinta.',
        ],
      },
      purposes: {
        number: '03',
        title: 'Miksi käsittelemme tietoja',
        columns: ['Tarkoitus', 'Tiedot', 'Oikeusperuste'],
        rows: [
          [
            'Yhteydenottoihin vastaaminen ja mahdollisesta työstä keskusteleminen',
            'Yhteys-, ammatti- ja viestitiedot',
            'Pyynnöstäsi tehtävät toimet ennen mahdollista sopimusta (GDPR 6(1)(b)) ja oikeutettu etumme käsitellä liiketoimintaan liittyviä yhteydenottoja (GDPR 6(1)(f)) yhteydenoton luonteesta riippuen',
          ],
          [
            'Lomakkeen suojaaminen roskapostilta ja automaattiselta väärinkäytöltä',
            'Turnstile-tunniste ja tekniset turvallisuussignaalit',
            'Oikeutettu etumme suojata verkkosivustoa ja viestintää (GDPR 6(1)(f))',
          ],
          [
            'Verkkosivuston ja rajapinnan käyttö, suojaaminen ja vianmääritys',
            'Tekniset pyyntö-, diagnostiikka- ja virhetiedot',
            'Oikeutettu etumme ylläpitää turvallista ja luotettavaa palvelua (GDPR 6(1)(f))',
          ],
          [
            'Kielivalintasi muistaminen',
            'Selaintallennukseen tallennettu EN/FI-valinta',
            'Tarpeen pyytämäsi kielivalinnan tarjoamiseksi',
          ],
        ],
        acknowledgement:
          'Yhteydenottolomakkeen valintaruutu tallentaa kuittauksesi yhteydenoton käsittelystä. Sitä ei esitetä kaikkien tässä selosteessa kuvattujen käsittelytoimien oikeusperusteena.',
      },
      contactForm: {
        number: '04',
        title: 'Mitä tapahtuu, kun otat yhteyttä',
        paragraphs: [
          'Lähetyksesi toimitetaan NGentik-taustapalveluun. Tiedot validoidaan, automaattinen väärinkäyttö tarkistetaan Cloudflare Turnstilen avulla ja yhteydenotto tallennetaan Microsoft SharePoint -luetteloon Microsoft Graphin kautta.',
          'Pakolliset lomakekentät on täytettävä, jos haluat lähettää lomakkeen. Sukunimi ja puhelinnumero ovat valinnaisia. Voit ottaa yhteyttä myös sähköpostitse, mutta tarvitsemme silti riittävät tiedot vastataksemme.',
        ],
      },
      providers: {
        number: '05',
        title: 'Palveluntarjoajat ja vastaanottajat',
        intro:
          'Pääsy tietoihin rajataan henkilöihin ja palveluntarjoajiin, jotka tarvitsevat niitä sivuston ylläpitoon tai yhteydenottosi käsittelyyn. Toteutus käyttää tällä hetkellä seuraavia palveluja:',
        providers: [
          {
            name: 'Microsoft',
            description:
              'Azure Static Web Apps isännöi verkkosivustoa, Azure Functions käsittelee lomakepyynnöt ja Microsoft Graph sekä SharePoint välittävät ja tallentavat yhteydenotot. Azuren diagnostiikkapalvelut voivat käsitellä toimintalokeja.',
            linkLabel: 'Microsoftin tietosuojatiedot',
            linkKey: 'microsoftPrivacy' as const,
          },
          {
            name: 'Cloudflare',
            description:
              'Turnstile suorittaa selaimessa tarkistuksen ja validoi lyhytikäisen tunnisteen erottaakseen aidot käyttäjät automaattisesta väärinkäytöstä. Se käsittelee tätä varten teknisiä turvallisuussignaaleja.',
            linkLabel: 'Cloudflare Turnstilen tietosuojatiedot',
            linkKey: 'cloudflareTurnstile' as const,
          },
        ],
      },
      transfers: {
        number: '06',
        title: 'Kansainväliset siirrot',
        paragraphs: [
          'Microsoft ja Cloudflare toimivat kansainvälisesti. Niiden palveluihin voi liittyä henkilötietojen käsittelyä Suomen tai Euroopan talousalueen ulkopuolella.',
          'Tarkat käsittelypaikat ja sovellettavat siirtosuojat riippuvat NGentik-palveluasetuksista ja sopimusjärjestelyistä. Nämä järjestelyt on vahvistettava tämän selosteen oikeudellisen tarkastuksen yhteydessä.',
        ],
      },
      retention: {
        number: '07',
        title: 'Kuinka kauan säilytämme tietoja',
        paragraphs: [
          'Yhteydenottotietoja on tarkoitus säilyttää vain niin kauan kuin niitä tarvitaan vastaamiseen, mahdollisen liikesuhteen hoitamiseen, riitojen ratkaisemiseen ja sovellettavien lakisääteisten velvoitteiden täyttämiseen.',
          'Tarkkaa toiminnallista säilytys- ja poistokäytäntöä ei ole vielä vahvistettu. NGentik-organisaation on määritettävä käytäntö ja varmistettava ennen selosteen julkaisemista, että SharePointin ja diagnostiikkatietojen poistokäytännöt vastaavat sitä.',
        ],
      },
      rights: {
        number: '08',
        title: 'Tietosuojaoikeutesi',
        intro:
          'Tilanteesta ja oikeusperusteesta riippuen sinulla voi olla oikeus:',
        items: [
          'saada pääsy henkilötietoihisi',
          'pyytää virheellisten tai puutteellisten tietojen oikaisua',
          'pyytää tietojen poistamista tai käsittelyn rajoittamista soveltuvin osin',
          'vastustaa oikeutettuun etuun perustuvaa käsittelyä',
          'saada toimittamasi tiedot siirrettävässä muodossa soveltuvin osin',
          'peruuttaa suostumus, jos tietty käsittely perustuu suostumukseen, vaikuttamatta aiemman käsittelyn lainmukaisuuteen',
          'olla joutumatta tiettyjen pelkästään automaattisten, oikeudellisia tai vastaavia merkittäviä vaikutuksia aiheuttavien päätösten kohteeksi',
        ],
        closing:
          'Lähetä alustava pyyntö sähköpostitse. Saatamme joutua varmistamaan henkilöllisyytesi ennen pyynnön toteuttamista. Voit myös tehdä valituksen Suomen tietosuojavaltuutetun toimistolle.',
        authorityLink: 'Tietosuojavaltuutetun toimisto',
      },
      technologies: {
        number: '09',
        title: 'Evästeet ja vastaavat teknologiat',
        paragraphs: [
          'Nykyiseen verkkosivustokoodiin ei ole toteutettu analytiikkaa, mainospikseleitä tai markkinointiseurantaa. Sivusto tallentaa kielivalintasi localStorage-selaintallennukseen muistaakseen EN/FI-valintasi.',
          'Cloudflare Turnstile käyttää selainpohjaista turvallisuusteknologiaa automaattisen väärinkäytön havaitsemiseen. Turvallisuuden ja pyydettyjen toimintojen kannalta välttämättömät teknologiat eivät edellytä markkinointievästebanneria. Jos myöhemmin lisätään muuta kuin välttämätöntä seurantaa, tämä seloste ja suostumusmekanismi on arvioitava ennen sen käyttöönottoa.',
        ],
      },
      other: {
        number: '10',
        title: 'Muut tärkeät tiedot',
        subsections: [
          {
            title: 'Automaattiset päätökset',
            text: 'Turnstile arvioi automaattisesti, vaikuttaako liikenne aidolta, mutta NGentik ei käytä verkkosivuston kautta toimitettuja tietoja automaattiseen päätöksentekoon tai profilointiin, jolla olisi oikeudellisia tai vastaavia merkittäviä vaikutuksia.',
          },
          {
            title: 'Lapset',
            text: 'Verkkosivusto on tarkoitettu liiketoimintaan ja ammatillisiin yhteydenottoihin, eikä sitä ole suunnattu erityisesti lapsille.',
          },
          {
            title: 'Tietoturva',
            text: 'Käytämme henkilötietojen suojaamiseen asianmukaisia teknisiä ja organisatorisia toimenpiteitä. Minkään internetpalvelun täydellistä turvallisuutta ei voida taata.',
          },
          {
            title: 'Selosteen muutokset',
            text: 'Voimme päivittää tätä selostetta käsittelytapojemme, palvelujemme tai lakisääteisten velvoitteidemme muuttuessa. Sivun alussa oleva erikseen ylläpidettävä päivämäärä kertoo viimeisimmän päivityksen.',
          },
        ],
      },
    },
  },
} as const;
