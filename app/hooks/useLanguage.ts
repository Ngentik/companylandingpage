import { useCallback, useEffect, useSyncExternalStore } from 'react';
import {
  defaultLanguage,
  isLanguage,
  languageStorageKey,
  type Language,
} from '~/config/language';

const languageChangeEvent = 'ngentik-language-change';

function getLanguageSnapshot(): Language {
  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  return isLanguage(savedLanguage) ? savedLanguage : defaultLanguage;
}

function subscribeToLanguage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(languageChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(languageChangeEvent, onStoreChange);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    () => defaultLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback((next: Language) => {
    window.localStorage.setItem(languageStorageKey, next);
    window.dispatchEvent(new Event(languageChangeEvent));
  }, []);

  return { language, changeLanguage } as const;
}
