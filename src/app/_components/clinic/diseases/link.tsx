import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type DiseaseLinkProps = {
  id?: string;
  href?: string;
  ariaLabel: string;
  title?: string;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** 공개된 질환만 링크로 표시하고 나머지는 동일한 위치의 정적 정보로 표시합니다. */
export default function DiseaseLink({
  href,
  ariaLabel,
  children,
  ...props
}: DiseaseLinkProps) {
  if (!href) {
    return (
      <div {...props} title="상세 페이지 준비 중">
        {children}
      </div>
    );
  }

  return (
    <Link {...props} href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
