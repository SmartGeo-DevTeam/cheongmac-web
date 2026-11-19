import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type SpecialistLink = { id: string; title: string; href: string };

export default function ClinicSpecialistActions({
  links,
}: {
  links: readonly SpecialistLink[];
}) {
  return (
    <nav aria-label="의료진 관련 링크" className="mt-10">
      <ul
        className="grid grid-cols-2 gap-2
        xl:grid-cols-1"
      >
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="px-4 py-3.5 flex items-center justify-between rounded-lg border border-default overflow-clip
              xl:px-6 xl:py-5"
            >
              <span
                className="font-semibold text-[15px] text-tertiary
                xl:text-[18px]"
              >
                {link.title}
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-5 text-accent
                xl:size-6"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
