import { CEAP_FACTORS } from '@/app/_data/vascular/venous/varicose/ceap/factors';

/** CEAP 분류를 구성하는 네 가지 요소를 설명합니다. */
export default function CeapDescription() {
  return (
    <p
      className={`mt-5 break-keep text-center text-[14px] leading-[155%] text-gray
        xl:m-0 xl:text-left xl:font-medium xl:text-[22px] xl:text-secondary`}
    >
      {CEAP_FACTORS.map(({ text, letter }, index) => (
        <span key={letter}>
          <span
            className={`inline-flex align-middle items-center whitespace-nowrap`}
          >
            <span className={`mr-1`}>{text}</span>
            <span
              className={`size-4.5 inline-flex shrink-0 justify-center items-center rounded-full bg-[#35A186] font-extrabold text-[12px] leading-none text-white
                xl:size-6 xl:text-[18px]`}
            >
              {letter}
            </span>
            {index < CEAP_FACTORS.length - 1 && ','}
          </span>{' '}
        </span>
      ))}
      <br />네 가지 요소를 종합해 평가하며 미국·유럽 진료지침과 국내 학회
      권고안이 모두 이 분류를 기준으로 합니다.
    </p>
  );
}
