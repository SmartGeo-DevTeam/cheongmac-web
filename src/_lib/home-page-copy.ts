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
  // 1. Cover
  coverSlide1TitleLead: '혈관의 모든 정답,',
  coverSlide1TitleStrong: '청맥에 있습니다',
  coverSlide1Description1: '더 스마트해진 혈관 특화 의료 혁신의 시작.',
  coverSlide1Description2:
    '증상부터 치료까지 AI가 빠르고 정확한 길을 안내합니다.',
  coverSlide1Button: '맥GPT에게 물어보기→',

  coverSlide2TitleLead: '혈관을 잘 아는 의사,',
  coverSlide2TitleStrong: '청맥에 있습니다',
  coverSlide2Description1: '오직 혈관질환에 집중한 전문의 협진으로',
  coverSlide2Description2:
    '깊이 있는 진료, 정밀한 치료를 약속드립니다.',
  coverSlide2Button: '맞춤 의료진 찾기→',

  coverSlide3TitleLead: '대한정맥학회도',
  coverSlide3TitleStrong: '인정한 청맥의 전문성',
  coverSlide3Description1:
    '2026 대한정맥학회 학술연구비 지원 대상 선정!',
  coverSlide3Description2:
    '차별화된 전문성으로 혈관 진료의 발전을 선도합니다.',
  coverSlide3Button: '자세히 보기→',

  coverPopup1Title: '5월 진료 안내',
  coverPopup1Line1: '5월 1일 (금) 노동절 정상진료',
  coverPopup1Line2: '5월 25일 (월) 대체공휴일 휴진',
  coverPopup2Title: '당일 진료 접수 안내',
  coverPopup2Line1: '오전 11시까지 / 오후 4시까지',
  coverPopup2Line2: '접수하시면 당일 진료가 가능합니다.',
  coverPopup3Title: '당일 진료 접수 안내',
  coverPopup3Line1: '오전 11시까지 / 오후 4시까지',
  coverPopup3Line2: '접수하시면 당일 진료가 가능합니다.',
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
  specialty1Title: '하지정맥류',
  specialty2Title: '동맥경화',
  specialty3Title: '골반정맥류',
  specialty4Title: '정계정맥류',
  specialty5Title: '희귀특수질환',
  specialty6Title: '투석혈관',
  specialty7Title: '고압산소치료',
  specialty8Title: '혈관검진',

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
  reviewCategory1: '골반정맥류',
  reviewCategory2: '정계정맥류',
  reviewCategory3: '하지정맥류',
  reviewCategory4: '자궁근종',
  reviewCategory5: '투석혈관',
  reviewCategory6: '당뇨발',
  reviewsAllMobile: '+ 전체보기',
  reviewsMoreCases: '더 많은 사례 보기',
  reviewsImageHint: '사진을 눌러보세요!',
  reviewsMainQuote: '거짓말처럼 나아서 너무 신기합니다.',
  reviewsPatientInfoLabel: '환자정보',
  reviewsPatientName: '김*숙 님',
  reviewsPatientAge: '34',
  reviewsPatientGender: '여성',
  reviewsTreatmentInfoLabel: '치료정보',
  reviewsTreatmentValue: '레이저 정맥 폐쇄술 + 경화요법',
  reviewsDoctorLabel: '담당의사',
  reviewsDoctorName: '박용범 원장',
  reviewsLegalNote:
    '* 의료법에 의거하여 치료후기는 로그인 후 열람 가능합니다.',
  reviewsLoginLabel: '로그인',
  reviewsMoreVideos: '더 많은 영상 보기',

  videoReview1Title: '50m도 걷기 힘들었었습니다..',
  videoReview1Keyword1: '만성신부전증',
  videoReview1Keyword2: '동맥경화',
  videoReview1Keyword3: '관련키워드',
  videoReview2Title: '50m도 걷기 힘들었었습니다..',
  videoReview2Keyword1: '만성신부전증',
  videoReview2Keyword2: '동맥경화',
  videoReview2Keyword3: '관련키워드',
  videoReview3Title: '50m도 걷기 힘들었었습니다..',
  videoReview3Keyword1: '만성신부전증',
  videoReview3Keyword2: '동맥경화',
  videoReview3Keyword3: '관련키워드',

  // 8. News / info
  infoEyebrow: '알려드립니다',
  infoTitle: '청맥병원 소식',
  infoMoreLabel: '더보기',

  info1Category: '공지사항',
  info1Date: '2026-05-22',
  info1Title: '5월 휴진 안내',
  info1Description:
    '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',

  info2Category: '연구학회',
  info2Date: '2026-05-22',
  info2Title: '박용범 원장 대한정맥학회',
  info2Description:
    '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',

  info3Category: '원내소식',
  info3Date: '2026-05-22',
  info3Title: '하지정맥류 수술 50,000',
  info3Description:
    '하지정맥류 수술 50,000례 달성을 기념하여 원내 행사가 진행',

  info4Category: '공지사항',
  info4Date: '2026-05-22',
  info4Title: '5월 휴진 안내',
  info4Description:
    '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',

  info5Category: '연구학회',
  info5Date: '2026-05-22',
  info5Title: '박용범 원장 대한정맥학회',
  info5Description:
    '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',

  info6Category: '연구학회',
  info6Date: '2026-05-22',
  info6Title: '박용범 원장 대한정맥학회',
  info6Description:
    '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',

  info7Category: '원내소식',
  info7Date: '2026-05-22',
  info7Title: '하지정맥류 수술 50,000',
  info7Description:
    '하지정맥류 수술 50,000례 달성을 기념하여 원내 행사가 진행',

  info8Category: '공지사항',
  info8Date: '2026-05-22',
  info8Title: '5월 휴진 안내',
  info8Description:
    '5월 25일 대체공휴일 휴진 5월 25일 대체공휴일 휴진',

  info9Category: '연구학회',
  info9Date: '2026-05-22',
  info9Title: '박용범 원장 대한정맥학회',
  info9Description:
    '대한정맥학회 춘계대회에서 박용범원장이 ABC를 주제로 발표',
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
    'reviewCategory1',
    'reviewCategory2',
    'reviewCategory3',
    'reviewCategory4',
    'reviewCategory5',
    'reviewCategory6',
    'reviewsAllMobile',
    'reviewsMoreCases',
    'reviewsImageHint',
    'reviewsMainQuote',
    'reviewsPatientInfoLabel',
    'reviewsPatientName',
    'reviewsPatientAge',
    'reviewsPatientGender',
    'reviewsTreatmentInfoLabel',
    'reviewsTreatmentValue',
    'reviewsDoctorLabel',
    'reviewsDoctorName',
    'reviewsLegalNote',
    'reviewsLoginLabel',
    'reviewsMoreVideos',
    'videoReview1Title',
    'videoReview1Keyword1',
    'videoReview1Keyword2',
    'videoReview1Keyword3',
    'videoReview2Title',
    'videoReview2Keyword1',
    'videoReview2Keyword2',
    'videoReview2Keyword3',
    'videoReview3Title',
    'videoReview3Keyword1',
    'videoReview3Keyword2',
    'videoReview3Keyword3',
  ],
  info: [
    'infoEyebrow',
    'infoTitle',
    'infoMoreLabel',
    ...Array.from({ length: 9 }, (_, index) => {
      const number = index + 1;
      return [
        `info${number}Category`,
        `info${number}Date`,
        `info${number}Title`,
        `info${number}Description`,
      ];
    }).flat(),
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
  ...Array.from({ length: 6 }, (_, index) =>
    text(`reviewCategory${index + 1}`, `치료후기 분류 ${index + 1}`),
  ),
  text('reviewsAllMobile', '치료후기 - 모바일 전체보기'),
  text('reviewsMoreCases', '치료후기 - 더 많은 사례 보기'),
  text('reviewsImageHint', '치료후기 - 전후사진 안내'),
  textarea('reviewsMainQuote', '치료후기 - 대표 후기', 2),
  text('reviewsPatientInfoLabel', '치료후기 - 환자정보 라벨'),
  text('reviewsPatientName', '치료후기 - 환자명'),
  text('reviewsPatientAge', '치료후기 - 나이'),
  text('reviewsPatientGender', '치료후기 - 성별'),
  text('reviewsTreatmentInfoLabel', '치료후기 - 치료정보 라벨'),
  text('reviewsTreatmentValue', '치료후기 - 치료정보'),
  text('reviewsDoctorLabel', '치료후기 - 담당의사 라벨'),
  text('reviewsDoctorName', '치료후기 - 담당의사'),
  textarea('reviewsLegalNote', '치료후기 - 의료법 안내', 2),
  text('reviewsLoginLabel', '치료후기 - 로그인 버튼'),
  text('reviewsMoreVideos', '치료후기 - 더 많은 영상 보기'),
  ...Array.from({ length: 3 }, (_, index) => {
    const n = index + 1;
    return [
      text(`videoReview${n}Title`, `영상후기 ${n} - 제목`),
      text(`videoReview${n}Keyword1`, `영상후기 ${n} - 키워드 1`),
      text(`videoReview${n}Keyword2`, `영상후기 ${n} - 키워드 2`),
      text(`videoReview${n}Keyword3`, `영상후기 ${n} - 키워드 3`),
    ];
  }).flat(),

  text('infoEyebrow', '병원소식 - 보조 제목'),
  text('infoTitle', '병원소식 - 제목'),
  text('infoMoreLabel', '병원소식 - 더보기'),
  ...Array.from({ length: 9 }, (_, index) => {
    const n = index + 1;
    return [
      text(`info${n}Category`, `병원소식 ${n} - 분류`),
      text(`info${n}Date`, `병원소식 ${n} - 날짜`),
      text(`info${n}Title`, `병원소식 ${n} - 제목`),
      textarea(`info${n}Description`, `병원소식 ${n} - 설명`, 2),
    ];
  }).flat(),
];

export const HOME_PAGE_COPY_CONFIG = {
  label: '메인페이지 문구',
  defaults: HOME_PAGE_COPY_DEFAULTS,
  fields: HOME_PAGE_COPY_FIELDS,
};
