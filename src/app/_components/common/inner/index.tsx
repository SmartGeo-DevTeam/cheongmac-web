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
        ${usePaddingHorizontalInMobile ? `px-5` : ``}
        ${className}
        xl:mx-auto xl:max-w-7xl
        `}
    >
      {children}
    </div>
  );
}
