export type HomeSpecialtyCard = {
  itemKey: string;
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  alt: string;
  openInNewTab: boolean;
};

export type HomeMiddleBanner = {
  itemKey: string;
  id: string;
  href: string;
  mobileImage: string;
  desktopImage: string;
  mobileAlt: string;
  desktopAlt: string;
  openInNewTab: boolean;
};

export type CommonContentBanner = {
  itemKey: string;
  id: string;
  href: string;
  mobileImage: string;
  desktopImage: string;
  alt: string;
  openInNewTab: boolean;
};

export const DEFAULT_HOME_SPECIALTIES: HomeSpecialtyCard[] = [
  {
    itemKey: 'specialty:leg-varicose-veins',
    id: 'leg-varicose-veins',
    title: '하지정맥류',
    href: '/specialties/leg-varicose-veins',
    imageSrc: '/assets/images/home-specialty-leg-varicose-veins.png',
    alt: 'leg-varicose-veins-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:arteriosclerosis',
    id: 'arteriosclerosis',
    title: '동맥경화',
    href: '/specialties/arteriosclerosis',
    imageSrc: '/assets/images/home-specialty-arteriosclerosis.png',
    alt: 'arteriosclerosis-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:pelvic-varicose-veins',
    id: 'pelvic-varicose-veins',
    title: '골반정맥류',
    href: '/specialties/pelvic-varicose-veins',
    imageSrc: '/assets/images/home-specialty-pelvic-varicose-veins.png',
    alt: 'pelvic-varicose-veins-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:varicocele',
    id: 'varicocele',
    title: '정계정맥류',
    href: '/specialties/varicocele',
    imageSrc: '/assets/images/home-specialty-varicocele.png',
    alt: 'varicocele-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:rare-special-diseases',
    id: 'rare-special-diseases',
    title: '희귀특수질환',
    href: '/specialties/rare-special-diseases',
    imageSrc: '/assets/images/home-specialty-rare-special-diseases.png',
    alt: 'rare-special-diseases-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:dialysis-access',
    id: 'dialysis-access',
    title: '투석혈관',
    href: '/specialties/dialysis-access',
    imageSrc: '/assets/images/home-specialty-dialysis-access.png',
    alt: 'dialysis-access-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:hyperbaric-oxygen-therapy',
    id: 'hyperbaric-oxygen-therapy',
    title: '고압산소치료',
    href: '/specialties/hyperbaric-oxygen-therapy',
    imageSrc: '/assets/images/home-specialty-hyperbaric-oxygen-therapy.png',
    alt: 'hyperbaric-oxygen-therapy-bg',
    openInNewTab: true,
  },
  {
    itemKey: 'specialty:vascular-screening',
    id: 'vascular-screening',
    title: '혈관검진',
    href: '/specialties/vascular-screening',
    imageSrc: '/assets/images/home-specialty-vascular-screening.png',
    alt: 'vascular-screening-bg',
    openInNewTab: true,
  },
];

export const DEFAULT_HOME_MIDDLE_BANNERS: HomeMiddleBanner[] = [
  {
    itemKey: 'middle-banner:1',
    id: 'middle-banner-1',
    href: '/',
    mobileImage: '/assets/images/home-banner-mobile.png',
    desktopImage: '/assets/images/home-banner-desktop.png',
    mobileAlt: '청맥병원 메인 배너',
    desktopAlt: '청맥병원 메인 배너',
    openInNewTab: true,
  },
];

export const DEFAULT_COMMON_CONTENT_BANNERS: CommonContentBanner[] = [
  {
    itemKey: 'common-content-banner:1',
    id: 'common-content-banner-1',
    href: '/',
    mobileImage: '/assets/images/home-notice-1.png',
    desktopImage: '/assets/images/home-notice-1.png',
    alt: '공통 콘텐츠 배너 1',
    openInNewTab: true,
  },
  {
    itemKey: 'common-content-banner:2',
    id: 'common-content-banner-2',
    href: '/',
    mobileImage: '/assets/images/home-notice-2.png',
    desktopImage: '/assets/images/home-notice-2.png',
    alt: '공통 콘텐츠 배너 2',
    openInNewTab: true,
  },
  {
    itemKey: 'common-content-banner:3',
    id: 'common-content-banner-3',
    href: '/',
    mobileImage: '/assets/images/home-notice-3.png',
    desktopImage: '/assets/images/home-notice-3.png',
    alt: '공통 콘텐츠 배너 3',
    openInNewTab: true,
  },
];

export function buildHomeSpecialtiesFromLegacy(
  copy: Record<string, unknown> = {},
): HomeSpecialtyCard[] {
  return DEFAULT_HOME_SPECIALTIES.map((item, index) => {
    const legacyTitle = copy[`specialty${index + 1}Title`];

    return {
      ...item,
      title:
        typeof legacyTitle === 'string' && legacyTitle.trim()
          ? legacyTitle
          : item.title,
    };
  });
}
