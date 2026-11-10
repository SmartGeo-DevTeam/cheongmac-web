import type { Metadata } from 'next';
import ConsultationWriteContent from '@/app/_ui/community/consultation/write/consultation-write-content';

export const metadata: Metadata = {
  title: '의학상담 작성 | 청맥병원',
  description: '청맥병원 의학상담 문의글 작성 화면입니다.',
};

export default function ConsultationWritePage() {
  return <ConsultationWriteContent />;
}
