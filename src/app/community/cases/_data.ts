export type TreatmentCaseKind = 'treatment' | 'review' | 'video';

export type TreatmentCaseDetailMedia =
  | {
      type: 'before-after';
      comparisonImage: string;
      diagnosticComparisonImage?: string;
    }
  | {
      type: 'youtube';
      youtubeUrl: string;
      fallbackImage?: string;
    };

export type TreatmentCase = {
  id: number;
  kind: TreatmentCaseKind;
  category: string;
  title: string;
  description: string;
  patientName: string;
  age: number;
  sex: '남성' | '여성';
  date: string;
  thumbnail: string;
  diagnosis: string;
  treatment: string;
  before: string;
  after: string;
  detailMedia: TreatmentCaseDetailMedia;
};

const COMMON_BEFORE =
  '내원 당시 밤에 통증이 심하게 나타났고, 다리로 뻗치는 통증으로 인해 걷는 것과 일상생활에 큰 불편을 겪고 계셨던 환자분입니다. MRI 검사 결과 허리뼈 3~4번 사이의 디스크가 많이 튀어나온 상태로 확인되어, 수술적 치료가 고려될 수 있는 상황이었습니다.';

const COMMON_AFTER =
  '퇴원 이후에도 꾸준한 외래 치료를 이어가면서 하루 약 6km 보행 운동 등 생활 습관 교정을 병행하였고, 치료 약 8개월 후 시행한 추적 MRI 검사에서 튀어나왔던 병변이 크게 감소한 것을 확인하였습니다. 최근 발가락 쪽으로 일시적인 잔여 증상이 나타나긴 했으나 구조적인 문제는 이미 호전된 상태로, 앞으로도 꾸준한 관리와 좋은 경과가 기대됩니다.';

const BEFORE_AFTER_MEDIA: TreatmentCaseDetailMedia = {
  type: 'before-after',
  comparisonImage: '/assets/images/treatment-cases/case-before-after.jpg',
  diagnosticComparisonImage:
    '/assets/images/treatment-cases/case-ct-before-after.jpg',
};

/*
 * YouTube 더미 연결값입니다.
 * 실제 게시물 데이터 연동 시 해당 치료사례의 YouTube URL만 넣으면 됩니다.
 * watch / youtu.be / embed 형식을 모두 상세 컴포넌트에서 처리합니다.
 */
const YOUTUBE_MEDIA: TreatmentCaseDetailMedia = {
  type: 'youtube',
  youtubeUrl: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
  fallbackImage: '/assets/images/treatment-cases/case-video.jpg',
};

export const TREATMENT_CASES: TreatmentCase[] = [
  {
    id: 1,
    kind: 'treatment',
    category: '말초동맥폐쇄증',
    title: '스텐트삽입술',
    description:
      '간헐적 파행, 하지 통증으로 내원하였습니다. 증상과 검사 결과를 바탕으로 치료를 진행한 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-22',
    thumbnail: '/assets/images/treatment-cases/case-ct.jpg',
    diagnosis: '하지정맥류 (4기)',
    treatment: '레이저',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 2,
    kind: 'treatment',
    category: '하지정맥류',
    title: '레이저정맥폐쇄술 발거술',
    description:
      '간헐적 파행, 하지 통증으로 내원하였습니다. 증상과 검사 결과를 바탕으로 치료를 진행한 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-22',
    thumbnail: '/assets/images/treatment-cases/case-leg.jpg',
    diagnosis: '하지정맥류 (4기)',
    treatment: '레이저',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 3,
    kind: 'treatment',
    category: '말초동맥폐쇄증',
    title: '스텐트삽입술',
    description:
      '간헐적 파행, 하지 통증으로 내원하였습니다. 증상과 검사 결과를 바탕으로 치료를 진행한 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-22',
    thumbnail: '/assets/images/treatment-cases/case-ct.jpg',
    diagnosis: '말초동맥폐쇄증',
    treatment: '스텐트삽입술',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 4,
    kind: 'review',
    category: '하지정맥류',
    title: '치료 후 일상이 한결 편해졌어요',
    description:
      '하지 불편감으로 치료를 받은 뒤 일상생활이 편해졌다는 환자분의 치료 후기를 정리했습니다.',
    patientName: '김○○',
    age: 48,
    sex: '여성',
    date: '2026-08-20',
    thumbnail: '/assets/images/treatment-cases/case-leg.jpg',
    diagnosis: '하지정맥류',
    treatment: '혈관내 치료',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 5,
    kind: 'video',
    category: '투석혈관',
    title: '이제 투석해도 아주 쌩쌩합니다!',
    description:
      '치료 과정과 회복 후 모습을 영상 인터뷰 형식으로 확인할 수 있는 더미 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-18',
    thumbnail: '/assets/images/treatment-cases/case-video.jpg',
    diagnosis: '투석혈관 협착증',
    treatment: '풍선성형술 (2024.05.14 시행)',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: YOUTUBE_MEDIA,
  },
  {
    id: 6,
    kind: 'treatment',
    category: '하지정맥류',
    title: '레이저정맥폐쇄술 발거술',
    description:
      '간헐적 파행, 하지 통증으로 내원하였습니다. 증상과 검사 결과를 바탕으로 치료를 진행한 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-15',
    thumbnail: '/assets/images/treatment-cases/case-leg.jpg',
    diagnosis: '하지정맥류 (4기)',
    treatment: '레이저',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 7,
    kind: 'treatment',
    category: '말초동맥폐쇄증',
    title: '스텐트삽입술',
    description:
      '간헐적 파행, 하지 통증으로 내원하였습니다. 증상과 검사 결과를 바탕으로 치료를 진행한 사례입니다.',
    patientName: '한○○',
    age: 52,
    sex: '남성',
    date: '2026-08-12',
    thumbnail: '/assets/images/treatment-cases/case-ct.jpg',
    diagnosis: '말초동맥폐쇄증',
    treatment: '스텐트삽입술',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 8,
    kind: 'review',
    category: '말초동맥폐쇄증',
    title: '걷는 거리가 조금씩 늘어났어요',
    description:
      '치료 전후 보행 불편의 변화를 중심으로 정리한 환자 후기 더미 콘텐츠입니다.',
    patientName: '박○○',
    age: 61,
    sex: '남성',
    date: '2026-08-08',
    thumbnail: '/assets/images/treatment-cases/case-ct.jpg',
    diagnosis: '말초동맥폐쇄증',
    treatment: '혈관내 치료',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: BEFORE_AFTER_MEDIA,
  },
  {
    id: 9,
    kind: 'video',
    category: '투석혈관',
    title: '투석혈관 치료 후 달라진 일상',
    description:
      '치료 후 생활의 변화를 인터뷰 형식으로 소개하는 더미 영상 사례입니다.',
    patientName: '이○○',
    age: 59,
    sex: '여성',
    date: '2026-08-02',
    thumbnail: '/assets/images/treatment-cases/case-video.jpg',
    diagnosis: '투석혈관 협착증',
    treatment: '풍선성형술',
    before: COMMON_BEFORE,
    after: COMMON_AFTER,
    detailMedia: YOUTUBE_MEDIA,
  },
];

export const TREATMENT_CASE_COUNT = 2343;

export function getTreatmentCase(id: string | number) {
  const numericId = Number(id);
  return TREATMENT_CASES.find((item) => item.id === numericId) ?? null;
}
