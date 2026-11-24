import ClinicBanner from '@/app/_components/clinic/banner';
import ClinicCases from '@/app/_components/clinic/cases/section';
import ClinicMediaFaq from '@/app/_components/clinic/media-faq/section';
import ClinicReservationLinks from '@/app/_components/clinic/reservation-links/section';
import ClinicStrengths from '@/app/_components/clinic/strengths/section';
import Breadcrumb from '@/app/_components/common/breadcrumb';
import PageHeader from '@/app/_components/common/page-header';
import { vascularReservationBanner } from '@/app/_data/vascular/banner/content';
import { vascularReservationLinks } from '@/app/_data/vascular/reservation-links/links';
import { vascularStrengthItems } from '@/app/_data/vascular/strengths/items';
import { varicoseCasePreviews } from '@/app/_data/vascular/venous/varicose/cases/featured';
import {
  varicoseFaqHeading,
  varicoseFaqMedia,
  varicoseFaqQuestions,
} from '@/app/_data/vascular/venous/varicose/faq/questions';
import { varicoseStrengthsHeadingLines } from '@/app/_data/vascular/venous/varicose/strengths/content';
import { isPublishedNavigationPath } from '@/app/_lib/navigation/navigation-tree';
import VaricoseCeap from '@/app/_ui/vascular/venous/varicose/ceap/section';
import VaricoseDiagnostics from '@/app/_ui/vascular/venous/varicose/diagnostics/section';
import VaricoseSymptoms from '@/app/_ui/vascular/venous/varicose/symptoms/section';
import VaricoseTreatments from '@/app/_ui/vascular/venous/varicose/treatments/section';
import { notFound } from 'next/navigation';

export default function VascularVenousVaricosePage() {
  if (!isPublishedNavigationPath('/vascular/venous/varicose')) notFound();

  return (
    <>
      <Breadcrumb />
      <PageHeader title="하지정맥류" />
      {/* 하지정맥류 - 증상 */}
      <VaricoseSymptoms />

      {/* 하지정맥류 - 나는 몇기에 해당될까? */}
      <VaricoseCeap />

      {/* 하지정맥류 - 진단 방법 */}
      <VaricoseDiagnostics />

      {/* 공통배너 - 최대한 빠른 검사 날짜는 언제일까요? */}
      <ClinicBanner {...vascularReservationBanner} />

      {/* 하지정맥류 - 치료법 */}
      <VaricoseTreatments />

      {/* 하지정맥류 - 치료사례 */}
      <ClinicCases
        id="vascular-venous-varicose-cases"
        items={varicoseCasePreviews}
        categoryLabel="하지정맥류"
        title={
          <>
            하지정맥류 치료 과정,
            <br />
            <b>다양한 사례로 살펴보세요</b>
          </>
        }
        description={<>※ 치료 경과는 개인에 따라서 달라질 수 있습니다.</>}
        moreHref="/community/cases?tab=before-after&category=varicose"
      />

      {/* 공통 - 네이버/톡톡 예약 */}
      <ClinicReservationLinks
        id="vascular-venous-varicose-reservation-links"
        links={vascularReservationLinks}
      />

      {/* 하지정맥류 - 어디서, 누구에게 받느냐가 치료의 결과를 바꿉니다 */}
      {/* TODO: 메시지가 확정되면 _data/.../strengths/content.ts에 입력합니다. */}
      {/* 기존 병원 공통 강점 카드 5개는 동맥 페이지와 동일하게 재사용합니다. */}
      <ClinicStrengths
        id="vascular-venous-varicose-strengths"
        headingLines={varicoseStrengthsHeadingLines}
        items={vascularStrengthItems}
      />

      {/* 하지정맥류 - 자주 묻는 질문 */}
      <ClinicMediaFaq
        id="vascular-venous-varicose-faq"
        headingLabel={varicoseFaqHeading.label}
        headingTitle={
          <>
            <span className={`font-normal`}>{varicoseFaqHeading.firstLine}</span>
            <br />
            <b className={`font-bold`}>{varicoseFaqHeading.secondLine}</b>
          </>
        }
        thumbnail={varicoseFaqMedia.thumbnail}
        thumbnailAlt="다리 가려움과 하지정맥류 증상을 소개하는 영상 썸네일"
        avatar={varicoseFaqMedia.avatar}
        questions={varicoseFaqQuestions}
      />
    </>
  );
}
