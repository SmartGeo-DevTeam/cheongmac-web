import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';

/** 하지정맥류 치료법 5종. 추후 DB 조회 결과로 대체할 수 있는 정적 콘텐츠. */
export const varicoseTreatmentMethods: readonly TreatmentMethod[] = [
  {
    id: 'stripping-cryostripping',
    category: '수술',
    title: '발거술·냉동발거술',
    englishTitle: 'Stripping · Cryostripping',
    description:
      '역류가 시작되는 정맥 입구를 묶고 문제 정맥을 몸 밖으로 직접 제거하는 근본 수술입니다. 최근에는 냉동발거술(Cryostripping)로 발전해, 최소 절개로 정맥을 얼려 제거함으로써 주변 조직 손상을 줄이는 방법으로 시행합니다.',
    image: {
      src: '/vascular/venous/varicose/treatments/stripping-cryostripping.png',
      alt: '발거술·냉동발거술 치료 예시 이미지',
    },
    candidates: [
      '굵은 혈관',
      '굴곡이 심해 카테터 진입이 어려운 정맥',
      '진행된 정맥류',
      '재발한 정맥류',
      '합병증 동반',
    ],
    features: [
      { label: '마취 방법', description: '국소마취, 수면마취, 부위마취' },
      { label: '수술 시간', description: '약 1시간' },
      { label: '회복 기간', description: '3일 후 가벼운 일상생활 가능' },
      { label: '보험 적용', description: '건강보험 급여 (적용 기준 충족 시)' },
    ],
  },
  {
    id: 'endovenous-thermal-ablation',
    category: '열치료 시술',
    title: '열 에너지 정맥폐쇄술',
    englishTitle: 'ENDOVENOUS THERMAL ABLATION',
    description:
      '정맥 안에 레이저나 고주파 기구를 넣어 열로 혈관을 막는 치료입니다. 절개 없이 초음파를 보며 시행하며, 오랜 기간 효과가 확인된 표준 치료 중 하나입니다.',
    image: {
      src: '/vascular/venous/varicose/treatments/endovenous-thermal-ablation.png',
      alt: '열 에너지 정맥폐쇄술 치료 예시 이미지',
    },
    candidates: [
      '복재정맥 역류',
      '비교적 곧은 혈관',
      '중간 굵기 혈관',
      '절개 부담이 큰 경우',
    ],
    features: [
      { label: '마취 방법', description: '국소마취, 수면마취' },
      { label: '수술 시간', description: '40분 ~ 1시간' },
      { label: '회복 기간', description: '1~2일 후 가벼운 일상생활 가능' },
    ],
  },
  {
    id: 'mechanochemical-ablation',
    category: '비열치료 시술',
    title: '기계화학 정맥폐쇄술',
    englishTitle: 'MOCA, Mechanochemical Ablation',
    description:
      '열 대신 회전하는 카테터로 혈관 내벽을 자극하면서 경화제를 주입해 혈관을 막는 치료입니다. 클라리베인, 플레보그립 등이 있으며 열에 의한 주변 조직 손상 우려가 적습니다.',
    image: {
      src: '/vascular/venous/varicose/treatments/mechanochemical-ablation.png',
      alt: '기계화학 정맥폐쇄술 치료 예시 이미지',
    },
    candidates: [
      '신경과 가까운 부위',
      '열 손상 우려될 때',
      '마취 부담이 큰 경우',
    ],
    features: [
      { label: '마취 방법', description: '국소마취, 수면마취, 부위마취' },
      { label: '수술 시간', description: '30분 ~ 40분' },
      { label: '회복 기간', description: '다음 날부터 일상생활 가능' },
    ],
  },
  {
    id: 'cyanoacrylate-closure',
    category: '비열치료 시술',
    title: '접착 복재정맥폐색술',
    englishTitle: 'CYANOACRYLATE CLOSURE',
    description:
      '의료용 접착제를 혈관 안에 주입하고 압박을 가해 정맥 벽을 접착하여 폐쇄하는 방법입니다. 베나실, 누베나 등이 있으며 통증이 적고 회복이 빠르다는 장점이 있지만 약물에 의한 알레르기 반응이 나타날 수 있습니다.',
    image: {
      src: '/vascular/venous/varicose/treatments/cyanoacrylate-closure.png',
      alt: '접착 복재정맥폐색술 치료 예시 이미지',
    },
    candidates: [
      '마취 부담이 큰 경우',
      '혈관 직경 3~9mm',
    ],
    features: [
      { label: '마취 방법', description: '국소마취, 수면마취' },
      { label: '수술 시간', description: '30분 ~ 40분' },
      { label: '회복 기간', description: '다음 날부터 일상생활 가능' },
    ],
  },
  {
    id: 'sclerotherapy',
    category: '주사치료',
    title: '혈관경화요법',
    englishTitle: 'SCLEROTHERAPY · UGFS',
    description:
      '정맥에 경화제를 주사해 혈관을 막고 서서히 흡수되도록 하는 치료입니다. 피부 표면의 가는 혈관은 직접 주사하고, 눈에 보이지 않는 깊은 정맥은 초음파로 위치를 확인하며 경화제를 주입하는 초음파 유도하 경화요법(UGFS)으로 시행합니다. 시술 후 일시적인 피부변색이 나타날 수 있습니다.',
    image: {
      src: '/vascular/venous/varicose/treatments/sclerotherapy.png',
      alt: '혈관경화요법 치료 예시 이미지',
    },
    candidates: [
      '거미양 혈관',
      '망상정맥',
      '시술 후 남은 잔여 혈관',
    ],
    features: [
      { label: '마취 방법', description: '국소마취, 수면마취' },
      { label: '수술 시간', description: '40분 ~ 1시간' },
      { label: '회복 기간', description: '1~2일 후 가벼운 일상생활 가능' },
    ],
  },
];
