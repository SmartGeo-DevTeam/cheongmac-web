import { ChevronRight, Play } from 'lucide-react';
import Image, { type ImageProps } from 'next/image';
import type { ReactNode } from 'react';

type ImageSource = ImageProps['src'];

type SingleMedia = {
  type: 'single';
  src: ImageSource;
  alt: string;
};

type VideoMedia = {
  type: 'video';
  src: ImageSource;
  alt: string;
};

type CompareMedia = {
  type: 'compare';
  beforeSrc: ImageSource;
  beforeAlt: string;
  afterSrc?: ImageSource;
  /** true인 경우 보호된 afterSrc는 아예 렌더링하지 않습니다. */
  loginRequired?: boolean;
};

export type ContentCardMedia = SingleMedia | CompareMedia | VideoMedia;

type ContentCardProps = {
  media: ContentCardMedia;
  children: ReactNode;
  ratio?: 'standard' | 'wide';
};

/** 썸네일이 한 장이거나 전후 비교인 카드를 공통으로 표현합니다. */
export default function ContentCard({
  media,
  children,
  ratio = 'standard',
}: ContentCardProps) {
  const aspectClass = ratio === 'wide' ? 'aspect-video' : 'aspect-410/260';

  return (
    <article>
      <div
        className={`relative w-full overflow-hidden bg-gray-100 ${aspectClass}`}
      >
        {media.type === 'single' ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover"
          />
        ) : media.type === 'video' ? (
          <>
            <Image src={media.src} alt={media.alt} fill className="object-cover" />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-black/15"
            >
              <span className="flex size-13 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                <Play className="size-6 fill-current" />
              </span>
            </span>
          </>
        ) : (
          <>
            <div className="grid h-full grid-cols-2">
              <div className="relative w-full h-full">
                <Image
                  src={media.beforeSrc}
                  alt={media.beforeAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative border-l border-white/80 bg-base overflow-hidden">
                {media.loginRequired ? (
                  <>
                    {/* 비로그인 사용자의 HTML에는 보호된 afterSrc를 포함하지 않습니다. */}
                    <Image
                      src={media.beforeSrc}
                      alt=""
                      fill
                      className="object-cover scale-110 blur-sm"
                    />
                    <span
                      className="absolute inset-0 bg-black/15"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded bg-white whitespace-nowrap font-bold text-mo-label shadow-sm z-10
                      xl:px-3 xl:py-1.5 xl:text-pc-label"
                    >
                      로그인
                    </span>
                  </>
                ) : (
                  <Image
                    src={media.afterSrc ?? media.beforeSrc}
                    alt="치료 후 비교 이미지"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-7.5 flex justify-center items-center rounded-full bg-white text-accent-ai shadow-sm z-10
              xl:size-10.5"
            >
              <ChevronRight
                className="size-6
                xl:size-8"
              />
            </span>
          </>
        )}
      </div>
      <div className={'p-5'}>{children}</div>
    </article>
  );
}
