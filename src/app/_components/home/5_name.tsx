'use client';

import EditablePageCopyRegion from '@/app/_components/inline-editor/editable-page-copy-region';
import {
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { HOME_COPY_FIELD_KEYS } from '@/_lib/home-page-copy';
import Marquee from 'react-fast-marquee';

const marqueeTexts = Array.from({ length: 6 }, (_, index) => index);

export default function HomeName({
  copy,
  persisted,
}: {
  copy: InlineContentData;
  persisted: boolean;
}) {
  return (
    <EditablePageCopyRegion
      path="/"
      copy={copy}
      persisted={persisted}
      label="메인 영문 롤링 문구"
      fieldKeys={HOME_COPY_FIELD_KEYS.marquee}
    >
      <FadeInUp>
        <section
          className="mt-15 overflow-hidden
        xl:mt-20"
        >
          <Marquee
            autoFill
            speed={40}
            gradient={false}
            pauseOnHover={false}
            className="overflow-hidden"
          >
            {marqueeTexts.map((item) => (
              <TypographyP
                managed={false}
                key={item}
                className="shrink-0 mr-5 whitespace-nowrap font-extrabold text-5xl text-[#F7F7F7]/50
              xl:mr-15 xl:text-8xl"
              >
                {copy.marqueeText}
              </TypographyP>
            ))}
          </Marquee>
        </section>
      </FadeInUp>
    </EditablePageCopyRegion>
  );
}
