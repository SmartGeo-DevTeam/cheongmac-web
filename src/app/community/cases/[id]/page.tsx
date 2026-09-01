import {
  TREATMENT_CASES,
  getTreatmentCase,
} from '../_data';
import TreatmentCaseDetail from '../_components/treatment-case-detail';
import TreatmentCasePageHeader from '../_components/treatment-case-page-header';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return TREATMENT_CASES.map((item) => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getTreatmentCase(id);

  if (!item) {
    return {
      title: '치료사례 | 청맥병원',
    };
  }

  return {
    title: `${item.title} | 치료사례 | 청맥병원`,
    description: item.description,
  };
}

export default async function TreatmentCaseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getTreatmentCase(id);

  if (!item) {
    notFound();
  }

  const currentIndex = TREATMENT_CASES.findIndex(
    (candidate) => candidate.id === item.id,
  );
  const previous = TREATMENT_CASES[currentIndex - 1];
  const next = TREATMENT_CASES[currentIndex + 1];

  return (
    <main className="pt-20 xl:pt-5">
      <TreatmentCasePageHeader />
      <TreatmentCaseDetail
        item={item}
        previousId={previous?.id}
        nextId={next?.id}
      />
    </main>
  );
}
