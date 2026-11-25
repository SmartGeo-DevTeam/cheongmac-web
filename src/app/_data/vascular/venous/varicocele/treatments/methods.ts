import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';

/** 정계정맥류 치료법의 정적 표시 데이터. 추후 DB 조회 결과로 교체합니다. */
export const varicoceleTreatmentMethod: TreatmentMethod = {
  id: 'smart-coil-embolization',
  category: '시술',
  title: '스마트 코일 색전술',
  englishTitle: 'Smart coil embolization',
  description:
    '역류가 일어나는 혈관만 찾아 코일을 이용해 혈류를 차단하는 최소 침습적 비수술 치료입니다.',
  image: {
    src: '/vascular/venous/varicocele/treatments/smart-coil-embolization.png',
    alt: '고환정맥 코일 색전술을 설명하는 예시 모식도',
  },
  sections: [
    {
      id: 'procedure',
      title: '시술 과정',
      type: 'numbered-list',
      items: [
        '오른쪽 팔 정맥으로 카테터를 삽입하여 큰 정맥을 따라 고환정맥까지 통과',
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
