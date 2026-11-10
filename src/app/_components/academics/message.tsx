import type { ReactNode } from 'react';

type AcademicsMessageProps = {
  label: string;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

export function AcademicsHighlight({ children }: { children: ReactNode }) {
  return (
    <strong
      className="font-bold
      xl:relative xl:isolate
      xl:before:absolute xl:before:left-0 xl:before:bottom-0 xl:before:w-full xl:before:h-3 xl:before:bg-accent-ai xl:before:-z-10"
    >
      {children}
    </strong>
  );
}

export default function AcademicsMessage({
  label,
  title,
  description,
  className = '',
}: AcademicsMessageProps) {
  return (
    <div className={className}>
      <span
        className="text-mo-label text-accent-ai-strong
        xl:text-pc-label"
      >
        {label}
      </span>
      <p
        className="mt-3 text-mo-heading-1 text-gray-900
        xl:text-pc-title-2"
      >
        {title}
      </p>
      <p
        className="mt-10 text-mo-body-2 text-gray-900
        xl:text-pc-body-2"
      >
        {description}
      </p>
    </div>
  );
}
