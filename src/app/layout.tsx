import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kaito Baba (kAIto47802)',
    template: '%s | Kaito Baba',
  },
  description: "This is Kaito Baba's profile page.",
  alternates: {
    canonical: '/',
  },
  metadataBase: new URL('https://kaito47802.github.io'),
  openGraph: {
    title: 'Kaito Baba (kAIto47802)',
    siteName: 'Kaito Baba',
    url: 'https://kaito47802.github.io/',
    type: 'website',
    images: ['opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaito Baba | Homepage',
    images: ['twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};
export default RootLayout;
