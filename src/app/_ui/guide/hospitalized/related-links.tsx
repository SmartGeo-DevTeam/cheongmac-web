import Inner from '@/app/_components/common/inner';
import ContentDetailShareButton from '@/app/_components/content-detail/share-button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { relatedLinks } from '@/app/_data/guide/hospitalized/related-links';

export default function HospitalizedRelatedLinks() {
  return (
    <section id="guide-hospitalized-related">
      <Inner>
        <div
          className="mt-15 mb-24
          xl:mt-40 xl:mb-36 xl:pl-21 xl:pr-5 xl:py-11 xl:flex xl:justify-between xl:items-center xl:rounded-[20px] xl:bg-subtle"
        >
          <div
            className="p-6 rounded-xl bg-subtle
            xl:py-0 xl:bg-transparent"
          >
            <p
              className="leading-[140%] text-center font-semibold text-[18px]
              xl:text-left xl:font-bold xl:text-[24px]"
            >
              이 안내가 도움이 되셨다면 <br />
              링크를 공유하세요.
            </p>
            <ContentDetailShareButton
              title="입·퇴원안내"
              ariaLabel="입·퇴원안내 공유하기"
            />
          </div>

          <nav
            aria-label="관련 페이지"
            className="mt-15 grid grid-cols-2 gap-3
            xl:mt-0"
          >
            {relatedLinks.map((item) => (
              <Link
                href={item.href! || '/'}
                key={item.label}
                className="p-3 flex justify-between items-center rounded-lg border border-default
                xl:px-5 xl:py-6 xl:gap-25 xl:bg-white"
              >
                <span
                  className="font-semibold text-[15px]
                  xl:text-[18px]"
                >
                  {item.label}
                </span>
                <ChevronRight
                  className="size-4
                  xl:size-5"
                />
              </Link>
            ))}
          </nav>
        </div>
      </Inner>
    </section>
  );
}
