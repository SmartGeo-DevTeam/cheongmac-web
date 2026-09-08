import { cn } from '@/_lib/utils';
import type { HTMLAttributes } from 'react';

export function Separator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" data-slot="separator" className={cn('h-px w-full bg-[#E4E4E7]', className)} {...props} />;
}
