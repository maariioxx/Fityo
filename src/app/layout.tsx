import type { Metadata } from 'next';
import './globals.css';
import { poppins } from './fonts';
import Providers from './providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const metadata: Metadata = {
  title: 'Fityo',
  description: 'Your complete fitness app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-slate-50 dark:bg-zinc-950 min-h-screen min-w-screen flex items-center justify-center`}
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
