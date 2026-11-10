import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { notices } from '@/app/_data/guide/reservation/notices';

export default function ReservationNotices(): ReactNode {
  return (
    <section id="guide-reservation-notice">
      <div
        className="mb-28
        xl:mb-36"
      >
        <Inner>
          <SectionBlock title="예약 시 유의사항" variant="side">
            <ul
              className="pl-3 space-y-1 break-keep
            xl:px-6 xl:border-t xl:border-t-strong"
            >
              {notices.map((notice) => (
                <li
                  key={notice.id}
                  className="relative pl-3
                before:absolute before:left-0 before:top-3 before:size-1 before:rounded-full before:bg-primary
                xl:pl-0 xl:py-6 xl:flex xl:items-start xl:gap-6 xl:text-pc-body-1 xl:border-b xl:border-b-strong
                xl:before:hidden"
                >
                  <Image
                    src="/guide/check.png"
                    alt=""
                    width={28}
                    height={28}
                    className="hidden
                  xl:block xl:size-7 xl:shrink-0"
                  />

                  <div>
                    {notice.text}

                    {notice.subText && (
                      <>
                        <br />
                        {notice.subText}
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </SectionBlock>
        </Inner>
      </div>
    </section>
  );
}
