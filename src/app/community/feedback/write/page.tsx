import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import type { Metadata } from 'next';
import FeedbackForm, {
  type FeedbackCategory,
} from '../_components/feedback-form';

export const metadata: Metadata = {
  title: '고객의 소리 작성 | 청맥병원',
  description: '칭찬과 감사, 건의사항, 불만과 고충을 전달하는 작성 화면입니다.',
};

export default async function CommunityFeedbackWritePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const initialCategory: FeedbackCategory =
    category === 'suggestion' || category === 'complaint' ? category : 'praise';

  return (
    <>
      <PageHeader
        desktopLineBreak
        title="고객의 소리"
        desc={`칭찬도 아쉬움도, 환자분의 모든 목소리에 귀 기울입니다. \n보내주신 의견을 바탕으로 더 나은 청맥병원을 만들어갑니다.`}
      />
      <section id="community-feedback-write">
        <Inner>
          <FeedbackForm initialCategory={initialCategory} />
        </Inner>
      </section>
    </>
  );
}
