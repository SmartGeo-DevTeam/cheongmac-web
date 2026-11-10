import type { ImageProps } from 'next/image';
import arteryBefore from '@/app/_assets/images/community/cases/artery-before.webp';
import veinBefore from '@/app/_assets/images/community/cases/vein-before.webp';
import reviewLetter from '@/app/_assets/images/community/cases/review-letter.webp';

/** 치료 사례에서만 사용하는 탭·진료분야 데이터 (시설안내와 공유하지 않음). */
export const caseTabs = [
  { id: 'before-after', label: '치료 전후' },
  { id: 'reviews', label: '환자 후기' },
  { id: 'interviews', label: '영상 인터뷰' },
] as const;

export type CaseTabId = (typeof caseTabs)[number]['id'];

export const caseCategories = [
  { id: 'all', label: '전체' },
  { id: 'varicose', label: '하지정맥류' },
  { id: 'pelvic-vein', label: '골반정맥류' },
  { id: 'varicocele', label: '정계정맥류' },
  { id: 'fibroids', label: '자궁근종' },
  { id: 'peripheral-artery', label: '하지동맥폐색증' },
  { id: 'dialysis-access', label: '투석혈관' },
  { id: 'diabetic-foot', label: '당뇨발' },
  { id: 'dvt', label: '심부정맥혈전증' },
  { id: 'other', label: '기타' },
] as const;

export type CaseCategoryId = (typeof caseCategories)[number]['id'];
export type CaseFieldId = Exclude<CaseCategoryId, 'all'>;

/** 목록·상세에서 공통으로 사용하는 정보. 진료 관련 항목은 입력한 경우에만 노출합니다. */
type CasePostBase = {
  id: string;
  category: CaseFieldId;
  title: string;
  description: string;
  date: string;
  patient?: string;
  age?: number;
  sex?: '남성' | '여성';
  views?: number;
  diagnosis?: string;
  treatmentInfo?: string;
  beforeTreatment?: string;
};

/** 종류별로 필요한 데이터만 요구하는 판별 유니언 타입입니다. */
export type CasePost = CasePostBase & (
  | {
      kind: 'before-after';
      image: ImageProps['src'];
      imageAlt: string;
      /** 이전 데이터와의 호환용. 실제 치료 후 공개 여부는 서버 인증으로만 결정합니다. */
      loginRequired?: boolean;
    }
  | {
      kind: 'reviews';
      /** 직접 등록한 편지/후기 대표 이미지 */
      image: ImageProps['src'];
      imageAlt: string;
      /** 실제 후기 전문(여러 문단은 빈 줄로 구분). */
      reviewBody: string;
    }
  | {
      kind: 'interviews';
      /** 영상 URL이 아닌 YouTube 영상 ID(11자리)만 저장합니다. */
      youtubeId?: string;
      /** 서버의 YouTube Data API에서 조회한 URL (클라이언트에 API 키 노출 없음). */
      youtubeThumbnailUrl?: string;
      interviewBody?: string;
    }
);

const ARTERY = arteryBefore;
const VEIN = veinBefore;
const LETTER = reviewLetter;

/**
 * 화면 구현 확인용 가상 사례 데이터입니다. 실제 병원 진료 기록이나 치료 성과가 아닙니다.
 * 공개 전에 실제 게시글 데이터로 교체하세요. 영상 인터뷰는 youtubeId로 썸네일과 재생 화면을 연결합니다.
 * DB 연결 시 category는 위의 진료분야 id를 사용합니다.
 */
