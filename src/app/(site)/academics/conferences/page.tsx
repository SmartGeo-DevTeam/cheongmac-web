import PageHeader from '@/app/_components/common/page-header';
import ConferencesHero from '@/app/_ui/academics/conferences/conference-hero';
import ConferencesList from '@/app/_ui/academics/conferences/conference-list';
import ConferencesMessage from '@/app/_ui/academics/conferences/message';

export default function AcademicsConferencesPage() {
  return (
    <>
      <PageHeader
        title="학회활동"
        desc={`국내외 주요 학회에서 꾸준히 활동하며 \n혈관의학 발전에 기여하고 있습니다.`}
      />

      <ConferencesMessage />
      <ConferencesHero />
      <ConferencesList />
    </>
  );
}
