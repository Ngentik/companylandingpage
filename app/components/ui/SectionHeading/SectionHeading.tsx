import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  inverse?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${inverse ? styles.inverse : ''}`}>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
