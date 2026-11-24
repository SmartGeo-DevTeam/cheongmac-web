import Image from 'next/image';

type PelvicPainPatternProps = {
  id: string;
  content: {
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
    caption: string;
    captionEmphasis: string;
  };
};

/** 골반정맥류 비교 섹션에만 필요한 통증 변화 예시입니다. */
export default function PelvicPainPattern({ id, content }: PelvicPainPatternProps) {
  return (
    <figure id={id} className="-mx-2 mt-10 xl:mx-0 xl:mt-11">
      <Image
        src={content.image}
        alt={content.imageAlt}
        width={content.imageWidth}
        height={content.imageHeight}
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="w-full h-auto"
      />
      <figcaption
        className="mt-5 px-2 break-keep text-[17px] leading-[160%] text-center text-[#294968]
        xl:mt-15 xl:text-[24px]"
      >
        {content.caption}
        <br />
        <b>{content.captionEmphasis}</b>
      </figcaption>
    </figure>
  );
}
