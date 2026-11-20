import BestCasesSection from '@/app/_components/clinic/best-cases/section';
import { venousBestCases } from '@/app/_data/vascular/venous/best-cases/cases';

export default function VenousBestCases() {
  return (
    <BestCasesSection id="vascular-venous-best-cases" cases={venousBestCases} />
  );
}
