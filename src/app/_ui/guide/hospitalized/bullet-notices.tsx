type BulletNoticesProps = {
  notices: string[];
  className?: string;
};

export default function HospitalizedBulletNotices({
  notices,
  className = '',
}: BulletNoticesProps) {
  return (
    <div className={`mt-5 space-y-3 ${className}`}>
      {notices.map((notice, index) => (
        <p
          key={index}
          className="relative ml-2 pl-3 whitespace-break-spaces break-keep text-mo-body-1
          xl:whitespace-normal xl:text-pc-body-1
          before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-primary
          xl:before:top-3.5"
        >
          {notice}
        </p>
      ))}
    </div>
  );
}
