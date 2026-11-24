import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { ClinicMethodSlide } from '@/app/_types/clinic/method-carousel';
import type { ComponentProps } from 'react';
import ClinicMethodCarousel from './carousel';

type ClinicMethodSectionProps = {
  id: string;
  heading: ComponentProps<typeof SectionHeading>;
  itemLabel: string;
  slides: readonly ClinicMethodSlide[];
};

/** 공통 섹션 배치와 캐러셀만 담당하며 개별 슬라이드 UI는 호출자가 전달합니다. */
export default function ClinicMethodSection({
  id,
  heading,
  itemLabel,
  slides,
}: ClinicMethodSectionProps) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading {...heading} />
      </Inner>
      <ClinicMethodCarousel
        id={`${id}-carousel`}
        itemLabel={itemLabel}
        slides={slides}
      />
    </section>
  );
}
