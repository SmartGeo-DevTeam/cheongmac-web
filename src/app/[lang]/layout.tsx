import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n-config';
import { getDictionary, hasLocale } from './dictionaries';
import Header from '@/app/_components/header';

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
    <html lang={lang}>
      <body>
        <Header lang={lang} siteName={dict.common.siteName} />

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
