import { suit } from '@/_lib/fonts';
import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import { ScrollDirectionProvider } from '@/app/_providers/scroll-direction-provider';
import { ViewportProvider } from '@/app/_providers/viewport-provider';
import { i18n } from '@/i18n-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuickReservationForm from '../_components/quick-reservation-form';
import '../globals.css';
import { getDictionary, hasLocale } from './dictionaries';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return {
    title: dict.common.siteName,
    description: dict.home.description,
    other: {
      google: 'notranslate',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      translate="no"
      suppressHydrationWarning
      className={`${suit.className} antialiased`}
    >
      <body>
        <ViewportProvider>
          <ScrollDirectionProvider>
            <Header lang={lang} headerText={dict.header} />
            <QuickReservationForm
              lang={lang}
              reservationText={dict.header.reservation}
            />
          </ScrollDirectionProvider>

          <main>{children}</main>
          <Footer />
        </ViewportProvider>
      </body>
    </html>
  );
}
