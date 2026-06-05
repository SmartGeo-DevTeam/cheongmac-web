import Image from 'next/image';
import Link from 'next/link';

const noticeBanners = [
  {
    id: 1,
    href: '/',
    imageSrc: '/images/home/notice/1.png',
    alt: 'banner-1',
  },
  {
    id: 2,
    href: '/',
    imageSrc: '/images/home/notice/2.png',
    alt: 'banner-2',
  },
  {
    id: 3,
    href: '/',
    imageSrc: '/images/home/notice/3.png',
    alt: 'banner-3',
  },
] as const;

export default function HomeNotice() {
  return (
    <section
      className="mt-15 flex flex-col
      xl:mx-auto xl:mt-28 xl:px-5 xl:max-w-7xl xl:w-full xl:flex-row xl:gap-6"
    >
      {noticeBanners.map((banner) => (
        <Link
          key={banner.id}
          target="_blank"
          href={banner.href}
          className="relative w-full aspect-375/133"
        >
          <Image
            src={banner.imageSrc}
            alt={banner.alt}
            fill
            className="object-cover
            xl:rounded-xl"
          />
        </Link>
      ))}
    </section>
  );
}
