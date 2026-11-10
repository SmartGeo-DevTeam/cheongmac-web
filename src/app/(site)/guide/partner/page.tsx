import { Suspense } from 'react';
import PartnerList from '@/app/_ui/guide/partner/partner-list';
import PartnerStatus from '@/app/_ui/guide/partner/partner-status';
import PartnerVeteransBanner from '@/app/_ui/guide/partner/veterans-banner';

export default function GuidePartnerPage() {
  return (
    <>
      {/* 신규: 협약기관 현황 / 기관 로고 */}
      <PartnerStatus />

      {/* 신규: 보훈병원 전문위탁병원 안내 배너 */}
      <PartnerVeteransBanner />

      {/* 신규: 협약기관 탭 / 검색 / 목록 / 페이지네이션 */}
      <Suspense fallback={null}>
        <PartnerList />
      </Suspense>
    </>
  );
}
