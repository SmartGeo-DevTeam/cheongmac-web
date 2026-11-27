import { cn } from '@/app/_utils/cn';
import type { ComponentPropsWithRef } from 'react';

type ListProps =
  | (ComponentPropsWithRef<'ul'> & { variant?: 'bullet' })
  | (ComponentPropsWithRef<'ol'> & { variant: 'number' });

const baseClassName = `
mx-1.5 space-y-1 font-[number:var(--text-mo-body-2--font-weight)] text-[length:var(--text-mo-body-2)] leading-[var(--text-mo-body-2--line-height)] tracking-[var(--text-mo-body-2--letter-spacing)] text-gray-900
xl:text-pc-body-2
`;

const variantClassNames = {
  bullet: `list-none [&>li]:relative [&>li]:pl-3
           [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-2.25 [&>li]:before:size-1.25 [&>li]:before:rounded-full [&>li]:before:bg-primary [&>li]:before:content-['']`,
  number: `pl-5 list-decimal list-outside`,
} as const;

/** 문서용 목록. 각 항목은 li로 전달하고 번호는 브라우저가 자동으로 표시합니다. */
export default function List(props: ListProps) {
  if (props.variant === 'number') {
    const { variant, className, ...rest } = props;

    return (
      <ol
        className={cn(baseClassName, variantClassNames[variant], className)}
        {...rest}
      />
    );
  }

  const { variant = 'bullet', className, ...rest } = props;

  return (
    <ul
      role="list"
      className={cn(baseClassName, variantClassNames[variant], className)}
      {...rest}
    />
  );
}
