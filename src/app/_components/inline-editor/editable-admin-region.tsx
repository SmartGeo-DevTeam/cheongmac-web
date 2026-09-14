'use client';

import type { ReactNode } from 'react';
import EditableRegion from './editable-region';

export default function EditableAdminRegion({
  pageKey,
  sectionKey,
  label,
  publicPath,
  adminHref,
  className,
  children,
}: {
  pageKey: string;
  sectionKey: string;
  label: string;
  publicPath: string;
  adminHref: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <EditableRegion
      pageKey={pageKey}
      sectionKey={sectionKey}
      label={label}
      publicPath={publicPath}
      fields={[]}
      data={{}}
      adminHref={adminHref}
      className={className}
    >
      {children}
    </EditableRegion>
  );
}
