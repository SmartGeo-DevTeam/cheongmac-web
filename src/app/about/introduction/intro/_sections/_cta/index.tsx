import Inner from '@/app/_components/common/inner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ctas } from './data';

export default function CTA() {
  return (
    <section id="introduction-intro-cta" className="mt-30">
      <Inner>
        <div
          className="flex justify-between items-center
          xl:px-21 xl:py-5 xl:rounded-[20px] xl:bg-subtle"
        >
          <div
            className="hidden
            xl:flex"
          >
            <h3 className="font-bold text-[24px]">바로가기 링크</h3>
          </div>
          <div
            className="w-full grid grid-cols-2 gap-3
            xl:w-auto"
          >
            {ctas.map((cta) => (
              <Link
                key={cta.id}
                href={cta.href}
                className="p-3 flex justify-between items-center rounded-lg border border-default
                xl:px-5 xl:py-6 xl:gap-28 xl:border-0 xl:bg-base"
              >
                <span
                  className="font-bold text-[15px]
                  xl:font-semibold xl:text-[18px]"
                >
                  {cta.title}
                </span>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </Inner>
    </section>
  );
}
