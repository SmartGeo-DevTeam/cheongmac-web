import PageContainer from '@/app/_components/ui/page-container';
import type { ReactElement } from 'react';

export default function Inner({
  usePaddingHorizontal = false,
  children,
}: {
  usePaddingHorizontal?: boolean;
  children: ReactElement;
}): ReactElement {
  return (
    <PageContainer gutter={usePaddingHorizontal ? 'always' : 'none'}>
      {children}
    </PageContainer>
  );
}
