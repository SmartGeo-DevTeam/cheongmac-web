import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicSymptomComparison from '@/app/_components/clinic/symptom-comparison/section';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import OcclusionCases from './cases/section';
import OcclusionComparison from './comparison/section';
import OcclusionDiagnostics from './diagnostics/section';
import OcclusionIntroduction from './introduction/section';
import OcclusionManagement from './management/section';
import OcclusionMechanism from './mechanism/section';
import OcclusionMedia from './media/section';
import OcclusionProcedures from './procedures/section';
import OcclusionResources from './resources/section';
import OcclusionSymptoms from './symptoms/section';
import OcclusionTreatments from './treatments/section';

/** 하지동맥폐색증 상세 페이지: 섹션 호출 순서만 관리합니다. */
export default function OcclusionOverview() {
  return (
    <>
      <OcclusionIntroduction />
      <OcclusionMechanism />
      <ClinicSymptomComparison id="vascular-arterial-occlusion-comparison" />
      <OcclusionComparison />

      {/* TODO(신규): 증상 및 자가 확인 안내 */}
      <OcclusionSymptoms />
      {/* TODO(신규): 검사/진단 콘텐츠 */}
      <OcclusionDiagnostics />
      {/* TODO(신규): 치료 방법과 세부 카드 */}
      <OcclusionTreatments />
      {/* 공통 진료 예약 배너 재사용: 배치/디자인은 추후 시안에 맞게 조정 */}
      <ClinicBanner {...vascularReservationBanner} />
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
