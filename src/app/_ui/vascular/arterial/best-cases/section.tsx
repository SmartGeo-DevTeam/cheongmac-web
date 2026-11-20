import BestCasesSection from '@/app/_components/clinic/best-cases/section';
import { arterialBestCases } from '@/app/_data/vascular/arterial/best-cases/cases';

export default function ArterialBestCases() {
  return (
    <BestCasesSection
      id="vascular-arterial-best-cases"
      cases={arterialBestCases}
    />
  );
}
