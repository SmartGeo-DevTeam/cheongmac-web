import VeteransEligibility from '@/app/_ui/guide/veterans/eligibility';
import VeteransOverview from '@/app/_ui/guide/veterans/overview';
import VeteransExpenseClaim from '@/app/_ui/guide/veterans/expense-claim';
import VeteransProcedure from '@/app/_ui/guide/veterans/procedure';

export default function GuideVeteransPage() {
  return (
    <>
      <VeteransOverview />
      <VeteransEligibility />
      <VeteransProcedure />
      <VeteransExpenseClaim />
    </>
  );
}
