import GoogleAnalytics from '@/components/pure/GoogleAnalytics';
import { Locale } from '@/i18n/config';
import { Noto_Sans, Noto_Sans_JP } from 'next/font/google';

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-noto-sans' });
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin-ext'],
  variable: '--font-noto-sans-jp',
});

const RootDocument = ({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) => {
  const structuredData =
    locale === 'ja'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '馬場凱渡 (Kaito Baba, kAIto47802)',
          alternateName: [
            '馬場凱渡',
            'ばばかいと',
            'ばば かいと',
            'Kaito Baba',
            'kAIto47802',
            'Kaito B.',
          ],
          url: 'https://kaito47802.github.io/ja',
          inLanguage: 'ja',
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Kaito Baba (kAIto47802)',
          alternateName: ['Kaito Baba', 'kAIto47802', 'Kaito B.', '馬場凱渡'],
          url: 'https://kaito47802.github.io/',
          inLanguage: 'en',
        };

  return (
    <html lang={locale} data-locale={locale}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${notoSans.variable} ${notoSansJP.variable}`}>
        {children}
        <script
          id='site-name'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
};

export default RootDocument;
