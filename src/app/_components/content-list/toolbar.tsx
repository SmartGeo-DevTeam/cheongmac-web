import type { ReactNode } from 'react';
import ContentSearch from './search';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
};

type ContentListToolbarProps = {
  count: number;
  variant?: 'default' | 'compact';
  className?: string;
  searchClassName?: string;
} & (
  | {
      search: ReactNode;
      searchProps?: never;
    }
  | {
      search?: never;
      searchProps: SearchProps;
    }
);

export default function ContentListToolbar({
  count,
  variant = 'default',
  className = '',
  searchClassName = '',
  ...props
}: ContentListToolbarProps) {
  const isCompact = variant === 'compact';

  const searchNode = props.searchProps ? (
    <ContentSearch {...props.searchProps} />
  ) : (
    props.search
  );

  return (
    <div
      className={`px-5 flex justify-between gap-3
        ${isCompact ? 'items-center' : 'items-end'}
        ${className}`}
    >
      {isCompact ? (
        <p className="shrink-0 text-[12px] text-tertiary xl:text-[16px]">
          총{' '}
          <strong className="font-semibold text-accent">
            {count.toLocaleString('ko-KR')}
          </strong>{' '}
          건
        </p>
      ) : (
        <p
          className="flex shrink-0 items-center gap-1 text-pc-caption text-gray-500
          xl:text-[16px] xl:font-medium"
        >
          <span>총</span>
          <strong
            className="text-accent text-pc-label
            xl:font-semibold xl:text-[16px]"
          >
            {count.toLocaleString('ko-KR')}
          </strong>
          <span>건</span>
        </p>
      )}

      {searchNode &&
        (searchClassName ? (
          <div className={searchClassName}>{searchNode}</div>
        ) : (
          searchNode
        ))}
    </div>
  );
}
