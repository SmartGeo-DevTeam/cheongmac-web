import ClinicMethodCarousel from '@/app/_components/clinic/method-carousel/carousel';
import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import { venousTreatmentMethods } from '@/app/_data/vascular/venous/treatments/methods';
import VenousTreatmentItem from './item';

/** 정맥질환 맞춤 치료: 데이터와 페이지별 하단 콘텐츠는 분리하고, 캐러셀 UI만 공유합니다. */
export default function VenousTreatments() {
  return (
    <section id="vascular-venous-treatments">
      <Inner>
        <SectionHeading
          mtVariant="xl"
          label="같은 질환이라도 해답은 따로 있습니다"
          labelVariant="accent"
          title={<b>혈관 맞춤 치료</b>}
          description={
            <>
              정밀 진단으로 정확한 원인을 파악한 후 다양한 치료법을 시행해 온
              임상경험을 바탕으로 환자 개인의 혈관 상태에 가장 적합한 치료를
              선택합니다.
            </>
          }
        />
      </Inner>

      <ClinicMethodCarousel
        itemLabel="치료법"
        slides={venousTreatmentMethods.map((item) => ({
          id: item.id,
          title: item.title,
          content: <VenousTreatmentItem item={item} />,
        }))}
      />
    </section>
  );
}
