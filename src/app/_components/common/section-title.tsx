import type { ReactNode } from 'react';

type SectionTitleProps = {
  text: ReactNode;
  description?: ReactNode;
};

export default function SectionTitle({ text, description }: SectionTitleProps) {
  return (
    <>
      <h2 className="text-mo-title-2 xl:text-pc-title-2">{text}</h2>

      {description && (
        <p
          className="mt-3 break-keep text-mo-body-2 text-tertiary
          xl:text-body-01"
        >
          {description}
        </p>
      )}
    </>
  );
}
