import Inner from '@/app/_components/inner';
import Image from 'next/image';
import Link from 'next/link';

const noticeBanners = [
  {
    id: 1,
    href: '/',
    imageSrc: '/assets/home/notice/1.png',
    alt: 'banner-1',
  },
  {
    id: 2,
    href: '/',
    imageSrc: '/assets/home/notice/2.png',
    alt: 'banner-2',
  },
  {
    id: 3,
    href: '/',
    imageSrc: '/assets/home/notice/3.png',
    alt: 'banner-3',
  },
] as const;

export default function BottomBanner(): React.ReactElement {
  return (
    <Inner>
      <section
        className="my-5 px-5 flex flex-col gap-2
        xl:my-8 xl:grid xl:grid-cols-3 xl:gap-x-6"
      >
        {noticeBanners.map((banner) => (
          <Link
            key={banner.id}
            target="_blank"
            href={banner.href}
            className="relative w-full aspect-375/133 rounded-xl overflow-clip"
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
    </Inner>
  );
}
