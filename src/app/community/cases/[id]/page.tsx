import PageHeader from '@/app/_components/common/page-header';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CasesDetail from '../_components/detail';
import { canViewProtectedCaseDetail } from '../_lib/access';
import { getPublicCaseDetail } from '../_lib/details';
import { getProtectedCaseDetail } from '../_lib/protected';
import { casePosts } from '../data';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = casePosts.find((item) => item.id === id);
  return {
    title: post
      ? `${post.title} | 치료 사례 | 청맥병원`
      : '치료 사례 | 청맥병원',
    description: post?.description,
  };
}

/** 접근 권한에 따라 결과가 달라질 수 있으므로 이후 실제 인증 연결 시 동적 렌더링 유지 */
export const dynamic = 'force-dynamic';

export default async function CommunityCaseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const index = casePosts.findIndex((item) => item.id === id);
  if (index < 0) notFound();

  const post = casePosts[index];
  const canView =
    post.kind === 'before-after' ? await canViewProtectedCaseDetail() : false;
  // 후기/인터뷰는 치료 후 보호 데이터 자체를 조회하지 않습니다.
  const protectedDetail =
    post.kind === 'before-after' && canView
      ? getProtectedCaseDetail(post.id)
      : null;

  return (
    <>
      <PageHeader
        title="치료 사례"
        desc="수만 건의 데이터가 증명하는 것은 단순한 숫자가 아닌, 환자분의 되찾은 일상입니다."
      />

      <CasesDetail
        post={post}
        detail={getPublicCaseDetail(post)}
        protectedDetail={protectedDetail}
        previous={index > 0 ? casePosts[index - 1] : null}
        next={index < casePosts.length - 1 ? casePosts[index + 1] : null}
      />
    </>
  );
}
