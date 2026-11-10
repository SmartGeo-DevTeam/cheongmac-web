export default function Spacer({ type }: { type: 'mobile-content-header' }) {
  return (
    <div
      id="spacer"
      className={type === 'mobile-content-header' ? `mt-19 xl:m-0` : ``}
    />
  );
}
