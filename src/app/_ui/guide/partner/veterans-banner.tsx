import Inner from '@/app/_components/common/inner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { veteransBanner } from '@/app/_data/guide/partner/veterans-banner';

export default function PartnerVeteransBanner() {
  return (
    <section id="guide-partner-veterans">
      <Inner>
        <Link
          href={veteransBanner.href}
          className="relative mt-5 px-6 py-7 block rounded-xl overflow-clip bg-[url('/partner/flag-m.png')] bg-cover bg-center bg-no-repeat break-keep
          xl:mt-15 xl:px-20 xl:py-15"
        >
          <span
            className="px-3 py-1 rounded-full bg-base font-bold text-mo-body-1
            xl:px-5 xl:py-1.5 xl:text-pc-heading-1"
          >
            {veteransBanner.title}
          </span>
          <p
            className="mt-3 text-mo-body-2 text-inverse
            xl:mt-5 xl:w-1/2 xl:text-pc-body-1"
          >
            {veteransBanner.description}
          </p>
          <div className="mt-5 flex items-center gap-1 text-inverse">
            <span
              className="font-bold text-[16px]
              xl:xl:text-pc-body-1"
            >
              자세히보기
            </span>
            <ChevronRight
              className="size-4
              xl:size-6"
            />
          </div>
        </Link>
      </Inner>
    </section>
  );
}
