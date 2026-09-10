'use client';

import {
  P as TypographyP,
} from '@/app/_components/ui/typography';
import FadeInUp from '@/app/_components/fade-in-up';
import Marquee from 'react-fast-marquee';

const marqueeTexts = Array.from({ length: 6 }, (_, index) => index);

export default function HomeName() {
  return (
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
              key={item}
              className="shrink-0 mr-5 whitespace-nowrap font-extrabold text-5xl text-[#F7F7F7]/50
            xl:mr-15 xl:text-8xl"
            >
              CHEONGMAC VASCULAR HOSPITAL
            </TypographyP>
          ))}
        </Marquee>
      </section>
    </FadeInUp>
  );
}
