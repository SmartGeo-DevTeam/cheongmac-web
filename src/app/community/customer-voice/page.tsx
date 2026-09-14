import CustomerVoiceOverview from '@/app/community/customer-voice/_components/customer-voice-overview';
import CustomerVoicePageHeader from '@/app/community/customer-voice/_components/customer-voice-page-header';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import { getPublicPageCopyConfig } from '@/_lib/public-page-copy';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '고객의 소리 | 청맥병원',
  description:
    '청맥병원 이용 중 느낀 칭찬, 감사, 건의사항, 불만과 고충을 전달해 주세요.',
};

export default async function CustomerVoicePage() {
  const config = getPublicPageCopyConfig(
    '/community/customer-voice',
  );
  const content = await getPageContentBlock(
    'page-copy',
    '/community/customer-voice',
    config.defaults,
  );

  return (
    <div>
      <CustomerVoicePageHeader />
      <CustomerVoiceOverview
        copy={content.data}
        persisted={content.persisted}
      />
    </div>
  );
}
