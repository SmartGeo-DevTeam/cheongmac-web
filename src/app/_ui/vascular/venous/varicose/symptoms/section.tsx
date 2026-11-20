import SectionHeading from '@/app/_components/clinic/section-heading';
import SymptomCarousel from '@/app/_components/clinic/symptom-carousel/carousel';
import Inner from '@/app/_components/common/inner';
import { varicoseSymptoms } from '@/app/_data/vascular/venous/varicose/symptoms/items';

/** 하지정맥류 증상 섹션: 동맥질환 증상 캐러셀과 레이아웃을 공유합니다. */
export default function VaricoseSymptoms() {
  return (
    <section id="vascular-venous-varicose-symptoms">
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

        <SymptomCarousel
          id="vascular-venous-varicose-symptoms-carousel"
          items={varicoseSymptoms}
          tabsAriaLabel="하지정맥류 증상 선택"
        />
      </div>
    </section>
  );
}
