import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type IntroOverviewData = {
  imageSrc?: string;
  imageAlt?: string;
  imageLabel?: string;
  imagePlaceholder?: string;
  description?: string[];
  facilitiesHref?: string;
  caption?: string;
};

type IntroOverviewVariant = 'split' | 'banner';

export default function HospitalizedIntroOverview({
  data,
  variant = 'split',
}: {
  data: IntroOverviewData;
  variant?: IntroOverviewVariant;
}) {
  const isBanner = variant === 'banner';
  const hasContent = Boolean(data.description?.length || data.facilitiesHref);

  return (
    <div
      className={`mt-5
      ${
        isBanner
          ? 'xl:mt-6'
          : 'xl:mt-6 xl:grid xl:grid-cols-2 xl:items-center xl:gap-21'
      }`}
    >
      {/* 소개 이미지 */}
      <figure
        className={`relative aspect-335/220 rounded-xl overflow-clip
        ${isBanner ? 'xl:aspect-1280/556' : ''}`}
      >
        {data.imageSrc ? (
          <Image
            src={data.imageSrc}
            alt={data.imageAlt ?? ''}
            fill
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={data.imageLabel ?? ''}
            className="flex h-full items-center justify-center bg-subtle"
          >
            {!isBanner && data.imagePlaceholder}
          </div>
        )}

        {/* 배너 전용 이미지 위 문구 */}
        {isBanner && data.caption && (
          <figcaption
            className={`absolute inset-0 flex items-center justify-center px-5 text-center text-mo-heading-1
            xl:text-pc-title-1
            ${data.imageSrc ? 'text-white' : 'text-primary'}`}
          >
            {data.caption}
          </figcaption>
        )}
      </figure>

      {/* 설명 또는 링크가 있을 때만 표시 */}
      {hasContent && (
        <div
          className="mt-4
          xl:mt-0"
        >
          {data.description?.map((text, index) => (
            <p
              key={index}
              className="text-mo-body-1
              xl:text-pc-body-1"
            >
              {text}
            </p>
          ))}

          {data.facilitiesHref && (
            <Link
              href={data.facilitiesHref}
              className="mt-5 flex items-center gap-2 text-tertiary
              xl:mt-10"
            >
              <span
                className="font-medium text-[15px]
                xl:text-[18px]"
              >
                병원 시설 둘러보기
              </span>
              <ArrowRight
                className="size-4
                xl:size-5"
              />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
