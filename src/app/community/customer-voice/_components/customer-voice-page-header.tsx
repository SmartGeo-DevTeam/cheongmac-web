import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';

export default function CustomerVoicePageHeader() {
  return (
    <NavigationPageHeader
      id="customer-voice-page-header"
      navigationPath="/community/customer-voice"
      description={
        <>
          칭찬도 아쉬움도, 환자분의 모든 목소리에 귀 기울입니다.
          <br />
          보내주신 의견을 바탕으로 더 나은 청맥병원을 만들어갑니다.
        </>
      }
    />
  );
}
