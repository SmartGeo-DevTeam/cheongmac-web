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
export default function PelvicPainPattern({
  id,
  content,
}: PelvicPainPatternProps) {
  return (
    <figure
      id={id}
      className="mt-15 rounded-lg overflow-clip
      xl:mt-10 xl:rounded-[20px]"
    >
      <Image
        src={content.image}
        alt={content.imageAlt}
        width={content.imageWidth}
        height={content.imageHeight}
        sizes="(min-width: 1280px) 1280px, 100vw"
        className="w-full h-auto"
      />
      <figcaption
        className="mt-5 text-center text-mo-heading-2 text-[#324E6D]
        xl:mt-15 xl:text-pc-heading-1"
      >
        {content.caption}
        <br />
        <b>{content.captionEmphasis}</b>
      </figcaption>
    </figure>
  );
}
