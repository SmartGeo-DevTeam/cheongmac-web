export default function PageHeader({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <section
      id="page-header space-y-2"
      className="py-10 border-b border-border-default text-center
     "
    >
      <h1
        className="text-mo-title-1 
        xl:text-pc-display-2
      "
      >
        {title}
      </h1>

      {desc && <p className="text-[14px] text-secondary">{desc}</p>}
    </section>
  );
}
