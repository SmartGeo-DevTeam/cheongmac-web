import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function Message() {
  return (
    <section id="introduction-doctors-message">
      <Inner usePaddingHorizontalInMobile={false}>
        <button
          className="relative mt-5 w-full aspect-375/250
          xl:aspect-1280/715"
        >
          <Image
            src={`/doctors/message-m.png`}
            alt="message-m"
            fill
            className="object-cover
                 xl:hidden"
          />
          <Image
            src={`/doctors/message-pc.png`}
            alt="message-pc"
            fill
            className="hidden
                 xl:block xl:object-cover"
          />
        </button>
      </Inner>
    </section>
  );
}
