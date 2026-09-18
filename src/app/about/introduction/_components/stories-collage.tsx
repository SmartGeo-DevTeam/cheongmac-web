'use client';

import type { InlineContentData } from '@/_lib/inline-content-shared';
import {
  H2 as TypographyH2,
  P as TypographyP,
} from '@/app/_components/ui/typography';

function StoryImage({
  src,
  className = '',
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      className={`block h-auto w-full rounded-[12px] border border-white/90 object-cover ${className}`}
    />
  );
}

export default function StoriesCollage({
  copy,
}: {
  copy: InlineContentData;
}) {
  return (
    <section
      data-about-stories-collage
      className="relative min-h-[775px] overflow-hidden bg-[radial-gradient(circle_at_50%_4%,rgba(113,169,222,0.38)_0%,rgba(187,220,246,0.24)_27%,transparent_52%),radial-gradient(circle_at_8%_78%,rgba(165,221,250,0.50)_0%,transparent_40%),linear-gradient(180deg,#FFFFFF_0%,#F7FCFF_34%,#DDF2FF_100%)] px-3 py-16 md:min-h-[900px] md:px-5 md:py-20 xl:min-h-[1024px] xl:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <div className="text-center">
          <TypographyP
            managed={false}
            className="text-[14px] font-bold tracking-[-0.035em] text-[#0C7057] xl:text-[16px]"
          >
            {copy.storiesEyebrow}
          </TypographyP>

          <TypographyH2
            managed={false}
            className="mt-2 whitespace-pre-line break-keep text-[27px] font-bold leading-[1.35] tracking-[-0.055em] text-[#27303A] sm:text-[30px] xl:text-[38px]"
          >
            {copy.storiesTitle}
          </TypographyH2>
        </div>

        <div
          data-about-stories-mobile
          className="mx-auto mt-10 grid w-full max-w-[351px] grid-cols-2 gap-[10px] md:hidden"
        >
          <div className="space-y-[10px]">
            <StoryImage src={copy.storiesImageTeam} />
            <StoryImage src={copy.storiesImageCalligraphy} />
            <StoryImage src={copy.storiesImageConsultation} />
          </div>

          <div className="space-y-[10px] pt-[37px]">
            <StoryImage src={copy.storiesImageSurgeon} />
            <StoryImage src={copy.storiesImageBandage} />
          </div>
        </div>

        <div
          data-about-stories-desktop
          className="mx-auto mt-14 hidden w-fit grid-cols-[212px_212px_212px] gap-3 md:grid xl:mt-16"
        >
          <div className="space-y-3 pt-[74px]">
            <StoryImage src={copy.storiesImageProcedure} />
            <StoryImage src={copy.storiesImageFlowers} />
          </div>

          <div className="space-y-3">
            <StoryImage src={copy.storiesImageTeam} />
            <StoryImage src={copy.storiesImageCalligraphy} />
            <StoryImage src={copy.storiesImageConsultation} />
          </div>

          <div className="space-y-3 pt-[43px]">
            <StoryImage src={copy.storiesImageSurgeon} />
            <StoryImage src={copy.storiesImageBandage} />
          </div>
        </div>
      </div>
    </section>
  );
}
