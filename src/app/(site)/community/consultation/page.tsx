import type { Metadata } from 'next';
import ConsultationOverview from '@/app/_ui/community/consultation/consultation-overview';

export const metadata: Metadata = {
  title: '의학상담 | 청맥병원',
  description: '청맥병원 의학상담 게시글을 확인하세요.',
};

export default function CommunityConsultationPage(
  props: Parameters<typeof ConsultationOverview>[0],
) {
  return <ConsultationOverview {...props} />;
}
