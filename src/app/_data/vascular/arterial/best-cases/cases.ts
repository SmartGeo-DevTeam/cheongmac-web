import type { BestCase } from '@/app/_types/vascular/best-case';

/**
 * 시안 확인용 샘플 카드입니다. 실제 환자 사례·치료 성과를 의미하지 않습니다.
 * 운영 DB 도입 후 사례 레코드와 의료진 FK(doctorId)로 교체할 수 있습니다.
 */
export const arterialBestCases: BestCase[] = [
  {
    id: 'peripheral-artery',
    title: '말초동맥폐쇄증',
    image: '/vascular/arterial/best-cases/peripheral-artery-occlusion.png',
    imageAlt: '말초동맥폐쇄증 혈관 영상 비교 이미지',
    treatment: '경피적 혈관 성형술',
    doctorId: 'byun-seungjae',
  },
  {
    id: 'diabetic-foot',
    title: '당뇨발',
    image: '/vascular/arterial/best-cases/diabetic-foot.png',
    imageAlt: '당뇨발 치료 전후 비교 이미지',
    treatment: '혈관개통술',
    doctorId: 'byun-seungjae',
  },
  {
    id: 'aortic-aneurysm',
    title: '대동맥류',
    image: '/vascular/arterial/best-cases/aortic-aneurysm.png',
    imageAlt: '대동맥류 혈관 영상 비교 이미지',
    treatment: '스텐트 삽입술',
    doctorId: 'byun-seungjae',
  },
];
