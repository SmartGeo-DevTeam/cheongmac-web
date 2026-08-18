import CustomerVoiceOverview from '@/app/community/customer-voice/_components/customer-voice-overview';
import CustomerVoicePageHeader from '@/app/community/customer-voice/_components/customer-voice-page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객의 소리 | 청맥병원',
  description:
    '청맥병원 이용 중 느낀 칭찬, 감사, 건의사항, 불만과 고충을 전달해 주세요.',
};

export default function CustomerVoicePage() {
  return (
    <div>
      <CustomerVoicePageHeader />
      <CustomerVoiceOverview />
    </div>
  );
}
