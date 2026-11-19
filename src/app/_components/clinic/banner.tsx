import Inner from '@/app/_components/common/inner';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type ClinicBannerVariant = 'green' | 'mint' | 'pink';

export type ClinicBannerProps = {
  id: string;
  href: string;
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  variant?: ClinicBannerVariant;
  image?: {
    src: string;
    alt: string;
  };
  isPaddingHorizontalInMobile?: boolean;
};

// 배너 배경색 variants
const bannerBackgrounds: Record<ClinicBannerVariant, string> = {
  green: 'var(--color-brand)',
  mint: 'var(--color-accent-ai)',
  pink: `linear-gradient(
    180deg,
    #FAE3E8 23%,
    #F8DCE2 29%,
    #F6D3DA 45%,
    #F6D0D8 66%
  )`,
};

export default function ClinicBanner({
  id,
  href,
  heading,
  subheading,
  ctaLabel = '자세히보기',
  variant = 'green',
  image,
  isPaddingHorizontalInMobile = true,
}: ClinicBannerProps) {
  const isPink = variant === 'pink';

  return (
    <section id={id}>
      <Inner usePaddingHorizontalInMobile={isPaddingHorizontalInMobile}>
        <div
          className="mt-20
          xl:mt-40"
        >
          <Link
            href={href}
            style={{ background: bannerBackgrounds[variant] }}
            className={`relative flex overflow-hidden
              xl:rounded-full
              ${isPaddingHorizontalInMobile ? `rounded-xl` : ``}
              `}
          >
            <div
              className={`relative z-10 flex flex-col px-7 py-6
                xl:px-30 xl:py-12
                ${isPink ? 'text-[#592B2B]' : 'text-inverse'}
                ${image ? 'w-7/10' : 'w-full'}`}
            >
              <h2
                className="font-extrabold text-[20px] leading-[130%]
                xl:font-bold xl:text-[34px]"
              >
                <span>{heading}</span>

                {subheading && (
                  <span className="block xl:inline">{` ${subheading}`}</span>
                )}
              </h2>

              <div
                className={`mt-4 flex items-center gap-1 font-medium text-[15px]
                  xl:mt-5 xl:text-[18px]
                  ${isPink ? 'text-primary' : ''}
                  `}
              >
                <span>{ctaLabel}</span>
                <ChevronRight
                  className="size-3
                  xl:size-5"
                />
              </div>
            </div>

            {image && (
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 w-30 aspect-586/476 pointer-events-none
                xl:right-20 xl:w-auto xl:h-full"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </Link>
        </div>
      </Inner>
    </section>
  );
}
