import type { OcclusionTreatmentMethod } from '@/app/_types/vascular/arterial/occlusion/treatments';

/**
 * 현재 상세 페이지의 치료법 문구·시기·수치를 원본 주석에서 그대로 옮겼습니다.
 * 의료적 적합성 및 안내 문구는 공개 전 의료진 검토가 필요합니다.
 */
export const occlusionTreatmentMethods: readonly OcclusionTreatmentMethod[] = [
  {
    id: 'angioplasty',
    category: '시술',
    title: '풍선성형술',
    englishTitle: 'Angioplasty',
    description: '좁아진 혈관 안에 풍선 카테터를 삽입해 혈관을 넓혀주는 시술입니다. 흉터/스트레스가 적고, 빠른 일상생활 복귀가 가능하다는 장점이 있지만 다시 좁아지는 재협착이 발생할 수 있습니다.',
    image: { src: '/vascular/arterial/occlusion/treatments/angioplasty.png', alt: '풍선성형술 예시 이미지' },
    candidates: ['단일 협착', '짧은 병변', '고령·고위험군'],
    features: [
      { label: '시술 1~2일 후', description: '가벼운 산책, 샤워, 출근 같은 일상적인 움직임은 바로 가능' },
      { label: '시술 1주일 후', description: '혈관을 천자한 부위가 완전히 아물 때까지 무거운 물건 들기, 격렬한 운동, 통목욕(사우나), 운전 피하기' },
    ],
  },
  {
    id: 'stent-placement',
    category: '시술',
    title: '스텐트 삽입술',
    englishTitle: 'stent Placement',
    description: '혈관이 다시 좁아질 우려가 있을 때, 금속 그물망(스텐트)을 혈관 안에 삽입해 형태를 유지시키는 시술입니다. 풍선확장술과 함께 시행하는 경우가 많으며, 혈관이 탄력을 잃었거나 석회화가 심한 경우에 특히 효과적입니다.',
    image: { src: '/vascular/arterial/occlusion/treatments/stent-placement.png', alt: '스텐트 삽입술 예시 이미지' },
    candidates: ['재협착', '석회화가 심한 병변', '혈관 탄력 저하'],
    features: [
      { label: '시술 1~2일 후', description: '가벼운 산책, 샤워, 출근 같은 일상적인 움직임은 바로 가능' },
      { label: '시술 1주일 후까지', description: '스텐트가 혈관 벽에 완전히 안착될 때까지 격렬한 운동, 무거운 물건 들기, 통목욕(사우나)는 피하기' },
    ],
  },
  {
    id: 'revascularization',
    category: '시술/수술',
    title: '혈관 재개통술',
    englishTitle: 'REVASCULARIZATION',
    description: '막힌 혈관의 혈류를 다시 회복시키는 치료입니다. 혈관을 직접 절개해 혈전이나 죽종(플라크)을 제거하는 수술적 방법과, 카테터(도관)를 혈관 안에 삽입해 흡입·용해로 제거하는 시술적 방법이 있으며, 막힌 원인과 위치·범위에 따라 적합한 방법을 결정합니다.',
    image: { src: '/vascular/arterial/occlusion/treatments/revascularization.png', alt: '혈관 재개통술 예시 이미지' },
    candidates: ['혈전으로 인한 급성 폐색', '카테터/절개 접근 가능 병변'],
    features: [
      { label: '카테터 시술 1~2일 후', description: '가벼운 일상 활동은 바로 가능' },
      { label: '절개 수술 후 1주일까지', description: '수술 부위가 아물 때까지 무거운 물건 들기, 격렬한 운동, 통목욕은 피하기' },
    ],
  },
  {
    id: 'hybrid-treatment',
    category: '시술+수술',
    title: '하이브리드 치료',
    englishTitle: 'HYBRID TREATMENT',
    description: '시술과 수술을 한 번의 마취로 동시에 시행하는 치료 방식입니다. 환자의 혈관 상태에 따라 가장 적합한 치료법을 선택할 수 있으며, 혈관 중재시술과 혈관 수술이 동시에 가능한 전용 하이브리드 수술실을 운영하고 있습니다.',
    image: { src: '/vascular/arterial/occlusion/treatments/hybrid-treatment.png', alt: '하이브리드 치료 예시 이미지' },
    candidates: ['다발성 복합 병변'],
    features: [
      { label: '수술 후 약 3~5일 가량', description: '입원하며 경과를 관찰하고, 환자 상태에 따라 의료진 판단 하에 퇴원일 조정' },
    ],
  },
  {
    id: 'bypass-surgery',
    category: '수술',
    title: '혈관 우회로 조성술',
    englishTitle: 'BYPASS SURGERY',
    description: '협착이나 폐색으로 혈류 공급이 원활하지 않은 부위에 새로운 우회로를 만들어 혈액순환을 개선하는 수술입니다. 막힌 혈관을 직접 뚫는 대신 환자의 다른 혈관이나 인조혈관을 이용해 막힌 구간을 건너뛰는 새로운 혈관 통로를 연결합니다.  장기적으로 더 안정적인 혈류를 확보할 수 있는 치료입니다.',
    image: { src: '/vascular/arterial/occlusion/treatments/bypass-surgery.png', alt: '혈관 우회로 조성술 예시 이미지' },
    candidates: ['긴 다발성 폐색', '심한 석회화', '젊은 연령', '시술 후 재협착 반복'],
    features: [
      { label: '입원 기간', description: '일정기간 입원이 필요하며, 환자의 상태에 따라 입원기간 상이' },
      { label: '수술 소요시간', description: '전신마취 하에 진행되며 수술 시간은 보통 2~6시간 정도 소요' },
    ],
  },
];
