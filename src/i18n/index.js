import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de.json';
import ua from './locales/ua.json';
import ru from './locales/ru.json';

// Порядок перемикання мов — строго по колу DE -> UA -> RU -> DE...
// Навмисне рішення: з німецької перемикач завжди пропонує спершу українську.
export const LANGUAGES = ['de', 'ua', 'ru'];

export const LANGUAGE_LABELS = {
  de: 'DE',
  ua: 'UA',
  ru: 'RU',
};

export function getNextLanguage(current) {
  const index = LANGUAGES.indexOf(current);
  return LANGUAGES[(index + 1) % LANGUAGES.length];
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      ua: { translation: ua },
      ru: { translation: ru },
    },
    fallbackLng: 'de',
    supportedLngs: LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
