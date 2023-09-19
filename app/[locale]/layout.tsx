import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';
import { AOSInit } from '../aos';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [ { locale: 'pl' }, { locale: 'en' }, { locale: 'ua' }];
}

export const metadata: Metadata = {
  title: {
    default: 'MERN Serwis Samochodowy',
    template: `%s | MERN Serwis Samochodowy `,
  },
  description:
    'MERN Serwis to najlepszy serwis dla naprawy twojego BMW ,Rolls Royce, Mini Cooper',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang="pl">
      <AOSInit />
      <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID!} />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <CookieBanner />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
