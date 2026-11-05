import Inner from '@/app/_components/common/inner';
import ContentDetailHeader from '@/app/_components/content-detail/header';
import ContentDetailNavigation from '@/app/_components/content-detail/navigation';
import { Newspaper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '../../data';

type Neighbor = Pick<NewsItem, 'id' | 'title'> | null;

/** 실제 http(s) 기사 주소가 있을 때에만 원문 링크를 제공합니다. */
function getOriginalArticleUrl(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function NewsDetail({
  item,
  previous,
  next,
  returnTo,
}: {
  item: NewsItem;
  previous: Neighbor;
  next: Neighbor;
  returnTo: string;
}) {
  const category =
    item.source ?? (item.category === 'press' ? '언론보도' : '원내소식');
  const originalArticleUrl = getOriginalArticleUrl(item.originalArticleUrl);

  return (
    <section id="community-news-detail">
      <Inner>
        <ContentDetailHeader
          headingLevel="h2"
          badgeVariant="neutral"
          category={category}
          categoryLogoSrc={item.sourceLogoSrc}
          categoryLogoAlt={item.source ? `${item.source} 로고` : undefined}
          title={item.title}
          date={item.date.replaceAll('.', '-')}
          shareLabel="청맥뉴스 공유하기"
        />

        <div
          className="mt-5
          xl:mt-10 xl:px-50"
        >
          {originalArticleUrl && (
            <Link
              href={originalArticleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 place-self-center flex items-center gap-4 rounded-xl bg-subtle font-semibold text-gray-800 text-[15px]
              xl:px-9 xl:text-[18px]"
            >
              <span>기사 원문 바로가기</span>
              <Newspaper className="size-5" aria-hidden="true" />
            </Link>
          )}

          {/* S -- 추후 에디터로 변경 예정인 내용 */}
          <div className="mt-5">
            {item.content.blocks.length ? (
              item.content.blocks.map((block, index) => {
                if (block.type === 'image') {
                  return (
                    <figure
                      key={`${item.id}-block-${index}`}
                      className="w-full"
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-subtle">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          sizes="(min-width: 1280px) 520px, calc(100vw - 40px)"
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </figure>
                  );
                }

                return (
                  <p
                    key={`${item.id}-block-${index}`}
                    className="whitespace-pre-line"
                  >
                    {block.text}
                  </p>
                );
              })
            ) : (
              <p className="text-secondary">상세 내용이 등록되지 않았습니다.</p>
            )}
          </div>
          {/* E -- 추후 에디터로 변경 예정인 내용 */}
        </div>

        <div className="mt-14 xl:mt-20">
          <ContentDetailNavigation
            ariaLabel="이전 및 다음 청맥뉴스"
            basePath="/community/news"
            listHref={returnTo}
            returnTo={returnTo}
            previous={
              previous
                ? { id: String(previous.id), title: previous.title }
                : null
            }
            next={next ? { id: String(next.id), title: next.title } : null}
          />
        </div>
      </Inner>
    </section>
  );
}
