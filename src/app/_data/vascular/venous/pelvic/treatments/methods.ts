import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';

/**
 * 골반정맥류 치료법의 정적 표시 데이터. 추후 DB 조회 결과로 교체합니다.
 * 의료 문구·수치는 요청 원문이며, 공개 전 의료진 검토가 필요합니다.
 * 특히 무통증 표현, 시술 시간, 회복 및 치료 효과는 개별 환자에 따라 달라질 수 있습니다.
 */
export const pelvicTreatmentMethod: TreatmentMethod = {
  id: 'smart-coil-embolization',
  category: '시술',
  title: '스마트 코일 색전술',
  englishTitle: 'Smart coil embolization',
  description:
    '골반 정맥에서 역류가 일어나는 혈관만 찾아 코일을 이용해 혈류를 차단하는 최소 침습적 비수술 치료입니다.',
  image: {
    src: '/vascular/venous/pelvic/treatments/smart-coil-embolization.png',
    alt: '상완정맥, 하대정맥, 신장정맥 및 난소정맥과 코일 색전술을 보여주는 혈관 구조 안내 이미지',
  },
  sections: [
    {
      id: 'procedure',
      title: '시술 과정',
      type: 'numbered-list',
      items: [
        '오른쪽 팔 정맥으로 카테터를 삽입하여 큰 정맥을 따라 통과해 난소정맥까지 이동',
        '역류하는 정맥에 백금 코일을 넣어 비정상 혈류 차단',
        '정상 정맥으로 혈류가 회복되며 울혈과 증상 개선',
      ],
    },
    {
      id: 'features',
      title: '특징',
      type: 'tags',
      items: [
        '시술 시간 약 30분',
        '전신마취 필요 없음',
        '빠른 일상 복귀',
        '절개 없는 무통증 시술',
      ],
    },
  ],
};
