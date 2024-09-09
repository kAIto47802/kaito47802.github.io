import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "kAIto47802's Profile",
  description: "This is kAIto47802's profile page.",
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
