import type { ReactNode } from 'react';

type SectionBlockVariant = 'stacked' | 'side';

type SectionBlockProps = {
  title: string;
  children: ReactNode;
  variant?: SectionBlockVariant;
  className?: string;
  contentClassName?: string;
};

export default function SectionBlock({
  title,
  children,
  variant = 'stacked',
  className = '',
  contentClassName = '',
}: SectionBlockProps) {
  const isSide = variant === 'side';

  return (
    <div
      className={`
          mt-15
          xl:mt-30
          ${isSide ? 'xl:flex xl:justify-between xl:items-start xl:gap-30' : ''}
          ${className}
        `}
    >
      {/* 제목 */}
      <div
        className={`flex items-start gap-2
          xl:gap-3.5
          ${isSide ? 'xl:w-64 xl:shrink-0' : ''}
          `}
      >
        <span
          aria-hidden="true"
          className="relative top-2 inline-block size-3.5 shrink-0 rounded-full bg-accent-ai
            before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-1.5 before:rounded-full before:bg-base
            xl:top-3.5 xl:size-5
            xl:before:size-2.5"
        />

        <h2
          className="break-keep text-mo-title-2
            xl:text-pc-title-2"
        >
          {title}
        </h2>
      </div>

      {/* 콘텐츠 */}
      <div
        className={`
            ${isSide ? 'xl:mt-0 xl:flex-1' : 'xl:mt-8'}
            ${contentClassName}
          `}
      >
        {children}
      </div>
    </div>
  );
}
