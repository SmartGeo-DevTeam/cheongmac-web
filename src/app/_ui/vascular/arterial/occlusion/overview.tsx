import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import OcclusionCases from './cases/section';
import OcclusionDiagnostics from './diagnostics/section';
import OcclusionIntroduction from './introduction/section';
import OcclusionManagement from './management/section';
import OcclusionMechanism from './mechanism/section';
import OcclusionMedia from './media/section';
import OcclusionProcedures from './procedures/section';
import OcclusionResources from './resources/section';

/** 하지동맥폐색증 상세 페이지: 섹션 호출 순서만 관리합니다. */
export default function OcclusionOverview() {
  return (
    <>
      <OcclusionIntroduction />
      <OcclusionMechanism />
      <ClinicSymptomComparison id="vascular-arterial-occlusion-comparison" />
      <OcclusionDiagnostics />
      <ClinicBanner
        {...vascularReservationBanner}
        isPaddingHorizontalInMobile={false}
      />

      {/* TODO(신규): 치료 사례/비교 이미지 */}
      <OcclusionCases />
      {/* TODO(신규): 치료 방식 탭 */}
      <OcclusionProcedures />
      {/* TODO(신규): 치료 후 관리 가이드 */}
      <OcclusionManagement />
      {/* TODO(신규): 관련 정보/바로가기 카드 */}
      <OcclusionResources />
      {/* TODO(신규): 영상 콘텐츠 */}
      <OcclusionMedia />
    </>
  );
}
