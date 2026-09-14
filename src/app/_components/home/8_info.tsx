import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import {
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import MainSectionHeader from '@/app/_components/main-section-header';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const noticeHrefs = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  href: '/',
}));

export default function HomeInfo({
  copy,
  persisted,
}: {
  copy: InlineContentData;
  persisted: boolean;
}) {
  const notices = noticeHrefs.map((notice) => {
    const n = notice.id;

    return {
      ...notice,
      category: copy[`info${n}Category`],
      date: copy[`info${n}Date`],
      title: copy[`info${n}Title`],
      description: copy[`info${n}Description`],
    };
  });

  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 병원소식 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.info}
    >
      <FadeInUp>
        <section className="mt-25 xl:mt-40">
          <MainSectionHeader
            usePaddingHorizontal
            eyebrow={copy.infoEyebrow}
            title={<span>{copy.infoTitle}</span>}
          />

          <div
            className="mt-5 overflow-x-auto overflow-y-hidden
          xl:mt-6"
          >
            <ul
              className="px-5 flex w-max items-stretch gap-3 text-[#262C35]
            xl:gap-6 xl:pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] xl:pr-5"
            >
              {notices.map((notice) => (
                <li key={notice.id} className="flex shrink-0">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={notice.href}
                    className="px-5 pt-7 pb-10 w-[60vw] flex flex-col rounded-2xl bg-[#F3F3F3]
                  xl:px-10 xl:pt-10 xl:pb-15 xl:w-[16vw]"
                  >
                    <div
                      className="flex items-center gap-1.75 font-medium text-xs
                    xl:gap-3 xl:text-sm"
                    >
                      <span
                        className="px-3 py-0.75 rounded-sm bg-white
                      xl:px-5 xl:py-1.5"
                      >
                        {notice.category}
                      </span>
                      <span>{notice.date}</span>
                    </div>

                    <TypographyH3
                      managed={false}
                      className="mt-3 font-extrabold text-lg
                    xl:mt-6.5 xl:text-2xl"
                    >
                      {notice.title}
                    </TypographyH3>
                    <TypographyP
                      managed={false}
                      className="mt-3 break-keep text-sm
                    xl:mt-5 xl:text-xl"
                    >
                      {notice.description}
                    </TypographyP>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mt-5 flex justify-center
          xl:mx-auto xl:mt-10 xl:max-w-7xl xl:w-full"
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="/"
              className="px-10 py-2.5 flex items-center gap-2 rounded-full bg-[#333333] text-white
            xl:text-xl"
            >
              <span>{copy.infoMoreLabel}</span>
              <ArrowRight size={18} color="#FFFFFF" />
            </Link>
          </div>
        </section>
      </FadeInUp>
    </EditablePageCopyRegion>
  );
}
