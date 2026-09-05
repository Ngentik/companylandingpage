import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Header } from './Header';
describe('Header', () => {
  afterEach(cleanup);
  it('links directly to contact', () => {
    render(<Header language="en" onLanguageChange={() => undefined} />);
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });
});
