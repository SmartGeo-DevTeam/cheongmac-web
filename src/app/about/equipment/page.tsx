import PageHeader from '@/app/_components/ui/page-header';
import MedicalEquipmentContent from './_components/medical-equipment-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '첨단의료장비 | 청맥병원',
  description:
    '청맥병원의 영상진단, 기능생체검사, 시술·수술, 특수치료 장비를 안내합니다.',
};

export default function MedicalEquipmentPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: '병원 소개', href: '/about/doctors' },
          { label: '첨단의료장비' },
        ]}
        title="첨단의료장비"
        description={
          <>
            대학병원급 고해상도 진단 장비와 첨단 치료 시스템을 통해
            <br className="hidden xl:block" />
            보이지 않는 혈관 속 미세한 병변까지 놓치지 않고 찾아냅니다.
          </>
        }
      />

      <MedicalEquipmentContent />
    </div>
  );
}
