export default function Inner({
  usePaddingHorizontal = false,
  children,
}: {
  usePaddingHorizontal?: boolean;
  children: React.ReactElement;
}): React.ReactElement {
  return (
    <div
      className={`mx-auto max-w-7xl w-full
        ${usePaddingHorizontal ? `px-5` : ``}`}
    >
      {children}
    </div>
  );
}
