import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';
import { varicoseStrengthsHeadingLines } from '@/app/_data/vascular/venous/varicose/strengths/content';

export default function VaricoseStrengths() {
  // TODO: 메시지가 확정되면 _data/.../strengths/content.ts에 입력합니다.
  // 기존 병원 공통 강점 카드 5개는 동맥 페이지와 동일하게 재사용합니다.
  return (
    <ClinicStrengths
      id="vascular-venous-varicose-strengths"
      headingLines={varicoseStrengthsHeadingLines}
      items={vascularStrengthItems}
    />
  );
}
