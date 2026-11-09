type SectionDescriptionProps = {
  text: string;
  className?: string;
};

export default function SectionDescription({
  text,
  className = '',
}: SectionDescriptionProps) {
  return (
    <p
      className={`mt-3 break-keep text-mo-body-2
      xl:mt-0 xl:font-bold xl:text-pc-body-1
      ${className}`}
    >
      {text}
    </p>
  );
}
