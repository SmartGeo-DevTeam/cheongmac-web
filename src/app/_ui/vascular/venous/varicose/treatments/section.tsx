import ClinicTreatments from '@/app/_components/clinic/treatments/section';
import { varicoseAdditionalTreatments } from '@/app/_data/vascular/venous/varicose/treatments/additional';
import { varicoseTreatmentMethods } from '@/app/_data/vascular/venous/varicose/treatments/methods';

/** 하지정맥류 치료법: 공통 UI에 정맥질환 데이터를 연결합니다. */
export default function VaricoseTreatments() {
  return (
    <div className="mt-30">
      <ClinicTreatments
        id="vascular-venous-varicose-treatments"
        ariaLabel="하지정맥류 치료 방법"
        title={
          <>
            하지정맥류의 모든 치료법
            <br />
            <b>청맥병원에서 가능합니다</b>
          </>
        }
        methods={varicoseTreatmentMethods}
        additionalTreatments={varicoseAdditionalTreatments}
      />
    </div>
  );
}
