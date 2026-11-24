import type { ClinicDiseaseCardData } from '@/app/_types/vascular/disease-card';

/** 부위별 정맥질환 카드: 임시 사진 4개를 페이지별 공개 이미지 경로로 이전했습니다. */
export const venousDiseaseCards: ClinicDiseaseCardData[] = [
  {
    id: 'varicose',
    title: '하지정맥류',
    href: '/vascular/venous/varicose',
    image: '/vascular/venous/diseases/varicose-veins.png',
    tags: ['#다리무거움', '#종아리 쥐', '#튀어나온 혈관'],
  },
  {
    id: 'pelvic',
    title: '골반정맥류',
    href: '/vascular/venous/pelvic',
    image: '/vascular/venous/diseases/pelvic-varices.png',
    tags: ['#골반통', '#빈뇨·잔뇨감', '#생리 전후 통증'],
  },
  {
    id: 'varicocele',
    title: '정계정맥류',
    href: '/vascular/venous/varicocele',
    image: '/vascular/venous/diseases/varicocele.png',
    tags: ['#음낭 묵직함', '#고환통증', '#남성불임'],
  },
  {
    id: 'thrombosis',
    title: '심부정맥혈전증',
    href: '/vascular/venous/thrombosis',
    image: '/vascular/venous/diseases/deep-vein-thrombosis.png',
    tags: ['#한쪽 다리 부종', '#다리 열감', '#피부 변화'],
  },
];
