'use client';
import Providers from '@/app/providers';
import GoogleAnalytics from '@/components/pure/GoogleAnalytics';
import { Noto_Sans, Noto_Sans_JP } from 'next/font/google';
import Script from 'next/script';
import { useTranslation } from 'react-i18next';
const notoSans = Noto_Sans({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin-ext'] });

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.language}>
      <Providers>
        <head>
          <GoogleAnalytics />
        </head>
        <body
          className={i18n.language === 'en' ? notoSans.className : notoSansJP.className}
        >
          {children}
          <Script
            id='site-name'
            type='application/ld+json'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Kaito Baba (kAIto47802)',
                alternateName: ['kAIto47802', 'Kaito B.'],
                url: 'https://kaito47802.github.io/',
              }),
            }}
          />
        </body>
      </Providers>
    </html>
  );
};
export default Template;
