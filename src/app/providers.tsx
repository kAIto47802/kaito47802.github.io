'use client';
import i18n from '@/i18n/config';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <I18nextProvider i18n={i18n}>
      <CssBaseline />
      {children}
    </I18nextProvider>
  );
};
export default Providers;
