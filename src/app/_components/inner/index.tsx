export default function Inner({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  return <div className="mx-auto max-w-7xl w-full">{children}</div>;
}
