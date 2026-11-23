import ClinicCases from '@/app/_components/clinic/cases/section';
import { caseCategories } from '@/app/_data/community/cases/cases';
import { occlusionCasePreviews } from '@/app/_data/vascular/arterial/occlusion/cases/featured';

const categoryLabel =
  caseCategories.find((category) => category.id === 'peripheral-artery')
    ?.label ?? '하지동맥폐색증';

/** 하지동맥폐색증 치료사례: 공통 UI에 동맥 사례 데이터를 연결합니다. */
export default function OcclusionCases() {
  return (
    <ClinicCases
      id="vascular-arterial-occlusion-cases"
      items={occlusionCasePreviews}
      categoryLabel={categoryLabel}
      title={
        <>
          무거웠던 일상에서
          <br className="xl:hidden" />
          <span className="hidden xl:inline"> </span>
          가벼운 걸음으로,
          <br />
          <b>실제 치료 결과로 증명합니다</b>
        </>
      }
      description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
      moreHref="/community/cases?tab=before-after&category=peripheral-artery"
    />
  );
}
