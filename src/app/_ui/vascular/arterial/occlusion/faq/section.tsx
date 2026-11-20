import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import {
  occlusionFaqMedia,
  occlusionFaqQuestions,
} from '@/app/_data/vascular/arterial/occlusion/faq/questions';

export default function OcclusionFaq() {
  return (
    <ClinicMediaFaq
      id="vascular-arterial-occlusion-faq"
      thumbnail={occlusionFaqMedia.thumbnail}
      avatar={occlusionFaqMedia.avatar}
      questions={occlusionFaqQuestions}
    />
  );
}
