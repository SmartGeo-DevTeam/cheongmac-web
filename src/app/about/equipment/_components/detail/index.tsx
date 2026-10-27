import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { EquipmentType } from '../../data';
import EquipmentDetailSection from './_components/section';

export default function AboutEquipmentDetail({
  equipment,
  previousHref,
  nextHref,
}: {
  equipment: EquipmentType;
  previousHref?: string;
  nextHref?: string;
}) {
  const detail = equipment.detail;

  return (
    <article
      className="mb-20
      xl:mb-28"
    >
      <section>
        <div
          className="relative aspect-628/340 overflow-hidden rounded-xl bg-subtle
          xl:rounded-[20px]"
        >
          <Image
            src={equipment.image}
            alt={`${equipment.title} ${equipment.model}`}
            fill
            className="object-cover"
          />
          {previousHref && (
            <Link
              href={previousHref}
              scroll={false}
              aria-label="이전 장비 보기"
              className="hidden
              xl:block xl:absolute xl:left-0 xl:top-1/2 xl:-translate-y-1/2"
            >
              <ChevronLeft
                className="size-6
                xl:size-16 xl:text-gray-400 stroke-1"
              />
            </Link>
          )}
          {nextHref && (
            <Link
              href={nextHref}
              scroll={false}
              aria-label="다음 장비 보기"
              className="hidden
              xl:block xl:absolute xl:right-0 xl:top-1/2 xl:-translate-y-1/2"
            >
              <ChevronRight
                className="size-6
                xl:size-16 xl:text-gray-400 stroke-1"
              />
            </Link>
          )}
        </div>

        <div className="xl:mt-10">
          <p
            className="hidden
            xl:block xl:font-semibold xl:text-accent xl:text-[20px]"
          >
            {equipment.title}
          </p>
          <h2
            className="hidden
            xl:block xl:mt-2 xl:text-pc-title-2"
          >
            {equipment.model}
          </h2>
          {detail?.englishName && (
            <p
              className="mt-3 text-mo-body-2 text-tertiary
              xl:mt-2 xl:font-semibold xl:text-disabled xl:text-[20px]"
            >
              {detail.englishName}
            </p>
          )}
          {detail?.description && (
            <p
              className="mt-2 pt-2 border-t border-t-default text-mo-body-1
              xl:mt-5 xl:pt-5 xl:text-pc-body-1"
            >
              {detail.description}
            </p>
          )}

          {!!detail?.highlights?.length && (
            <ul
              className="mt-8 grid gap-2
              xl:mt-5 xl:grid-cols-2 xl:gap-5"
            >
              {detail.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="px-3 py-2 flex items-center gap-2 rounded-full bg-subtle
                  xl:gap-3"
                >
                  <div
                    className="flex justify-center items-center size-6 rounded-full bg-base
                    xl:size-9"
                  >
                    <Check className="size-4 shrink-0 text-accent-ai" />
                  </div>
                  <span
                    className="font-semibold text-[14px]
                  xl:text-[18px]"
                  >
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {!!detail?.diseases?.length && (
        <EquipmentDetailSection
          label="진단 가능한 질환"
          title="어떤 질환을 알 수 있나요?"
        >
          <ul
            className="mt-5 flex flex-wrap gap-2
            xl:gap-3"
          >
            {detail.diseases.map((disease) => (
              <li
                key={disease}
                className="px-3 py-1.5 rounded-full border border-brand font-semibold text-brand text-[15px]
                xl:px-4 xl:py-2 xl:text-[18px]"
              >
                {disease}
              </li>
            ))}
          </ul>
        </EquipmentDetailSection>
      )}

      {!!detail?.cases?.length && (
        <EquipmentDetailSection
          label="실제 진단 사례"
          title="검사 결과, 이렇게 확인해요"
        >
          <ul
            className="mt-5 grid grid-cols-1
            xl:grid-cols-2 xl:gap-6"
          >
            {detail.cases.map((caseItem) => {
              const images = caseItem.images?.length
                ? caseItem.images
                : caseItem.image
                  ? [
                      {
                        id: 'main',
                        src: caseItem.image,
                        label: caseItem.title,
                      },
                    ]
                  : [];

              const isMultiple = images.length > 1;

              return (
                <li
                  key={caseItem.id}
                  className={`
                    ${isMultiple ? 'xl:col-span-2' : ''}`}
                >
                  <ul
                    className={`grid grid-cols-1
                      ${isMultiple ? 'xl:grid-cols-2 xl:gap-6' : ''}
                      `}
                  >
                    {images.map((image) => {
                      const label =
                        image.label || (!isMultiple ? caseItem.title : '');

                      return (
                        <li key={image.id}>
                          <div>
                            <div
                              className="mb-2 relative w-full aspect-4/3 rounded-xl bg-subtle overflow-hidden
                              xl:mb-5 xl:rounded-[20px]"
                            >
                              <Image
                                src={image.src}
                                alt={caseItem.title}
                                fill
                                className="object-cover"
                              />

                              {label && (
                                <span
                                  className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-white whitespace-nowrap font-semibold text-[14px]
                                  xl:font-medium xl:text-[16px]"
                                >
                                  {label}
                                </span>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {caseItem.description && (
                    <p
                      className="mb-10 text-mo-body-2
                      xl:text-pc-body-2"
                    >
                      {caseItem.description}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </EquipmentDetailSection>
      )}
    </article>
  );
}
