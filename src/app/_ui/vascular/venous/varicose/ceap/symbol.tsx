import { CEAP_FACTORS } from '@/app/_data/vascular/venous/varicose/ceap/factors';

/** CEAP 약자를 겹치는 원형 그래픽으로 표시합니다. */
export default function CeapSymbol() {
  return (
    <div
      id="vascular-venous-varicose-ceap-symbol"
      className={`flex justify-center items-center -space-x-3`}
    >
      {CEAP_FACTORS.map(({ letter, label }) => (
        <div
          key={letter}
          className={`relative size-19 shrink-0 flex flex-col justify-center items-center rounded-full bg-[#93E0CC]/80 text-white
            xl:size-32 xl:bg-[#35A186]/80`}
        >
          <span
            className={`leading-[100%] font-extrabold text-[34px]
              xl:text-[64px]`}
          >
            {letter}
          </span>
          <span
            className={`leading-[100%] text-[8px]
              xl:text-[12px]`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
