import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import CeapIllustration from './illustration';
import CeapIntroduction from './introduction';
import CeapStageList from './stage-list';

/** CEAP 섹션: 모바일 상단·도해는 어두운 배경, 단계 목록은 흰 배경. PC는 전체 흰 배경. */
export default function VaricoseCeap() {
  return (
    <section id="vascular-venous-varicose-ceap" className={`mt-15`}>
      {/* 제목과 CEAP 소개: 모바일만 어두운 배경 */}
      <div
        className={`rounded-t-[20px] bg-brand-deep
        xl:bg-base`}
      >
        <Inner>
          <SectionHeading
            label="하지정맥류 국제 표준 진단 기준 CEAP"
            labelClassName={`text-green-300
              xl:text-accent`}
            title={
              <b
                className={`text-inverse
                xl:text-primary`}
              >
                나는 몇기에 해당될까?
              </b>
            }
          />
          <CeapIntroduction />
        </Inner>
      </div>

      <Inner>
        <div className="xl:mt-15 xl:grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:items-center xl:gap-10">
          <div
            className={`-mx-5 px-5 pt-5 pb-7 bg-brand-deep
            xl:mx-0 xl:px-0 xl:py-0 xl:bg-base`}
          >
            <CeapIllustration />
          </div>
          <CeapStageList />
        </div>
      </Inner>
    </section>
  );
}
