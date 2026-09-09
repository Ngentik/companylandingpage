export const supportedLanguages = ['fi', 'en'] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = 'fi';
export const languageStorageKey = 'ngentik-language';

export function isLanguage(value: string | null): value is Language {
  return value === 'fi' || value === 'en';
}
