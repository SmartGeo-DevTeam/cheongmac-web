import type { ManagedItemTypeConfig } from '@/_lib/page-management-config';

export const HOME_ADMIN_SECTION_KEYS = [
  'cover-slides',
  'popups',
  'specialties',
  'middle-banner',
] as const;

export type HomeAdminSectionKey =
  (typeof HOME_ADMIN_SECTION_KEYS)[number];

export type HomeAdminSection = {
  key: HomeAdminSectionKey;
  itemType: 'slide' | 'popup' | 'specialty' | 'middle-banner';
  label: string;
  description: string;
  href: string;
  singularLabel: string;
};

export const HOME_ADMIN_SECTIONS: Record<
  HomeAdminSectionKey,
  HomeAdminSection
> = {
  'cover-slides': {
    key: 'cover-slides',
    itemType: 'slide',
    label: '커버 슬라이드',
    singularLabel: '커버 슬라이드',
    href: '/admin/home/cover-slides',
    description:
      '메인 상단 커버 슬라이드의 문구, 링크, 모바일/PC 이미지를 각각 관리합니다.',
  },
  popups: {
    key: 'popups',
    itemType: 'popup',
    label: '메인 팝업',
    singularLabel: '메인 팝업',
    href: '/admin/home/popups',
    description:
      '메인 팝업의 문구, 링크, 배경색과 PC/모바일 노출 순서를 관리합니다. 활성 팝업은 최대 3개입니다.',
  },
  specialties: {
    key: 'specialties',
    itemType: 'specialty',
    label: '진료분야 카드',
    singularLabel: '진료분야 카드',
    href: '/admin/home/specialties',
    description:
      '메인 진료분야 카드의 표시명, 이미지와 연결 경로를 관리합니다.',
  },
  'middle-banner': {
    key: 'middle-banner',
    itemType: 'middle-banner',
    label: '중간 배너',
    singularLabel: '중간 배너',
    href: '/admin/home/middle-banner',
    description:
      '메인 중간 배너의 모바일/PC 이미지와 연결 경로를 관리합니다. 활성 배너는 1개만 사용할 수 있습니다.',
  },
};

export function getHomeAdminSection(
  value: string,
): HomeAdminSection | null {
  return HOME_ADMIN_SECTION_KEYS.includes(
    value as HomeAdminSectionKey,
  )
    ? HOME_ADMIN_SECTIONS[value as HomeAdminSectionKey]
    : null;
}

export function getHomeAdminSectionByItemType(
  itemType: string,
): HomeAdminSection | null {
  return (
    Object.values(HOME_ADMIN_SECTIONS).find(
      (section) => section.itemType === itemType,
    ) ?? null
  );
}

export function homeAdminItemHref(itemType: string, id: string) {
  const section = getHomeAdminSectionByItemType(itemType);
  return section
    ? `${section.href}/${encodeURIComponent(id)}`
    : '/admin/home/cover-slides';
}

export function homeAdminListHref(itemType: string) {
  return (
    getHomeAdminSectionByItemType(itemType)?.href ??
    '/admin/home/cover-slides'
  );
}

export function getHomeItemTypeConfig(
  itemTypes: ManagedItemTypeConfig[],
  section: HomeAdminSection,
) {
  return (
    itemTypes.find((itemType) => itemType.value === section.itemType) ??
    null
  );
}
