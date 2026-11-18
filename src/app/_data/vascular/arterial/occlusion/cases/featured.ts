import { casePosts, type CasePost } from '@/app/_data/community/cases/cases';

/**
 * 임시 운영 정책: 기존 커뮤니티의 가상 치료 전후 사례 중 하지동맥폐색증 3개를 표시.
 * DB 연동 후에는 이 선택 로직을 진료분야(category) 기반 조회로 교체하고,
 * 해당 진료분야에 속한 환자 후기(kind: 'reviews')만 표시할 수 있게 전환 예정.
 * 현재는 실제 환자 후기 데이터가 없으므로 가상 환자 후기를 새로 만들지 않습니다.
 */
const FEATURED_CASE_IDS = ['case-001', 'case-003', 'case-012'] as const;

export const occlusionFeaturedCases: CasePost[] = FEATURED_CASE_IDS.flatMap(
  (id) => {
    const post = casePosts.find((item) => item.id === id);
    return post?.category === 'peripheral-artery' && post.kind === 'before-after'
      ? [post]
      : [];
  },
);

/** 시안 확인용 공통 비교 이미지. 실제 치료 전후 이미지로 오인하지 않도록 표시합니다. */
export const occlusionCaseSampleImage =
  '/vascular/arterial/occlusion/cases/vascular-comparison-sample.png';
