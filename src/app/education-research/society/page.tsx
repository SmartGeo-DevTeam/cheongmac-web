import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import type { Metadata } from 'next';
import SocietyActivitiesContent from './_components/society-activities-content';

export const metadata: Metadata = {
  title: '학회활동 | 청맥병원',
  description:
    '청맥병원 의료진의 국내외 주요 혈관·정맥 관련 학회 발표 및 학술 활동을 소개합니다.',
};

export default function SocietyActivitiesPage() {
  return (
    <div>
      <NavigationPageHeader
        id="society-activities-page-header"
        navigationPath="/education-research/society"
        description={
          <>
            국내외 주요 학회에서 꾸준히 활동하며
            <br className="xl:hidden" />
            혈관의학 발전에 기여하고 있습니다.
          </>
        }
      />

      <SocietyActivitiesContent />
    </div>
  );
}
