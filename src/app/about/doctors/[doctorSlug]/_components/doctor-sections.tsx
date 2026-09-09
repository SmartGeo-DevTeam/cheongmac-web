import Inner from '@/app/_components/inner';
import {
  getDoctorCareers,
  getDoctorConsultations,
  getDoctorMedia,
  getDoctorPresentations,
  getDoctorProfileCore,
  getDoctorReviews,
  getDoctorSchedule,
  getDoctorSpecialties,
} from '@/_lib/doctors';
import { Skeleton } from '@/_shadcn/ui/skeleton';
import { ArrowRight, HeartIcon, Link2, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  DoctorPresentationMarquee,
  DoctorReviewCarousel,
  DoctorSectionHead,
} from './doctor-client-sections';

const scheduleDays = [
  { key: 'mon', label: '월' },
  { key: 'tue', label: '화' },
  { key: 'wed', label: '수' },
  { key: 'thu', label: '목' },
  { key: 'fri', label: '금' },
  { key: 'sat', label: '토' },
] as const;

function DetailInfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="relative mb-2 border-b border-b-[#E5E7EB] pb-2 text-sm font-semibold text-[#FB9A74] xl:pl-9 xl:text-[28px] xl:text-[#FD7740] xl:before:absolute xl:before:left-0 xl:before:top-2 xl:before:size-7 xl:before:bg-[url('/assets/brand/symbol.svg')] xl:before:bg-contain xl:before:bg-center xl:before:bg-no-repeat">
        {title}
      </h2>
      {children}
    </div>
  );
}

async function DoctorSpecialtiesBlock({
  doctorId,
}: {
  doctorId: string;
}) {
  const specialties = await getDoctorSpecialties(doctorId);

  return (
    <DetailInfoBlock title="전문진료분야">
      {specialties.length ? (
        <p className="text-[#262C35] xl:text-xl">
          {specialties.map((item) => item.name).join(', ')}
        </p>
      ) : (
        <p className="text-[#9AA0A7] xl:text-lg">
          등록된 전문진료분야가 없습니다.
        </p>
      )}
    </DetailInfoBlock>
  );
}

