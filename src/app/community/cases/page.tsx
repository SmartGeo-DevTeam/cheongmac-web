import TreatmentCaseList from './_components/treatment-case-list';
import TreatmentCasePageHeader from './_components/treatment-case-page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '치료사례 | 청맥병원',
  description:
    '청맥병원의 치료 전후 사례, 환자 후기, 영상 인터뷰를 확인해보세요.',
};

export default function TreatmentCasesPage() {
  return (
    <main className="pt-20 xl:pt-5">
      <TreatmentCasePageHeader />
      <TreatmentCaseList />
    </main>
  );
}
