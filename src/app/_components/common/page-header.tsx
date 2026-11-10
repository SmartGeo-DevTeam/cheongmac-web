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
          <div className="mt-2">
            {englishTitle && (
              <p
                className="text-[12px] font-semibold text-secondary
                xl:text-[16px]"
              >
                [{englishTitle}]
              </p>
            )}

            {desc && (
              <p
                className={`text-[14px] text-secondary whitespace-break-spaces leading-[150%]
                xl:text-[20px]
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
