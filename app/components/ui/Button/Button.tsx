import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & {
  variant?: 'primary' | 'secondary' | 'text';
};

export function ButtonLink({
  className = '',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
