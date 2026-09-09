import PageHeader from '@/app/_components/ui/page-header';

export default function CustomerVoicePageHeader() {
  return (
    <PageHeader
      breadcrumbs={[
        { label: '소통공간', href: '/community/cases' },
        { label: '고객의 소리' },
      ]}
      title="고객의 소리"
      description={
        <>
          칭찬도 아쉬움도, 환자분의 모든 목소리에 귀 기울입니다.
          <br />
          보내주신 의견을 바탕으로 더 나은 청맥병원을 만들어갑니다.
        </>
      }
      variant="compact"
      descriptionClassName="max-w-[560px]"
    />
  );
}
