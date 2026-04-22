import i18n from 'i18next';
import type { i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from './locales/en.json';
import translationsJa from './locales/ja.json';

export const resources = {
  en: {
    translation: translationsEn,
  },
  ja: {
    translation: translationsJa,
  },
} as const;

export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const initI18n = (instance: I18nInstance, locale: Locale): I18nInstance => {
  if (!instance.isInitialized) {
    instance.use(initReactI18next).init({
      resources,
      lng: locale,
      fallbackLng: defaultLocale,
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false,
    });
  } else if (instance.language !== locale) {
    instance.changeLanguage(locale);
  }

  return instance;
};

initI18n(i18n, defaultLocale);

export default i18n;
