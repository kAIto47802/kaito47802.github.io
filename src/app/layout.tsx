import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "kAIto47802's Profile",
  description: "This is kAIto47802's profile page.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};
export default RootLayout;
