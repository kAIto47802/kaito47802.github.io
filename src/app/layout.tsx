import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "kAIto47802's Profile",
  description: "This is kAIto47802's profile page.",
  openGraph: { images: 'https://kaito47802.github.io/opengraph-image.png' },
  twitter: { images: 'https://kaito47802.github.io/twitter-image.png' },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};
export default RootLayout;
