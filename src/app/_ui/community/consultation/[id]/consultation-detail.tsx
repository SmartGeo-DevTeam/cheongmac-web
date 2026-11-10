import Inner from '@/app/_components/common/inner';
import MaskedName from '@/app/_components/common/masked-name';
import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { consultationCategories, type ConsultationItem } from '@/app/_data/community/consultation/consultations';
import ConsultationSidebar from './consultation-sidebar';

function ConsultationCategoryBadge({ item }: { item: ConsultationItem }) {
  const subCategory = consultationCategories.find(
    (category) => category.id === item.category,
  )?.label;
  return (
    <span
      className="inline-block px-3 py-1 rounded-full bg-gray-50 font-semibold text-[12px]
      xl:px-5 xl:py-1.5 xl:text-[15px]
    "
    >
      {item.primaryCategory}
      {subCategory && item.primaryCategory !== '기타'
        ? ` | ${subCategory}`
        : ''}
    </span>
  );
}

export default function ConsultationDetail({
  item,
  listHref,
}: {
  item: ConsultationItem;
  listHref: string;
}) {
  return (
    <section id="community-consultation-detail">
      <Inner>
        <div
          className="mt-5 grid
          xl:mt-10 xl:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] xl:gap-x-6 xl:items-start"
        >
          <div>
            <article className="xl:px-15 xl:py-10 xl:rounded-[20px] xl:border xl:border-default ">
              <div
                className="border-b border-default pb-4
                xl:pb-3"
              >
                <ConsultationCategoryBadge item={item} />
                <div className="xl:flex xl:justify-between xl:items-end">
                  <h2
                    className="mt-1 grid font-bold text-[20px]
                    xl:mt-2 xl:text-pc-heading-1"
                  >
                    {item.isPrivate ? (
                      <LockKeyhole
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0"
                      />
                    ) : null}
                    {item.title}
                  </h2>

                  <div
                    className="mt-1 flex justify-end items-center gap-1 text-tertiary text-[12px]
                    xl:text-[16px]
                    "
                  >
                    {item.author ? (
                      <MaskedName name={item.author} />
                    ) : (
                      <span>익명</span>
                    )}

                    <span className="size-1 shrink-0 rounded-full bg-gray-300" />

                    <time dateTime={item.date} className="font-medium">
                      {item.date.replaceAll('-', '.')}
                    </time>
                  </div>
                </div>
              </div>

              {item.isPrivate ? (
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 py-12 text-center">
                  <LockKeyhole
                    aria-hidden="true"
                    className="size-8 text-tertiary"
                  />
                  <p className="text-[15px] font-semibold">
                    비공개 상담입니다.
                  </p>
                  <p className="max-w-md text-[13px] leading-6 text-secondary">
                    작성자 확인 기능이 연결되기 전까지 비공개 문의와 답변은
                    표시하지 않습니다.
                  </p>
                </div>
              ) : (
                <div
                  className="mt-5
                "
                >
                  {item.imageSrc ? (
                    <div
                      className="mb-5 w-full
                      xl:mx-auto xl:w-1/2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageSrc}
                        alt="상담 내용에 첨부한 이미지"
                        loading="lazy"
                        className="block h-auto w-full"
                      />
                    </div>
                  ) : null}

                  <p
                    className="mt-5 text-mo-body-2
                    xl:font-normal text-[20px]"
                  >
                    {item.question}
                  </p>
                </div>
              )}
            </article>

            {!item.isPrivate && item.answer ? (
              <article
                className="mt-10 px-4 py-5 rounded-[20px] border border-default
                xl:mt-5 xl:px-15 xl:py-10"
              >
                <div
                  className="flex items-center gap-3
                  xl:gap-6"
                >
                  <div
                    className="relative size-15 rounded-full overflow-clip
                    xl:size-22.5"
                  >
                    <Image
                      src="/doctors/bak-m.png"
                      alt="doctor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-orange-600 text-[15px]
                      xl:text-[20px]"
                    >
                      {item.doctor
                        ? `${item.doctor.department} ${item.doctor.name}`
                        : '청맥병원 의료진'}
                    </h3>
                    <p
                      className="font-medium text-tertiary text-[12px]
                      xl:text-[16px]"
                    >
                      전문 의료진의 답변
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-t-default" />

                <div
                  className="mt-5 text-mo-body-2
                  xl:font-normal xl:text-[20px]"
                >
                  <p className="mb-3">안녕하세요, 청맥병원입니다.</p>
                  <p className="whitespace-pre-line break-keep">
                    {item.answer}
                  </p>
                  <p className="mt-4">감사합니다.</p>
                </div>

                <p
                  className="mt-5 text-tertiary text-mo-caption
                  xl:text-pc-caption"
                >
                  * 본 답변은 화면 확인을 위한 예시이며, 정확한 진단은 의료진의
                  대면 진료가 필요합니다.
                </p>

                <p
                  className="mt-5 text-right font-medium text-tertiary text-[12px]
                  xl:text-[16px]"
                >
                  답변작성일 {item.date.replaceAll('-', '.')}
                </p>
              </article>
            ) : null}
          </div>

          <div
            className="mt-10 flex justify-center
            xl:mt-15 xl:col-start-1 xl:col-span-2"
          >
            <Link
              href={listHref}
              className="inline-flex px-7 py-3 rounded-full border border-green-900 font-bold text-green-900 text-[14px]
              xl:mb-20 xl:px-10 xl:py-4 xl:text-[16px]"
            >
              목록보기
            </Link>
          </div>

          <div className="xl:col-start-2 xl:row-start-1 xl:px-7 xl:py-10 xl:h-full xl:rounded-[20px] xl:border xl:border-default">
            <ConsultationSidebar />
          </div>
        </div>
      </Inner>
    </section>
  );
}