async function DoctorCareersBlock({
  doctorId,
}: {
  doctorId: string;
}) {
  const careers = await getDoctorCareers(doctorId);

  return (
    <DetailInfoBlock title="학력·약력">
      {careers.length ? (
        <ul className="list-disc pl-5">
          {careers.map((career) => (
            <li key={career.id} className="xl:text-xl xl:leading-[160%]">
              {career.content}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[#9AA0A7] xl:text-lg">
          등록된 학력·약력이 없습니다.
        </p>
      )}
    </DetailInfoBlock>
  );
}

function DoctorInfoBlockSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-40" />
      <Skeleton className="mt-3 h-16 w-full" />
    </div>
  );
}

export async function DoctorProfileSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const doctor = await getDoctorProfileCore(doctorId);
  if (!doctor) return null;

  const heroImage =
    doctor.images.cutout ??
    doctor.images.profile ??
    doctor.images.cover;

  return (
    <div className="bg-[#F5F6F8] py-5 xl:py-10">
      <Inner usePaddingHorizontal>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] xl:gap-x-12">
          <div className="rounded-xl bg-white xl:rounded-[14px]">
            <div className="relative flex aspect-335/300 w-full items-end justify-center">
              {heroImage ? (
                <div className="relative h-full aspect-232/382">
                  <Image
                    src={heroImage}
                    alt={`${doctor.name} ${doctor.position}`}
                    fill
                    priority
                    className="object-cover object-bottom"
                    sizes="(min-width: 1280px) 420px, 70vw"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex flex-col xl:flex-row-reverse xl:items-center xl:gap-2">
              <span className="text-xs text-[#767C88] xl:relative xl:top-2 xl:text-lg">
                {doctor.department}
              </span>
              <h1
                id="doctor-profile-title"
                className="text-lg font-bold text-[#262C35] xl:text-[34px]"
              >
                {doctor.name} {doctor.position}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 xl:gap-5">
              <button
                id={`doctor-${doctor.slug}-favorite`}
                type="button"
                aria-label={`${doctor.name} 관심 의료진`}
              >
                <HeartIcon color="#B2AFAC" className="size-5 xl:size-8" />
              </button>
              <Link
                id={`doctor-${doctor.slug}-reservation`}
                href={doctor.reservationHref || '/'}
                className="rounded-full bg-[#FD7740] px-5 py-2 text-sm font-bold text-white xl:px-10 xl:py-3 xl:text-xl"
              >
                진료 예약하기
              </Link>
            </div>
          </div>

          <div className="mt-5 space-y-5 xl:col-start-2 xl:row-start-1 xl:mt-9 xl:space-y-7">
            <Suspense fallback={<DoctorInfoBlockSkeleton />}>
              <DoctorSpecialtiesBlock doctorId={doctorId} />
            </Suspense>

            <Suspense fallback={<DoctorInfoBlockSkeleton />}>
              <DoctorCareersBlock doctorId={doctorId} />
            </Suspense>
          </div>
        </div>
      </Inner>
    </div>
  );
}

function ScheduleBadge({ status }: { status: string }) {
  const className =
    {
      진료: 'bg-[#EEF0F4] text-[#111111]',
      휴진: 'bg-transparent text-[#BBBBBB]',
      문의: 'bg-transparent text-[#0E705B]',
    }[status] ?? 'bg-transparent text-[#767C88]';

  return (
    <span
      className={`inline-flex h-6 min-w-10 items-center justify-center rounded-full px-2 font-bold ${className} xl:h-8 xl:min-w-20`}
    >
      {status}
    </span>
  );
}

export async function DoctorScheduleSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const rows = await getDoctorSchedule(doctorId);

  return (
    <Inner usePaddingHorizontal>
      <div>
        <h2 id="doctor-schedule-heading" className="sr-only">
          진료시간표
        </h2>

        {rows.length ? (
          <div className="overflow-hidden rounded-md border border-[#DCE3E1] bg-white xl:mx-auto">
            <div className="grid grid-cols-[44px_repeat(6,minmax(0,1fr))] bg-[#347F6D] text-center text-xs font-bold text-white xl:grid-cols-[90px_repeat(6,minmax(0,1fr))] xl:text-lg">
              <div className="py-3 xl:py-4">시간</div>
              {scheduleDays.map((day) => (
                <div key={day.key} className="py-3 xl:py-4">
                  {day.label}
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[44px_repeat(6,minmax(0,1fr))] items-center border-t border-[#EEF0F2] py-2 text-center text-xs xl:grid-cols-[90px_repeat(6,minmax(0,1fr))] xl:py-4 xl:text-lg"
              >
                <div className="font-bold text-[#222222]">{row.label}</div>
                {scheduleDays.map((day) => (
                  <div key={day.key} className="flex justify-center">
                    <ScheduleBadge status={row[day.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#D9DDE1] bg-white px-5 py-10 text-center text-sm text-[#9AA0A7]">
            등록된 진료시간표가 없습니다.
          </div>
        )}

        <p className="mt-3 break-keep text-xs leading-5 text-[#999999] xl:mx-auto xl:mt-4 xl:text-sm xl:leading-[180%]">
          *진료시간표는 상황에 따라 변경될 수 있으니, 내원 전 꼭 병원에
          문의해주시길 바랍니다.
          <br />
          *토요일 진료는 예약 및 내원 시 확인 부탁드립니다. (일요일, 공휴일은
          휴진입니다.)
        </p>
      </div>
    </Inner>
  );
}

export async function DoctorReviewsSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const reviews = await getDoctorReviews(doctorId);

  return (
    <section className="mt-10 xl:relative xl:mx-auto xl:mt-15 xl:max-w-7xl">
      <DoctorSectionHead title="환자 후기" moreHref="/" moreLabel="후기 더보기" />
      <DoctorReviewCarousel
        reviews={reviews.map((review) => ({
          id: review.id,
          imageUrl: review.imageUrl,
          patientName: review.patientName,
          age: review.age,
          gender: review.gender,
          treatment: review.treatment,
        }))}
      />
    </section>
  );
}

export async function DoctorMediaSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const media = await getDoctorMedia(doctorId);
  const featured = media.find((item) => item.isFeatured) ?? media[0];
  const others = media.filter((item) => item.id !== featured?.id).slice(0, 3);

  return (
    <section className="mt-15 xl:relative xl:mx-auto xl:max-w-7xl">
      <DoctorSectionHead title="미디어" moreHref="/" moreLabel="영상 더보기" />

      <div className="mt-5 flex flex-col gap-3 px-5 xl:ml-80 xl:mt-0 xl:gap-6 xl:px-0">
        {featured ? (
          <Link
            href={featured.linkUrl}
            target="_blank"
            rel="noreferrer"
            className="relative inline-block aspect-video w-full overflow-hidden rounded-lg bg-[#E7E9EB] xl:rounded-[20px]"
          >
            {featured.thumbnailUrl ? (
              <Image
                src={featured.thumbnailUrl}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 900px, 100vw"
              />
            ) : null}
          </Link>
        ) : (
          <div className="grid aspect-video place-items-center rounded-xl border border-dashed border-[#D9DDE1] bg-white text-sm text-[#9AA0A7]">
            등록된 미디어가 없습니다.
          </div>
        )}

        {others.length ? (
          <div className="grid grid-cols-3 gap-2 xl:gap-5">
            {others.map((item) => (
              <Link
                key={item.id}
                href={item.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#E7E9EB] xl:rounded-[20px]"
              >
                {item.thumbnailUrl ? (
                  <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 300px, 33vw"
                  />
                ) : null}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {media.length ? (
        <Link
          href="/"
          className="hidden xl:mx-auto xl:mt-9 xl:flex xl:items-center xl:justify-end xl:gap-2.5 xl:px-5"
        >
          <span className="text-xl font-bold text-[#FD7740]">영상 더보기</span>
          <ArrowRight size={20} color="#FD7740" />
        </Link>
      ) : null}
    </section>
  );
}

export async function DoctorConsultationsSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const consultations = await getDoctorConsultations(doctorId);

  return (
    <section className="mt-15 xl:relative xl:mx-auto xl:max-w-7xl">
      <DoctorSectionHead
        title="의학 상담"
        moreHref="/community/consultation"
        moreLabel="상담 더보기"
      />

      <div className="mt-5 space-y-2.5 px-5 xl:ml-80 xl:mt-0 xl:px-0">
        {consultations.length ? (
          consultations.map((item) => (
            <Link
              id={`doctor-consultation-${item.id}`}
              key={item.id}
              href={`/community/consultation/${item.id}`}
              className="block rounded-xl border border-[#E1E5E8] bg-white px-4 py-4 transition hover:border-[#B9CFC9] hover:bg-[#FCFDFD] xl:px-6 xl:py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#6D8E86] xl:text-sm">
                    {item.categoryPrimary}
                    {item.categorySecondary ? ` · ${item.categorySecondary}` : ''}
                  </p>
                  <h3 className="mt-2 flex items-center gap-1.5 break-keep text-base font-semibold text-[#252B33] xl:text-xl">
                    {item.isPrivate ? (
                      <LockKeyhole className="size-4 shrink-0" />
                    ) : null}
                    <span>{item.title}</span>
                    {item.hasLinkIcon ? (
                      <Link2 className="size-4 shrink-0" />
                    ) : null}
                  </h3>
                </div>
                <time className="shrink-0 text-xs text-[#A0A6AC] xl:text-sm">
                  {new Intl.DateTimeFormat('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                    .format(item.publishedAt)
                    .replaceAll(' ', '')}
                </time>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-[#D9DDE1] bg-white px-5 py-10 text-center text-sm text-[#9AA0A7]">
            이 의료진과 연결된 의학상담이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}

export async function DoctorPresentationsSection({
  doctorId,
}: {
  doctorId: string;
}) {
  const items = await getDoctorPresentations(doctorId);

  return (
    <section className="bg-[linear-gradient(to_bottom,#FFFFFF_0%,#FFEAE2_66%,#FFFFFF_100%)] pb-15 pt-20">
      <div className="px-5 text-center text-[#333333]">
        <h2 className="text-[26px] font-bold xl:text-[34px]">
          끊임없이 연구하여 <br className="block xl:hidden" />
          의료계가 인정한 전문성
        </h2>

        <p className="mt-3 text-sm xl:mt-5 xl:text-xl">
          논문 발표와 전문 서적 집필, 국내외 학술 활동 및 수상을 통해
          <br className="hidden xl:block" />
          의료계에서도 인정받는 전문성을 이어가고 있습니다.
        </p>
      </div>

      <DoctorPresentationMarquee
        items={items.map((item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          linkUrl: item.linkUrl,
        }))}
      />

      {!items.length ? (
        <div className="mx-auto mt-10 max-w-3xl px-5">
          <div className="rounded-xl border border-dashed border-[#D9DDE1] bg-white px-5 py-10 text-center text-sm text-[#9AA0A7]">
            등록된 발표·연구 이력이 없습니다.
          </div>
        </div>
      ) : null}

      <div className="mb-15 mt-10 flex justify-center px-5 xl:mb-20 xl:mt-15">
        <Link
          href="/about/doctors"
          className="rounded-full border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-bold text-[#262C35] xl:px-10 xl:py-3 xl:text-xl"
        >
          의료진 전체보기
        </Link>
      </div>
    </section>
  );
}