export const casePosts: CasePost[] = [
  {
    id: 'case-001',
    diagnosis: '하지동맥폐색증',
    treatmentInfo: '스텐트삽입술 (디자인 예시)',
    beforeTreatment: '다리 통증으로 내원해 혈관 상태를 확인하고 치료를 상담한 가상 예시입니다.',
    kind: 'before-after',
    category: 'peripheral-artery',
    title: '스텐트삽입술',
    description:
      '간헐적 파행과 다리 불편감으로 검사를 진행한 사례의 치료 전후 비교입니다.',
    date: '2026-08-22',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '한○성',
    age: 52,
    sex: '남성',
    views: 52,
    loginRequired: true,
  },
  {
    id: 'case-002',
    diagnosis: '하지정맥류 (4기)',
    treatmentInfo: '레이저정맥폐쇄술 및 발거술 (디자인 예시)',
    beforeTreatment: '다리 불편감과 무거운 느낌을 호소하여 검사와 상담을 진행한 가상 예시입니다.',
    kind: 'before-after',
    category: 'varicose',
    title: '레이저정맥폐쇄술 발거술',
    description: '하지정맥류 관련 검사와 치료 방법을 안내하는 예시 사례입니다.',
    date: '2026-08-19',
    image: VEIN,
    imageAlt: '다리 정맥 사진 예시',
    patient: '김○영',
    age: 46,
    sex: '여성',
    views: 83,
    loginRequired: true,
  },
  {
    id: 'case-003',
    kind: 'before-after',
    category: 'peripheral-artery',
    title: '하지동맥 혈관중재술',
    description:
      '하지동맥 질환의 영상 검사 결과와 중재 치료 과정을 소개합니다.',
    date: '2026-08-15',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '박○준',
    age: 58,
    sex: '남성',
    views: 67,
    loginRequired: true,
  },
  {
    id: 'case-004',
    kind: 'before-after',
    category: 'pelvic-vein',
    title: '골반정맥 색전술',
    description:
      '골반정맥 질환에 대한 영상 진단과 치료 과정을 정리한 예시입니다.',
    date: '2026-08-12',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '이○정',
    age: 43,
    sex: '여성',
    views: 31,
    loginRequired: true,
  },
  {
    id: 'case-005',
    kind: 'before-after',
    category: 'varicose',
    title: '고주파정맥폐쇄술',
    description: '하지정맥류의 치료 전후 이미지를 비교하는 디자인 예시입니다.',
    date: '2026-08-10',
    image: VEIN,
    imageAlt: '다리 정맥 사진 예시',
    patient: '정○미',
    age: 54,
    sex: '여성',
    views: 74,
    loginRequired: true,
  },
  {
    id: 'case-006',
    kind: 'before-after',
    category: 'varicocele',
    title: '정계정맥류 색전술',
    description: '정계정맥류 영상 검사와 치료 사례의 예시 콘텐츠입니다.',
    date: '2026-08-07',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '최○우',
    age: 35,
    sex: '남성',
    views: 46,
    loginRequired: true,
  },
  {
    id: 'case-007',
    kind: 'before-after',
    category: 'fibroids',
    title: '자궁동맥 색전술',
    description: '자궁근종의 진단과 시술 방법을 소개하는 카드 예시입니다.',
    date: '2026-08-04',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '오○희',
    age: 49,
    sex: '여성',
    views: 58,
    loginRequired: true,
  },
  {
    id: 'case-008',
    kind: 'before-after',
    category: 'dialysis-access',
    title: '투석혈관 풍선확장술',
    description: '투석혈관 협착에 대한 중재 시술 과정의 예시입니다.',
    date: '2026-08-02',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '조○호',
    age: 63,
    sex: '남성',
    views: 29,
    loginRequired: true,
  },
  {
    id: 'case-009',
    kind: 'before-after',
    category: 'diabetic-foot',
    title: '당뇨발 혈류개선술',
    description: '당뇨발 관련 혈관 진단 및 치료 과정의 예시 콘텐츠입니다.',
    date: '2026-07-28',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '임○섭',
    age: 61,
    sex: '남성',
    views: 42,
    loginRequired: true,
  },
  {
    id: 'case-010',
    kind: 'before-after',
    category: 'dvt',
    title: '심부정맥 혈전 치료',
    description: '심부정맥혈전증 진단 및 치료 내용을 소개하는 카드 예시입니다.',
    date: '2026-07-25',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '유○은',
    age: 41,
    sex: '여성',
    views: 39,
    loginRequired: true,
  },
  {
    id: 'case-011',
    kind: 'before-after',
    category: 'other',
    title: '혈관 초음파 진단 사례',
    description: '영상 장비를 활용한 혈관 상태 확인 과정의 예시입니다.',
    date: '2026-07-22',
    image: VEIN,
    imageAlt: '다리 정맥 사진 예시',
    patient: '신○호',
    age: 57,
    sex: '남성',
    views: 24,
    loginRequired: true,
  },
  {
    id: 'case-012',
    kind: 'before-after',
    category: 'peripheral-artery',
    title: '말초동맥 스텐트 시술',
    description: '말초동맥 협착 부위의 치료 전후 구성 예시입니다.',
    date: '2026-07-19',
    image: ARTERY,
    imageAlt: '혈관 영상 예시',
    patient: '강○수',
    age: 69,
    sex: '남성',
    views: 55,
    loginRequired: true,
  },
  {
    id: 'case-013',
    kind: 'reviews',
    reviewBody: '처음 병원을 찾기까지 고민이 많았습니다. 진료를 받으며 궁금했던 부분을 차근차근 질문할 수 있었고, 설명을 듣고 나니 마음이 한결 편해졌습니다.\n\n검사 과정과 이후 일정도 이해하기 쉽게 안내받았습니다. 이 글은 실제 환자가 작성한 후기가 아닌 화면 구성을 위한 예시입니다.\n\n앞으로도 건강 상태를 꾸준히 살펴보려 합니다.',
    category: 'varicose',
    title: '하지정맥류 진료 후기',
    description: '진료 과정에서 느낀 점을 정리한 가상 환자 후기 예시입니다.',
    date: '2026-07-17',
    image: LETTER,
    imageAlt: '환자 후기 편지 스타일의 디자인용 샘플 이미지',
    patient: '배○경',
    age: 38,
    sex: '여성',
    views: 35,
    diagnosis: '하지정맥류',
  },
  {
    id: 'case-014',
    kind: 'reviews',
    reviewBody: '내원하기 전에는 낯선 검사 이름 때문에 걱정이 앞섰습니다. 상담 시간에 제 증상을 정리해 이야기하고 검사 목적과 주의사항을 들을 수 있었습니다.\n\n진료를 마친 뒤에는 평소 궁금했던 생활 습관에 대해서도 질문했습니다. 본 글은 실제 환자의 경험이나 치료 효과를 보장하지 않는 시안용 가상 문구입니다.',
    category: 'pelvic-vein',
    title: '골반정맥 진료 경험',
    description: '검사와 진료 상담에 관한 예시 후기 콘텐츠입니다.',
    date: '2026-07-15',
    image: LETTER,
    imageAlt: '환자 후기 편지 스타일의 디자인용 샘플 이미지',
    patient: '서○진',
    age: 44,
    sex: '여성',
    views: 21,
  },
  {
    id: 'case-015',
    kind: 'reviews',
    reviewBody: '병원을 방문하기 전 무엇을 준비해야 할지 몰라 여러 번 안내문을 읽었습니다. 접수부터 상담까지의 과정을 기록해 두고 싶어서 이렇게 글을 남깁니다.\n\n상담 후에는 안내받은 내용을 천천히 정리했습니다. 이 후기는 레이아웃 검증을 위해 작성한 가상 텍스트입니다.',
    category: 'varicose',
    title: '하지정맥류 시술 상담 후기',
    description: '시술 전 상담부터 내원까지의 경험을 담는 예시 콘텐츠입니다.',
    date: '2026-07-11',
    image: LETTER,
    imageAlt: '환자 후기 편지 스타일의 디자인용 샘플 이미지',
    patient: '하○민',
    age: 51,
    sex: '여성',
    views: 19,
    treatmentInfo: '시술 상담 (디자인 예시)',
  },
  {
    id: 'case-016',
    kind: 'interviews',
    category: 'peripheral-artery',
    title: '하지동맥 치료 인터뷰',
    description: '혈관질환 진단과 치료 경험을 소개하는 인터뷰 예시입니다.',
    date: '2026-07-09',
    patient: '구○범',
    age: 62,
    sex: '남성',
    views: 48,
    // youtubeId: '실제_11자리_영상ID', // 등록 시 공개 썸네일 자동 표시, API 키 설정 시 메타데이터 조회
    interviewBody: '인터뷰 영상이 등록되면 이곳에서 재생할 수 있습니다. 본 설명은 디자인 확인용입니다.',
  },
  {
    id: 'case-017',
    kind: 'interviews',
    category: 'varicose',
    title: '하지정맥류 인터뷰',
    description: '하지정맥류 검사와 진료 경험을 나누는 인터뷰 예시입니다.',
    date: '2026-07-02',
    patient: '문○정',
    age: 45,
    sex: '여성',
    views: 27,
    // youtubeId: '실제_11자리_영상ID', // 등록 시 공개 썸네일 자동 표시, API 키 설정 시 메타데이터 조회
    interviewBody: '인터뷰 영상이 등록되면 이곳에서 재생할 수 있습니다. 본 설명은 디자인 확인용입니다.',
  },
];
