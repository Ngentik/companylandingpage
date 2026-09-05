import { Container } from '~/components/ui/Container/Container';
import { SectionHeading } from '~/components/ui/SectionHeading/SectionHeading';
import styles from './Process.module.css';

const steps = [
  [
    'Understand',
    'Identify the process, bottleneck and desired business outcome.',
  ],
  ['Design', 'Determine the smallest reliable technical solution.'],
  ['Implement', 'Build, integrate and validate the solution.'],
  ['Improve', 'Measure what works and iterate where there is genuine value.'],
] as const;
export function Process() {
  return (
    <section className={styles.section} id="process">
      <Container>
        <SectionHeading
          label="How we work"
          title="A direct route from friction to improvement."
        />
        <ol className={styles.steps}>
          {steps.map(([title, description], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
