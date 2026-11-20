/** 부위별 정맥질환 카드: 사진 자산 미제공 상태이므로 이미지 경로는 확정 전까지 비워 둡니다. */
export type VenousDiseaseCard = {
  id: string;
  title: string;
  href: string;
  tags: string[];
  /** 사진이 제공되면 public/vascular/venous/diseases/ 아래 URL을 지정합니다. */
  image?: string;
};

export const venousDiseaseCards: VenousDiseaseCard[] = [
  {
    id: 'varicose',
    title: '하지정맥류',
    href: '/vascular/venous/varicose',
    tags: ['#다리무거움', '#종아리 쥐', '#튀어나온 혈관'],
  },
  {
    id: 'pelvic',
    title: '골반정맥류',
    href: '/vascular/venous/pelvic',
    tags: ['#골반통', '#빈뇨·잔뇨감', '#생리 전후 통증'],
  },
  {
    id: 'varicocele',
    title: '정계정맥류',
    href: '/vascular/venous/varicocele',
    tags: ['#음낭 묵직함', '#고환통증', '#남성불임'],
  },
  {
    id: 'thrombosis',
    title: '심부정맥혈전증',
    href: '/vascular/venous/thrombosis',
    tags: ['#한쪽 다리 부종', '#다리 열감', '#피부 변화'],
  },
];
