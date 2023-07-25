import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';
import { AOSInit } from './aos';

export const metadata: Metadata = {
  title: {
    default: 'MERN Serwis Samochodowy',
    template: `%s | MERN Serwis Samochodowy `,
  },
  description:
    'MERN Serwis to najlepszy serwis dla naprawy twojego BMW ,Rolls Royce, Mini Cooper',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <AOSInit />
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID!} />
      <body>
        <Header />
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
