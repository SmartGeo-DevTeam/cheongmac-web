import ClinicCases from '@/app/_components/clinic/cases/section';
import { varicoseCasePreviews } from '@/app/_data/vascular/venous/varicose/cases/featured';

/** 하지정맥류 치료사례: 공통 UI에 정맥 사례 데이터를 연결합니다. */
export default function VaricoseCases() {
  return (
    <ClinicCases
      id="vascular-venous-varicose-cases"
      items={varicoseCasePreviews}
      categoryLabel="하지정맥류"
      title={
        <>
          하지정맥류 치료 과정,
          <br />
          <b>다양한 사례로 살펴보세요</b>
        </>
      }
      description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
      moreHref="/community/cases?tab=before-after&category=varicose"
    />
  );
}
