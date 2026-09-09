import ConsultationPageHeader from '@/app/community/consultation/_components/consultation-page-header';
import ConsultationForm from '@/app/community/consultation/write/_components/consultation-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의글 작성 | 의학상담 | 청맥병원',
  description: '청맥병원 의료진에게 의학상담 문의글을 작성합니다.',
};

export default function ConsultationWritePage() {
  return (
    <div>
      <ConsultationPageHeader />
      <div><ConsultationForm /></div>
    </div>
  );
}
