import ClinicFaqSection from '@/app/_components/clinic/faq/section';
import { venousFaqs } from '@/app/_data/vascular/venous/faq/questions';
export default function VenousFaq() {
  return <ClinicFaqSection id="vascular-venous-faq" category="정맥질환" items={venousFaqs} moreHref="/community/consultation" thumbnail={{ src: '/vascular/venous/faq/consultation-thumbnail.png', alt: '청맥병원 진료 상담 장면' }} />;
}
