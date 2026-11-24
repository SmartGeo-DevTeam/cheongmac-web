import { casePosts } from '@/app/_data/community/cases/cases';
import type { ClinicCasePreview } from '@/app/_types/vascular/clinic-case';

/**
 * 기존 커뮤니티의 골반정맥류 시안용 게시글 1건을 선택합니다.
 * 실제 환자의 치료 기록 또는 확인된 치료 효과가 아닙니다.
 * DB 연동 시 아래 표시 데이터 생성 부분을 실제 조회 결과로 교체합니다.
 */
const FEATURED_CASE_ID = 'case-004';
const SAMPLE_IMAGE =
  '/vascular/venous/pelvic/cases/embolization-sample.png';

const post = casePosts.find((item) => item.id === FEATURED_CASE_ID);

/**
 * 시안에서 중앙 카드와 좌우 미리보기 및 화살표를 확인하기 위한 임시 반복입니다.
 * 게시글을 복제하지 않으며 모든 카드가 동일한 예시 게시글로 연결됩니다.
 * DB 연동 시 반복을 제거하고 실제 게시글별 고유 id를 사용합니다.
 */
export const pelvicCasePreviews: ClinicCasePreview[] =
  post?.category === 'pelvic-vein' && post.kind === 'before-after'
    ? [1, 2].map((repetition) => ({
        id: `${post.id}-preview-${repetition}`,
        href: `/community/cases/${post.id}`,
        title: post.title,
        description: post.description,
        image: SAMPLE_IMAGE,
        imageAlt: '골반정맥 색전술 비교용 시안 이미지. 실제 치료 결과로 확인된 사진이 아닙니다.',
        patient: post.patient,
        age: post.age,
        sex: post.sex,
      }))
    : [];
