import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import type { ReactNode } from 'react';

function MainSectionHeader({
  usePaddingHorizontal = false,
  eyebrow,
  title,
  description,
  className = '',
}: {
  usePaddingHorizontal?: boolean;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-7xl w-full ${usePaddingHorizontal ? 'px-5' : ''} ${className}`}
    >
      <TypographyP
        className="font-semibold text-lg
        xl:text-2xl"
      >
        {eyebrow}
      </TypographyP>

      <TypographyH2
        className="mt-2 break-keep font-extrabold text-3xl
        xl:leading-[120%] xl:text-5xl"
      >
        {title}
      </TypographyH2>

      {description && (
        <div
          className="mt-6 break-keep
          xl:mt-10 xl:text-xl"
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default MainSectionHeader;
