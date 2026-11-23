import type { CeapStageCode } from '@/app/_data/vascular/venous/varicose/ceap/stages';

const stageColors: Record<
  CeapStageCode,
  {
    circle: string;
    halo: string;
  }
> = {
  C1: {
    circle: 'bg-[#F5CD76]',
    halo: 'bg-[#F5CD76]/20',
  },
  C2: {
    circle: 'bg-[#F5CD76]',
    halo: 'bg-[#F5CD76]/20',
  },
  C3: {
    circle: 'bg-[#F3A54B]',
    halo: 'bg-[#F3A54B]/20',
  },
  C4: {
    circle: 'bg-[#E04C36]',
    halo: 'bg-[#E04C36]/20',
  },
  C5: {
    circle: 'bg-[#C52E2B]',
    halo: 'bg-[#C52E2B]/20',
  },
  C6: {
    circle: 'bg-[#A81321]',
    halo: 'bg-[#A81321]/20',
  },
};

type CeapStageItemProps = {
  code: CeapStageCode;
  description: string;
};

/** CEAP 단계 배지와 단계별 설명을 표시합니다. */
export default function CeapStageItem({
  code,
  description,
}: CeapStageItemProps) {
  const colors = stageColors[code];

  return (
    <li className={`relative flex items-center gap-3`}>
      {/* 단계별 원형 배지 */}
      <span
        className={`relative z-10 size-9 shrink-0 flex justify-center items-center
          xl:size-12`}
      >
        {/* 배경 원 */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full blur-[2px] ${colors.halo}`}
        />

        {/* C1~C6 원 */}
        <span
          className={`relative z-10 size-6 flex justify-center items-center rounded-full font-extrabold text-[12px] leading-none text-white ${colors.circle}
            xl:size-9 xl:text-[16px]`}
        >
          {code}
        </span>
      </span>

      {/* 단계 설명 */}
      <p
        className={`text-[15px] text-gray-900
          xl:text-pc-body-2`}
      >
        {description}
      </p>
    </li>
  );
}
