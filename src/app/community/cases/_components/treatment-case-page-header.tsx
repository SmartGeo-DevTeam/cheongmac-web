import NavigationPageHeader from '@/app/_components/ui/navigation-page-header';
import type { PageHeaderTitleAs } from '@/app/_components/ui/page-header';
import TreatmentCaseToaster from './treatment-case-toaster';

export default function TreatmentCasePageHeader({
  titleAs = 'h1',
}: {
  titleAs?: PageHeaderTitleAs;
}) {
  return (
    <>
      <TreatmentCaseToaster />
      <NavigationPageHeader
        id="treatment-case-page-header"
        navigationPath="/community/cases"
        titleAs={titleAs}
        description={
          <>
            수만 건의 데이터가 증명하는 것은 단순한 숫자가 아닌,
            <br className="hidden xl:block" />
            환자분의 되찾은 일상입니다.
          </>
        }
      />
    </>
  );
}
