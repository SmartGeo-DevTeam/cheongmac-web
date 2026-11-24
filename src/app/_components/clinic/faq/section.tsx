import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import FaqList from '@/app/_components/common/faq-list';
import type { FaqItem } from '@/app/_types/common/faq';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: ReactNode;
  questions: readonly FaqItem[];
  moreLink: { readonly href: string; readonly title: string };
};

/** 동맥·정맥질환의 동일한 2열 FAQ UI. 문구와 질문은 호출 페이지에서 주입합니다. */
export default function ClinicSplitFaq({ id, title, questions, moreLink }: Props) {
  return (
    <section id={id}>
      <div
        className="my-20
        xl:my-30"
      >
        <ClinicSplitLayout
          className="xl:items-start"
          leading={
            <div className="text-center xl:text-left">
              <ClinicSplitHeading label="FAQ" title={title} />
            </div>
          }
        >
          <div className="px-5">
            <FaqList
              items={questions}
              iconVariant="plus-minus"
              idPrefix={`${id}-question`}
            />
            <Link
              href={moreLink.href}
              className="mt-10 px-7 py-3 flex justify-center items-center gap-1 font-bold text-[14px] text-tertiary
                xl:px-10 xl:py-4 xl:justify-end xl:text-[16px]"
              aria-label="의학상담 더보기"
            >
              <Plus
                aria-hidden="true"
                className="size-3
                  xl:hidden"
              />
              {moreLink.title}
            </Link>
          </div>
        </ClinicSplitLayout>
      </div>
    </section>
  );
}
