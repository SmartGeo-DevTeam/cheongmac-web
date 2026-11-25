import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/varicocele/diagnostics';

/** 제공된 원문. 실제 공개 전 의료진 검토가 필요합니다. */
export const varicoceleDiagnosticMethods: readonly DiagnosticMethod[] = [
  {
    id: 'physical',
    tabLabel: '이학적 검사',
    eyebrow: 'Physical Examination',
    title: '이학적 검사',
    description:
      '자세에 따라 달라지는 음낭 혈관 상태를 관찰합니다. 배에 힘을 주는 발살바법으로 혈관이 부풀어 오르는 정도와 고환 상태를 함께 살펴봅니다.',
    image: `${IMAGE_ROOT}/physical/examination.png`,
    infoGroups: [
      {
        label: '검사시간',
        items: ['약 5분 소요'],
      },
      {
        label: '검사과정',
        items: [
          '문진: 불편한 부위와 통증 양상 체크',
          '시진: 선 자세에서 늘어난 혈관 확인',
          '촉진: 음낭 부위를 직접 만져 늘어난 정맥 확인',
          '복압 검사: 배에 힘을 줬을 때와 앉았다 일어서는 동작에서의 변화 관찰',
        ],
      },
    ],
  },
  {
    id: 'doppler',
    tabLabel: '도플러 초음파 검사',
    eyebrow: 'Doppler Ultrasonography',
    title: '도플러 초음파 검사',
    description:
      '골반 내 정맥의 울혈 상태를 도플러 초음파로 정밀하게 확인하고, 비뇨기계 질환과의 감별 진단을 함께 진행합니다.',
    image: `${IMAGE_ROOT}/doppler/ultrasound-examination.png`,
    infoGroups: [
      {
        label: '검사시간',
        items: ['약 20분 소요'],
      },
      {
        label: '검사과정',
        items: [
          '누운 자세에서 정맥 굵기와 위치, 고환 상태 측정',
          '서 있을 때 늘어나는 정맥 확인',
        ],
      },
      {
        label: '특징',
        items: [
          '정맥의 확장 정도, 혈류 방향, 역류 위치와 역류 시간을 실시간으로 확인',
          '탈장, 부고환염 등 비슷한 질환과 구별 가능',
          '방사선 노출/조영제 투여 부담 없는 비침습 검사',
        ],
      },
    ],
  },
  {
    id: 'ct',
    tabLabel: '혈관 CT',
    eyebrow: 'Whole Body CT Scan',
    title: '혈관 CT',
    description:
      '초음파로 보기 어려운 심부정맥·골반 부위를 확인하는 정밀 검사입니다. 혈관의 위치와 직경, 주변 구조 및 다른 원인이 있는지 면밀피 살필 수 있습니다.',
    image: `${IMAGE_ROOT}/ct/ct-examination.png`,
    infoGroups: [
      {
        label: '검사시간',
        items: ['준비 포함 약 20분 소요'],
      },
      {
        label: '검사과정',
        items: [
          '검사 4~6시간 전 금식 필요',
          '팔 정맥으로 조영제를 주입하며 촬영한 영상을 3D 입체로 재구성 판독',
        ],
      },
      {
        label: '특징',
        items: [
          '조영제와 방사선을 사용하는 검사',
          '역류의 상부 원인까지 확인 가능',
        ],
      },
    ],
    notice: '신장 기능이 저하된 환자는 사전에 의료진과 상의가 필요합니다.',
  },
  {
    id: 'angiography',
    tabLabel: '혈관 조영술 검사',
    eyebrow: 'Angiography',
    title: '혈관 조영술 검사 (인터벤션)',
    description:
      '카테터를 혈관에 직접 삽입해 조영제를 주입하며 실시간으로 혈관을 확인하는 검사로, 진단과 동시에 시술 치료까지 이어질 수 있는 것이 가장 큰 특징입니다.',
    image: `${IMAGE_ROOT}/angiography/examination.png`,
    infoGroups: [
      {
        label: '검사시간',
        items: ['약 30분~1시간 소요 (치료 병행 시 연장)'],
      },
      {
        label: '검사과정',
        items: [
          '사타구니 또는 손목 정맥에 국소마취 후 얇은 관(카테터)을 삽입하여 조영제를 주입하며 실시간 영상 확인',
        ],
      },
      {
        label: '특징',
        items: [
          '진단과 동시에 색전술까지 가능한 하이브리드 치료',
          '혈관 내부를 고해상도로 실시간 확인',
        ],
      },
    ],
    notice: '안전한 지혈을 위해 검사 후 최소 4시간 이상 안정이 필요합니다.',
  },
];
