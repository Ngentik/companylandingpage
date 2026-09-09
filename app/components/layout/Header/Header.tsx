import { Container } from '~/components/ui/Container/Container';
import { siteConfig } from '~/config/site';
import { translations, type Language } from '~/config/translations';
import styles from './Header.module.css';
interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  contactHref?: string;
}
export function Header({
  language,
  onLanguageChange,
  contactHref = '#contact',
}: HeaderProps) {
  const copy = translations[language];
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a className={styles.logo} href="/" aria-label={copy.homeLabel}>
          <img
            src="/media/ngentik-horizontal-logo.png"
            alt={siteConfig.name}
            width="900"
            height="211"
          />
        </a>
        <div className={styles.actions}>
          <div
            className={styles.languages}
            aria-label={copy.languageLabel}
            role="group"
          >
            <button
              type="button"
              aria-label={copy.switchToEnglish}
              aria-pressed={language === 'en'}
              onClick={() => onLanguageChange('en')}
            >
              <img src="/media/flag-gb.svg" alt="" aria-hidden="true" />
              <span>EN</span>
            </button>
            <button
              type="button"
              aria-label={copy.switchToFinnish}
              aria-pressed={language === 'fi'}
              onClick={() => onLanguageChange('fi')}
            >
              <img src="/media/flag-fi.svg" alt="" aria-hidden="true" />
              <span>FI</span>
            </button>
          </div>
          <a className={styles.contact} href={contactHref}>
            {copy.contactLink}
          </a>
        </div>
      </Container>
    </header>
  );
}
