'use client';

export type CategoryTabType<Id extends string = string> = {
  id: Id;
  label: string;
};

type CategoryTabsProps<Id extends string> = {
  id: string;
  ariaLabel: string;
  categories: readonly CategoryTabType<Id>[];
  activeId: Id;
  onChange: (id: Id) => void;
  className?: string;
  desktopAlign?: 'start' | 'center' | 'end';
};

export default function CategoryTabs<Id extends string>({
  id,
  ariaLabel,
  categories,
  activeId,
  onChange,
  className = '',
  desktopAlign = 'start',
}: CategoryTabsProps<Id>) {
  const alignClasses = {
    start: 'xl:justify-start',
    center: 'xl:justify-center-safe',
    end: 'xl:justify-end-safe',
  };
  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      className={`min-w-0 flex-1 ${className}`}
    >
      <ul
        className={`pl-5 pr-10 flex gap-2 w-full overflow-x-auto whitespace-nowrap
          xl:p-0 xl:gap-2.5
          ${alignClasses[desktopAlign]}`}
      >
        {categories.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-pressed={isActive}
                className={`
                  relative pl-4 py-2 font-bold text-[15px]
                  xl:pl-5 xl:text-[18px]
                  ${
                    isActive
                      ? `text-brand
                         before:absolute before:top-1/2 before:left-1 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-brand
                         xl:before:left-2 xl:before:size-1.5`
                      : 'text-tertiary'
                  }
                `}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
