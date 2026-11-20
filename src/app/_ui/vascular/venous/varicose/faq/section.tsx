import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import {
  varicoseFaqMedia,
  varicoseFaqQuestions,
} from '@/app/_data/vascular/venous/varicose/faq/questions';

export default function VaricoseFaq() {
  // TODO: 하지정맥류 썸네일·댓글이 준비되면 _data의 값을 교체합니다.
  return (
    <ClinicMediaFaq
      id="vascular-venous-varicose-faq"
      thumbnail={varicoseFaqMedia.thumbnail}
      avatar={varicoseFaqMedia.avatar}
      questions={varicoseFaqQuestions}
    />
  );
}
