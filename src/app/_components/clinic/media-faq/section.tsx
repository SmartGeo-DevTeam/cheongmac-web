import SectionHeading from '@/app/_components/clinic/section-heading';
import Inner from '@/app/_components/common/inner';
import type { FaqItem } from '@/app/_types/common/faq';
import Image from 'next/image';
import type { ReactNode } from 'react';
import ClinicMediaFaqItem from './item';

type Props = {
  id: string;
  thumbnail?: string | null;
  avatar?: string | null;
  questions: readonly FaqItem[];
  headingLabel?: string;
  headingTitle?: ReactNode;
  thumbnailAlt?: string;
};

/** 이미지·Q&A 데이터를 페이지마다 교체할 수 있는 공통 섹션. */
export default function ClinicMediaFaq({
  id,
  thumbnail,
  avatar,
  questions,
  headingLabel,
  headingTitle,
  thumbnailAlt,
}: Props) {
  return (
    <section id={id}>
      <Inner>
        <SectionHeading
          label={headingLabel ?? 'FAQ · 자주 묻는 질문'}
          labelVariant="accent"
          title={
            headingTitle ?? (
              <>
                <b>
                  가장 많이 궁금해하시는 질문에
                  <br />
                  답변해 드립니다
                </b>
              </>
            )
          }
        />
        <div
          className="mt-5
              xl:mt-15 xl:px-50"
        >
          {thumbnail && (
            <div
              id={`${id}-thumbnail`}
              className={`relative aspect-video overflow-clip rounded-lg`}
            >
              <Image
                src={thumbnail}
                alt={thumbnailAlt ?? '진료 Q&A 소개용 이미지'}
                fill
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          {questions.length > 0 && (
            <ul
              id={`${id}-questions`}
              className="mt-3
                  xl:mt-10 xl:space-y-3"
            >
              {questions.map((item) => (
                <ClinicMediaFaqItem
                  key={item.id}
                  id={`${id}-${item.id}`}
                  item={item}
                  avatar={avatar}
                />
              ))}
            </ul>
          )}
        </div>
      </Inner>
    </section>
  );
}
