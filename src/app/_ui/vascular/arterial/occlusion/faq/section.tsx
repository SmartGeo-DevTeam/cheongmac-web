import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import {
  occlusionFaqMedia,
  occlusionFaqQuestions,
} from '@/app/_data/vascular/arterial/occlusion/faq/questions';
import Image from 'next/image';
import FaqQuestionItem from './item';

export default function OcclusionFaq() {
  return (
    <section id="vascular-arterial-occlusion-faq">
      <div className="mb-28">
        <Inner>
          <SectionHeading
            label="FAQ · 자주 묻는 질문"
            labelVariant="accent"
            title={
              <>
                <b>
                  가장 많이 궁금해하시는 질문에
                  <br />
                  답변해 드립니다
                </b>
              </>
            }
          />
          <div
            className="mt-5
            xl:mt-15 xl:px-50"
          >
            <div className="relative aspect-video rounded-lg overflow-clip">
              <Image
                src={occlusionFaqMedia.thumbnail}
                alt="진료 Q&A 소개용 이미지"
                fill
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
            <ul
              className="mt-3
              xl:mt-10 xl:space-y-3"
            >
              {occlusionFaqQuestions.map((item) => (
                <FaqQuestionItem
                  key={item.id}
                  item={item}
                  avatar={occlusionFaqMedia.avatar}
                />
              ))}
            </ul>
          </div>
        </Inner>
      </div>
    </section>
  );
}
