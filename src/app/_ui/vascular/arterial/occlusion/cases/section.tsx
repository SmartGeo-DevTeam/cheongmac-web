import ClinicLinkButton from '@/app/_components/clinic/link-button';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { caseCategories } from '@/app/_data/community/cases/cases';
import {
  occlusionCaseSampleImage,
  occlusionFeaturedCases,
} from '@/app/_data/vascular/arterial/occlusion/cases/featured';
import OcclusionCasesCarousel from './carousel';

const categoryLabel =
  caseCategories.find((category) => category.id === 'peripheral-artery')?.label ??
  '하지동맥폐색증';

export default function OcclusionCases() {
  return (
    <section id="vascular-arterial-occlusion-cases">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="Cases · 실제 치료 사례"
          labelVariant="disabled"
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
        />
        <p className="mt-2 text-center text-mo-label text-tertiary xl:mt-3 xl:text-pc-label">
          ※ 현재 표시된 3건과 공통 비교 이미지는 시안용 가상 예시이며, 실제 환자의 치료 기록이 아닙니다.
        </p>
      </Inner>

      <OcclusionCasesCarousel
        items={occlusionFeaturedCases}
        categoryLabel={categoryLabel}
        sampleImage={occlusionCaseSampleImage}
      />

      <Inner>
        <div className="mt-10 flex items-center justify-center xl:mt-14">
          <ClinicLinkButton
            href="/community/cases?tab=before-after&category=peripheral-artery"
            title="치료사례 더보기"
          />
        </div>
      </Inner>
    </section>
  );
}
