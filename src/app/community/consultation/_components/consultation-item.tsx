import { CornerDownRight, Link2, LockKeyhole } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ConsultationItem } from '../data';
import { consultationCategories } from '../data';

export default function ConsultationListItem({
  item,
  returnTo,
}: {
  item: ConsultationItem;
  returnTo: string;
}) {
  const secondary = consultationCategories.find(
    (category) => category.id === item.category,
  )?.label;
  const badge = secondary
    ? item.primaryCategory === '기타'
      ? '기타'
      : `${item.primaryCategory} | ${secondary}`
    : item.primaryCategory;

  return (
    <li
      className="p-5 pb-6 rounded-xl border border-default
      xl:px-15 xl:py-10 xl:rounded-[20px]"
    >
      <Link
        href={{
          pathname: `/community/consultation/${item.id}`,
          query: { from: returnTo },
        }}
        className="block"
        aria-label={`${item.title} 상담 상세 보기`}
      >
        <div className="flex justify-between items-center">
          <span
            className="inline-flex px-3 py-1 rounded-full bg-gray-50 font-medium text-[12px]
            xl:px-5 xl:py-1.5 xl:font-semibold xl:text-[15px]"
          >
            {badge}
          </span>
          <time
            dateTime={item.date}
            className="font-medium text-gray-500 text-[14px]
            xl:text-[15px]"
          >
            {item.date.replaceAll('-', '.')}
          </time>
        </div>

        <h3
          className="mt-2 flex items-start gap-1
          xl:mt-3 xl:text-pc-heading-2 xl:gap-2"
        >
          {item.isPrivate && (
            <LockKeyhole
              className="relative top-1.5 shrink-0 size-4 text-text-primary
              [&_rect]:fill-current [&_circle]:fill-white [&_circle]:stroke-white
              xl:size-5 xl:top-1.25"
            />
          )}
          <p>{item.title}</p>
          {item.hasLinkIcon && (
            <Link2 aria-hidden="true" className="mt-1 size-4 shrink-0" />
          )}
        </h3>

        {item.doctor && (
          <div
            className="mt-1 flex items-center gap-1
            xl:mt-3 xl:gap-2"
          >
            <CornerDownRight
              className="shrink-0 size-5 text-gray-500
              xl:size-6"
            />

            <div
              className="relative size-6 rounded-full border border-default overflow-clip
              xl:size-12"
            >
              <Image
                src="/doctors/bak-m.png"
                alt="doctor-bak"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="font-semibold text-[14px]
              xl:text-[18px]"
            >
              <span className="text-orange-600">
                {item.doctor.department} {item.doctor.name}
              </span>
              <span className="text-gray-500">이 답변했어요</span>
            </div>
          </div>
        )}
      </Link>
    </li>
  );
}
