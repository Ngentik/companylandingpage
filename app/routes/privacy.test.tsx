import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import Privacy from './privacy';

describe('Privacy page language', () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('defaults to Finnish without saving an implicit preference', () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US',
    });

    render(<Privacy />);

    expect(
      screen.getByRole('heading', {
        name: 'Näin NGentik käsittelee tietojasi.',
      }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'fi');
    expect(window.localStorage.getItem('ngentik-language')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Vaihda kieleksi suomi' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('link', { name: 'Yhteystiedot' })).toHaveAttribute(
      'href',
      '/#contact',
    );
  });

  it('persists explicit English and Finnish selections', async () => {
    const user = userEvent.setup();
    const firstRender = render(<Privacy />);

    await user.click(
      screen.getByRole('button', { name: 'Vaihda kieleksi englanti' }),
    );

    expect(
      screen.getByRole('heading', {
        name: 'How NGentik handles your information.',
      }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(window.localStorage.getItem('ngentik-language')).toBe('en');

    firstRender.unmount();
    render(<Privacy />);

    expect(
      screen.getByRole('heading', {
        name: 'How NGentik handles your information.',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Switch language to Finnish' }),
    );
    expect(window.localStorage.getItem('ngentik-language')).toBe('fi');
    expect(document.documentElement).toHaveAttribute('lang', 'fi');
  });
});
