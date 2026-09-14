import type { InlineContentData } from '@/_lib/inline-content-shared';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import {
  getPublicPageCopyConfig,
  type PublicPageCopyPath,
} from '@/_lib/public-page-copy';
import { getPublicPageManagement } from '@/_lib/public-page-management';
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
  const management = getPublicPageManagement(path);
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
      adminHref={management.href}
      adminLabel={management.label}
      adminDescription={
        management.description ??
        '개별 아이템 추가·삭제·정렬과 상세 데이터는 전체 관리 화면에서 관리합니다.'
      }
      secondaryAdminHref={`/admin/common/page-copy?path=${encodeURIComponent(path)}`}
      secondaryAdminLabel="정적 문구·링크 관리자"
      secondaryAdminDescription="이 페이지의 고정 문구·링크·아이콘 이미지는 공통 정적 콘텐츠 관리자에서도 한 번에 수정할 수 있습니다."
    >
      {children(content.data)}
    </EditableRegion>
  );
}
