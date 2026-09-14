import type {
  InlineContentData,
  InlineContentField,
} from '@/_lib/inline-content-shared';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import type { ReactNode } from 'react';
import EditableRegion from './editable-region';

export default async function EditableContentBlock({
  pageKey,
  sectionKey,
  label,
  publicPath,
  defaults,
  fields,
  className,
  children,
}: {
  pageKey: string;
  sectionKey: string;
  label: string;
  publicPath: string;
  defaults: InlineContentData;
  fields: readonly InlineContentField[];
  className?: string;
  children: (data: InlineContentData) => ReactNode;
}) {
  const content = await getPageContentBlock(
    pageKey,
    sectionKey,
    defaults,
  );

  return (
    <EditableRegion
      pageKey={pageKey}
      sectionKey={sectionKey}
      label={label}
      publicPath={publicPath}
      fields={fields}
      data={content.data}
      persisted={content.persisted}
      className={className}
    >
      {children(content.data)}
    </EditableRegion>
  );
}
