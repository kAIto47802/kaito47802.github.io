import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kaito Baba | Homepage',
  description: "This is Kaito Baba's profile page. | 馬場凱渡のプロフィールページです。",
  metadataBase: new URL('https://kaito47802.github.io'),
  openGraph: { images: 'opengraph-image.png' },
  twitter: {
    card: 'summary_large_image',
    images: 'twitter-image.png',
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
