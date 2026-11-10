import Inner from '@/app/_components/common/inner';
import PageHeader from '@/app/_components/common/page-header';
import FeedbackFeedbackForm, {
  type FeedbackCategory,
} from '@/app/_ui/community/feedback/write/feedback-form';


export default async function FeedbackWriteContent({
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
          <FeedbackFeedbackForm initialCategory={initialCategory} />
        </Inner>
      </section>
    </>
  );
}
