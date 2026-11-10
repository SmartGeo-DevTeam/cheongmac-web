import Inner from '@/app/_components/common/inner';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { doctorSectionHeader } from '@/app/_data/about/doctors/[slug]/section-headings';

export default function DoctorDetailSectionHeading({
  type,
}: {
  type: keyof typeof doctorSectionHeader;
}) {
  const { title, buttonText, href } = doctorSectionHeader[type];

  return (
    <Inner>
      <div className="flex justify-between items-center">
        <h2
          className="text-mo-heading-1 text-[#767C88]
          xl:text-[28px]"
        >
          {title}
        </h2>

        <Link
          href={href}
          className="px-5 py-2 flex items-center gap-4 rounded-full border border-brand
          xl:hidden"
        >
          <span className="text-mo-label text-brand">{buttonText}</span>

          <ArrowRight className="text-brand size-4" />
        </Link>
      </div>
    </Inner>
  );
}
