import PageHeader from '@/app/_components/ui/page-header';

export default function ConsultationPageHeader() {
  return (
    <PageHeader
      breadcrumbs={[
        { label: '소통공간', href: '/community/cases' },
        { label: '의학상담' },
      ]}
      title="의학상담"
      description={
        <>
          청맥병원은 환자분의 고민을 가볍게 넘기지 않습니다.
          <br />
          올바른 의학 정보 제공을 위해 최선을 다해 답변해 드립니다.
        </>
      }
      variant="compact"
    />
  );
}
