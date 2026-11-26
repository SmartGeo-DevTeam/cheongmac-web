import { casePosts } from '@/app/_data/community/cases/cases';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';

/** 기존 커뮤니티의 시안용 심부정맥혈전증 사례. 실제 진료 기록이 아닙니다. */
const FEATURED_CASE_ID = 'case-010';
const post = casePosts.find((item) => item.id === FEATURED_CASE_ID);

/**
 * 캐러셀 미리보기용 반복이며 게시글 자체는 복제하지 않습니다.
 * DB 연동 시 실제 조회 결과로 교체하고 반복을 제거합니다.
 */
export const thrombosisCasePreviews: ClinicCasePreview[] =
  post?.category === 'dvt' && post.kind === 'before-after'
    ? [1, 2].map((repetition) => ({
        id: `${post.id}-preview-${repetition}`,
        href: `/community/cases/${post.id}`,
        title: `[예시] ${post.title}`,
        description: post.description,
        image: post.image,
        imageAlt: 'UI 확인용 혈관 예시 이미지. 실제 심부정맥혈전증 치료 전후 사진이 아닙니다.',
        patient: post.patient,
        age: post.age,
        sex: post.sex,
      }))
    : [];
