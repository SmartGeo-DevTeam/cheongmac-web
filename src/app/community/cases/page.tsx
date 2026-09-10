import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { getTreatmentCasesManagedContent } from '@/_lib/managed-pages';
import type { Metadata } from 'next';
import TreatmentCaseList from './_components/treatment-case-list';
import TreatmentCasePageHeader from './_components/treatment-case-page-header';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '치료사례 | 청맥병원',
  description:
    '청맥병원의 치료 전후 사례, 환자 후기, 영상 인터뷰를 확인해보세요.',
};

export default async function TreatmentCasesPage() {
  const [session, items] = await Promise.all([
    getCurrentSession(),
    getTreatmentCasesManagedContent(),
  ]);
  const isAuthenticated = isActiveMember(session);

  return (
    <div>
      <TreatmentCasePageHeader />
      <TreatmentCaseList
        isAuthenticated={isAuthenticated}
        items={items}
      />
    </div>
  );
}
