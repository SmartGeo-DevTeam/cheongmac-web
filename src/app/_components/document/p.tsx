import { cn } from '@/app/_utils/cn';
import type { ComponentPropsWithRef } from 'react';

type PProps = ComponentPropsWithRef<'p'> & {
  variant?: 'default' | 'muted';
};

const variantClassNames = {
  default: 'text-gray-900',
  muted: 'text-gray-500',
} as const;

export default function P({
  variant = 'default',
  className,
  ...props
}: PProps) {
  return (
    <p
      className={cn(
        `text-[15px] leading-[150%] tracking-[-0.03em]`,
        `xl:text-pc-body-2`,
        variantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
