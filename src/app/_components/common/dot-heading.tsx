import type { ReactNode } from 'react';

type DotHeadingProps = {
  title: ReactNode;
  className?: string;
};

export default function DotHeading({
  title,
  className = '',
}: DotHeadingProps) {
  return (
    <div
      className={`flex items-start gap-2
        xl:gap-3.5
        ${className}
        `}
    >
      <span
        aria-hidden="true"
        className="relative top-2 inline-block size-3.5 shrink-0 rounded-full bg-accent-ai
          before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:size-1.5 before:rounded-full before:bg-base
          xl:top-3.5 xl:size-5
          xl:before:size-2.5"
      />

      <h2
        className="break-keep text-mo-title-2
          xl:text-pc-title-2"
      >
        {title}
      </h2>
    </div>
  );
}
