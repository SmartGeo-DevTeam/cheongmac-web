import type { PublicPageCopyPath } from '@/_lib/public-page-copy';

export type PublicPageManagement = {
  href: string;
  label: string;
  description?: string;
};

const MANAGEMENT: Record<PublicPageCopyPath, PublicPageManagement> = {
  '/': {
    href: '/admin/common/page-copy?path=%2F',
    label: '메인페이지 문구 전체 관리',
    description: '메인페이지의 고정 문구를 섹션별 또는 한 화면에서 관리합니다.',
  },
  '/about/doctors': {
    href: '/admin/doctors',
    label: '의료진 전체 관리',
    description: '의료진 추가·삭제, 진료과, 이미지와 상세 정보를 관리합니다.',
  },
  '/about/tour': {
    href: '/admin/pages/tour',
    label: '병원 둘러보기 전체 관리',
  },
  '/about/equipment': {
    href: '/admin/pages/equipment',
    label: '첨단의료장비 전체 관리',
  },
  '/education-research/society': {
    href: '/admin/pages/society',
    label: '학회활동 전체 관리',
  },
  '/education-research/exchange': {
    href: '/admin/pages/exchange',
    label: '학술교류 전체 관리',
  },
  '/community/cases': {
    href: '/admin/pages/cases',
    label: '치료사례 전체 관리',
  },
  '/community/consultation': {
    href: '/admin/content-relations/consultations',
    label: '의학상담 전체 관리',
    description: '상담 게시물은 관계형 데이터이므로 관리자 목록에서 상세 관리합니다.',
  },
  '/community/customer-voice': {
    href: '/admin/customer-voice',
    label: '고객의 소리 접수 전체 관리',
    description: '접수 게시물은 관리자에서 관리하고, 화면의 고정 문구는 현재 편집창에서 수정합니다.',
  },
  '/community/notice': {
    href: '/admin/pages/notice',
    label: '공지사항 전체 관리',
  },
  '/community/news': {
    href: '/admin/pages/news',
    label: '청맥뉴스 전체 관리',
  },
  '/guide/partner-hospital': {
    href: '/admin/pages/partner-hospital',
    label: '의료협약병원 전체 관리',
  },
};

export function getPublicPageManagement(path: PublicPageCopyPath) {
  return MANAGEMENT[path];
}
