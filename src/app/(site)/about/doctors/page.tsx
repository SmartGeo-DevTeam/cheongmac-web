import PageHeader from '@/app/_components/common/page-header';
import DoctorAppointmentCta from '@/app/_ui/about/doctors/appointment-cta';
import DoctorList from '@/app/_ui/about/doctors/doctor-list';
import DoctorMessage from '@/app/_ui/about/doctors/message';
import DoctorRecommendation from '@/app/_ui/about/doctors/recommendation';

export default function AboutDoctorsPage() {
  return (
    <>
      <PageHeader
        title="의료진/진료과"
        desc="대한민국 혈관치료의 표준을 만들어가는 청맥 의료진을 소개합니다."
      />

      <DoctorList />
      <DoctorRecommendation />
      <DoctorMessage />
      <DoctorAppointmentCta />
    </>
  );
}
