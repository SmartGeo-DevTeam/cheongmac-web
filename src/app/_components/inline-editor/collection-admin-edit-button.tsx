'use client';

import { useInlineEditMode } from '@/app/_providers/inline-edit-provider';
import { cn } from '@/_lib/utils';
import { Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function CollectionAdminEditButton({
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
        'absolute right-3 top-3 z-[68] hidden h-9 items-center gap-1.5 rounded-full border border-cm-orange/25 bg-white px-3 text-xs font-semibold text-cm-orange shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition hover:bg-[#FFF6EF] focus-visible:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cm-orange/40 group-hover/cms-collection:flex',
        className,
      )}
      aria-label={`${label} 전체 관리`}
      title={`${label} 전체 관리`}
    >
      <Settings2 className="size-4" />
      <span>전체 관리</span>
    </Link>
  );
}
