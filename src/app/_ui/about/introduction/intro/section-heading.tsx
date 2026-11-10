import type { ReactNode } from 'react';

export default function IntroductionIntroSectionHeading({
  subTitle,
  title,
  desc,
  subTitleColor,
  titleColor,
  descColor,
}: {
  subTitle?: string;
  title: ReactNode;
  desc?: ReactNode;
  subTitleColor?: string;
  titleColor?: string;
  descColor?: string;
}) {
  return (
    <>
      {subTitle && (
        <span
          className={`text-mo-body-1 ${subTitleColor}
          xl:text-pc-body-1`}
        >
          {subTitle}
        </span>
      )}

      {title && (
        <h2 className={`mt-1 text-mo-title-1 ${titleColor} xl:text-pc-title-1`}>
          {title}
        </h2>
      )}

      {desc && (
        <p
          className={`mx-auto mt-5 text-mo-body-2 ${descColor}
        xl:mt-10 xl:text-pc-body-2`}
        >
          {desc}
        </p>
      )}
    </>
  );
}
