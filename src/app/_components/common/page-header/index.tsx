import Inner from '../inner';

export default function PageHeader({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <section
      id="page-header"
      className="py-10 border-b border-border-default text-center
     "
    >
      <Inner>
        <h1
          className="text-mo-title-1 
          xl:text-pc-display-2
      "
        >
          {title}
        </h1>

        {desc && (
          <p
            className="mt-2 text-[14px] text-secondary whitespace-pre leading-[150%]
            xl:text-[20px]"
          >
            {desc}
          </p>
        )}
      </Inner>
    </section>
  );
}
