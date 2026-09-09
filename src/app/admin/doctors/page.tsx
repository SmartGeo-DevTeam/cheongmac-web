import { prisma } from '@/_lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card';
import { ExternalLink, PencilLine } from 'lucide-react';
import Link from 'next/link';
import CreateDoctorForm from './create-doctor-form';

export const dynamic = 'force-dynamic';

export default async function AdminDoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    include: {
      _count: {
        select: {
          specialties: true,
          careers: true,
          schedules: true,
          presentations: true,
          reviews: true,
          media: true,
          consultations: true,
        },
      },
    },
  });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          의료진 관리
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          의료진 고유정보와 이미지는 의료진 DB에서 관리하고, 진료분야·진료시간표·발표
          이력·환자 후기·미디어·의학상담은 각각의 콘텐츠 DB에서 관련 의료진으로
          연결합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>의료진 추가</CardTitle>
          <CardDescription>
            새 의료진은 처음에는 비노출 상태로 생성됩니다. 기본정보와 이미지를 입력한
            뒤 각 관계형 콘텐츠 DB에서 연결할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateDoctorForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>의료진 목록</CardTitle>
          <CardDescription>
            각 의료진과 연결된 관계형 데이터 개수를 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <article
                key={doctor.id}
                className="flex flex-col gap-4 rounded-xl border border-[#E4E4E7] p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-[#27272A]">
                      {doctor.name} {doctor.position}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                        doctor.isVisible
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : 'bg-[#F4F4F5] text-[#71717A]'
                      }`}
                    >
                      {doctor.isVisible ? '노출' : '미노출'}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">
                      /about/doctors/{doctor.slug}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[#71717A]">{doctor.department}</p>

                  <p className="mt-2 text-xs leading-5 text-[#A1A1AA]">
                    진료분야 {doctor._count.specialties} · 학력/약력{' '}
                    {doctor._count.careers} · 시간표 {doctor._count.schedules} · 발표{' '}
                    {doctor._count.presentations} · 후기 {doctor._count.reviews} · 미디어{' '}
                    {doctor._count.media} · 상담 {doctor._count.consultations}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/about/doctors/${doctor.slug}`}
                    target="_blank"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
                  >
                    <ExternalLink className="size-4" />
                    보기
                  </Link>
                  <Link
                    href={`/admin/doctors/${doctor.id}`}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-[#18181B] px-3 text-sm font-medium text-white hover:bg-[#27272A]"
                  >
                    <PencilLine className="size-4" />
                    관리
                  </Link>
                </div>
              </article>
            ))}

            {!doctors.length ? (
              <p className="py-10 text-center text-sm text-[#A1A1AA]">
                등록된 의료진이 없습니다.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
