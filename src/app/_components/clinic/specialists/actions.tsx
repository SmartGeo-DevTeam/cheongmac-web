import type { ClinicSpecialistLink } from '@/app/_types/clinic/specialists';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type ClinicSpecialistActionsProps = {
  links: readonly ClinicSpecialistLink[];
};

/** 진료분야에 관계없이 동일한 의료진 관련 링크 UI입니다. */
export default function ClinicSpecialistActions({
  links,
}: ClinicSpecialistActionsProps) {
  return (
    <nav aria-label="의료진 관련 링크" className="mt-10">
      <ul
        className={`grid grid-cols-2 gap-2
          px-5 xl:grid-cols-1`}
      >
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`px-4 py-3.5 flex items-center justify-between rounded-lg overflow-clip border border-default
                xl:px-6 xl:py-5`}
            >
              <span
                className={`font-semibold text-[15px] text-tertiary
                  xl:text-[18px]`}
              >
                {link.title}
              </span>
              <ChevronRight
                aria-hidden="true"
                className={`size-5 text-accent
                  xl:size-6`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
