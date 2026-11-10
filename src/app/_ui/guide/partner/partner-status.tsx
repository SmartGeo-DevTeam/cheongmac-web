import Inner from '@/app/_components/common/inner';
import SectionTitle from '@/app/_components/common/section-title';
import Image from 'next/image';
import { partnerLogos, partnerStatus } from '@/app/_data/guide/partner/partner-status';

export default function PartnerStatus() {
  return (
    <section id="guide-partner-status">
      <Inner>
        <div className="mt-10">
          <SectionTitle
            text={partnerStatus.title}
            description={partnerStatus.description}
          />

          <div
            className="relative mt-5 aspect-336/112 rounded-xl overflow-clip
          xl:hidden"
          >
            <Image src={`/partner/handshake.png`} alt="" fill />
          </div>

          <ul
            className="mt-5 grid grid-cols-2 gap-2
            xl:mt-15 xl:grid-cols-4 xl:gap-3"
          >
            {partnerLogos.map((partner) => (
              <li
                key={partner.id}
                className="relative aspect-311/120 rounded-lg border border-default overflow-clip"
              >
                <Image
                  src={partner.imageSrc}
                  alt={`${partner.name} 로고`}
                  fill
                />
              </li>
            ))}
          </ul>
        </div>
      </Inner>
    </section>
  );
}
