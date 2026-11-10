import type { ReactNode } from 'react';

export default function DoctorDetailReviewCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-2.5
      xl:gap-3"
    >
      <p
        className="shrink-0 px-3 py-1 rounded-full bg-[#DEDEE1] font-bold text-[12px]
        xl:px-3.5 xl:py-1.5 xl:text-[14px]"
      >
        {label}
      </p>

      <p
        className="min-w-0 flex flex-wrap items-center gap-1.5 font-medium text-[#767C88] text-[16px]
        xl:text-[18px]"
      >
        {children}
      </p>
    </div>
  );
}
