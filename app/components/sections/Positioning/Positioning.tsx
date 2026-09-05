import { Container } from '~/components/ui/Container/Container';
import styles from './Positioning.module.css';
export function Positioning() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <p className="eyebrow">Our perspective</p>
        <h2>
          Technology should simplify your business.
          <br />
          <span>Not become another thing you have to manage.</span>
        </h2>
        <p>
          We focus on practical improvements: clearer systems, less repetitive
          work and technology that remains understandable after delivery.
        </p>
      </Container>
    </section>
  );
}
