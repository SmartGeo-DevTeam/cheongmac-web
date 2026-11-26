import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/thrombosis/diagnostics';

/** 제공된 검사 문구와 이미지를 관리합니다. DB 연동 전 의료진 검토가 필요합니다. */
export const thrombosisDiagnosticMethods: readonly DiagnosticMethod[] = [
  {
    id: 'ultrasound',
    tabLabel: '초음파 검사',
    eyebrow: 'Ultrasonography',
    title: '초음파 검사',
    description:
      '깊은 정맥 안의 혈전 여부와 혈류를 실시간으로 확인하는 1차 기본 검사입니다.',
    image: `${IMAGE_ROOT}/ultrasound/examination.png`,
    infoGroups: [
      { label: '검사시간', items: ['약 20분 소요'] },
      {
        label: '검사과정',
        items: [
          '사타구니부터 종아리까지 정맥 경로 전체 검사',
          '정맥을 압박했을 때 납작하게 눌리는지 확인',
          '필요 시 양쪽 다리를 비교하여 검사',
        ],
      },
      {
        label: '특징',
        items: [
          '발생 초기 혈전은 피처럼 검게 보여 압박 검사로 진단하며, 시간이 경과한 혈전은 회색으로 보여 직접 확인 가능',
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
          '역류의 상부 원인까지 확인 가능',
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
  {
    id: 'blood-test',
    tabLabel: '혈액 검사',
    eyebrow: 'Blood Test',
    title: '혈액 검사',
    description:
      '혈액 속 D-dimer(디다이머) 수치로 몸 안에 혈전이 생겼을 가능성을 확인하는 검사입니다. 수치만으로 확진하지는 않으며, 초음파 등 영상검사가 필요한지 판단하는 기준으로 활용합니다.',
    image: `${IMAGE_ROOT}/blood-test/blood-sampling.png`,
    infoGroups: [
      { label: '검사시간', items: ['채혈 약 5분, 당일 결과 확인'] },
      { label: '검사과정', items: ['팔 정맥에서 혈액 소량 채혈'] },
      {
        label: '특징',
        items: [
          'D-dimer란 혈전이 녹을 때 생기는 물질로, 체내 혈전 여부를 간접 확인',
          '치료 전 출혈 위험 확인을 위한 혈액응고·일반 혈액검사 함께 진행',
        ],
      },
    ],
  },
];
