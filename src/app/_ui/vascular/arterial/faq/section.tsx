import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import {
  arterialFaqMoreLink,
  arterialFaqs,
} from '@/app/_data/vascular/arterial/faq/questions';

export default function ArterialFaq() {
  return (
    <ClinicSplitFaq
      id="vascular-arterial-faq"
      title={
        <>
          동맥질환
          <br />
          <strong>자주 묻는 질문</strong>
        </>
      }
      questions={arterialFaqs}
      moreLink={arterialFaqMoreLink}
    />
  );
}
