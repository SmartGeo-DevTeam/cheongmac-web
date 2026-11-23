import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import {
  varicoseFaqHeading,
  varicoseFaqMedia,
  varicoseFaqQuestions,
} from '@/app/_data/vascular/venous/varicose/faq/questions';

export default function VaricoseFaq() {
  return (
    <ClinicMediaFaq
      id="vascular-venous-varicose-faq"
      headingLabel={varicoseFaqHeading.label}
      headingTitle={
        <>
          <span className={`font-normal`}>{varicoseFaqHeading.firstLine}</span>
          <br />
          <b className={`font-bold`}>{varicoseFaqHeading.secondLine}</b>
        </>
      }
      thumbnail={varicoseFaqMedia.thumbnail}
      thumbnailAlt="다리 가려움과 하지정맥류 증상을 소개하는 영상 썸네일"
      avatar={varicoseFaqMedia.avatar}
      questions={varicoseFaqQuestions}
    />
  );
}
