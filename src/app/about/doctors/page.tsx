import PageHeader from '@/app/_components/common/page-header';
import CTA from './_sections/_cta';
import Doctors from './_sections/_doctors';
import Message from './_sections/_message';
import Recommend from './_sections/_recommend';

export default function AboutDoctorsPage() {
  return (
    <>
      <PageHeader
        title="의료진/진료과"
        desc="대한민국 혈관치료의 표준을 만들어가는 청맥 의료진을 소개합니다."
      />

      <Doctors />
      <Recommend />
      <Message />
      <CTA />
    </>
  );
}
