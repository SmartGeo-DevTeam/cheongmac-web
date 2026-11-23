import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import { varicoseTreatmentMethods } from '@/app/_data/vascular/venous/varicose/treatments/methods';

/** 하지정맥류 치료법: 공통 UI에 정맥질환 데이터를 연결합니다. */
export default function VaricoseTreatments() {
  return (
    <ClinicTreatments
      id="vascular-venous-varicose-treatments"
      ariaLabel="하지정맥류 치료 방법"
      title={<>환자 개인의 상태에 맞는<br /><b>단계별 치료를 시행합니다</b></>}
      methods={varicoseTreatmentMethods}
    />
  );
}
