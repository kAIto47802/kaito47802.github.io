import RootDocument from '@/app/RootDocument';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: '馬場凱渡 (Kaito Baba, kAIto47802)',
    template: '%s | 馬場凱渡',
  },
  description: '馬場凱渡 (Kaito Baba, kAIto47802) のプロフィールページです。',
  alternates: {
    canonical: '/ja',
    languages: {
      en: '/',
      ja: '/ja',
    },
  },
  metadataBase: new URL('https://kaito47802.github.io'),
  openGraph: {
    title: 'Kaito Baba (kAIto47802)',
    description: "This is Kaito Baba's profile page.",
    siteName: 'Kaito Baba',
    url: 'https://kaito47802.github.io/ja',
    type: 'website',
    images: ['https://kaito47802.github.io/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaito Baba | Homepage',
    description: "This is Kaito Baba's profile page.",
    images: ['https://kaito47802.github.io/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const JapaneseLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <RootDocument locale='ja'>{children}</RootDocument>;

export default JapaneseLayout;
