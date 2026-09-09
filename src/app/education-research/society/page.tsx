import PageHeader from '@/app/_components/ui/page-header';
import SocietyActivitiesContent from './_components/society-activities-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학회활동 | 청맥병원',
  description:
    '청맥병원 의료진의 국내외 주요 혈관·정맥 관련 학회 발표 및 학술 활동을 소개합니다.',
};

export default function SocietyActivitiesPage() {
  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { label: '교육·연구', href: '/education-research/exchange' },
          { label: '학회활동' },
        ]}
        title="학회활동"
        description={
          <>
            국내외 주요 학회에서 꾸준히 활동하며
            <br className="xl:hidden" />
            혈관의학 발전에 기여하고 있습니다.
          </>
        }
      />

      <SocietyActivitiesContent />
    </main>
  );
}
