import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import { occlusionStrengthsHeadingLines } from '@/app/_data/vascular/arterial/occlusion/strengths/content';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';

export default function OcclusionStrengths() {
  return (
    <ClinicStrengths
      id="vascular-arterial-occlusion-strengths"
      headingLines={occlusionStrengthsHeadingLines}
      items={vascularStrengthItems}
    />
  );
}
