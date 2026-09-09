import { DOCTORS, getDoctorBySlug } from '../data';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ doctorSlug: string }>;
};

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({
    doctorSlug: doctor.slug,
  }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { doctorSlug } = await params;
  const doctor = getDoctorBySlug(doctorSlug);

  if (!doctor) {
    return {
      title: '의료진 상세보기 | 청맥병원',
    };
  }

  const specialties = Array.from(new Set(doctor.detailSpecialties)).join(', ');

  return {
    title: `${doctor.name} ${doctor.position} | ${doctor.department} | 청맥병원`,
    description: `${doctor.name} ${doctor.position}의 전문진료분야는 ${specialties}입니다. 청맥병원 의료진의 진료분야, 약력과 진료일정을 확인해보세요.`,
  };
}

export default function DoctorDetailLayout({ children }: LayoutProps) {
  return children;
}
