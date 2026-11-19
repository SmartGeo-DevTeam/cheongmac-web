import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import FaqList from '@/app/_components/common/faq-list';
import Inner from '@/app/_components/common/inner';
import type { FaqItem } from '@/app/_types/common/faq';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/** 라우트 제목·질문·선택적 썸네일만 전달받는 진료분야 공통 FAQ UI. */
export default function ClinicFaqSection({ id, category, items, moreHref, thumbnail }: {
  id: string; category: string; items: FaqItem[]; moreHref: string;
  thumbnail?: { src: string; alt: string };
}) {
  return <section id={id}>
    <div className="my-20 xl:my-30"><Inner>
      <ClinicSplitLayout className="xl:items-start" leading={<div className="text-center xl:text-left">
        <ClinicSplitHeading label="FAQ" title={<>{category}<br /><strong>자주 묻는 질문</strong></>} />
        {thumbnail && <div className="relative mt-7 hidden aspect-video overflow-hidden rounded-xl xl:block">
          <Image src={thumbnail.src} alt={thumbnail.alt} fill className="object-cover" />
        </div>}
      </div>}>
        <div className="min-w-0">
          <FaqList items={items} iconVariant="plus-minus" />
          <Link href={moreHref} className="mt-10 px-7 py-3 flex justify-center items-center gap-1 font-bold text-[14px] text-tertiary xl:px-10 xl:py-4 xl:justify-end xl:text-[16px]" aria-label="의학상담 더보기">
            <Plus aria-hidden="true" className="size-3 xl:hidden" />더보기
          </Link>
        </div>
      </ClinicSplitLayout>
    </Inner></div>
  </section>;
}
