import type { ReactNode } from 'react';

export default function EquipmentDetailSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-15 xl:mt-30">
      <p
        className="text-mo-label text-tertiary
        xl:text-pc-heading-2"
      >
        {label}
      </p>
      <h3
        className="mt-1 text-mo-heading-1
        xl:text-pc-title-2"
      >
        {title}
      </h3>

      {children}
    </section>
  );
}
