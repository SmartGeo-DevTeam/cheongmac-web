import ClinicLinkButton from '@/app/_components/clinic/link-button';
import Inner from '@/app/_components/common/inner';
import SectionHeading from '@/app/_components/clinic/section-heading';
import ClinicBestCasesCarousel from '@/app/_components/clinic/best-cases/carousel';
import { venousBestCases } from '@/app/_data/vascular/venous/best-cases/cases';
export default function VenousBestCases() {
  return <section id="vascular-venous-best-cases">
    <Inner><SectionHeading mtVariant="xl" label="다양한 혈관 치료 사례" labelVariant="accent" title={<b>BEST 치료사례</b>} description={<>※ 현재 사례는 화면 구성 확인을 위한 가상 예시입니다.</>} /></Inner>
    <ClinicBestCasesCarousel items={venousBestCases} />
    <Inner><div className="mt-10 flex items-center justify-center xl:mt-20"><ClinicLinkButton href="/community/cases?tab=before-after&category=varicose" title="치료사례 바로가기" backgroundColor="green-900" /></div></Inner>
  </section>;
}
