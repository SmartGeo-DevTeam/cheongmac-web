import type { InlineContentData } from '@/_lib/inline-content-shared';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import {
  getPublicPageCopyConfig,
  type PublicPageCopyPath,
} from '@/_lib/public-page-copy';
import type { ReactNode } from 'react';
import EditableRegion from './editable-region';

export default async function EditablePageCopyBlock({
  path,
  children,
}: {
  path: PublicPageCopyPath;
  children: (copy: InlineContentData) => ReactNode;
}) {
  const config = getPublicPageCopyConfig(path);
  const content = await getPageContentBlock(
    'page-copy',
    path,
    config.defaults,
  );

  return (
    <EditableRegion
      pageKey="page-copy"
      sectionKey={path}
      label={config.label}
      publicPath={path}
      fields={config.fields}
      data={content.data}
      persisted={content.persisted}
    >
      {children(content.data)}
    </EditableRegion>
  );
}
