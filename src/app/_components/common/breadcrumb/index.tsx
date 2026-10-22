import { Home } from 'lucide-react';
import Link from 'next/link';
import { BreadcrumbDivider } from './_components/divider';
import { BreadcrumbDropdown } from './_components/dropdown';

export default function Breadcrumb() {
  return (
    <section
      id="body-top-breadcrumb"
      className="flex items-center gap-2 text-[11px] text-primary
      xl:h-15.5 xl:gap-3 xl:text-[16px]"
    >
      <Link href="/" aria-label="홈으로 이동">
        <Home className="size-3 xl:size-4" />
      </Link>

      {/* 구분선 */}
      <BreadcrumbDivider />

      {/* 1차 메뉴 */}
      <BreadcrumbDropdown
        label="병원소개"
        items={[
          {
            label: '병원소개',
            href: '/about/introduction',
          },
          {
            label: '교육·연구',
            href: '/education-research/society',
          },
          {
            label: '소통공간',
            href: '/community/consultation',
          },
          {
            label: '병원소식',
            href: '/community/news',
          },
          {
            label: '이용안내',
            href: '/guide/partner-hospital',
          },
        ]}
      />

      {/* 구분선 */}
      <BreadcrumbDivider />

      {/* 2차 메뉴 */}
      <BreadcrumbDropdown
        label="청맥병원 소개"
        items={[
          {
            label: '청맥병원 소개',
            href: '/about/introduction',
          },
          {
            label: '의료진 소개',
            href: '/about/doctors',
          },
          {
            label: '병원 둘러보기',
            href: '/about/tour',
          },
          {
            label: '첨단의료장비',
            href: '/about/equipment',
          },
        ]}
      />
    </section>
  );
}
