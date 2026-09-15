import type {
  InlineContentData,
  InlineContentField,
} from '@/_lib/inline-content-shared';

const text = (
  key: string,
  label: string,
  description?: string,
): InlineContentField => ({
  key,
  label,
  type: 'text',
  description,
});

const textarea = (
  key: string,
  label: string,
  rows = 3,
): InlineContentField => ({
  key,
  label,
  type: 'textarea',
  rows,
});

export const HOME_PAGE_COPY_DEFAULTS: InlineContentData = {
  // 1. Cover controls
  coverPopupCountdownSuffix: '초 후 팝업이 닫힙니다.',
  coverPopupCloseNow: '바로 닫기',
  coverPopupHideToday: '오늘 하루 보지 않기',

  // 2. Specialties
  specialtiesEyebrow: '진료분야',
  specialtiesTitle1: '혈관 질환 전 영역을',
  specialtiesTitle2: '책임집니다',
  specialtiesDescription1:
    '우리 몸 구석구석 닿지 않는 곳 없는 혈관,',
  specialtiesDescription1Tail:
    '건강의 시작과 끝은 결국 혈관입니다.',
  specialtiesDescription2:
    '청맥은 숨은 근본 문제까지 찾아 해결해드립니다.',
  // 3. Doctors
  doctorsEyebrow: '당신의 혈관을 지키는 사람들',
  doctorsTitle1: '대학병원 20년 경험의',
  doctorsTitle2: '혈관 특화 전문의',
  doctorsViewAll: '의료진 모두 보기',
  doctorsSpecialistSuffix: '전문의',
  doctorsSchedule: '휴진일정',
  doctorsReservation: '예약하기',
  doctorsPrevAria: '이전 의료진',
  doctorsNextAria: '다음 의료진',

  // 5. Marquee
  marqueeText: 'CHEONGMAC VASCULAR HOSPITAL',

  // 6. Reviews
  reviewsEyebrow: '치료후기',
  reviewsTitle1: '치료 후 마주할 놀라운 변화,',
  reviewsTitle2: '먼저 경험한 분들의 이야기',
  reviewsDescription1:
    '청맥을 만나고 혈관 건강과 삶의 활력을 되찾은 분들.',
  reviewsDescription2:
    '전문의의 정확한 진단과 치료가 어떤 변화를 만드는지 직접 확인해 보세요.',
  reviewsMoreCases: '더 많은 사례 보기',
  reviewsImageHint: '사진을 눌러보세요!',
  reviewsPatientInfoLabel: '환자정보',
  reviewsTreatmentInfoLabel: '치료정보',
  reviewsDoctorLabel: '담당의사',
  reviewsLegalNote:
    '* 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.',
  reviewsLoginLabel: '로그인',
  reviewsMoreVideos: '더 많은 후기 보기',

  // 8. News / info
  infoEyebrow: '알려드립니다',
  infoTitle: '청맥병원 소식',
  infoMoreLabel: '더보기',
};

export const HOME_COPY_FIELD_KEYS = {
  cover: [
    'coverPopupCountdownSuffix',
    'coverPopupCloseNow',
    'coverPopupHideToday',
  ],
  specialties: [
    'specialtiesEyebrow',
    'specialtiesTitle1',
    'specialtiesTitle2',
    'specialtiesDescription1',
    'specialtiesDescription1Tail',
    'specialtiesDescription2',
  ],
  doctors: [
    'doctorsEyebrow',
    'doctorsTitle1',
    'doctorsTitle2',
    'doctorsViewAll',
    'doctorsSpecialistSuffix',
    'doctorsSchedule',
    'doctorsReservation',
    'doctorsPrevAria',
    'doctorsNextAria',
  ],
  marquee: ['marqueeText'],
  reviews: [
    'reviewsEyebrow',
    'reviewsTitle1',
    'reviewsTitle2',
    'reviewsDescription1',
    'reviewsDescription2',
    'reviewsMoreCases',
    'reviewsImageHint',
    'reviewsPatientInfoLabel',
    'reviewsTreatmentInfoLabel',
    'reviewsDoctorLabel',
    'reviewsLegalNote',
    'reviewsLoginLabel',
    'reviewsMoreVideos',
  ],
  info: [
    'infoEyebrow',
    'infoTitle',
    'infoMoreLabel',
  ],
} as const;

export const HOME_PAGE_COPY_FIELDS: readonly InlineContentField[] = [
  text('coverPopupCountdownSuffix', '팝업 자동닫힘 문구'),
  text('coverPopupCloseNow', '팝업 바로닫기 버튼'),
  text('coverPopupHideToday', '팝업 오늘 보지 않기 버튼'),

  text('specialtiesEyebrow', '진료분야 - 보조 제목'),
  text('specialtiesTitle1', '진료분야 - 제목 1'),
  text('specialtiesTitle2', '진료분야 - 제목 2'),
  text('specialtiesDescription1', '진료분야 - 설명 1 첫 문장'),
  text('specialtiesDescription1Tail', '진료분야 - 설명 1 둘째 문장'),
  textarea('specialtiesDescription2', '진료분야 - 설명 2'),
  text('doctorsEyebrow', '의료진 - 보조 제목'),
  text('doctorsTitle1', '의료진 - 제목 1'),
  text('doctorsTitle2', '의료진 - 제목 2'),
  text('doctorsViewAll', '의료진 - 전체보기 버튼'),
  text('doctorsSpecialistSuffix', '의료진 - 전문의 접미사'),
  text('doctorsSchedule', '의료진 - 휴진일정 버튼'),
  text('doctorsReservation', '의료진 - 예약 버튼'),
  text('doctorsPrevAria', '의료진 - 이전 접근성 문구'),
  text('doctorsNextAria', '의료진 - 다음 접근성 문구'),
  text('marqueeText', '영문 롤링 문구'),

  text('reviewsEyebrow', '치료후기 - 보조 제목'),
  text('reviewsTitle1', '치료후기 - 제목 1'),
  text('reviewsTitle2', '치료후기 - 제목 2'),
  textarea('reviewsDescription1', '치료후기 - 설명 1'),
  textarea('reviewsDescription2', '치료후기 - 설명 2'),
  text('reviewsMoreCases', '치료후기 - 더 많은 사례 보기'),
  text('reviewsImageHint', '치료후기 - 전후사진 안내'),
  text('reviewsPatientInfoLabel', '치료후기 - 환자정보 라벨'),
  text('reviewsTreatmentInfoLabel', '치료후기 - 치료정보 라벨'),
  text('reviewsDoctorLabel', '치료후기 - 담당의사 라벨'),
  textarea('reviewsLegalNote', '치료후기 - 의료법 안내', 2),
  text('reviewsLoginLabel', '치료후기 - 로그인 버튼'),
  text('reviewsMoreVideos', '치료후기 - 하단 더보기'),

  text('infoEyebrow', '병원소식 - 보조 제목'),
  text('infoTitle', '병원소식 - 제목'),
  text('infoMoreLabel', '병원소식 - 더보기'),
];

export const HOME_PAGE_COPY_CONFIG = {
  label: '메인페이지 문구',
  defaults: HOME_PAGE_COPY_DEFAULTS,
  fields: HOME_PAGE_COPY_FIELDS,
};
