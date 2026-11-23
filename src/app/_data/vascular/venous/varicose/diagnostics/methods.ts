import type { DiagnosticMethod } from '@/app/_types/clinic/diagnostics';

const IMAGE_ROOT = '/vascular/venous/varicose/diagnostics';

/** 하지정맥류 진단 정보: 첨부된 디자인의 이학적 검사·초음파·CT 구성. */
export const varicoseDiagnosticMethods: readonly DiagnosticMethod[] = [
  {
    id: 'physical',
    tabLabel: '이학적 검사',
    eyebrow: 'Physical Examination',
    title: '이학적 검사',
    description:
      '문진과 육안·촉진으로 다리 상태를 직접 확인합니다. 수술 이력·질병 유무·증상을 파악하고, 돌출 혈관·부종·피부 변화를 관찰해 적절한 치료 방향을 정하는 첫 단계입니다.',
    image: `${IMAGE_ROOT}/physical/physical-examination.png`,
    infoGroups: [
      {
        label: '특징',
        items: [
          '별도 장비 없이 진행하는 기본 진찰',
          '가족력·기저질환 문진 및 피부 온도 차이 촉진',
          '튀어나온 혈관·부종·색소침착 등 겉으로 드러난 징후 확인',
          '역류 여부는 육안으로 파악하기 어려워 초음파 검사 필요',
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
      '하지정맥류 진단의 핵심이 되는 검사로, 혈액의 역류를 색상과 시간으로 나타내며 병변 위치와 역류 정도를 정확히 확인합니다. 하지정맥류는 서 있을 때 역류가 잘 나타날 수 있어, 기립 자세에서 검사해 정확하게 진단합니다.',
    image: `${IMAGE_ROOT}/doppler/ultrasound-examination.png`,
    infoGroups: [
      { label: '검사시간', items: ['약 20분 소요'] },
      {
        label: '검사과정',
        items: [
          '사타구니부터 발목까지 정맥 경로 따라 확인',
          '종아리를 압박했다 풀며 역류 여부, 시간 측정',
          '초음파로 혈관의 위치와 굵기까지 종합적으로 확인',
        ],
      },
      {
        label: '특징',
        items: [
          '역류 지점, 역류 시간, 판막 기능 실시간 확인',
          '방사선 노출·조영제 투여 부담 없는 비침습 검사',
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
      '하지정맥류는 대부분 도플러 초음파만으로 진단하지만, 일부 초음파로 보기 어려운 골반·복부 정맥의 원인이 의심될 때 추가로 진행하는 보조 검사입니다.',
    image: `${IMAGE_ROOT}/ct/ct-examination.png`,
    notice: '신장 기능이 저하된 환자는 사전에 의료진과 상의가 필요합니다.',
    infoGroups: [
      { label: '검사시간', items: ['준비 포함 약 20분 소요'] },
      {
        label: '검사과정',
        items: [
          '검사 4~6시간 전 금식',
          '신장 기능 확인을 위한 사전 혈액검사 필요',
          '팔 정맥으로 조영제를 주입하며 촬영한 영상을 3D 입체로 재구성 판독',
        ],
      },
      {
        label: '특징',
        items: [
          '조영제를 통해 혈관을 선명하게 관찰',
          '골반·복부 정맥 이상(호두까기증후군, 메이-터너증후군, 골반울혈증후군 등)이 의심될 때 초음파로 보기 어려운 부위 및 혈류의 상행 원인까지 확인 가능',
        ],
      },
    ],
  },
];
