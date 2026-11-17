import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import OcclusionIntroductionCarousel from './carousel';

export default function OcclusionIntroduction() {
  return (
    <section id="vascular-arterial-occlusion-about">
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

        <OcclusionIntroductionCarousel />
      </div>
    </section>
  );
}
