import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold">{dict.home.title}</h1>
      {/* <p className="text-gray-600">{dict.home.description}</p> */}
    </section>
  );
}
