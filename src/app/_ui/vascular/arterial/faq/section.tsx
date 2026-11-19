import ClinicFaqSection from '@/app/_components/clinic/faq/section';
import { arterialFaqMoreLink, arterialFaqs } from '@/app/_data/vascular/arterial/faq/questions';
export default function ArterialFaq() {
  return <ClinicFaqSection id="vascular-arterial-faq" category="동맥질환" items={arterialFaqs} moreHref={arterialFaqMoreLink.href} />;
}
