import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/pelvic/diagnostics';

/** 골반정맥류 검사 정보: DB 연동 전 제공된 문구를 그대로 관리합니다. */
export const pelvicDiagnosticMethods: readonly DiagnosticMethod[] = [
  {
    id: 'doppler',
    tabLabel: '도플러 초음파 검사',
    eyebrow: 'Doppler Ultrasonography',
    title: '도플러 초음파 검사',
    description:
      '골반 내 정맥의 울혈 상태를 도플러 초음파로 정밀하게 확인하고, 비뇨기계 질환과의 감별 진단을 함께 진행합니다.',
    image: `${IMAGE_ROOT}/doppler/ultrasound-examination.png`,
    infoGroups: [
      { label: '검사시간', items: ['약 20분 소요'] },
      {
        label: '검사과정',
        items: [
          '① 방광에 소변이 차 있으면 골반 내부를 관찰하는 데 도움이 됨',
          '② 바로 누운 자세에서 시행하며, 필요 시 상체를 세우거나 무릎을 굽혀 검사',
        ],
      },
      {
        label: '특징',
        items: [
          '골반 정맥의 혈류 방향과 역류 여부 실시간 확인',
          '정맥 확장 정도 및 혈류 역류 시간 평가',
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
      '초음파로 보기 어려운 심부정맥·골반 부위를 확인하는 정밀 검사입니다. 혈관의 위치와 직경, 주변 구조 및 다른 원인이 있는지 면밀히 살필 수 있습니다.',
    image: `${IMAGE_ROOT}/ct/ct-examination.png`,
    notice: '신장 기능이 저하된 환자는 사전에 의료진과 상의가 필요합니다.',
    infoGroups: [
      { label: '검사시간', items: ['준비 포함 약 20분 소요'] },
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
          '골반·복부 정맥 이상 (호두까기증후군, 메이터너증후군 등)이 의심될 때 / 역류의 상부 원인까지 확인 가능',
        ],
      },
    ],
  },
  {
    id: 'angiography',
    tabLabel: '혈관 조영술 검사 (인터벤션)',
    eyebrow: 'Angiography',
    title: '혈관 조영술 검사 (인터벤션)',
    description:
      '카테터를 혈관에 직접 삽입해 조영제를 주입하며 실시간으로 혈관을 확인하는 검사로, 진단과 동시에 시술 치료까지 이어질 수 있는 것이 가장 큰 특징입니다.',
    image: `${IMAGE_ROOT}/angiography/examination.png`,
    notice: '안전한 지혈을 위해 검사 후 최소 4시간 이상 안정이 필요합니다.',
    infoGroups: [
      { label: '검사시간', items: ['약 30분~1시간 소요 (치료 병행 시 연장)'] },
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
  },
];
