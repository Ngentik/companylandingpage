import { Container } from '~/components/ui/Container/Container';
import { siteConfig } from '~/config/site';
import { translations, type Language } from '~/config/translations';
import styles from './Footer.module.css';
export function Footer({ language }: { language: Language }) {
  const copy = translations[language];
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <p className={styles.name}>{siteConfig.name}</p>
          <p>{copy.country}</p>
        </div>
        <div className={styles.meta}>
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <span title={copy.privacyPending}>{copy.privacy}</span>
        </div>
      </Container>
    </footer>
  );
}
