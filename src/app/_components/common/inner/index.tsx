import type { ReactNode } from 'react';

export default function Inner({
  children,
  className = '',
  usePaddingHorizontalInMobile = true,
  usePaddingHorizontalInDesktop = true,
}: {
  children: ReactNode;
  className?: string;
  usePaddingHorizontalInMobile?: boolean;
  usePaddingHorizontalInDesktop?: boolean;
}) {
  return (
    <div
      className={`
        ${usePaddingHorizontalInMobile ? 'px-5' : ''}
        ${usePaddingHorizontalInDesktop ? 'xl:px-5' : 'xl:px-0'}
        ${className}
        xl:mx-auto xl:max-w-7xl xl:w-full
      `}
    >
      {children}
    </div>
  );
}
