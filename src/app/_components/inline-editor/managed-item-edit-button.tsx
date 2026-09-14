'use client';

import { managedItemAdminHref } from '@/_lib/admin-edit-links';
import AdminEditButton from './admin-edit-button';

export default function ManagedItemEditButton({
  pageKey,
  itemKey,
  label,
  focus,
  className,
}: {
  pageKey: string;
  itemKey: string;
  label: string;
  focus?: string;
  className?: string;
}) {
  return (
    <AdminEditButton
      href={managedItemAdminHref(pageKey, itemKey, focus)}
      label={label}
      className={className}
    />
  );
}
