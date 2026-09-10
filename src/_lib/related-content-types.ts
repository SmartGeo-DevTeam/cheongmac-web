export const RELATED_CONTENT_RESOURCES = [
  'specialties',
  'schedules',
  'presentations',
  'reviews',
  'media',
  'consultations',
] as const;

export type RelatedContentResource =
  (typeof RELATED_CONTENT_RESOURCES)[number];

export type RelatedContentGroupId =
  | 'clinical'
  | 'academic-media'
  | 'patient-communication';

export const RELATED_CONTENT_GROUPS: {
  id: RelatedContentGroupId;
  label: string;
  description: string;
  resources: RelatedContentResource[];
}[] = [
  {
    id: 'clinical',
    label: '진료 데이터',
    description:
      '의료진과 진료분야, 진료시간표처럼 실제 진료 운영에 직접 사용되는 데이터를 관리합니다.',
    resources: ['specialties', 'schedules'],
  },
  {
    id: 'academic-media',
    label: '학술·미디어',
    description:
      '학술 발표와 영상·기사·SNS 등 병원의 전문성과 활동을 보여주는 데이터를 관리합니다.',
    resources: ['presentations', 'media'],
  },
  {
    id: 'patient-communication',
    label: '환자 소통',
    description:
      '환자 후기와 의학상담처럼 환자 경험 및 상담과 관련된 데이터를 관리합니다.',
    resources: ['reviews', 'consultations'],
  },
];

export const RELATED_CONTENT_META: Record<
  RelatedContentResource,
  {
    label: string;
    singularLabel: string;
    description: string;
    href: string;
    groupId: RelatedContentGroupId;
    groupLabel: string;
  }
> = {
  specialties: {
    label: '진료분야',
    singularLabel: '진료분야',
    description:
      '진료분야를 한 번 등록하고 여러 의료진과 연결하여 공통으로 사용합니다.',
    href: '/admin/content-relations/specialties',
    groupId: 'clinical',
    groupLabel: '진료 데이터',
  },
  schedules: {
    label: '진료시간표',
    singularLabel: '진료시간표',
    description:
      '진료시간 패턴을 별도 데이터로 관리하고 필요한 의료진과 연결합니다.',
    href: '/admin/content-relations/schedules',
    groupId: 'clinical',
    groupLabel: '진료 데이터',
  },
  presentations: {
    label: '발표 이력',
    singularLabel: '발표 이력',
    description:
      '논문, 학회 발표, 연구 이력을 독립 데이터로 관리하고 관련 의료진을 연결합니다.',
    href: '/admin/content-relations/presentations',
    groupId: 'academic-media',
    groupLabel: '학술·미디어',
  },
  reviews: {
    label: '환자 후기',
    singularLabel: '환자 후기',
    description:
      '환자 후기를 독립 데이터로 관리하고 관련 의료진을 연결합니다.',
    href: '/admin/content-relations/reviews',
    groupId: 'patient-communication',
    groupLabel: '환자 소통',
  },
  media: {
    label: '미디어',
    singularLabel: '미디어',
    description:
      '영상, 기사, SNS 등의 미디어를 독립적으로 관리하고 각 의료진 DB에서 최대 4개까지 선택합니다.',
    href: '/admin/content-relations/media',
    groupId: 'academic-media',
    groupLabel: '학술·미디어',
  },
  consultations: {
    label: '의학상담',
    singularLabel: '의학상담',
    description:
      '의학상담을 독립 데이터로 관리하고 답변·관련 의료진을 연결합니다.',
    href: '/admin/content-relations/consultations',
    groupId: 'patient-communication',
    groupLabel: '환자 소통',
  },
};

export function isRelatedContentResource(
  value: string,
): value is RelatedContentResource {
  return (RELATED_CONTENT_RESOURCES as readonly string[]).includes(value);
}
