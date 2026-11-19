import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import MethodSelector from '@/app/_components/clinic/diagnostics/method-selector';
import { venousTreatments } from '@/app/_data/vascular/venous/treatments/methods';
import VenousTreatmentDetail from './item';
export default function VenousTreatments() {
  return <section id="vascular-venous-treatments">
    <Inner>
      <SectionHeading mtVariant="xl" label="개인별 혈관 상태에 맞는 치료" labelVariant="accent" title={<>혈관 맞춤 <b>치료</b></>} description={<>검사와 상담을 바탕으로 환자별로 필요한 치료를 함께 검토합니다.</>} />
      <MethodSelector ariaLabel="정맥질환 치료 방법 선택"
        tabs={venousTreatments.map((method) => ({ id: `vascular-venous-treatments-${method.id}`, label: method.label }))}
        panels={venousTreatments.map((method) => <VenousTreatmentDetail key={method.id} item={method} />)}
      />
      <p className="mt-7 text-center text-sm text-tertiary">※ 이미지·설명은 화면 구성용 예시입니다. 실제 치료 안내는 의료진 검수 후 교체됩니다.</p>
    </Inner>
  </section>;
}
