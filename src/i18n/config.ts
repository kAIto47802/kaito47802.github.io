import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationsEn from './locales/en.json';
import translationsJa from './locales/ja.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationsEn,
      },
      ja: {
        translation: translationsJa,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie'],
      lookupCookie: 'lang',
    },
  });

export default i18n;
