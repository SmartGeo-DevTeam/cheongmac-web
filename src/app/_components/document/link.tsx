import { cn } from '@/app/_utils/cn';
import NextLink from 'next/link';
import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ className, ...props }: LinkProps) {
  return <NextLink className={cn('underline', className)} {...props} />;
}
