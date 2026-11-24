import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicBestCasesSection from '@/app/_components/clinic/best-cases/section';
import ClinicDiseases from '@/app/_components/clinic/diseases/section';
import ClinicExpertiseSection from '@/app/_components/clinic/expertise/section';
import ClinicSplitFaq from '@/app/_components/clinic/faq/section';
import ClinicMethodSection from '@/app/_components/clinic/method-carousel/section';
import ClinicSpecialistsSection from '@/app/_components/clinic/specialists/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import {
  vascularHealthBanner,
  vascularReservationBanner,
} from '@/app/_data/vascular/banner/content';
import { venousBestCases } from '@/app/_data/vascular/venous/best-cases/cases';
import { venousDiseaseCards } from '@/app/_data/vascular/venous/diseases/cards';
import { venousDiseasesContent } from '@/app/_data/vascular/venous/diseases/content';
import { venousDiseasePoints } from '@/app/_data/vascular/venous/diseases/map';
import { venousExpertiseItems } from '@/app/_data/vascular/venous/expertise/items';
import {
  venousFaqMoreLink,
  venousFaqs,
} from '@/app/_data/vascular/venous/faq/questions';
import { venousSpecialistsContent } from '@/app/_data/vascular/venous/specialists/content';
import { venousTreatmentMethods } from '@/app/_data/vascular/venous/treatments/methods';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import { getClinicBestCases } from '@/app/_services/clinic/best-cases';
import { getClinicSpecialists } from '@/app/_services/clinic/specialists';
import VenousCauses from '@/app/_ui/vascular/venous/causes/section';
import VenousTreatmentItem from '@/app/_ui/vascular/venous/treatments/item';
import { notFound } from 'next/navigation';

export default function VascularVenousPage() {
  if (!isPublishedNavigationPath('/vascular/venous')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="정맥질환" englishTitle="Venous Disease" />

      {/* 정맥질환 - 원인 */}
      <VenousCauses id="vascular-venous-causes" />

      {/* 공통 - 부위별 정맥질환 */}
      <ClinicDiseases
        id="vascular-venous-diseases"
        content={venousDiseasesContent}
        map={{
          points: venousDiseasePoints,
          image: '/vascular/venous/diseases/venous-body.png',
          imageAlt: '전신 정맥 구조 이미지',
          imageWidth: 306,
          imageHeight: 719,
        }}
        cards={venousDiseaseCards}
        columns={4}
        showMoreLink
        isPublishedHref={isPublishedNavigationPath}
      />

      {/* 공통 - 혈관 맞춤 치료 */}
      <ClinicMethodSection
        id="vascular-venous-treatments"
        heading={{
          mtVariant: 'xl',
          label: '같은 질환이라도 해답은 따로 있습니다',
          labelVariant: 'accent',
          title: <b>혈관 맞춤 치료</b>,
          description: (
            <>
              정밀 진단으로 정확한 원인을 파악한 후 다양한 치료법을 시행해 온
              임상경험을 바탕으로 환자 개인의 혈관 상태에 가장 적합한 치료를
              선택합니다.
            </>
          ),
        }}
        itemLabel="치료법"
        slides={venousTreatmentMethods.map((item) => ({
          id: item.id,
          title: item.title,
          content: <VenousTreatmentItem item={item} />,
        }))}
      />

      {/* 공통 - 배너: 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner
        id="vascular-reservation-banner"
        {...vascularReservationBanner}
      />

      {/* 공통 - BEST 치료사례 */}
      <ClinicBestCasesSection
        id="vascular-venous-best-cases"
        cases={getClinicBestCases(venousBestCases)}
      />

      {/* 공통 - 혈관만 봅니다 그래서 다릅니다 */}
      <ClinicExpertiseSection
        id="vascular-venous-expertise"
        items={venousExpertiseItems}
      />

      {/* 공통 - 의료진 */}
      <ClinicSpecialistsSection
        id="vascular-venous-specialists"
        content={venousSpecialistsContent}
        doctors={getClinicSpecialists(venousSpecialistsContent.doctorIds)}
      />

      {/* 공통 - 배너: 청맥병원에서 시작하는 혈관 건강 */}
      <ClinicBanner
        id="vascular-venous-health-banner"
        {...vascularHealthBanner}
      />

      {/* 공통 - 자주 묻는 질문 */}
      <ClinicSplitFaq
        id="vascular-venous-faq"
        title={
          <>
            정맥질환
            <br />
            <strong>자주 묻는 질문</strong>
          </>
        }
        questions={venousFaqs}
        moreLink={venousFaqMoreLink}
      />
    </>
  );
}
