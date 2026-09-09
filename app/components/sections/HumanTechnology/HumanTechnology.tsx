import { Container } from '~/components/ui/Container/Container';
import styles from './HumanTechnology.module.css';
export function HumanTechnology() {
  return (
    <section className={styles.section} id="human-technology">
      <Container className={styles.grid}>
        <div
          className={styles.image}
          role="img"
          aria-label="Placeholder for future photography showing people collaborating"
        >
          <span>Future NGentik photography</span>
          <i />
          <i />
        </div>
        <div className={styles.copy}>
          <p className="eyebrow">Human technology</p>
          <h2>
            Technology works better when people remain at the centre of it.
          </h2>
          <p>
            NGentik designs technology around how businesses actually operate —
            their people, processes and constraints.
          </p>
        </div>
      </Container>
    </section>
  );
}
