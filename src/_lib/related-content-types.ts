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

export const RELATED_CONTENT_META: Record<
  RelatedContentResource,
  {
    label: string;
    singularLabel: string;
    description: string;
    href: string;
  }
> = {
  specialties: {
    label: '진료분야',
    singularLabel: '진료분야',
    description:
      '진료분야를 한 번 등록하고 여러 의료진과 관계형으로 연결합니다.',
    href: '/admin/content-relations/specialties',
  },
  schedules: {
    label: '진료시간표',
    singularLabel: '진료시간표',
    description:
      '진료시간 패턴을 별도 데이터로 관리하고 관련 의료진을 연결합니다.',
    href: '/admin/content-relations/schedules',
  },
  presentations: {
    label: '발표 이력',
    singularLabel: '발표 이력',
    description:
      '논문, 학회 발표, 연구 이력을 별도 데이터로 관리하고 의료진과 연결합니다.',
    href: '/admin/content-relations/presentations',
  },
  reviews: {
    label: '환자 후기',
    singularLabel: '환자 후기',
    description:
      '환자 후기를 별도 데이터로 관리하고 관련 의료진을 연결합니다.',
    href: '/admin/content-relations/reviews',
  },
  media: {
    label: '미디어',
    singularLabel: '미디어',
    description:
      '영상, 기사, SNS 등 미디어 콘텐츠를 별도 데이터로 관리하고 각 의료진 DB에서 최대 4개까지 선택합니다.',
    href: '/admin/content-relations/media',
  },
  consultations: {
    label: '의학상담',
    singularLabel: '의학상담',
    description:
      '의학상담을 독립 콘텐츠로 관리하고 답변·관련 의료진을 다대다로 연결합니다.',
    href: '/admin/content-relations/consultations',
  },
};

export function isRelatedContentResource(
  value: string,
): value is RelatedContentResource {
  return (RELATED_CONTENT_RESOURCES as readonly string[]).includes(value);
}
