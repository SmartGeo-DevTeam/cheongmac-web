import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  getTreatmentCaseManagedById,
  getTreatmentCaseManagedSiblings,
} from '@/_lib/managed-pages';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TreatmentCaseDetail from '../_components/treatment-case-detail';
import TreatmentCasePageHeader from '../_components/treatment-case-page-header';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getTreatmentCaseManagedById(id);

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

export default async function TreatmentCaseDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const [item, session, siblings] = await Promise.all([
    getTreatmentCaseManagedById(id),
    getCurrentSession(),
    getTreatmentCaseManagedSiblings(id),
  ]);

  if (!item) notFound();

  return (
    <div>
      <TreatmentCasePageHeader titleAs="div" />
      <TreatmentCaseDetail
        item={item}
        previousId={siblings.previous?.id}
        nextId={siblings.next?.id}
        isAuthenticated={isActiveMember(session)}
      />
    </div>
  );
}
