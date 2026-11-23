import { casePosts, type CasePost } from '@/app/_data/community/cases/cases';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';

/**
 * 기존 커뮤니티 디자인용 사례의 하지동맥폐색증 3개를 노출합니다.
 * 실제 환자 진료 기록은 아니며, DB 연동 시 이 파일의 조회/변환 부분을 교체합니다.
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

/** 공통 치료사례 UI용 표시 데이터: 향후 DB 조회 결과를 이 형태로 전달합니다. */
export const occlusionCasePreviews: ClinicCasePreview[] = occlusionFeaturedCases.map(
  (post) => ({
    id: post.id,
    href: `/community/cases/${post.id}`,
    title: post.title,
    description: post.description,
    image: occlusionCaseSampleImage,
    imageAlt: '시안용 혈관 비교 이미지. 실제 환자의 치료 전후 사진이 아닙니다.',
    patient: post.patient,
    age: post.age,
    sex: post.sex,
  }),
);
