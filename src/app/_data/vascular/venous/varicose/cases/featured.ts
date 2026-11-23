import { casePosts } from '@/app/_data/community/cases/cases';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';

/**
 * 현재 커뮤니티에 등록된 하지정맥류 치료 전후 디자인 사례 2건을 임시로 선택합니다.
 * UI가 사용하는 ClinicCasePreview 형식은 이후 DB 조회 결과로 대체할 수 있습니다.
 * 실제 환자의 치료 기록이나 효과가 확인된 사례가 아닙니다.
 * 표시 이미지는 기존 정맥질환 BEST 치료사례의 하드코딩 이미지 자산을 재사용합니다.
 */
const FEATURED_CASE_IDS = ['case-002', 'case-005'] as const;
const SAMPLE_IMAGE =
  '/vascular/venous/best-cases/varicose-veins-before-after.png';

export const varicoseCasePreviews: ClinicCasePreview[] = FEATURED_CASE_IDS.flatMap(
  (id) => {
    const post = casePosts.find((item) => item.id === id);
    if (post?.category !== 'varicose' || post.kind !== 'before-after') {
      return [];
    }
    return [{
      id: post.id,
      href: `/community/cases/${post.id}`,
      title: post.title,
      description: post.description,
      image: SAMPLE_IMAGE,
      imageAlt: '하지정맥류 다리 정맥 비교용 예시 이미지. 실제 치료 전후 사진이 아닙니다.',
      patient: post.patient,
      age: post.age,
      sex: post.sex,
    }];
  },
);
