import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/varicocele/diagnostics';

export const varicocelePhysicalCriteriaDescription =
  '선 자세에서 음낭 속 늘어난 정맥이 만져지거나 보이면 정계정맥류로 진단합니다.\n이와 함께 청소년의 경우 양쪽 고환 부피 차이가 20% 또는 2cc 이상이거나, 통증·불편감이 지속되어 생활에 지장이 있다면 치료를 고려합니다.';

/** 이미지별 설명이 제공되지 않은 조영술 카드는 이미지 단독으로 표시합니다. */
export const varicoceleDiagnosticCriteria: Readonly<Partial<Record<string, DiagnosticCriteriaSet>>> = {
  doppler: {
    cards: [
      {
        image: `${IMAGE_ROOT}/doppler/blood-flow.png`,
        label: '혈류영상',
        tone: 'neutral',
        items: ['혈액 역류 시간이 0.5초 이상'],
      },
      {
        image: `${IMAGE_ROOT}/doppler/vein-diameter.png`,
        label: '단면 영상',
        tone: 'neutral',
        items: ['선 자세에서 정맥 굵기가 약 3mm 이상'],
      },
      {
        image: `${IMAGE_ROOT}/doppler/venous-plexus.png`,
        label: '단면 영상',
        tone: 'neutral',
        items: ['음낭 속 늘어난 정맥 다발이 검게 뭉쳐 보이는 모습'],
      },
    ],
  },
  ct: {
    cards: [
      {
        image: `${IMAGE_ROOT}/ct/whole-body-vessels.png`,
        label: '전신 혈관 영상',
        tone: 'neutral',
        items: [
          '양쪽 음낭 속 정맥(덩굴정맥총)이 구불구불하게 늘어남',
          '왼쪽이 더 심하게 늘어나 아래로 처져 있음',
        ],
      },
      {
        image: `${IMAGE_ROOT}/ct/three-dimensional-vessels.png`,
        label: '3D 입체 영상',
        tone: 'neutral',
        items: ['왼쪽 음낭 부위에서 구불구불하게 엉킨 혈관 덩어리 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/ct/axial-scan.png`,
        label: '횡단면 영상',
        tone: 'neutral',
        items: ['늘어난 정맥의 굵기가 3mm 이상'],
      },
    ],
  },
  angiography: {
    description: '실시간으로 흐르는 조영제의 방향과 고이는 양상을 보며 역류와 울혈을 최종 확진합니다.\n같은 자리에서 코일 색전술로 문제 정맥의 혈류를 즉시 차단할 수 있습니다.',
    cards: [
      {
        image: `${IMAGE_ROOT}/angiography/venography-1.png`,
        label: '',
        tone: 'neutral',
        items: [],
      },
      {
        image: `${IMAGE_ROOT}/angiography/venography-2.png`,
        label: '',
        tone: 'neutral',
        items: [],
      },
      {
        image: `${IMAGE_ROOT}/angiography/venography-3.png`,
        label: '',
        tone: 'neutral',
        items: [],
      },
    ],
  },
};
