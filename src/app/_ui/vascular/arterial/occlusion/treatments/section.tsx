import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import { occlusionTreatmentMethods } from '@/app/_data/vascular/arterial/occlusion/treatments/methods';

/** 하지동맥폐색증 치료법: 공통 UI에 동맥질환 데이터를 연결합니다. */
export default function OcclusionTreatments() {
  return (
    <ClinicTreatments
      id="vascular-arterial-occlusion-treatments"
      ariaLabel="하지동맥폐색증 치료 방법"
      title={<>환자 개인의 상태에 맞는<br /><b>단계별 치료를 시행합니다</b></>}
      methods={occlusionTreatmentMethods}
    />
  );
}
