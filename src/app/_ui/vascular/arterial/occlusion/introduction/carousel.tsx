import SymptomCarousel from '@/app/_components/clinic/symptom-carousel/carousel';
import { occlusionIntroductionSymptoms } from '@/app/_data/vascular/arterial/occlusion/introduction/symptoms';

/** 기존 동맥질환 데이터와 식별자를 유지하는 페이지 전용 어댑터입니다. */
export default function OcclusionIntroductionCarousel() {
  return (
    <SymptomCarousel
      id="vascular-arterial-occlusion-symptoms-carousel"
      items={occlusionIntroductionSymptoms}
      tabsAriaLabel="하지동맥폐색증 증상 선택"
    />
  );
}
