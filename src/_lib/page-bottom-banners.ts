import { prisma } from '@/_lib/prisma';

export type PageBottomBannerItem = {
  id: string;
  emoji: string;
  iconColor: string;
  title: string;
  linkTitle: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
  visiblePaths: string[];
};

export const DEFAULT_PAGE_BOTTOM_BANNERS: PageBottomBannerItem[] = [
  {
    id: 'common-bottom-banner-1',
    emoji: '📅',
    iconColor: '#2DB400',
    title: '네이버예약',
    linkTitle: '예약하기',
    href: '/',
    sortOrder: 0,
    isVisible: true,
    visiblePaths: ['/about/doctors'],
  },
  {
    id: 'common-bottom-banner-2',
    emoji: '💬',
    iconColor: '#FD7740',
    title: '빠른상담',
    linkTitle: '상담하기',
    href: '/',
    sortOrder: 1,
    isVisible: true,
    visiblePaths: ['/about/doctors'],
  },
  {
    id: 'common-bottom-banner-3',
    emoji: '📍',
    iconColor: '#006651',
    title: '병원 이용안내',
    linkTitle: '바로가기',
    href: '/',
    sortOrder: 2,
    isVisible: true,
    visiblePaths: ['/about/doctors'],
  },
];

export async function getPageBottomBanners(): Promise<PageBottomBannerItem[]> {
  try {
    const rows = await prisma.pageBottomBanner.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        emoji: true,
        iconColor: true,
        title: true,
        linkTitle: true,
        href: true,
        sortOrder: true,
        isVisible: true,
        visiblePaths: true,
      },
    });

    return rows.length ? rows : DEFAULT_PAGE_BOTTOM_BANNERS;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '공통 페이지 하단 배너 DB를 읽지 못해 기본값을 사용합니다.',
        error,
      );
    }

    return DEFAULT_PAGE_BOTTOM_BANNERS;
  }
}
