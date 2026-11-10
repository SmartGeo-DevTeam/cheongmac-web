type InformationNoticesProps = {
  notices: string | string[];
  className?: string;
};

export default function HospitalizedInformationNotices({
  notices,
  className = '',
}: InformationNoticesProps) {
  const items = Array.isArray(notices) ? notices : [notices];

  return (
    <div
      className={`mt-5 space-y-2
        xl:mt-6
        ${className}
        `}
    >
      {items.map((notice, index) => (
        <p
          key={index}
          className="break-keep text-mo-body-2 text-tertiary
          xl:text-pc-body-2"
        >
          {notice}
        </p>
      ))}
    </div>
  );
}
