import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CJP SOCIAL',
  description: 'iOS-themed social media sharing powered by Catbox + MongoDB'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
