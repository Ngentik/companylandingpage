import { ButtonLink } from '~/components/ui/Button/Button';
import { Container } from '~/components/ui/Container/Container';
import { siteConfig } from '~/config/site';
import styles from './ContactCTA.module.css';
export function ContactCTA() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.orbit} aria-hidden="true" />
      <Container className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>Start with the problem</p>
          <h2>Have a process that wastes too much time?</h2>
        </div>
        <div className={styles.action}>
          <p>
            Tell us what is slowing your business down. We’ll help work out
            whether technology is the right answer.
          </p>
          <ButtonLink
            className={styles.button}
            href={`mailto:${siteConfig.email}?subject=Business enquiry`}
          >
            Start a conversation <span aria-hidden="true">→</span>
          </ButtonLink>
          <small>Contact via {siteConfig.email}</small>
        </div>
      </Container>
    </section>
  );
}
