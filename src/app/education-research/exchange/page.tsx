import PageHeader from '@/app/_components/ui/page-header';
import AcademicExchangeContent from './_components/academic-exchange-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학술교류 | 청맥병원',
  description:
    '청맥병원의 국내외 학술교류, 혈관의학 연구 교류와 교육 프로그램 활동을 소개합니다.',
};

export default function AcademicExchangePage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: '교육·연구', href: '/education-research/exchange' },
          { label: '학술교류' },
        ]}
        title="학술교류"
        description={
          <>
            국내외 활발한 학술 교류를 통해 축적된 임상 노하우를 공유하며
            <br className="hidden xl:block" />
            대한민국 혈관의학의 발전을 선도합니다.
          </>
        }
      />

      <AcademicExchangeContent />
    </div>
  );
}
