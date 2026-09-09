'use client';

import type { PageBottomBannerItem } from '@/_lib/page-bottom-banners';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function BannerLink({
  item,
}: {
  item: PageBottomBannerItem;
}) {
  const content = (
    <>
      <span
        id={`cm-page-bottom-banner-${item.id}-icon`}
        className="grid size-13 shrink-0 place-items-center rounded-2xl text-[26px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] xl:size-15 xl:text-[30px]"
        style={{ backgroundColor: item.iconColor }}
        aria-hidden="true"
      >
        {item.emoji}
      </span>

      <span className="min-w-0 flex-1">
        <strong className="block truncate text-base font-bold tracking-[-0.035em] text-[#262C35] xl:text-xl">
          {item.title}
        </strong>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#777D83] xl:text-base">
          {item.linkTitle}
          <ArrowUpRight className="size-4" strokeWidth={1.7} />
        </span>
      </span>
    </>
  );

  const className =
    'flex min-h-[92px] items-center gap-4 rounded-2xl border border-[#E5E7E9] bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-[#D6DADD] hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] xl:min-h-[108px] xl:px-6';

  if (isExternalHref(item.href)) {
    return (
      <a
        id={`cm-page-bottom-banner-${item.id}-link`}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      id={`cm-page-bottom-banner-${item.id}-link`}
      href={item.href || '/'}
      className={className}
    >
      {content}
    </Link>
  );
}

export default function PageBottomBanners({
  items,
}: {
  items: PageBottomBannerItem[];
}) {
  const pathname = usePathname();

  const visibleItems = items.filter(
    (item) =>
      item.isVisible &&
      item.visiblePaths.some((path) => path === pathname),
  );

  if (!visibleItems.length) return null;

  return (
    <section
      id="cm-page-bottom-banners"
      aria-label="공통 페이지 하단 바로가기"
      className="mx-auto my-5 grid w-full max-w-7xl grid-cols-1 gap-2 px-5 xl:my-8 xl:grid-cols-3 xl:gap-6"
    >
      {visibleItems.map((item) => (
        <div
          id={`cm-page-bottom-banner-${item.id}`}
          key={item.id}
          className="min-w-0"
        >
          <BannerLink item={item} />
        </div>
      ))}
    </section>
  );
}
