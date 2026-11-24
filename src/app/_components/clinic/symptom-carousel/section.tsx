import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { SymptomCarouselItem } from '@/app/_types/vascular/symptom-carousel';
import ClinicSymptomCarousel from './carousel';

type ClinicSymptomsProps = {
  id: string;
  carouselId: string;
  items: readonly SymptomCarouselItem[];
  tabsAriaLabel: string;
};

export default function ClinicSymptoms({
  id,
  carouselId,
  items,
  tabsAriaLabel,
}: ClinicSymptomsProps) {
  return (
    <section id={id}>
      <div className="xl:bg-[#F9F9F9]">
        <Inner>
          <SectionHeading
            label="Symptoms · 증상"
            labelVariant="disabled"
            title={
              <>
                이런 증상이 있다면
                <br />
                <b>의심해보세요</b>
              </>
            }
          />
        </Inner>

        <ClinicSymptomCarousel
          id={carouselId}
          items={items}
          tabsAriaLabel={tabsAriaLabel}
        />
      </div>
    </section>
  );
}
