'use client';

import {
  pickInlineContentData,
  type InlineContentData,
} from '@/_lib/inline-content-shared';
import {
  getPublicPageCopyConfig,
  type PublicPageCopyPath,
} from '@/_lib/public-page-copy';
import type { ReactNode } from 'react';
import EditableRegion from './editable-region';

export default function EditablePageCopyRegion({
  path,
  copy,
  persisted,
  label,
  fieldKeys,
  className,
  children,
}: {
  path: PublicPageCopyPath;
  copy: InlineContentData;
  persisted: boolean;
  label: string;
  fieldKeys: readonly string[];
  className?: string;
  children: ReactNode;
}) {
  const config = getPublicPageCopyConfig(path);
  const fieldKeySet = new Set(fieldKeys);
  const fields = config.fields.filter((field) =>
    fieldKeySet.has(field.key),
  );

  const normalizedCopy = pickInlineContentData(
    copy,
    config.fields,
  );

  return (
    <EditableRegion
      pageKey="page-copy"
      sectionKey={path}
      label={label}
      publicPath={path}
      fields={fields}
      data={normalizedCopy}
      persisted={persisted}
      allowReset={false}
      className={className}
    >
      {children}
    </EditableRegion>
  );
}
