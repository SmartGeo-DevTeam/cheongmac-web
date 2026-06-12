import type { ReactNode } from 'react';

function MainSectionHeader({
  usePaddingHorizontal = false,
  eyebrow,
  title,
  description,
  className = '',
}: {
  usePaddingHorizontal?: boolean;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-7xl w-full ${usePaddingHorizontal ? 'px-5' : ''} ${className}`}
    >
      <h1
        className="font-semibold text-lg
        xl:text-2xl"
      >
        {eyebrow}
      </h1>

      <div
        className="mt-2 break-keep font-extrabold text-3xl
        xl:leading-[120%] xl:text-5xl"
      >
        {title}
      </div>

      {description && (
        <div
          className="mt-6 break-keep
          xl:mt-10 xl:text-xl"
        >
          {description}
        </div>
      )}
    </div>
  );
}

export default MainSectionHeader;
