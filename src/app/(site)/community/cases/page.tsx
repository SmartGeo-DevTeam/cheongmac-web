import CasesOverview from '@/app/_ui/community/cases/cases-overview';

export default function CommunityCasesPage(
  props: Parameters<typeof CasesOverview>[0],
) {
  return <CasesOverview {...props} />;
}
