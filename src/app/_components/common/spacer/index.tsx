export default function Spacer({ type }: { type: 'content-header' }) {
  return (
    <div
      id="spacer"
      className={type === 'content-header' ? `mt-19 xl:m-0` : ``}
    />
  );
}
