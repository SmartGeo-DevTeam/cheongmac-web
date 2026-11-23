import CeapDescription from './description';
import CeapSymbol from './symbol';

/** CEAP 약자 그래픽과 설명을 담는 반응형 소개 영역. */
export default function CeapIntroduction() {
  return (
    <div
      id="vascular-venous-varicose-ceap-introduction"
      className={`mt-6
        xl:mt-20 xl:px-20 xl:py-10 xl:grid xl:grid-cols-[auto_auto] justify-center xl:items-center gap-x-15 xl:rounded-[20px] xl:border xl:border-default`}
    >
      <CeapSymbol />
      <CeapDescription />
    </div>
  );
}
