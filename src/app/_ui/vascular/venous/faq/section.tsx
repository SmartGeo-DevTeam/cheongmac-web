import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import {
  venousFaqMoreLink,
  venousFaqs,
} from '@/app/_data/vascular/venous/faq/questions';

export default function VenousFaq() {
  return (
    <ClinicSplitFaq
      id="vascular-venous-faq"
      title={
        <>
          정맥질환
          <br />
          <strong>자주 묻는 질문</strong>
        </>
      }
      questions={venousFaqs}
      moreLink={venousFaqMoreLink}
    />
  );
}
