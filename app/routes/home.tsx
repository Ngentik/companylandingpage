import { useEffect } from 'react';
import { Footer } from '~/components/layout/Footer/Footer';
import { Header } from '~/components/layout/Header/Header';
import { Contact } from '~/components/sections/Contact/Contact';
import { Hero } from '~/components/sections/Hero/Hero';
import { siteConfig } from '~/config/site';
import { translations } from '~/config/translations';
import { useLanguage } from '~/hooks/useLanguage';
import { updateLocalizedMetadata } from '~/utils/metadata';
export function links() {
  return [{ rel: 'canonical', href: siteConfig.url }];
}
export function meta() {
  return [
    { title: siteConfig.title },
    { name: 'description', content: siteConfig.description },
    { property: 'og:title', content: siteConfig.title },
    { property: 'og:description', content: siteConfig.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteConfig.url },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:locale', content: siteConfig.metadata.fi.locale },
    { name: 'twitter:card', content: 'summary' },
  ];
}
export default function Home() {
  const { language, changeLanguage } = useLanguage();
  const copy = translations[language];

  useEffect(() => {
    updateLocalizedMetadata(siteConfig.metadata[language]);
  }, [language]);
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
