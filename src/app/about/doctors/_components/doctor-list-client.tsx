'use client';

import AdminEditButton from '@/app/_components/inline-editor/admin-edit-button';
import {
  H2 as TypographyH2,
  H3 as TypographyH3,
  P as TypographyP,
} from '@/app/_components/ui/typography';
import Inner from '@/app/_components/inner';
import type { DoctorSummary } from '@/_lib/doctors';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import { HeartIcon, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import DoctorDepartmentTabs, {
  type DoctorDepartmentFilter,
} from './doctor-department-tabs';

function departmentMatches(
  department: string,
  filter: DoctorDepartmentFilter,
) {
  if (filter === 'radiology') return department.includes('영상의학과');
  if (filter === 'anesthesiology')
    return department.includes('마취통증의학과');

  return department.includes('혈관외과');
}

function DoctorCard({
  doctor,
  copy,
}: {
  doctor: DoctorSummary;
  copy: InlineContentData;
}) {
  const detailHref = `/about/doctors/${doctor.slug}`;
  const mobileImage = doctor.profileImageUrl ?? doctor.coverImageUrl;
  const desktopImage = doctor.coverImageUrl ?? doctor.profileImageUrl;

  return (
    <li className="group relative grid cursor-pointer grid-cols-[145px_1fr] gap-x-5 gap-y-10 xl:grid-cols-[302px_1fr]">
      <AdminEditButton
        href={`/admin/doctors/${doctor.id}#admin-doctor-basic`}
        label={`${doctor.name} ${doctor.position}`}
        className="left-2 right-auto top-2 xl:left-auto xl:right-2"
      />
      <Link
        id={`doctor-card-${doctor.slug}-card-link`}
        href={detailHref}
        aria-label={`${doctor.name} ${doctor.position} 상세보기`}
        className="absolute inset-0 z-[1] rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8BC9B8]"
      />

      <button
        id={`doctor-card-${doctor.slug}-favorite`}
        type="button"
        aria-label={`${doctor.name} ${doctor.position} 관심 의료진`}
        className="absolute right-0 top-0.5 z-20 xl:left-6 xl:top-6"
      >
        <HeartIcon size={20} color="#B2AFAC" />
      </button>

      <div className="pointer-events-none relative z-[2] aspect-145/200 w-full shrink-0 overflow-hidden rounded-[14px] bg-[#F7F4F2] transition group-hover:opacity-95 xl:aspect-[302/360]">
        {mobileImage ? (
          <Image
            src={mobileImage}
            alt={`${doctor.name} ${doctor.position}`}
            fill
            className="object-cover xl:hidden"
            sizes="145px"
          />
        ) : null}

        {desktopImage ? (
          <Image
            src={desktopImage}
            alt={`${doctor.name} ${doctor.position}`}
            fill
            className="hidden object-cover xl:block"
            sizes="302px"
          />
        ) : null}
      </div>

      <div className="pointer-events-none relative z-[2] flex flex-col">
        <span className="text-sm font-medium text-[#C8AFA4] xl:mt-10 xl:text-lg">
          {doctor.department}
        </span>

        <div className="flex items-end gap-0.5">
          <TypographyH3 className="text-[22px] font-bold text-[#262C35] xl:text-[32px]">
            {doctor.name}
          </TypographyH3>
          <span className="relative text-[22px] font-bold text-[#262C35] xl:bottom-0.5 xl:text-[26px]">
            {doctor.position}
          </span>
        </div>

        <span className="mt-4 block text-sm font-semibold text-[#BBBBBB] xl:mt-6 xl:text-base">
          {copy.specialtyLabel}
        </span>

        <TypographyP className="break-keep text-[#262C35] xl:mt-2 xl:flex-1 xl:text-xl">
          {doctor.specialties.join(', ') || copy.emptySpecialtyText || '전문분야 준비 중'}
        </TypographyP>

        <div className="mt-8 grid grid-cols-2 gap-x-1 text-sm font-bold text-white xl:mb-6 xl:gap-x-2 xl:text-base">
          <Link
            id={`doctor-card-${doctor.slug}-detail`}
            href={detailHref}
            className="pointer-events-auto relative z-20 rounded-full bg-[#8BC9B8] py-2 text-center xl:py-3"
          >
            {copy.detailLabel}
          </Link>

          <Link
            id={`doctor-card-${doctor.slug}-reservation`}
            href={doctor.reservationHref || '/'}
            className="pointer-events-auto relative z-20 rounded-full bg-[#FD7740] py-2 text-center xl:py-3"
          >
            {copy.reservationLabel}
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function DoctorListClient({
  doctors,
  copy,
}: {
  doctors: DoctorSummary[];
  copy: InlineContentData;
}) {
  const [query, setQuery] = useState('');
  const [department, setDepartment] =
    useState<DoctorDepartmentFilter>('vascular');

  const filteredDoctors = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko-KR');

    return doctors.filter((doctor) => {
      if (!departmentMatches(doctor.department, department)) return false;
      if (!keyword) return true;

      return [
        doctor.name,
        doctor.position,
        doctor.department,
        ...doctor.specialties,
      ]
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword);
    });
  }, [department, doctors, query]);

  return (
    <section aria-labelledby="doctor-list-heading">
      <TypographyH2 id="doctor-list-heading" className="sr-only">
        청맥병원 의료진 목록
      </TypographyH2>

      <Inner usePaddingHorizontal>
        <div className="grid grid-cols-2 text-[15px] font-semibold xl:text-[23px]">
          <button
            type="button"
            aria-pressed="true"
            className="rounded-tl-2xl rounded-tr-2xl border border-b-transparent border-[#FD7740] py-1 text-[#FD7740] xl:py-4"
          >
            {copy.doctorsTab}
          </button>
          <button
            type="button"
            aria-pressed="false"
            className="border-b border-b-[#FD7740] bg-[#FBFBFB] py-1 text-[#999999] xl:py-4"
          >
            {copy.departmentsTab}
          </button>
        </div>
      </Inner>

      <Inner usePaddingHorizontal>
        <div className="mt-2 bg-[#FBFBFB] py-7 xl:mt-10 xl:bg-transparent xl:py-0">
          <div className="flex items-center gap-2 xl:justify-center xl:gap-5 xl:rounded-xl xl:border xl:border-[#E5E7EB] xl:bg-[#FBFBFB] xl:py-10">
            <span className="hidden xl:block xl:text-[28px] xl:font-bold xl:text-[#767C88]">
              {copy.searchLabel}
            </span>

            <input
              id="doctor-search-input"
              name="doctorSearch"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="h-10.5 w-full rounded-lg border border-[#CCCCCC] pl-5 text-sm font-medium xl:h-15 xl:w-3/5 xl:px-5 xl:text-lg"
            />

            <button
              type="button"
              aria-label="의료진 검색"
              className="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-lg bg-[#FD7740] xl:h-15 xl:w-15"
            >
              <Search className="size-8 text-white xl:h-9 xl:w-8" />
            </button>
          </div>

          <DoctorDepartmentTabs
            value={department}
            onValueChange={setDepartment}
            labels={{
              vascular: copy.vascularLabel,
              radiology: copy.radiologyLabel,
              anesthesiology: copy.anesthesiologyLabel,
            }}
          />
        </div>
      </Inner>

      <Inner usePaddingHorizontal>
        {filteredDoctors.length ? (
          <ul className="mt-12 grid grid-cols-1 gap-10 xl:mt-15 xl:grid-cols-2 xl:gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} copy={copy} />
            ))}
          </ul>
        ) : (
          <div className="mt-12 rounded-xl border border-dashed border-[#D9DDE1] bg-[#FAFAFA] px-5 py-14 text-center text-sm text-[#9298A0] xl:text-lg">
            {copy.emptyText}
          </div>
        )}
      </Inner>

      <Inner usePaddingHorizontal>
        <Link
          href={copy.matchingHref}
          className="relative mt-10 block aspect-335/180 w-full overflow-hidden rounded-[14px] px-5 xl:aspect-1280/360"
        >
          <Image
            src={copy.matchingMobileImage}
            alt={copy.matchingAlt}
            fill
            className="block xl:hidden"
          />
          <Image
            src={copy.matchingDesktopImage}
            alt={copy.matchingAlt}
            fill
            className="hidden xl:block"
          />
        </Link>
      </Inner>

      <Inner>
        <Link
          href={copy.messageHref}
          className="relative mt-5 block aspect-375/250 w-full xl:mt-10 xl:aspect-1320/715 xl:px-5"
        >
          <Image
            src={copy.messageMobileImage}
            alt={copy.messageAlt}
            fill
            className="block xl:hidden"
          />
          <div className="relative z-10 h-full w-full">
            <Image
              src={copy.messageDesktopImage}
              alt={copy.messageAlt}
              fill
              className="hidden xl:block"
            />
          </div>
        </Link>
      </Inner>
    </section>
  );
}
