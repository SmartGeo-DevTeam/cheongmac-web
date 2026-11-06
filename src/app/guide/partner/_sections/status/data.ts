// 신규: 협약기관 로고 데이터 (이미지 경로는 public/partner/logo 기준)
export const partnerStatus = {
  title: '협약기관 현황',
  description:
    '청맥병원과 협약을 맺은 기관을 이용하시면 진료비 감면 등 폭넓은 의료·제휴 혜택을 누리실 수 있습니다.',
};

export const partnerLogos = [
  {
    id: 'pnuh',
    name: '부산대학교병원',
    imageSrc: '/partner/logo/pnuh.png',
  },
  {
    id: 'damc',
    name: '동아대학교병원',
    imageSrc: '/partner/logo/damc.png',
  },
  {
    id: 'paik',
    name: '인제대학교부산백병원',
    imageSrc: '/partner/logo/paik.png',
  },
  {
    id: 'mpva',
    name: '국가보훈부',
    imageSrc: '/partner/logo/mpva.png',
  },
  {
    id: 'cm-daegu',
    name: '대구청맥의원',
    imageSrc: '/partner/logo/cm-daegu.png',
  },
  {
    id: 'cm-ulsan',
    name: '울산청맥외과의원',
    imageSrc: '/partner/logo/cm-ulsan.png',
  },
  {
    id: 'kit',
    name: '경남정보대학교',
    imageSrc: '/partner/logo/kit.png',
  },
  {
    id: 'onekgebal',
    name: '남북하나개발원',
    imageSrc: '/partner/logo/onekgebal.png',
  },
] as const;
