import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PartnerItem } from '@/app/_types/guide/partner';

export default function PartnerCard({ item }: { item: PartnerItem }) {
  return (
    <Link href={item.websiteHref! || '/'}>
      {/* 협약기관 카드 이미지 */}
      <div className="relative aspect-410/260 rounded-xl overflow-clip">
        <Image
          src={item.imageSrc}
          alt={`${item.name} 전경`}
          fill
          className="object-cover"
        />
      </div>

      {/* 협약기관 정보 */}
      <div
        className="mt-4 px-2
        xl:mt-6"
      >
        <div
          className="flex items-center gap-2
          xl:gap-3"
        >
          <h3
            className="text-mo-heading-1
            xl:text-pc-heading-1"
          >
            {item.websiteHref ? (
              <Link href={item.websiteHref}>{item.name}</Link>
            ) : (
              item.name
            )}
          </h3>
          <Home
            aria-hidden="true"
            className="size-4.5
            xl:size-6"
          />
        </div>

        {/* 협약내용 및 전화번호 */}
        <div
          className="mt-3 grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-2
          [&_span]:font-bold [&_span]:text-mo-label [&_span]:text-tertiary
          [&_p]:text-mo-body-2
          xl:gap-y-3
          xl:[&_span]:text-[16px]
          xl:[&_p]:text-pc-body-2
          "
        >
          <span>협약내용</span>
          <p>{item.description}</p>
          <span>전화번호</span>
          <p className="font-bold">{item.phone}</p>
        </div>

        {/* 협약 내용 키워드 */}
        {item.keywords && item.keywords.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-2
            xl:mt-6"
          >
            {item.keywords.map((keyword) => (
              <li
                key={keyword}
                className="px-4 py-1.5 rounded-full border border-default text-tertiary
                xl:py-2 xl:text-pc-label"
              >
                {keyword}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
