import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/varicose/diagnostics';

/** 검사별 해설을 이미지와 분리해 화면·접근성·정정 사항을 관리합니다. */
export const varicoseDiagnosticCriteria = {
  doppler: {
    description:
      '초음파를 이용해 정맥을 따라 아래로 되돌아 흐르는지, 얼마나 오래 흐르는지를 확인합니다. 표재정맥에서는 역류 시간이 0.5초 이상인지 등을 살펴 진단하며, 판정 기준은 검사 혈관에 따라 달라집니다.',
    cards: [
      {
        image: `${IMAGE_ROOT}/doppler/transverse-view.png`,
        label: '단축 (횡단면)',
        tone: 'neutral',
        items: ['혈관의 단축(횡단면) 단면 영상으로, 근육 사이 정맥의 역류와 내부 구조 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/doppler/longitudinal-view.png`,
        label: '종축 (종단면)',
        tone: 'neutral',
        items: ['정맥을 길게 보며 압박 후 혈류 방향과 역류 여부를 확인'],
      },
      {
        image: `${IMAGE_ROOT}/doppler/reflux-waveform.png`,
        label: '혈류 파형',
        tone: 'neutral',
        items: ['혈액 역류 시간이 0.5초 이상인지 등 역류 지속 시간을 확인'],
      },
    ],
  },
  ct: {
    description:
      '하지정맥류 진단의 핵심 검사는 초음파입니다. 혈액의 역류를 세밀하게 확인하기 어려운 경우, 정맥의 해부학적 위치와 주변 구조를 정밀하게 확인합니다.',
    cards: [
      {
        image: `${IMAGE_ROOT}/ct/whole-body-vessels.png`,
        label: '전신 혈관 영상',
        tone: 'neutral',
        items: ['골반을 포함한 혈관의 위치와 주변 장기와의 관계를 입체적으로 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/ct/three-dimensional-vessels.png`,
        label: '3D 입체 영상',
        tone: 'neutral',
        items: ['종아리와 다리의 혈관을 3차원으로 재구성해 정맥을 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/ct/axial-scan.png`,
        label: '횡단면 영상',
        tone: 'neutral',
        items: ['종아리 부위에서 혈관의 굵기와 주변 구조를 정밀하게 관찰'],
      },
    ],
  },
} satisfies Record<'doppler' | 'ct', DiagnosticCriteriaSet>;
