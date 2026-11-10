import Breadcrumb from '@/app/_components/common/breadcrumb';
import type { ReactNode } from 'react';

// 진료예약/온라인 진료예약에서 공통으로 사용하는 브레드크럼입니다.
// 각 페이지의 제목은 페이지마다 별도로 출력합니다.
export default function GuideReservationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
}
