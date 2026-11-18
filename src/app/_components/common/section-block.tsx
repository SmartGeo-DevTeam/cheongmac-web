import type { ReactNode } from 'react';
import DotHeading from '@/app/_components/common/dot-heading';

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
      <DotHeading
        title={title}
        className={isSide ? 'xl:w-64 xl:shrink-0' : ''}
      />

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
