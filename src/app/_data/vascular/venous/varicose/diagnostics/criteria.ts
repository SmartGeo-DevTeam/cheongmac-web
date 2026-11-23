import type { DiagnosticCriteriaSet } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/varicose/diagnostics';

/** 검사별 해설을 이미지와 분리해 화면·접근성·정정 사항을 관리합니다. */
export const varicoseDiagnosticCriteria = {
  doppler: {
    description: `종아리를 압박했다가 풀었을 때 혈액이 아래로 되돌아 흐르는지, 얼마나 오래 흐르는지를 확인합니다. \n표재정맥에서 역류가 0.5초 이상 이어지면 의미 있는 역류로 판단합니다.`,
    cards: [
      {
        image: `${IMAGE_ROOT}/doppler/transverse-view.png`,
        label: '단축 (횡단면)',
        tone: 'neutral',
        items: [
          '허벅지 대복재정맥의 단면 영상으로, 근막 사이 정맥의 역류 관찰됨',
        ],
      },
      {
        image: `${IMAGE_ROOT}/doppler/longitudinal-view.png`,
        label: '장축 (종단면)',
        tone: 'neutral',
        items: ['압박을 풀었을 때 혈류 색이 반대 색으로 바뀌면 역류를 의미'],
      },
      {
        image: `${IMAGE_ROOT}/doppler/reflux-waveform.png`,
        label: '혈류 파형',
        tone: 'neutral',
        items: ['혈액 역류 시간이 0.5초 이상이면 하지정맥류 진단'],
      },
    ],
  },
  ct: {
    description: `하지정맥류 진단의 핵심 검사입니다. 혈액의 역류를 색상과 시간으로 나타내어 병변 위치와 역류 정도를 정확히 확인합니다. \n하지정맥류는 서 있을 때 역류가 가장 잘 나타나므로, 누워서가 아니라 선 자세로 검사해야 정확하게 진단할 수 있습니다.`,
    cards: [
      {
        image: `${IMAGE_ROOT}/ct/whole-body-vessels.png`,
        label: '전신 혈관 영상',
        tone: 'neutral',
        items: [
          '곧게 뻗은 반대쪽과 달리, 왼쪽 종아리에 실타래처럼 뭉친 정맥류 관찰',
        ],
      },
      {
        image: `${IMAGE_ROOT}/ct/three-dimensional-vessels.png`,
        label: '3D 입체 영상',
        tone: 'neutral',
        items: ['종아리 안쪽에서 굵어지고 구불구불하게 도드라진 정맥류 관찰'],
      },
      {
        image: `${IMAGE_ROOT}/ct/axial-scan.png`,
        label: '횡단면 영상',
        tone: 'neutral',
        items: ['종아리 부위에서 확장되고 구불구불해진 정맥류 관찰'],
      },
    ],
  },
} satisfies Record<'doppler' | 'ct', DiagnosticCriteriaSet>;
