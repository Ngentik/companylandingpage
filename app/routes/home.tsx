import { useEffect, useState } from 'react';
import { Footer } from '~/components/layout/Footer/Footer';
import { Header } from '~/components/layout/Header/Header';
import { Contact } from '~/components/sections/Contact/Contact';
import { Hero } from '~/components/sections/Hero/Hero';
import { siteConfig } from '~/config/site';
import { translations, type Language } from '~/config/translations';
export function meta() {
  return [
    { title: siteConfig.title },
    { name: 'description', content: siteConfig.description },
    { property: 'og:title', content: siteConfig.title },
    { property: 'og:description', content: siteConfig.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteConfig.url },
    { property: 'og:site_name', content: siteConfig.name },
    { name: 'twitter:card', content: 'summary' },
  ];
}
export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  function changeLanguage(next: Language) {
    setLanguage(next);
    window.localStorage.setItem('ngentik-language', next);
  }
  const copy = translations[language];
  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <Header language={language} onLanguageChange={changeLanguage} />
      <main id="main-content">
        <Hero language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </>
  );
}
