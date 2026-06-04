import Image from 'next/image';
import Link from 'next/link';

export default function HomeBanners() {
  return (
    <section className="px-5 pt-10">
      <Link
        target="_blank"
        href={`/`}
        className="relative flex w-full aspect-335/136
        xl:mx-auto xl:max-w-7xl xl:aspect-1280/317"
      >
        <Image
          src="/images/home/banners/m-item-1.png"
          alt="m-item-1"
          fill
          className="block xl:hidden"
        />
        <Image
          src="/images/home/banners/pc-item-1.png"
          alt="pc-item-1"
          fill
          className="hidden xl:block"
        />
      </Link>
    </section>
  );
}
