'use client';
import { initI18n, Locale } from '@/i18n/config';
import CssBaseline from '@mui/material/CssBaseline';
import { createInstance } from 'i18next';
import { useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

const Providers = ({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) => {
  const i18n = useMemo(() => initI18n(createInstance(), locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <CssBaseline />
      {children}
    </I18nextProvider>
  );
};
export default Providers;
