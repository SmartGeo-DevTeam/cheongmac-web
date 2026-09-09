import { getDoctorBaseBySlug, getDoctorProfileBundle } from '@/_lib/doctors';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ doctorSlug: string }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { doctorSlug } = await params;
  const doctor = await getDoctorBaseBySlug(doctorSlug);

  if (!doctor) {
    return {
      title: '의료진 상세보기 | 청맥병원',
    };
  }

  const bundle = await getDoctorProfileBundle(doctor.id);
  const specialties =
    bundle?.specialties.map((item) => item.name).join(', ') ?? '';

  return {
    title: `${doctor.name} ${doctor.position} | ${doctor.department} | 청맥병원`,
    description: specialties
      ? `${doctor.name} ${doctor.position}의 전문진료분야는 ${specialties}입니다. 진료분야, 학력·약력, 발표 이력, 환자 후기, 미디어와 의학상담을 확인해보세요.`
      : `${doctor.name} ${doctor.position}의 청맥병원 의료진 상세 정보입니다.`,
  };
}

export default function DoctorDetailLayout({ children }: LayoutProps) {
  return children;
}
