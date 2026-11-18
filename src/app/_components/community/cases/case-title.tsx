import type { ReactNode } from 'react';

type CaseTitleProps = {
  children: ReactNode;
  className?: string;
};

export default function CaseTitle({ children, className = '' }: CaseTitleProps) {
  return (
    <h3 className={`mt-3 text-mo-heading-2 xl:text-pc-heading-2 ${className}`}>
      {children}
    </h3>
  );
}
