import { cn } from '@/app/_utils/cn';
import type { ComponentPropsWithRef } from 'react';

type TableProps = ComponentPropsWithRef<'table'>;

export default function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn(
        `w-full table-fixed border-collapse border-y border-gray-150 text-[10px] leading-[130%] tracking-[-0.01em] text-center text-gray-900
        [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:break-keep [&_th]:font-bold
        [&_td]:p-3 [&_td]:align-middle [&_td]:break-keep
        [&_tr>*+*]:border-l [&_tr>*+*]:border-gray-150
        [&_tbody>tr+tr]:border-t [&_tbody>tr+tr]:border-gray-150`,
        `xl:text-pc-body-2
        xl:[&_th]:p-3`,
        className,
      )}
      {...props}
    />
  );
}
