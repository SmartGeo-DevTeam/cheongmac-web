export type SocietyYear = number;

export type SocietyFeatured = {
  id: string;
  title: string;
  date: string;
  description: string;
  english: string;
  image: string;
};

export type SocietyActivity = {
  id: string;
  year: SocietyYear;
  society: string;
  title: string;
  description: string;
  english?: string;
  image: string;
};

export const SOCIETY_YEARS: SocietyYear[] = [
  2026,
  2025,
  2024,
  2023,
  2022,
  2021,
  2020,
  2019,
  2018,
];

export const SOCIETY_FEATURED: SocietyFeatured[] = [
  {
    id: 'avec-2025',
    title: '[AVEC 심포지엄] 변승재 원장 발표',
    date: '2025.05.30',
    description:
      '공통대퇴정맥 판막·폐쇄성 정맥질환에서 스텐트 삽입술의 유효성과 장기 치료 성과를 주제로 발표했습니다.',
    english:
      '(Efficacy and Patency of Venous Stenting into the Common Femoral Vein for Iliofemoral Steno-occlusive Venous Lesions)',
    image: '/assets/images/society-activities/avec-symposium.png',
  },
  {
    id: 'spring-2026',
    title: '대한정맥학회 춘계학술대회 발표',
    date: '2026.04',
    description:
      '하지정맥류 치료 후 경과와 초음파 추적을 바탕으로 실제 임상 사례와 치료 경험을 공유했습니다.',
    english:
      '(Clinical Experience and Follow-up of Varicose Vein Treatment)',
    image: '/assets/images/society-activities/spring-conference-2026.png',
  },
  {
    id: 'venous-meeting',
    title: '정맥질환 최신 술기 및 치료경험 공유',
    date: '2025.02',
    description:
      '정맥질환 진단과 중재치료 과정에서 축적한 치료 경험을 학회 참석 의료진과 공유했습니다.',
    english:
      '(Case-based Discussion of Contemporary Venous Intervention)',
    image: '/assets/images/society-activities/venous-society-presentation.png',
  },
];

const AVEC_IMAGE = '/assets/images/society-activities/avec-symposium.png';
const SPRING_IMAGE =
  '/assets/images/society-activities/spring-conference-2026.png';
const PRESENTATION_IMAGE =
  '/assets/images/society-activities/venous-society-presentation.png';

export const SOCIETY_ACTIVITIES: SocietyActivity[] = [
  {
    id: '2026-spring-1',
    year: 2026,
    society: '대한정맥학회 춘계학술대회',
    title: '전진원 원장 발표',
    description:
      '정계정맥류 색전술의 치료 성과와 추적 관찰 사례를 중심으로 임상 경험을 공유했습니다.',
    english: '(Coil Embolization of Varicocele)',
    image: SPRING_IMAGE,
  },
  {
    id: '2026-spring-2',
    year: 2026,
    society: '대한정맥학회 춘계학술대회',
    title: '박용환 원장 발표',
    description:
      '새로운 비열치료 및 정맥중재 치료의 실제 적용 경험을 중심으로 발표했습니다.',
    english:
      '(Emerging Options in NITNT Therapy: Early Clinical Experience)',
    image: AVEC_IMAGE,
  },
  {
    id: '2026-avec',
    year: 2026,
    society: 'AVEC 심포지엄',
    title: '변승재 원장 발표',
    description:
      '정맥 스텐트 치료의 장기 성과와 공통대퇴정맥까지 이어지는 치료 전략을 소개했습니다.',
    english:
      '(Venous Stenting into the Common Femoral Vein for Iliofemoral Lesions)',
    image: AVEC_IMAGE,
  },
  {
    id: '2026-case',
    year: 2026,
    society: '대한혈관외과학회 학술교류',
    title: '혈관 중재치료 증례 발표',
    description:
      '실제 혈관질환 증례를 기반으로 영상 소견과 치료 전략을 공유했습니다.',
    image: PRESENTATION_IMAGE,
  },

  {
    id: '2025-avec',
    year: 2025,
    society: 'AVEC 심포지엄',
    title: '변승재 원장 발표',
    description:
      '폐쇄성 정맥질환에서의 스텐트 삽입술과 장기 치료 성과를 공유했습니다.',
    english:
      '(Efficacy and Patency of Venous Stenting into the Common Femoral Vein)',
    image: AVEC_IMAGE,
  },
  {
    id: '2025-venous',
    year: 2025,
    society: '대한정맥학회',
    title: '정맥질환 중재치료 증례 발표',
    description:
      '치료 후 추적 과정과 재협착 증례를 중심으로 임상 경험을 발표했습니다.',
    image: PRESENTATION_IMAGE,
  },

  {
    id: '2024-1',
    year: 2024,
    society: '국내 혈관 학술대회',
    title: '혈관질환 진단 및 치료 경험 공유',
    description:
      '진단 영상과 중재치료 사례를 중심으로 실제 임상 노하우를 소개했습니다.',
    image: PRESENTATION_IMAGE,
  },
  {
    id: '2024-2',
    year: 2024,
    society: '국제 정맥학 교류',
    title: '정맥질환 최신 치료 흐름 발표',
    description:
      '정맥질환의 최신 치료 흐름과 중재술 적용 사례를 공유했습니다.',
    image: AVEC_IMAGE,
  },

  {
    id: '2023-1',
    year: 2023,
    society: '국내 혈관 학술대회',
    title: '혈관중재치료 임상 사례 발표',
    description:
      '치료 계획 수립과 시술 후 추적 관리에 대한 경험을 공유했습니다.',
    image: PRESENTATION_IMAGE,
  },
  {
    id: '2023-2',
    year: 2023,
    society: '정맥질환 학술교류',
    title: '정맥질환 치료 전략 발표',
    description:
      '환자별 치료 선택과 장기 추적 경험을 중심으로 발표했습니다.',
    image: AVEC_IMAGE,
  },

  {
    id: '2022-1',
    year: 2022,
    society: '혈관외과 학술교류',
    title: '혈관질환 치료 증례 발표',
    description:
      '영상검사 결과와 실제 치료 과정을 바탕으로 임상 경험을 공유했습니다.',
    image: PRESENTATION_IMAGE,
  },
  {
    id: '2021-1',
    year: 2021,
    society: '정맥학 학술교류',
    title: '정맥질환 임상 경험 발표',
    description:
      '정맥질환 치료 과정에서 축적한 주요 임상 경험을 소개했습니다.',
    image: AVEC_IMAGE,
  },
  {
    id: '2020-1',
    year: 2020,
    society: '혈관질환 학술교류',
    title: '혈관질환 증례 및 치료 경험 공유',
    description:
      '혈관질환 환자의 진단과 치료 흐름을 실제 증례를 통해 발표했습니다.',
    image: PRESENTATION_IMAGE,
  },
  {
    id: '2019-1',
    year: 2019,
    society: '혈관외과 학술교류',
    title: '혈관중재치료 경험 발표',
    description:
      '중재치료 과정과 치료 후 관리 경험을 공유했습니다.',
    image: AVEC_IMAGE,
  },
  {
    id: '2018-1',
    year: 2018,
    society: '정맥질환 학술교류',
    title: '정맥질환 치료 경험 발표',
    description:
      '정맥질환 환자의 진단과 치료 경험을 학술대회에서 공유했습니다.',
    image: PRESENTATION_IMAGE,
  },
];
