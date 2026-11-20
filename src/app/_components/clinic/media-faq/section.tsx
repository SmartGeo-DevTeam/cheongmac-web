import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { FaqItem } from '@/app/_types/common/faq';
import Image from 'next/image';
import ClinicMediaFaqItem from './item';

type Props = {
  id: string;
  thumbnail?: string | null;
  avatar?: string | null;
  questions: readonly FaqItem[];
};

/** 이미지·Q&A 데이터를 페이지마다 교체할 수 있는 공통 섹션. */
export default function ClinicMediaFaq({
  id,
  thumbnail,
  avatar,
  questions,
}: Props) {
  return (
    <section id={id}>
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
            {thumbnail && (
              <div className="relative aspect-video rounded-lg overflow-clip">
                <Image
                  src={thumbnail}
                  alt="진료 Q&A 소개용 이미지"
                  fill
                  sizes="(min-width: 1280px) 1100px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {questions.length > 0 && (
              <ul
                className="mt-3
                  xl:mt-10 xl:space-y-3"
              >
                {questions.map((item) => (
                  <ClinicMediaFaqItem
                    key={item.id}
                    item={item}
                    avatar={avatar}
                  />
                ))}
              </ul>
            )}
          </div>
        </Inner>
      </div>
    </section>
  );
}
