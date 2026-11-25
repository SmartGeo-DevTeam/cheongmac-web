import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { notFound } from 'next/navigation';

export default function VascularVenousThrombosisPage() {
  if (!isPublishedNavigationPath('/vascular/venous/thrombosis')) notFound();

  return (
    <>
      <Breadcrumb />

      <PageHeader
        title="심부정맥혈전증"
        englishTitle="Deep Vein Thrombosis, DVT"
        desc="다리 속 깊은 정맥의 피가 굳어 생긴 혈전이 혈관을 막아 발생하는 질환"
      />

      {/* 심부정맥혈전증 - 신규 섹션 작업 영역 */}
    </>
  );
}
