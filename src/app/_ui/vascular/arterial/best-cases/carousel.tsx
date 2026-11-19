import ClinicBestCasesCarousel from '@/app/_components/clinic/best-cases/carousel';
import { arterialBestCases } from '@/app/_data/vascular/arterial/best-cases/cases';
export default function ArterialBestCasesCarousel() {
  return <ClinicBestCasesCarousel items={arterialBestCases} />;
}
