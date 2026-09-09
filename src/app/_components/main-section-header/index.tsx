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
      <p
        className="font-semibold text-lg
        xl:text-2xl"
      >
        {eyebrow}
      </p>

      <h2
        className="mt-2 break-keep font-extrabold text-3xl
        xl:leading-[120%] xl:text-5xl"
      >
        {title}
      </h2>

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
