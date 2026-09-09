import { Container } from '~/components/ui/Container/Container';
import styles from './WhyNgentik.module.css';
const principles = [
  [
    'Solve the actual problem',
    'Understand the operational problem before choosing technology.',
  ],
  [
    'Keep complexity under control',
    'Choose the simplest architecture capable of reliably solving the requirement.',
  ],
  [
    'Build for ownership',
    'Create technology that customers can understand and maintain.',
  ],
  [
    'Think long term',
    'Consider maintainability, operational cost and future change from the beginning.',
  ],
] as const;
export function WhyNgentik() {
  return (
    <section className={styles.section} id="why-ngentik">
      <Container className={styles.grid}>
        <div>
          <p className="eyebrow">02 — Why NGentik</p>
          <h2>
            Technology decisions should start with the problem — not the
            product.
          </h2>
        </div>
        <div className={styles.principles}>
          {principles.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
