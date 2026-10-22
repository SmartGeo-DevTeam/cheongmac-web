import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function Recommend() {
  return (
    <section id="introduction-doctors-recommend">
      <Inner>
        <button
          className="relative mt-10 w-full aspect-335/180 rounded-[14px] overflow-clip
          xl:aspect-1280/360"
        >
          <Image
            src={`/doctors/recommend-m.png`}
            alt="recommend-m"
            fill
            className="object-cover
            xl:hidden"
          />
          <Image
            src={`/doctors/recommend-pc.png`}
            alt="recommend-pc"
            fill
            className="hidden
            xl:block xl:object-cover"
          />
        </button>
      </Inner>
    </section>
  );
}
