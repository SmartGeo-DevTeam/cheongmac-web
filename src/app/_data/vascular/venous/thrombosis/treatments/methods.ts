import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';

/** 제공된 치료 안내 원문. 공개 전 의료진 검토가 필요합니다. */
export const thrombosisTreatmentMethods: readonly TreatmentMethod[] = [
  {
    id: 'anticoagulation-therapy',
    category: '약물치료',
    title: '항응고 요법',
    englishTitle: 'ANTICOAGULATION THERAPY',
    description:
      '혈액이 굳는 과정을 억제해 혈전이 더 커지거나 새로 생기는 것을 막는 기본 치료입니다. 혈전을 직접 녹이지는 않지만 몸이 스스로 혈전을 줄여가도록 돕고 폐색전증을 예방합니다.',
    image: {
      src: '/vascular/venous/thrombosis/treatments/anticoagulation-therapy.png',
      alt: '경구 약제와 항응고 주사제 예시 이미지',
    },
    candidates: ['대부분의 환자', '시술 전후 병행', '임신·암 치료 중'],
    features: [
      {
        label: '경구 항응고제',
        description: '최소 3~6개월 복용, 재발 위험 시 의료진 판단에 따라 연장',
      },
      {
        label: '항응고 주사제',
        description: '배/허벅지에 맞는 피하주사로, 진단 직후 급성기 5~21일 혹은 시술 전후에 사용',
      },
    ],
  },
  {
    id: 'catheter-directed-thrombolysis',
    category: '시술',
    title: '혈전용해술',
    englishTitle: 'CATHETER-DIRECTED THROMBOLYSIS',
    description:
      '정맥으로 가느다란 카테터를 넣어 혈전 안에 혈전용해제를 직접 주입해 녹이는 시술입니다. 약이 혈전에 바로 닿아 전신에 투여하는 것보다 적은 양으로 효과를 낼 수 있습니다.',
    image: {
      src: '/vascular/venous/thrombosis/treatments/catheter-directed-thrombolysis.png',
      alt: '카테터로 혈전용해제를 주입하는 모식도',
    },
    candidates: ['허벅지·골반의 큰 혈전', '증상 2주 이내 급성기', '출혈 위험 낮은 경우'],
    features: [
      {
        label: '시술시간',
        description: '약 1~2시간',
      },
      {
        label: '시술 후',
        description: '약물 주입과 경과 관찰을 위해 입원이 필요하며, 퇴원 후에도 항응고제 복용 병행',
      },
    ],
  },
  {
    id: 'mechanical-thrombectomy',
    category: '시술',
    title: '혈전제거술',
    englishTitle: 'Mechanical Thrombectomy',
    description:
      '카테터 끝의 흡입·분쇄 기구로 혈관 안의 혈전을 직접 빨아들이거나 잘게 부숴 제거하는 시술입니다. 혈전을 빠르게 없애 붓기와 통증을 단시간에 줄일 수 있습니다.',
    image: {
      src: '/vascular/venous/thrombosis/treatments/mechanical-thrombectomy.png',
      alt: '카테터를 이용한 혈전 제거 모식도',
    },
    candidates: ['큰 혈전', '혈전용해제 사용 불가', '급성기 심한 부종'],
    features: [
      {
        label: '시술시간',
        description: '약 1~2시간',
      },
      {
        label: '참고사항',
        description: '시술 중 혈전이 폐로 이동하는 것을 막기 위해 하대정맥 필터삽입술을 병행하기도 함',
      },
    ],
  },
  {
    id: 'angioplasty-stenting',
    category: '시술',
    title: '혈관확장시술',
    englishTitle: 'ANGIOPLASTY & STENTING',
    description:
      '혈전 제거 후에도 좁아져 있는 정맥을 풍선으로 넓히고, 스텐트를 넣어 넓어진 상태를 유지하는 시술입니다. 혈전이 생긴 원인을 바로잡아 재발을 줄이는 것이 목적입니다.',
    image: {
      src: '/vascular/venous/thrombosis/treatments/angioplasty-stenting.png',
      alt: '혈관 내부 스텐트 삽입 모식도',
    },
    candidates: ['혈전증이 반복되는 경우', '정맥 협착', '메이터너 증후군'],
    features: [
      {
        label: '시술시간',
        description: '약 1~2시간',
      },
      {
        label: '시술 후',
        description: '항응고제 복용 및 정기 초음파로 스텐트 상태 추적 관찰',
      },
    ],
  },
];
