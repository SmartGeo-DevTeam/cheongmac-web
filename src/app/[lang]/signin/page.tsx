import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';

export default async function SignIn({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <section>
      <h1 className="text-xl font-bold">{dict.home.temp}</h1>
    </section>
  );
}
