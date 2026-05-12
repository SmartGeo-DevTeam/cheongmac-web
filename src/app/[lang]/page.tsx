import { notFound } from 'next/navigation';
import { HomeProvider } from '../_providers/home-provider';
import HomeSections from './_components/home';
import { getDictionary, hasLocale } from './dictionaries';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <HomeProvider lang={lang} home={dict.home}>
      <HomeSections />
    </HomeProvider>
  );
}
