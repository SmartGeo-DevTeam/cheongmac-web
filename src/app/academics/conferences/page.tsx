import PageHeader from '@/app/_components/common/page-header';
import Hero from './_sections/_hero';
import List from './_sections/_list';
import Message from './_sections/_message';

export default function AcademicsConferencesPage() {
  return (
    <>
      <PageHeader
        title="학회활동"
        desc={`국내외 주요 학회에서 꾸준히 활동하며 \n혈관의학 발전에 기여하고 있습니다.`}
      />

      <Message />
      <Hero />
      <List />
    </>
  );
}
