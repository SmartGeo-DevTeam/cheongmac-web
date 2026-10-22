'use client';

import FadeInUp from '@/app/_components/fade-in-up';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const partners = [
  {
    id: 1,
    name: '국가보훈부',
    imageSrc: '/assets/images/home-partner-1.png',
  },
  {
    id: 2,
    name: '울산청맥외과의원',
    imageSrc: '/assets/images/home-partner-2.png',
  },
  {
    id: 3,
    name: '대구청맥의원',
    imageSrc: '/assets/images/home-partner-3.png',
  },
  {
    id: 4,
    name: '남북하나개발원',
    imageSrc: '/assets/images/home-partner-4.png',
  },
  {
    id: 5,
    name: '경남정보대학교',
    imageSrc: '/assets/images/home-partner-5.png',
  },
  {
    id: 6,
    name: '부산대학교병원',
    imageSrc: '/assets/images/home-partner-6.png',
  },
  {
    id: 7,
    name: '사랑의열매',
    imageSrc: '/assets/images/home-partner-7.png',
  },
] as const;

export default function HomePartners() {
  return (
    <FadeInUp>
      <section
        className="my-20 overflow-hidden opacity-50
      xl:my-28"
      >
        <div>
          <Marquee autoFill gradient={false} speed={35} pauseOnHover={false}>
            {partners.map((partner) => (
              <PartnerLogo key={`top-${partner.id}`} partner={partner} />
            ))}
          </Marquee>

          <div className="mt-6 xl:mt-10">
            <Marquee
              autoFill
              gradient={false}
              speed={35}
              direction="right"
              pauseOnHover={false}
            >
              {[...partners].reverse().map((partner) => (
                <PartnerLogo key={`bottom-${partner.id}`} partner={partner} />
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </FadeInUp>
  );
}

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div
      className="mx-5 relative w-[82px] aspect-[82/24] shrink-0
      xl:mx-10 xl:w-[164px]"
    >
      <Image
        src={partner.imageSrc}
        alt={partner.name}
        fill
        className="object-contain"
      />
    </div>
  );
}
