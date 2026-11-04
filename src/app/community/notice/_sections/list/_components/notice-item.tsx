import { Link2 } from 'lucide-react';
import Link from 'next/link';
import type { NoticeItemType } from '../data';

const CATEGORY_LABEL: Record<NoticeItemType['category'], string> = {
  notice: '공지',
  holiday: '휴진',
};

export default function NoticeItem({
  item,
  returnTo,
}: {
  item: NoticeItemType;
  returnTo: string;
}) {
  const href = item.href ??
    `/community/notice/${encodeURIComponent(item.id)}?returnTo=${encodeURIComponent(returnTo)}`;
  const content = (
    <>
      <span
        data-category={item.category}
        data-pinned={item.isPinned ? 'true' : 'false'}
        className={`shrink-0 px-2 py-0.5 rounded-md font-semibold text-[12px]
          xl:text-[15px]
          ${
            item.isPinned
              ? 'bg-accent text-inverse'
              : item.category === 'holiday'
                ? 'bg-danger-50 text-accent'
                : 'bg-subtle text-brand'
          }
        `}
      >
        {CATEGORY_LABEL[item.category]}
      </span>

      <p
        className={`min-w-0 font-semibold text-[16px]
          xl:text-pc-body-1
          ${item.isPinned ? 'text-accent' : 'text-primary'}
        `}
      >
        <span className="inline-flex items-center gap-1">{item.title}</span>

        {item.isExternal && (
          <Link2 aria-hidden="true" className="size-4 shrink-0" />
        )}
      </p>
    </>
  );

  const rowContent = (
    <>
      <div
        className="flex items-center gap-2
        xl:gap-5"
      >
        {content}
      </div>

      <time
        dateTime={item.date}
        className="mt-1 block font-medium text-gray-400 text-[14px]
        xl:mt-0 xl:whitespace-nowrap xl:text-center xl:text-[18px]"
      >
        {item.date.replaceAll('-', '.')}
      </time>
    </>
  );

  return (
    <li
      className="border-b border-default
      xl:col-span-2 xl:grid xl:grid-cols-subgrid"
    >
      <Link
        href={href}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
        className={`py-5 block
          xl:px-10 xl:py-7 xl:col-span-2 xl:grid xl:grid-cols-subgrid xl:items-center`}
      >
        {rowContent}
      </Link>
    </li>
  );
}
