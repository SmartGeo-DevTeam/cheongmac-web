import type { Metadata } from 'next';
import HospitalizedContent from './_components/_hospitalized-content';

export const metadata: Metadata = {
  title: '입원준비 | 입·퇴원안내',
};

export default function GuideHospitalizedPage() {
  return <HospitalizedContent currentStep={1} />;
}
