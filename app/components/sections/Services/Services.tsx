import { Container } from '~/components/ui/Container/Container';
import { SectionHeading } from '~/components/ui/SectionHeading/SectionHeading';
import styles from './Services.module.css';

const services = [
  [
    '01',
    'Automation',
    'Automate repetitive workflows and connect disconnected business processes.',
  ],
  [
    '02',
    'Managed technology',
    'Practical support and management for the systems your business relies on.',
  ],
  [
    '03',
    'Cloud & infrastructure',
    'Modernise infrastructure with attention to reliability, cost and maintainability.',
  ],
  [
    '04',
    'Digital solutions',
    'Build websites, integrations and focused tools around real business requirements.',
  ],
] as const;

export function Services() {
  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-title"
    >
      <Container>
        <SectionHeading
          label="What we do"
          title="Useful technology, applied where it matters."
          description="From a single stubborn workflow to the systems supporting your operation, we help make technology simpler and more effective."
        />
        <h2 id="services-title" className={styles.srOnly}>
          Services
        </h2>
        <ol className={styles.list}>
          {services.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
