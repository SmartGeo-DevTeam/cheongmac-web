'use client';

import { useInlineEditMode } from '@/app/_providers/inline-edit-provider';
import { cn } from '@/_lib/utils';
import { Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminEditButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const { canEdit, editMode } = useInlineEditMode();

  if (!canEdit || !editMode) return null;

  return (
    <Link
      href={href}
      onClick={(event) => event.stopPropagation()}
      className={cn(
        'absolute right-2 top-2 z-[70] inline-flex size-9 items-center justify-center rounded-full border border-cm-orange/25 bg-white text-cm-orange shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition hover:bg-[#FFF6EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cm-orange/40',
        className,
      )}
      aria-label={`${label} 수정`}
      title={`${label} 수정`}
    >
      <Settings2 className="size-4.5" />
    </Link>
  );
}
