import Inner from './inner';

export default function PageHeader({
  title,
  englishTitle,
  desc,
  desktopLineBreak = false,
}: {
  title: string;
  englishTitle?: string;
  desc?: string;
  desktopLineBreak?: boolean;
}) {
  return (
    <section
      id="page-header"
      className="py-10 border-b border-border-default text-center"
    >
      <Inner>
        <h1
          className="text-mo-title-1
          xl:text-pc-display-2"
        >
          {title}
        </h1>

        {(englishTitle || desc) && (
          <div
            className="mt-2 space-y-1 break-keep text-center
            xl:space-y-2"
          >
            {englishTitle && (
              <p
                className="font-bold text-[14px] leading-[140%] text-disabled
                xl:text-[20px]"
              >
                [{englishTitle}]
              </p>
            )}

            {desc && (
              <p
                className={`mx-auto w-4/5 text-[14px] text-secondary whitespace-break-spaces leading-[150%]
                xl:w-full xl:text-[20px]
                ${desktopLineBreak ? 'xl:whitespace-pre-line' : 'xl:whitespace-nowrap'}`}
              >
                {desc}
              </p>
            )}
          </div>
        )}
      </Inner>
    </section>
  );
}
