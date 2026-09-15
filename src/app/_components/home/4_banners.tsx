'use client';

import CollectionAdminEditButton from '@/app/_components/inline-editor/collection-admin-edit-button';
import ManagedItemEditButton from '@/app/_components/inline-editor/managed-item-edit-button';
import FadeInUp from '@/app/_components/fade-in-up';
import type { HomeMiddleBanner } from '@/_lib/home-section-content';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeBanners({
  items,
}: {
  items: HomeMiddleBanner[];
}) {
  const banner = items[0];

  if (!banner) {
    return (
      <section className="group/cms-collection relative mt-10 px-5 xl:mt-15">
        <CollectionAdminEditButton
          href="/admin/home/middle-banner"
          label="메인 중간 배너"
        />
        <div className="mx-auto grid min-h-32 w-full max-w-7xl place-items-center rounded-2xl border border-dashed border-[#D8D8D8] bg-[#FAFAFA] px-5 text-center text-sm text-[#7A7A7A]">
          관리자에서 메인 중간 배너를 활성화해주세요.
        </div>
      </section>
    );
  }

  return (
    <FadeInUp>
      <section className="group/cms-collection relative mt-10 px-5 xl:mt-15">
        <CollectionAdminEditButton
          href="/admin/home/middle-banner"
          label="메인 중간 배너"
        />

        <div className="relative xl:mx-auto xl:max-w-7xl">
          <Link
            href={banner.href || '/'}
            target={banner.openInNewTab ? '_blank' : undefined}
            rel={banner.openInNewTab ? 'noopener noreferrer' : undefined}
            className="relative flex w-full aspect-335/136 xl:aspect-1280/317"
          >
            <Image
              src={banner.mobileImage}
              alt={banner.mobileAlt}
              fill
              className="block object-cover xl:hidden"
              sizes="100vw"
            />
            <Image
              src={banner.desktopImage}
              alt={banner.desktopAlt}
              fill
              className="hidden object-cover xl:block"
              sizes="(min-width: 1280px) 1280px, 100vw"
            />
          </Link>

          <ManagedItemEditButton
            pageKey="home"
            itemKey={banner.itemKey}
            label="메인 중간 배너"
          />
        </div>
      </section>
    </FadeInUp>
  );
}
