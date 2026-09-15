import FadeInUp from '@/app/_components/fade-in-up';
import { getCommonContentBannersManagedContent } from '@/_lib/managed-pages';
import Image from 'next/image';
import Link from 'next/link';

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export default async function CommonContentBanners({
  className = '',
}: {
  className?: string;
}) {
  const items = await getCommonContentBannersManagedContent();

  if (!items.length) return null;

  return (
    <FadeInUp>
      <section
        aria-label="공통 콘텐츠 배너"
        className={[
          'flex flex-col',
          'xl:mx-auto xl:px-5 xl:max-w-7xl xl:w-full xl:flex-row xl:gap-6',
          className,
        ].join(' ')}
      >
        {items.map((item) => {
          const content = (
            <>
              <Image
                src={item.mobileImage}
                alt={item.alt}
                fill
                className="object-cover xl:hidden"
                sizes="100vw"
              />
              <Image
                src={item.desktopImage}
                alt={item.alt}
                fill
                className="hidden object-cover xl:block"
                sizes="(min-width: 1280px) 410px, 100vw"
              />
            </>
          );

          const linkClassName =
            'relative block w-full aspect-375/133 overflow-hidden xl:rounded-xl';

          if (isExternalHref(item.href)) {
            return (
              <a
                key={item.itemKey}
                href={item.href}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className={linkClassName}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.itemKey}
              href={item.href || '/'}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className={linkClassName}
            >
              {content}
            </Link>
          );
        })}
      </section>
    </FadeInUp>
  );
}
