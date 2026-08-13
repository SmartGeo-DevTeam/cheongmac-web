import LegalPageLayout from '@/app/_components/legal-page';
import type { Metadata } from 'next';

import NonCoveredFeeTable from './_components/non-covered-fee-table';

export const metadata: Metadata = {
  title: '비급여진료비 | 청맥병원',
  description: '청맥병원의 비급여진료비용을 안내합니다.',
};

export default function NonCoveredFeesPage() {
  return (
    <LegalPageLayout
      title="비급여진료비"
      breadcrumbLabel="비급여진료비"
      articleClassName="pb-14 pt-8 xl:pb-24 xl:pt-12"
    >
      <div>
        <div className="mx-auto max-w-[920px] break-keep text-center text-sm leading-[1.75] tracking-[-0.02em] text-[#555555]">
          <p>
            의료법 제45조 및 같은 법 시행규칙 제42조의2에 의거하여
            비급여진료비용을 고지합니다.
            <br className="hidden xl:block" /> 고지된 금액은 1회 기준이며, 진료
            범위 및 약제료에 따라 달라질 수 있습니다.
          </p>
          <p className="mt-3 text-sm text-[#888888] xl:mt-4">
            ※ 초음파 검사료 항목은 급여 인정기준 외 실시한 경우 비급여로
            적용됩니다.
          </p>
        </div>

        <NonCoveredFeeTable />
      </div>
    </LegalPageLayout>
  );
}
