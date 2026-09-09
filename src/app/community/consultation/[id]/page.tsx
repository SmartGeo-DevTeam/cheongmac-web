import { buttonClassName } from '@/app/_components/ui/button';
import UiPagination from '@/app/_components/ui/pagination';
import ConsultationPageHeader from '@/app/community/consultation/_components/consultation-page-header';
import ConsultationSidebar from '@/app/community/consultation/_components/consultation-sidebar';
import { getPublicConsultationById } from '@/_lib/consultations';
import { Link2, LockKeyhole } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const DEFAULT_LIST_URL = '/community/consultation';

type ConsultationDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

function getSafeListUrl(value?: string | string[]) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue || !rawValue.startsWith('/community/consultation'))
    return DEFAULT_LIST_URL;

  try {
    const url = new URL(rawValue, 'https://cheongmac.local');
    if (
      url.origin !== 'https://cheongmac.local' ||
      url.pathname !== '/community/consultation'
    )
      return DEFAULT_LIST_URL;
    return `${url.pathname}${url.search}`;
  } catch {
    return DEFAULT_LIST_URL;
  }
}

function categoryText(primary: string, secondary: string) {
  return secondary ? `${primary} | ${secondary}` : primary;
}

export async function generateMetadata({
  params,
}: ConsultationDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getPublicConsultationById(Number(id));

  return item
    ? {
        title: `${item.title} | 의학상담 | 청맥병원`,
        description: item.question[0],
      }
    : { title: '의학상담 | 청맥병원' };
}

function MobileListPagination({ returnTo }: { returnTo: string }) {
  const url = new URL(returnTo, 'https://cheongmac.local');
  const currentPage = Math.max(
    1,
    Number.parseInt(url.searchParams.get('page') ?? '1', 10) || 1,
  );
  const query = url.searchParams.get('q') ?? '';

  const hrefForPage = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (query) params.set('q', query);
    const search = params.toString();

    return search
      ? `/community/consultation?${search}`
      : '/community/consultation';
  };

  return (
    <UiPagination
      id="consultation-detail-pagination"
      currentPage={currentPage}
      totalPages={7}
      getPageHref={hrefForPage}
      ariaLabel="의학상담 목록 페이지 바로가기"
      variant="compact"
      className="mt-3 xl:hidden"
    />
  );
}

export default async function ConsultationDetailPage({
  params,
  searchParams,
}: ConsultationDetailPageProps) {
  const [{ id }, detailSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const item = await getPublicConsultationById(Number(id));
  if (!item) notFound();

  const returnTo = getSafeListUrl(detailSearchParams.from);

  return (
    <div>
      <ConsultationPageHeader titleAs="div" />

      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 pb-14 xl:grid-cols-[1fr_235px] xl:px-0 xl:pb-24">
        <div className="min-w-0">
          <article
            aria-labelledby="consultation-question-title"
            className="xl:rounded-[14px] xl:border xl:border-[#E0E4E7] xl:px-8 xl:py-8"
          >
            <header className="border-b border-[#E3E6E9] pb-4">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-6 items-center rounded-full bg-[#F3F4F5] px-2.5 text-[10px] font-medium text-[#555C64] xl:h-7 xl:px-3 xl:text-[11px]">
                  {categoryText(item.category.primary, item.category.secondary)}
                </span>
                <time className="text-[10px] text-[#A4AAB1] xl:text-[11px]">
                  이용일 · {item.date}
                </time>
              </div>

              <h1
                id="consultation-question-title"
                className="mt-2 flex items-center gap-1.5 break-keep text-[17px] font-semibold leading-[1.4] tracking-[-0.04em] text-[#242A31] xl:text-[20px]"
              >
                {item.isPrivate ? (
                  <LockKeyhole className="size-4 shrink-0" strokeWidth={2.1} />
                ) : null}
                <span>{item.title}</span>
                {item.hasLinkIcon ? (
                  <Link2 className="size-4 shrink-0" strokeWidth={1.7} />
                ) : null}
              </h1>
            </header>

            {item.imageSrc ? (
              <div className="relative mx-auto mt-4 aspect-[190/256] w-full max-w-[300px] overflow-hidden bg-[#F3F4F5] xl:mt-6 xl:max-w-[270px]">
                <Image
                  src={item.imageSrc}
                  alt="의학상담 문의 이미지"
                  fill
                  priority
                  sizes="(min-width: 1280px) 270px, 300px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div className="mt-4 space-y-3 break-keep text-[12px] leading-[1.75] tracking-[-0.035em] text-[#444B53] xl:mt-5 xl:text-[14px]">
              {item.question.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          {item.answered && item.doctors.length && item.answer ? (
            <section
              aria-labelledby="consultation-answer-heading"
              className="mt-5 rounded-[10px] border border-[#E0E4E7] px-4 py-5 xl:rounded-[14px] xl:px-8 xl:py-8"
            >
              <h2 id="consultation-answer-heading" className="sr-only">
                의료진 답변
              </h2>

              <div className="border-b border-[#E4E7EA] pb-4">
                <p className="mb-3 text-[10px] font-medium text-[#9298A0] xl:text-[11px]">
                  관련 의료진
                </p>
                <div className="flex flex-wrap gap-4">
                  {item.doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#F2F3F4] xl:size-14">
                        <Image
                          src={doctor.imageSrc}
                          alt={doctor.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-[13px] font-semibold text-[#FF6B3C] xl:text-[15px]">
                          {doctor.department} {doctor.name}
                        </p>
                        <p className="mt-1 text-[9px] text-[#9298A0] xl:text-[11px]">
                          전문분야 | {doctor.specialties.join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-3 break-keep text-[11px] leading-[1.75] tracking-[-0.03em] text-[#444B53] xl:text-[13px] xl:leading-[1.8]">
                {item.answer.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p className="pt-1 text-[9px] text-[#A2A8AF] xl:text-[10px]">
                  * 본 답변은 일반적인 의학 정보를 위한 것으로, 의료진의 직접
                  진료를 대신하지 않습니다.
                </p>
                {item.answerDate ? (
                  <p className="text-right text-[9px] text-[#9AA0A7] xl:text-[10px]">
                    답변작성일&nbsp;&nbsp;{item.answerDate}
                  </p>
                ) : null}
              </div>
            </section>
          ) : (
            <section className="mt-5 rounded-[10px] border border-[#E0E4E7] px-5 py-8 text-center text-[12px] text-[#8D949C]">
              의료진 답변을 준비하고 있습니다.
            </section>
          )}

          <div className="mt-7 flex justify-center xl:mt-10">
            <Link
              href={returnTo}
              className={buttonClassName({ variant: 'outline', size: 'md' })}
            >
              목록보기
            </Link>
          </div>

          <MobileListPagination returnTo={returnTo} />

          <div className="mt-8 xl:hidden">
            <ConsultationSidebar />
          </div>
        </div>

        <div className="hidden rounded-[14px] border border-[#E0E4E7] px-5 py-8 xl:block">
          <ConsultationSidebar />
        </div>
      </div>
    </div>
  );
}
