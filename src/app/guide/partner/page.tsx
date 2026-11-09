import { Suspense } from 'react';
import PartnerList from './_sections/_list';
import PartnerStatus from './_sections/_status';
import VeteransBanner from './_sections/_veterans';

export default function GuidePartnerPage() {
  return (
    <>
      {/* 신규: 협약기관 현황 / 기관 로고 */}
      <PartnerStatus />

      {/* 신규: 보훈병원 전문위탁병원 안내 배너 */}
      <VeteransBanner />

      {/* 신규: 협약기관 탭 / 검색 / 목록 / 페이지네이션 */}
      <Suspense fallback={null}>
        <PartnerList />
      </Suspense>
    </>
  );
}
