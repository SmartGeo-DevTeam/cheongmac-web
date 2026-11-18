import type { ReactNode } from 'react';

type CaseDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export default function CaseDescription({
  children,
  className = '',
}: CaseDescriptionProps) {
  return (
    <p className={`mt-2 text-secondary text-mo-body-2 xl:mt-3 xl:text-pc-body-1 ${className}`}>
      {children}
    </p>
  );
}
