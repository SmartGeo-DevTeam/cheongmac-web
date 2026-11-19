import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { occlusionTreatmentMethods } from '@/app/_data/vascular/arterial/occlusion/treatments/methods';
import TreatmentSelector from './selector';

export default function OcclusionTreatments() {
  return (
    <section id="vascular-arterial-occlusion-treatments">
      <div className="mt-15 pb-15 bg-[#F2F2F2]">
        <Inner>
          <SectionHeading
            mtVariant="lg"
            label="Treatment · 치료법"
            labelVariant="disabled"
            title={<>환자 개인의 상태에 맞는<br /><b>단계별 치료를 시행합니다</b></>}
          />
          <TreatmentSelector methods={occlusionTreatmentMethods} />
        </Inner>
      </div>
    </section>
  );
}
