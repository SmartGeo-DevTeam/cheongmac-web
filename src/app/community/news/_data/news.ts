export type NewsCategory = 'inside' | 'press';

export type NewsItem = {
  id: number;
  category: NewsCategory;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  source?: string;
  sourceClassName?: string;
};

const BASE_NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: 'inside',
    title: '2027년 서면 메디컬센터 확장 이전 안내',
    excerpt:
      '더 나은 의료 환경과 진료 서비스를 위해 청맥병원이 새로운 공간으로 확장 이전을 준비합니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/expansion.webp',
  },
  {
    id: 2,
    category: 'inside',
    title: '제헌절 휴진 안내',
    excerpt:
      '제헌절 진료 일정을 안내드립니다. 내원 전 진료시간을 확인해 주세요.',
    date: '2026.10.28',
    imageSrc: '/assets/news/holiday.webp',
  },
  {
    id: 3,
    category: 'inside',
    title: '청맥병원 개원 16주년',
    excerpt:
      '청맥병원이 개원 16주년을 맞았습니다. 보내주신 신뢰에 더 좋은 진료로 보답하겠습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/anniversary.webp',
  },
  {
    id: 4,
    category: 'inside',
    title: '2026년 새해 인사',
    excerpt:
      '새해에도 건강과 행복이 가득하시길 바랍니다. 청맥병원이 늘 함께하겠습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/new-year.webp',
  },
  {
    id: 5,
    category: 'inside',
    title: '원데이 수술 안내',
    excerpt:
      '검사부터 수술, 회복과 퇴원까지 환자분의 일상을 고려한 진료 시스템을 안내합니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/one-day-surgery.webp',
  },
  {
    id: 6,
    category: 'inside',
    title: '투석혈관 치료 전문 보훈위탁병원 지정',
    excerpt: '청맥병원이 투석혈관 치료 전문 보훈위탁병원으로 지정되었습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/certified-hospital.webp',
  },
  {
    id: 7,
    category: 'inside',
    title: '당일접수 진료 안내',
    excerpt:
      '오전·오후 진료 접수 시간을 확인하시고 편안한 내원을 준비해 주세요.',
    date: '2026.10.28',
    imageSrc: '/assets/news/same-day-care.webp',
  },
  {
    id: 8,
    category: 'inside',
    title: '정맥질환 지침서 공동 번역 집필 참여',
    excerpt:
      '청맥병원 의료진이 정맥 및 림프장애 분야의 전문 지침서 공동 번역과 집필에 참여했습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/manual.webp',
  },
  {
    id: 9,
    category: 'inside',
    title: '변승재 원장, 3관왕 달성!',
    excerpt:
      '변승재 원장이 연구·학술·치료성과 분야에서 의미 있는 성과를 거두며 전문성을 다시 한 번 인정받았습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/three-awards.webp',
  },
  {
    id: 10,
    category: 'inside',
    title: '하지정맥류 수술 5만례 달성',
    excerpt:
      '청맥병원이 하지정맥류 수술 누적 5만례를 달성했습니다. 축적된 경험을 바탕으로 안전한 진료를 이어갑니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/fifty-thousand.webp',
  },
  {
    id: 11,
    category: 'inside',
    title: '일본 의료진 혈관치료 술기 교류 방문',
    excerpt:
      '일본 의료진이 청맥병원을 방문해 혈관치료 술기와 임상 경험을 함께 나누는 시간을 가졌습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/japan-visit.webp',
  },
  {
    id: 12,
    category: 'inside',
    title: '박용범 원장, 대한혈관외과학회 공로상 수상',
    excerpt:
      '박용범 원장이 혈관외과 분야의 발전과 학술 활동에 기여한 공로를 인정받아 공로상을 수상했습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/society-award.webp',
  },
  {
    id: 13,
    category: 'press',
    title: "부산 서면역, 17년 만에 역명 부기 계획···'청맥병원' 이름 달린다",
    excerpt:
      '청맥병원이 첨단 정맥외과학회 정수를 담은 세계적인 지침서의 국내 번역과 집필에 참여했습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/seomyeon-station.webp',
    source: 'KNN',
    sourceClassName: 'text-[#E5252A]',
  },
  {
    id: 14,
    category: 'press',
    title: "국내 첫 '정맥·림프장애 매뉴얼북' 발간",
    excerpt:
      '청맥병원이 정맥·림프장애 분야의 세계적인 지침서 번역 및 집필에 참여하며 전문성을 넓혔습니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/manual.webp',
    source: '경남의사',
    sourceClassName: 'bg-[#126994] px-1 text-white',
  },
  {
    id: 15,
    category: 'press',
    title:
      '[의학칼럼] 보험 환경 변화 속 하지정맥류 부거술이 다시 언급되는 이유',
    excerpt:
      '보장 환경 변화와 의료 현장의 흐름 속에서 하지정맥류 치료 방법의 선택 기준을 살펴봅니다.',
    date: '2026.10.28',
    imageSrc: '/assets/doctors/bak-headshot-mobile.png',
    source: '헬스조선',
    sourceClassName: 'font-bold text-[#202020]',
  },
  {
    id: 16,
    category: 'press',
    title:
      "[의학칼럼] '허리 디스크인 줄 알고 찾았는데'···다리 절단 부르는 질환",
    excerpt:
      '일상적인 다리 통증처럼 보여도 주의해야 할 혈관질환의 신호와 조기 진단의 중요성을 전합니다.',
    date: '2026.10.28',
    imageSrc: '/assets/doctors/byun-headshot-mobile.png',
    source: '헬스조선',
    sourceClassName: 'font-bold text-[#202020]',
  },
  {
    id: 17,
    category: 'press',
    title: '청맥병원, 하지정맥류 누적 5만례 달성',
    excerpt:
      '청맥병원은 이번 누적 5만례를 계기로 전문 진료 경험과 치료 성과를 더욱 체계적으로 이어갈 계획입니다.',
    date: '2026.10.28',
    imageSrc: '/assets/news/fifty-thousand.webp',
    source: 'MDTODAY',
    sourceClassName: 'font-extrabold text-[#3555A4]',
  },
];

const ALL_NEWS_ORDER = [
  1, 2, 3, 4, 5, 6, 7, 13, 14, 8, 9, 10, 11, 12, 15, 16, 17,
];

const ORDERED_BASE_NEWS_ITEMS = ALL_NEWS_ORDER.map((id) =>
  BASE_NEWS_ITEMS.find((item) => item.id === id),
).filter((item): item is NewsItem => Boolean(item));

const MOCK_PAGE_REPEAT_COUNT = 3;

/**
 * 실제 CMS/API 연동 전 페이지네이션 동작을 확인하기 위한 더미 데이터입니다.
 * 같은 콘텐츠를 반복하되 id만 고유하게 만들어 React key와 페이지 이동이 정상 동작합니다.
 */
export const NEWS_ITEMS: NewsItem[] = Array.from(
  { length: MOCK_PAGE_REPEAT_COUNT },
  (_, repeatIndex) =>
    ORDERED_BASE_NEWS_ITEMS.map((item) => ({
      ...item,
      id: repeatIndex * BASE_NEWS_ITEMS.length + item.id,
    })),
).flat();
