export const MANAGED_PAGE_KEYS = [
  'tour',
  'equipment',
  'exchange',
  'society',
  'cases',
  'notice',
  'news',
  'partner-hospital',
] as const;

export type ManagedPageKey = (typeof MANAGED_PAGE_KEYS)[number];

export type ManagedFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'url'
  | 'select'
  | 'checkbox'
  | 'lines'
  | 'json';

export type ManagedField = {
  key: string;
  label: string;
  type: ManagedFieldType;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  description?: string;
};

export type ManagedItemTypeConfig = {
  value: string;
  label: string;
  titleField: string;
  summaryField?: string;
  categoryField?: string;
  imageFields?: string[];
  fields: ManagedField[];
};

export type ManagedPageConfig = {
  key: ManagedPageKey;
  label: string;
  publicHref: string;
  groupLabel: string;
  description: string;
  itemTypes: ManagedItemTypeConfig[];
};

const visibilityField: ManagedField = {
  key: 'isVisible',
  label: '노출 여부',
  type: 'checkbox',
};

export const MANAGED_PAGE_CONFIGS: Record<
  ManagedPageKey,
  ManagedPageConfig
> = {
  tour: {
    key: 'tour',
    label: '병원 둘러보기',
    publicHref: '/about/tour',
    groupLabel: '병원 소개',
    description: '층별 안내와 시설 안내 항목을 관리합니다.',
    itemTypes: [
      {
        value: 'floor',
        label: '층별 안내',
        titleField: 'title',
        summaryField: 'details',
        fields: [
          {
            key: 'floor',
            label: '층',
            type: 'text',
            required: true,
            placeholder: '예: 6F',
          },
          {
            key: 'title',
            label: '층 이름',
            type: 'text',
            required: true,
            placeholder: '예: 청맥홀',
          },
          {
            key: 'details',
            label: '세부 안내',
            type: 'lines',
            description: '한 줄에 한 항목씩 입력합니다.',
          },
          visibilityField,
        ],
      },
      {
        value: 'facility',
        label: '시설 안내',
        titleField: 'title',
        summaryField: 'description',
        categoryField: 'category',
        imageFields: ['images'],
        fields: [
          {
            key: 'floor',
            label: '층',
            type: 'text',
            required: true,
            placeholder: '예: 1층',
          },
          {
            key: 'title',
            label: '시설명',
            type: 'text',
            required: true,
          },
          {
            key: 'category',
            label: '분류',
            type: 'select',
            required: true,
            options: [
              { value: 'outpatient', label: '외래진료' },
              { value: 'exam', label: '검사' },
              { value: 'inpatient', label: '입원' },
              { value: 'amenity', label: '편의시설' },
            ],
          },
          {
            key: 'images',
            label: '이미지',
            type: 'lines',
            required: true,
            description: '이미지 경로 또는 URL을 한 줄에 하나씩 입력합니다.',
          },
          {
            key: 'description',
            label: '설명',
            type: 'textarea',
          },
          {
            key: 'bulletDetails',
            label: '불릿 상세',
            type: 'lines',
          },
          {
            key: 'infoRows',
            label: '추가 정보',
            type: 'json',
            description:
              '예: [{"label":"운영시간","lines":["평일 08:30 ~ 18:30"]}]',
          },
          visibilityField,
        ],
      },
    ],
  },

  equipment: {
    key: 'equipment',
    label: '첨단의료장비',
    publicHref: '/about/equipment',
    groupLabel: '병원 소개',
    description: '첨단의료장비 목록과 상세 정보를 관리합니다.',
    itemTypes: [
      {
        value: 'equipment',
        label: '의료장비',
        titleField: 'model',
        summaryField: 'description',
        categoryField: 'category',
        imageFields: ['image'],
        fields: [
          {
            key: 'category',
            label: '분류',
            type: 'select',
            required: true,
            options: [
              { value: 'imaging', label: '영상진단' },
              { value: 'functional', label: '기능생체검사' },
              { value: 'procedure', label: '시술·수술' },
              { value: 'special', label: '특수치료' },
            ],
          },
          {
            key: 'categoryLabel',
            label: '장비 분류명',
            type: 'text',
            required: true,
          },
          {
            key: 'title',
            label: '장비명',
            type: 'text',
            required: true,
          },
          {
            key: 'model',
            label: '모델명',
            type: 'text',
            required: true,
          },
          {
            key: 'image',
            label: '대표 이미지',
            type: 'text',
            required: true,
          },
          {
            key: 'subtitle',
            label: '부제',
            type: 'text',
          },
          {
            key: 'description',
            label: '설명',
            type: 'textarea',
          },
          {
            key: 'highlights',
            label: '핵심 특징',
            type: 'lines',
          },
          {
            key: 'diseases',
            label: '진단 가능 질환',
            type: 'lines',
          },
          {
            key: 'cases',
            label: '진단 사례',
            type: 'json',
            description:
              '예: [{"id":"case-1","title":"사례명","image":"/assets/...","description":"설명"}]',
          },
          visibilityField,
        ],
      },
    ],
  },

  exchange: {
    key: 'exchange',
    label: '학술교류',
    publicHref: '/education-research/exchange',
    groupLabel: '교육·연구',
    description: '학술교류 상단 이미지와 게시물을 관리합니다.',
    itemTypes: [
      {
        value: 'hero',
        label: '상단 이미지',
        titleField: 'alt',
        imageFields: ['src'],
        fields: [
          {
            key: 'src',
            label: '이미지',
            type: 'text',
            required: true,
          },
          {
            key: 'alt',
            label: '대체 텍스트',
            type: 'text',
            required: true,
          },
          visibilityField,
        ],
      },
      {
        value: 'post',
        label: '학술교류 게시물',
        titleField: 'title',
        summaryField: 'description',
        imageFields: ['images'],
        fields: [
          {
            key: 'date',
            label: '일시',
            type: 'text',
            required: true,
            placeholder: '예: 2026.09.10',
          },
          {
            key: 'place',
            label: '장소',
            type: 'text',
            required: true,
          },
          {
            key: 'title',
            label: '제목',
            type: 'text',
            required: true,
          },
          {
            key: 'description',
            label: '설명',
            type: 'textarea',
          },
          {
            key: 'images',
            label: '이미지',
            type: 'lines',
            required: true,
            description: '한 줄에 한 이미지 경로 또는 URL을 입력합니다.',
          },
          visibilityField,
        ],
      },
    ],
  },

  society: {
    key: 'society',
    label: '학회활동',
    publicHref: '/education-research/society',
    groupLabel: '교육·연구',
    description: '주요 발표와 연도별 학회활동을 관리합니다.',
    itemTypes: [
      {
        value: 'featured',
        label: '주요 발표',
        titleField: 'title',
        summaryField: 'description',
        imageFields: ['image'],
        fields: [
          {
            key: 'title',
            label: '제목',
            type: 'text',
            required: true,
          },
          {
            key: 'date',
            label: '일시',
            type: 'text',
            required: true,
          },
          {
            key: 'description',
            label: '설명',
            type: 'textarea',
          },
          {
            key: 'english',
            label: '영문 제목/설명',
            type: 'textarea',
          },
          {
            key: 'image',
            label: '이미지',
            type: 'text',
            required: true,
          },
          visibilityField,
        ],
      },
      {
        value: 'activity',
        label: '연도별 학회활동',
        titleField: 'title',
        summaryField: 'description',
        categoryField: 'society',
        imageFields: ['image'],
        fields: [
          {
            key: 'year',
            label: '연도',
            type: 'number',
            required: true,
          },
          {
            key: 'society',
            label: '학회/행사명',
            type: 'text',
            required: true,
          },
          {
            key: 'title',
            label: '활동 제목',
            type: 'text',
            required: true,
          },
          {
            key: 'description',
            label: '설명',
            type: 'textarea',
          },
          {
            key: 'english',
            label: '영문 제목/설명',
            type: 'textarea',
          },
          {
            key: 'image',
            label: '이미지',
            type: 'text',
            required: true,
          },
          visibilityField,
        ],
      },
    ],
  },

  cases: {
    key: 'cases',
    label: '치료사례',
    publicHref: '/community/cases',
    groupLabel: '소통공간',
    description: '치료 전후, 환자 후기, 영상 인터뷰 콘텐츠를 관리합니다.',
    itemTypes: [
      {
        value: 'case',
        label: '치료사례',
        titleField: 'title',
        summaryField: 'description',
        categoryField: 'category',
        imageFields: ['thumbnail'],
        fields: [
          {
            key: 'kind',
            label: '유형',
            type: 'select',
            required: true,
            options: [
              { value: 'treatment', label: '치료 전후' },
              { value: 'review', label: '환자 후기' },
              { value: 'video', label: '영상 인터뷰' },
            ],
          },
          {
            key: 'category',
            label: '질환/분류',
            type: 'text',
            required: true,
          },
          {
            key: 'title',
            label: '제목',
            type: 'text',
            required: true,
          },
          {
            key: 'description',
            label: '목록 설명',
            type: 'textarea',
          },
          {
            key: 'patientName',
            label: '환자명',
            type: 'text',
            required: true,
          },
          {
            key: 'age',
            label: '나이',
            type: 'number',
            required: true,
          },
          {
            key: 'sex',
            label: '성별',
            type: 'select',
            required: true,
            options: [
              { value: '남성', label: '남성' },
              { value: '여성', label: '여성' },
            ],
          },
          {
            key: 'date',
            label: '등록일',
            type: 'date',
            required: true,
          },
          {
            key: 'thumbnail',
            label: '썸네일',
            type: 'text',
            required: true,
          },
          {
            key: 'diagnosis',
            label: '진단명',
            type: 'text',
            required: true,
          },
          {
            key: 'treatment',
            label: '치료정보',
            type: 'text',
            required: true,
          },
          {
            key: 'before',
            label: '치료 전',
            type: 'textarea',
          },
          {
            key: 'after',
            label: '치료 후',
            type: 'textarea',
          },
          {
            key: 'detailMedia',
            label: '상세 미디어',
            type: 'json',
            required: true,
            description:
              '치료 전후: {"type":"before-after","comparisonImage":"...","diagnosticComparisonImage":"..."} / 영상: {"type":"youtube","youtubeUrl":"...","fallbackImage":"..."}',
          },
          visibilityField,
        ],
      },
    ],
  },

  notice: {
    key: 'notice',
    label: '공지사항',
    publicHref: '/community/notice',
    groupLabel: '병원소식',
    description: '공지사항과 휴진 안내 게시물을 관리합니다.',
    itemTypes: [
      {
        value: 'notice',
        label: '공지사항',
        titleField: 'title',
        summaryField: 'paragraphs',
        categoryField: 'kind',
        imageFields: ['image'],
        fields: [
          {
            key: 'kind',
            label: '분류',
            type: 'select',
            required: true,
            options: [
              { value: 'notice', label: '공지사항' },
              { value: 'holiday', label: '휴진안내' },
            ],
          },
          {
            key: 'title',
            label: '제목',
            type: 'text',
            required: true,
          },
          {
            key: 'date',
            label: '등록일',
            type: 'text',
            required: true,
            placeholder: '예: 2026. 09. 10',
          },
          {
            key: 'pinned',
            label: '상단 고정',
            type: 'checkbox',
          },
          {
            key: 'hasLink',
            label: '외부 링크 표시',
            type: 'checkbox',
          },
          {
            key: 'image',
            label: '상세 이미지',
            type: 'text',
          },
          {
            key: 'imageAlt',
            label: '이미지 대체 텍스트',
            type: 'text',
          },
          {
            key: 'imageMode',
            label: '이미지 형태',
            type: 'select',
            options: [
              { value: '', label: '기본' },
              { value: 'poster', label: '포스터' },
              { value: 'wide', label: '와이드' },
            ],
          },
          {
            key: 'lead',
            label: '리드 문구',
            type: 'lines',
          },
          {
            key: 'paragraphs',
            label: '본문 문단',
            type: 'lines',
          },
          {
            key: 'emphasis',
            label: '강조 문구',
            type: 'textarea',
          },
          visibilityField,
        ],
      },
      {
        value: 'doctor-leave',
        label: '의료진 휴진',
        titleField: 'name',
        summaryField: 'schedule',
        imageFields: ['image'],
        fields: [
          {
            key: 'name',
            label: '의료진명',
            type: 'text',
            required: true,
          },
          {
            key: 'department',
            label: '진료과/전문의',
            type: 'text',
            required: true,
          },
          {
            key: 'schedule',
            label: '휴진 일정',
            type: 'text',
            required: true,
          },
          {
            key: 'image',
            label: '프로필 이미지',
            type: 'text',
            required: true,
          },
          visibilityField,
        ],
      },
    ],
  },

  news: {
    key: 'news',
    label: '청맥뉴스',
    publicHref: '/community/news',
    groupLabel: '병원소식',
    description: '원내소식과 언론보도 게시물을 관리합니다.',
    itemTypes: [
      {
        value: 'news',
        label: '청맥뉴스',
        titleField: 'title',
        summaryField: 'excerpt',
        categoryField: 'category',
        imageFields: ['imageSrc'],
        fields: [
          {
            key: 'category',
            label: '분류',
            type: 'select',
            required: true,
            options: [
              { value: 'inside', label: '원내소식' },
              { value: 'press', label: '언론보도' },
            ],
          },
          {
            key: 'clientId',
            label: '출처 ID',
            type: 'number',
            description: '1 청맥병원 / 2 헬스조선 / 3 KNN / 4 경남의사 / 5 MDTODAY',
          },
          {
            key: 'title',
            label: '제목',
            type: 'text',
            required: true,
          },
          {
            key: 'excerpt',
            label: '요약',
            type: 'textarea',
          },
          {
            key: 'date',
            label: '등록일',
            type: 'text',
            required: true,
            placeholder: '예: 2026.09.10',
          },
          {
            key: 'imageSrc',
            label: '대표 이미지',
            type: 'text',
            required: true,
          },
          {
            key: 'source',
            label: '출처명',
            type: 'text',
          },
          {
            key: 'originalArticleUrl',
            label: '기사 원문 URL',
            type: 'url',
          },
          {
            key: 'body',
            label: '본문',
            type: 'lines',
          },
          visibilityField,
        ],
      },
    ],
  },

  'partner-hospital': {
    key: 'partner-hospital',
    label: '의료협약병원',
    publicHref: '/guide/partner-hospital',
    groupLabel: '이용안내',
    description: '협약기관 로고와 의료협약/제휴기관 정보를 관리합니다.',
    itemTypes: [
      {
        value: 'logo',
        label: '협약기관 로고',
        titleField: 'name',
        imageFields: ['image'],
        fields: [
          {
            key: 'name',
            label: '기관명',
            type: 'text',
            required: true,
          },
          {
            key: 'image',
            label: '로고 이미지',
            type: 'text',
            required: true,
          },
          visibilityField,
        ],
      },
      {
        value: 'hospital',
        label: '협약기관',
        titleField: 'name',
        summaryField: 'agreement',
        categoryField: 'category',
        imageFields: ['image'],
        fields: [
          {
            key: 'category',
            label: '분류',
            type: 'select',
            required: true,
            options: [
              { value: 'care', label: '진료협약' },
              { value: 'support', label: '제휴/지원' },
            ],
          },
          {
            key: 'name',
            label: '기관명',
            type: 'text',
            required: true,
          },
          {
            key: 'image',
            label: '대표 이미지',
            type: 'text',
            required: true,
          },
          {
            key: 'agreement',
            label: '협약내용',
            type: 'textarea',
          },
          {
            key: 'phone',
            label: '전화번호',
            type: 'text',
          },
          {
            key: 'tags',
            label: '태그',
            type: 'lines',
          },
          visibilityField,
        ],
      },
    ],
  },
};

export function isManagedPageKey(value: string): value is ManagedPageKey {
  return (MANAGED_PAGE_KEYS as readonly string[]).includes(value);
}

export function getManagedPageConfig(pageKey: ManagedPageKey) {
  return MANAGED_PAGE_CONFIGS[pageKey];
}

export function getManagedItemTypeConfig(
  pageKey: ManagedPageKey,
  itemType: string,
) {
  return MANAGED_PAGE_CONFIGS[pageKey].itemTypes.find(
    (item) => item.value === itemType,
  );
}
