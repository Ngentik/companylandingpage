import { ButtonLink } from '~/components/ui/Button/Button';
import { Container } from '~/components/ui/Container/Container';
import { translations, type Language } from '~/config/translations';
import styles from './Hero.module.css';
export function Hero({ language }: { language: Language }) {
  const copy = translations[language];
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.overlay} aria-hidden="true" />
      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-title">{copy.heroTitle}</h1>
          <p className={styles.intro}>{copy.heroIntro}</p>
          <ButtonLink className={styles.cta} href="#contact" variant="text">
            {copy.heroCta} <span aria-hidden="true">&darr;</span>
          </ButtonLink>
        </div>
        <p className={styles.location}>Ngentik &middot; {copy.country}</p>
      </Container>
    </section>
  );
}
