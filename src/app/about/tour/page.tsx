import PageHeader from '@/app/_components/ui/page-header';
import HospitalTourContent from './_components/hospital-tour-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '병원 둘러보기 | 청맥병원',
  description:
    '청맥병원의 층별 안내와 주요 진료·검사·입원·편의시설을 확인해보세요.',
};

export default function HospitalTourPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: '병원 소개', href: '/about/doctors' },
          { label: '병원 둘러보기' },
        ]}
        title="병원 둘러보기"
        description={
          <>
            좋은 의료는 편안하고 쾌적한 공간에서 시작됩니다.
            <br />
            오직 치료와 회복에 집중할 수 있는 최적의 환경을 제공합니다.
          </>
        }
      />

      <HospitalTourContent />
    </div>
  );
}
