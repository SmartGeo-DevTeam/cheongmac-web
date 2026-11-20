import type { BestCase } from '@/app/_types/vascular/best-case';

/**
 * 제공된 데스크톱 시안의 콘텐츠를 재현하기 위한 임시 하드코딩 목록입니다.
 * 실제 환자 증례·치료 효과·의료진의 진료 이력을 검증한 데이터가 아닙니다.
 * 정식 게시 전에 실제 증례 자료로 검수하고, 이후 DB 조회 결과로 교체하세요.
 */
export const venousBestCases: BestCase[] = [
  {
    id: 'varicocele-ultrasound-left',
    title: '정계정맥류',
    image: '/vascular/venous/best-cases/varicocele-ultrasound.png',
    imageAlt: '정계정맥류 초음파 영상 비교 자료',
    treatment: '경피적 혈관 성형술',
    doctorId: 'jeon-jin-won',
  },
  {
    id: 'pelvic-congestion-ct-left',
    title: '골반정맥류',
    image: '/vascular/venous/best-cases/pelvic-congestion-ct.png',
    imageAlt: '골반정맥류 관련 혈관 CT 영상 비교 자료',
    treatment: '경피적 혈관 성형술',
    doctorId: 'jang-ji-ran',
  },
  {
    id: 'varicose-veins-before-after',
    title: '하지정맥류',
    image: '/vascular/venous/best-cases/varicose-veins-before-after.png',
    imageAlt: '다리 정맥의 외형을 나란히 비교한 이미지',
    treatment: '발거술 + 레이저',
    doctorId: 'bak-yong-beom',
  },
  {
    id: 'pelvic-congestion-ct-right',
    title: '골반정맥류',
    image: '/vascular/venous/best-cases/pelvic-congestion-ct.png',
    imageAlt: '골반정맥류 관련 혈관 CT 영상 비교 자료',
    treatment: '경피적 혈관 성형술',
    doctorId: 'jang-ji-ran',
  },
  {
    id: 'varicocele-ultrasound-right',
    title: '정계정맥류',
    image: '/vascular/venous/best-cases/varicocele-ultrasound.png',
    imageAlt: '정계정맥류 초음파 영상 비교 자료',
    treatment: '경피적 혈관 성형술',
    doctorId: 'jeon-jin-won',
  },
];
