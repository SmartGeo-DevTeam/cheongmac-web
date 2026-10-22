export default function PageTitle({ title }: { title: string }) {
  return (
    <h1
      className="py-10 text-center text-primary text-mo-title-1 border-b border-border-default
      xl:text-pc-display-2
      "
    >
      {title}
    </h1>
  );
}
