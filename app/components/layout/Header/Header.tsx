import { Container } from '~/components/ui/Container/Container';
import { siteConfig } from '~/config/site';
import { translations, type Language } from '~/config/translations';
import styles from './Header.module.css';
interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}
export function Header({ language, onLanguageChange }: HeaderProps) {
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
              aria-pressed={language === 'en'}
              onClick={() => onLanguageChange('en')}
            >
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              aria-pressed={language === 'fi'}
              onClick={() => onLanguageChange('fi')}
            >
              FI
            </button>
          </div>
          <a className={styles.contact} href="#contact">
            {copy.contactLink}
          </a>
        </div>
      </Container>
    </header>
  );
}
