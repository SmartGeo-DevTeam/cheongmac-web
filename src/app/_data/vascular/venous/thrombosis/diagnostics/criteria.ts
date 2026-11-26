import type {
  DiagnosticCriteriaSet,
  DiagnosticCriteriaTable,
} from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/thrombosis/diagnostics';

export const thrombosisDiagnosticCriteria: Readonly<
  Partial<Record<string, DiagnosticCriteriaSet>>
> = {
  ultrasound: {
    cards: [
      {
        image: `${IMAGE_ROOT}/ultrasound/femoral-vein-compression.png`,
        label: 'CASE 01',
        tone: 'neutral',
        items: ['왼쪽 허벅지 대퇴정맥 압박 시 눌리지 않는 혈전 소견'],
      },
      {
        image: `${IMAGE_ROOT}/ultrasound/popliteal-vein-compression.png`,
        label: 'CASE 02',
        tone: 'neutral',
        items: ['좌측 오금정맥 압박 시 눌리지 않는 혈전 소견'],
      },
      {
        image: `${IMAGE_ROOT}/ultrasound/common-femoral-vein-thrombus.png`,
        label: 'CASE 03',
        tone: 'neutral',
        items: [
          '좌측 총대퇴정맥 내 혈전 소견으로, 검게 보여야 할 혈관 내부가 회색으로 채워져 보임',
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
        items: [
          '좌측 하지에 그물 형태의 표재 측부혈관 발달',
          '심부정맥 폐쇄로 혈류가 표재정맥으로 우회한 소견',
        ],
      },
      {
        image: `${IMAGE_ROOT}/ct/axial-scan.png`,
        label: '횡단면 영상',
        tone: 'neutral',
        items: ['울혈 발생 위치와 구조를 입체 영상으로 확인'],
      },
      {
        image: `${IMAGE_ROOT}/ct/post-treatment-stent.png`,
        label: '치료 후',
        tone: 'neutral',
        items: [
          '하대정맥 필터 삽입 후 혈전 제거술 시행',
          '좁아진 좌측 장골정맥에 스텐트 삽입한 모습. 스텐트는 혈전 제거 후 남은 정맥 협착 부위를 넓히기 위한 처치로 정맥 혈류 회복 소견',
        ],
      },
    ],
  },
  angiography: {
    description:
      '카테터를 혈관에 직접 삽입해 조영제를 주입하며 실시간으로 혈관을 확인하는 검사로, 진단과 동시에 혈전 제거 및 스텐트 삽입 시술까지 이어질 수 있는 것이 가장 큰 특징입니다.',
    cards: [
      {
        image: `${IMAGE_ROOT}/angiography/collateral-veins.png`,
        label: 'CASE 01',
        tone: 'neutral',
        items: [
          '좌측 하지에 그물 형태의 표재 측부혈관 발달',
          '심부정맥 폐쇄로 혈류가 표재정맥으로 우회한 소견',
        ],
      },
      {
        image: `${IMAGE_ROOT}/angiography/iliac-vein-occlusion.png`,
        label: 'CASE 02',
        tone: 'neutral',
        items: ['좌측 장골정맥 내부가 조영되지 않는 부위로, 혈전에 의한 정맥 폐쇄 소견'],
      },
      {
        image: `${IMAGE_ROOT}/angiography/iliac-vein-stenosis.png`,
        label: 'CASE 03',
        tone: 'neutral',
        items: [
          '장골정맥 내 혈전에 의한 조영 결손 및 상부 협착 소견',
          '주변 측부혈관 발달',
        ],
      },
    ],
  },
};

/** 첨부 시안의 문구. 검사실 기준과 FEU/DDU 단위 등은 공개 전 검토합니다. */
export const thrombosisBloodTestCriteriaTable: DiagnosticCriteriaTable = {
  columns: [
    { label: 'D-dimer 수치', mobileLabel: 'D-dimer' },
    { label: '판단' },
  ],
  rows: [
    {
      id: 'below-threshold',
      cells: ['0.5μg/mL 미만', '증상과 위험요인이 낮다면 심부정맥혈전증 가능성 낮음'],
    },
    {
      id: 'at-or-above-threshold',
      cells: ['0.5μg/mL 이상', '혈전 가능성이 있어 혈관 초음파로 확인 필요'],
    },
  ],
  note: '* D-dimer 수치는 수술 후, 임신 중, 염증, 고령 등에서도 높아질 수 있어 단독으로 진단하지 않으며, 보조 지표로 참고합니다.',
};
