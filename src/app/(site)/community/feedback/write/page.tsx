import type { Metadata } from 'next';
import FeedbackWriteContent from '@/app/_ui/community/feedback/write/feedback-write-content';

export const metadata: Metadata = {
  title: '고객의 소리 작성 | 청맥병원',
  description: '칭찬과 감사, 건의사항, 불만과 고충을 전달하는 작성 화면입니다.',
};

export default function CommunityFeedbackWritePage(
  props: Parameters<typeof FeedbackWriteContent>[0],
) {
  return <FeedbackWriteContent {...props} />;
}
