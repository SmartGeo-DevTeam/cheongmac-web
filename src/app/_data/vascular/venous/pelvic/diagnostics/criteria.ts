import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/pelvic/diagnostics';

/** DB 연동 시 이미지와 진단 설명을 검토합니다. 미제공 문구는 비워 둡니다. */
export const pelvicDiagnosticCriteria: Readonly<Partial<Record<string, DiagnosticCriteriaSet>>> = {
  doppler: {
    cards: [
      {
        image: `${IMAGE_ROOT}/doppler/color-doppler-flow.png`,
        label: '초음파',
        tone: 'neutral',
        items: [
          '자궁 주변 정맥류 내부의 혈류 신호를 컬러로 확인',
          '빨강/파랑 색상은 초음파 탐촉자 기준 혈류 방향을 나타냄',
        ],
      },
    ],
  },
  ct: {
    cards: [
      {
        image: `${IMAGE_ROOT}/ct/whole-body-vessels.png`,
        label: '전신 혈관 영상',
        tone: 'neutral',
        items: ['골반 내 울혈 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/ct/three-dimensional-vessels.png`,
        label: '3D 입체 영상',
        tone: 'neutral',
        items: ['울혈 발생 위치와 구조를 입체 영상으로 확인'],
      },
      {
        image: `${IMAGE_ROOT}/ct/axial-scan.png`,
        label: '횡단면 영상',
        tone: 'neutral',
        // TODO: DB 연동 전 6.png와 원문 설명의 일치 여부를 의료진과 확인합니다.
        items: ['종아리 부위에서 확장되고 구불구불해진 정맥류 관찰'],
      },
    ],
  },
  angiography: {
    description:
      '골반 정맥에 조영제를 넣어 촬영하면, 늘어난 정맥에 혈액이 고인 울혈이 관찰됩니다.\n골반정맥류는 주로 왼쪽 난소정맥에서 역류가 시작되는 경우가 많아, 울혈도 왼쪽에 두드러지는 경향이 있습니다.',
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
