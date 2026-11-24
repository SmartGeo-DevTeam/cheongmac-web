type FooterTimeRowProps = {
  label: string;
  time: string;
};

export default function FooterTimeRow({ label, time }: FooterTimeRowProps) {
  return (
    <>
      <span
        className="inline-block w-[4em] text-justify [text-align-last:justify] [text-justify:inter-character] font-bold text-sm text-[#F1F5F2]/50
        xl:text-lg"
      >
        {label}
      </span>
      <p
        className="w-[13ch] font-medium whitespace-nowrap tabular-nums
        xl:text-[28px]"
      >
        {time}
      </p>
    </>
  );
}
