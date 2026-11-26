import Inner from '@/app/_components/common/inner';
import { pulmonaryEmbolismSymptoms } from '@/app/_data/vascular/venous/thrombosis/pulmonary-embolism/items';
import { TriangleAlert } from 'lucide-react';
import PulmonaryEmbolismCarousel from './carousel';
import PulmonaryEmbolismMobile from './mobile';

type PulmonaryEmbolismSectionProps = {
  id: string;
};

export default function PulmonaryEmbolismSection({
  id,
}: PulmonaryEmbolismSectionProps) {
  return (
    <section id={id}>
      <div
        className={`mt-10 py-10 bg-accent
          xl:mt-30 xl:pt-20 xl:bg-base`}
      >
        <Inner>
          {/* 경고 아이콘 및 제목 */}
          <div className={`flex flex-col justify-center items-center`}>
            <TriangleAlert
              className={`size-10 fill-white text-accent
                [&>path:first-child]:stroke-white
                xl:size-22 xl:fill-primary xl:text-inverse`}
            />

            <h3
              className={`mt-3 font-bold text-[26px] leading-[140%] text-inverse
                xl:mt-7 xl:text-[56px] xl:text-primary`}
            >
              폐색전증으로 이어지기 전,
              <br />
              골든타임을 놓치지 마세요
            </h3>
          </div>

          {/* 모바일 - 폐색전증 이미지 및 증상 */}
          <PulmonaryEmbolismMobile
            id={`${id}-mobile`}
            items={pulmonaryEmbolismSymptoms}
          />
        </Inner>

        {/* 데스크탑 - 폐색전증 증상 캐러셀 */}
        <PulmonaryEmbolismCarousel
          id={`${id}-carousel`}
          items={pulmonaryEmbolismSymptoms}
        />

        {/* 폐색전증 하단 경고 문구 */}
        <Inner>
          <div
            className={`mt-3 space-y-6 text-mo-heading-2 text-center text-inverse
              xl:mt-25 xl:space-y-2 xl:text-pc-heading-1 xl:text-accent`}
          >
            <p>
              다리의 혈전이 이동해 폐혈관을 막게 되면{' '}
              <br className={`xl:hidden`} />
              치명적인{' '}
              <span
                className={`mx-0.75 px-1.5 py-0.5 inline-block bg-primary
                  xl:m-0 xl:p-0 xl:bg-transparent`}
              >
                폐색전증
              </span>
              을 유발할 수 있습니다.
            </p>

            <p>
              자칫 생명을 위협할 수 있는 응급 상황이므로,
              <br className={`xl:hidden`} />
              즉각적인 의료진 평가와 신속한 치료를 권합니다.
            </p>
          </div>
        </Inner>
      </div>
    </section>
  );
}
