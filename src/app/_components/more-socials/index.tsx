import AdminEditButton from '@/app/_components/inline-editor/admin-edit-button';
import type { InlineContentData } from '@/_lib/inline-content-shared';
import Image from 'next/image';
import Link from 'next/link';

type SocialLink = {
  id: string;
  title: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
};

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function MoreSocials({
  copy,
}: {
  copy: InlineContentData;
}) {
  const links: SocialLink[] = [
    {
      id: 'youtube',
      title: copy.socialYoutubeTitle,
      href: copy.socialYoutubeHref,
      iconSrc: copy.socialYoutubeIcon,
      iconAlt: copy.socialYoutubeAlt,
    },
    {
      id: 'blog',
      title: copy.socialBlogTitle,
      href: copy.socialBlogHref,
      iconSrc: copy.socialBlogIcon,
      iconAlt: copy.socialBlogAlt,
    },
    {
      id: 'instagram',
      title: copy.socialInstagramTitle,
      href: copy.socialInstagramHref,
      iconSrc: copy.socialInstagramIcon,
      iconAlt: copy.socialInstagramAlt,
    },
  ];

  const cardClassName =
    'flex min-h-20 items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-5 transition hover:-translate-y-0.5 hover:shadow-sm xl:min-h-24 xl:px-7';

  const card = (social: SocialLink) => (
    <>
      <div>
        <p className="text-[18px] font-semibold tracking-[-0.04em] text-[#252B33] xl:text-[20px]">
          {social.title}
        </p>
        <p className="mt-0.5 text-xs text-[#959BA4] xl:text-sm">
          {copy.socialCtaLabel}
        </p>
      </div>

      <div className="relative size-9 shrink-0 xl:size-10">
        {social.iconSrc ? (
          <Image
            src={social.iconSrc}
            alt={social.iconAlt}
            fill
            sizes="40px"
          />
        ) : null}
      </div>
    </>
  );

  return (
    <section className="relative mx-auto w-full max-w-[790px] px-5">
      <AdminEditButton
        href="/admin/common/page-copy?path=%2Fcommunity%2Fnews"
        label="소셜 링크·아이콘·문구"
        className="right-5 top-0"
      />
      <h2 className="text-center text-xl font-semibold tracking-[-0.04em] text-[#252B33] xl:text-[24px]">
        {copy.socialHeading}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-2.5 xl:mt-6 xl:grid-cols-3 xl:gap-3">
        {links.map((social) =>
          isExternal(social.href) ? (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClassName}
            >
              {card(social)}
            </a>
          ) : (
            <Link
              key={social.id}
              href={social.href}
              className={cardClassName}
            >
              {card(social)}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
