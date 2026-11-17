type ClinicSplitLayoutProps = {
  className?: string;
  leading: React.ReactNode;
  children: React.ReactNode;
};

/** Mobile: one column. Desktop (xl): two equal columns. */
export default function ClinicSplitLayout({
  className,
  leading,
  children,
}: ClinicSplitLayoutProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-10
        xl:grid-cols-[auto_1fr] gap-x-35
        ${className}`}
    >
      {leading}
      {children}
    </div>
  );
}
