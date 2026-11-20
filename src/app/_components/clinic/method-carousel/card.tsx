import Image from 'next/image';
import type { ReactNode } from 'react';

type ClinicMethodCardProps = {
  title: string;
  image: string;
  children: ReactNode;
};

/** 이미지·제목과 하단 콘텐츠 슬롯을 공유하는 진료방법 카드. */
export default function ClinicMethodCard({
  title,
  image,
  children,
}: ClinicMethodCardProps) {
  return (
    <article className="w-full break-keep">
      <div
        className="relative aspect-326/240 overflow-clip rounded-[20px]
        xl:aspect-440/350"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 440px, calc(100vw - 40px)"
          className="object-cover"
        />
      </div>

      <div className="mt-5 px-2">
        <h3
          className="text-mo-heading-1
          xl:font-bold xl:text-[28px]"
        >
          {title}
        </h3>
        {children}
      </div>
    </article>
  );
}
