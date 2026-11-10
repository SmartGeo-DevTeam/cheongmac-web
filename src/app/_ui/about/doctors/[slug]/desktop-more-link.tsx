import Inner from '@/app/_components/common/inner';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { doctorSectionHeader } from '@/app/_data/about/doctors/[slug]/section-headings';

type DoctorSectionType = keyof typeof doctorSectionHeader;

export default function DoctorDetailDesktopMoreLink({
  type,
}: {
  type: DoctorSectionType;
}) {
  const { buttonText, href } = doctorSectionHeader[type];

  return (
    <Inner>
      <Link
        href={href}
        className="hidden
          xl:mt-6 xl:flex xl:justify-end xl:items-center xl:gap-2 xl:text-accent font-bold text-[20px]"
      >
        <span>{buttonText}</span>
        <ArrowRight className="size-6" />
      </Link>
    </Inner>
  );
}
