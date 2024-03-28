import type { Metadata } from 'next';
import './globals.css';
import { poppins } from './fonts';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Fityo',
  description: 'Your complete fitness app',
  icons: {
    icon: [
      {
        url: '/assets/favicon.png',
        href: '/assets/favicon.png',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} min-h-screen min-w-screen flex items-center justify-center`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
