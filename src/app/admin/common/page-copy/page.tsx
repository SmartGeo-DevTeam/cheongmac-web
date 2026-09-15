import {
  getPublicPageCopyConfig,
  PUBLIC_PAGE_COPY,
  type PublicPageCopyPath,
} from '@/_lib/public-page-copy';
import { pickInlineContentData } from '@/_lib/inline-content-shared';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import PageCopyAdminClient from './page-copy-admin-client';

export const dynamic = 'force-dynamic';

export default async function AdminPageCopyPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string | string[] }>;
}) {
  const query = await searchParams;
  const requestedPath = Array.isArray(query.path)
    ? query.path[0]
    : query.path;

  const paths = Object.keys(PUBLIC_PAGE_COPY) as PublicPageCopyPath[];

  const entries = await Promise.all(
    paths.map(async (path) => {
      const config = getPublicPageCopyConfig(path);
      const content = await getPageContentBlock(
        'page-copy',
        path,
        config.defaults,
      );

      return {
        path,
        label: config.label,
        fields: config.fields,
        data: pickInlineContentData(content.data, config.fields),
        persisted: content.persisted,
      };
    }),
  );

  const initialPath =
    requestedPath && paths.includes(requestedPath as PublicPageCopyPath)
      ? (requestedPath as PublicPageCopyPath)
      : paths[0];

  return (
    <section className="space-y-6 pb-12">
      <div>
        <p className="text-xs font-medium text-[#A1A1AA]">
          공통 · 콘텐츠
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          페이지 정적 문구·링크 관리
        </h1>
        <p className="mt-2 max-w-3xl break-keep text-sm leading-6 text-[#71717A]">
          화면에서 자주 바뀌는 고정 문구, 링크, 아이콘·이미지를
          PageContentBlock DB에서 관리합니다. 관계형 목록 데이터는 각
          페이지의 전용 관리자에서 관리합니다.
        </p>
      </div>

      <PageCopyAdminClient
        entries={entries}
        initialPath={initialPath}
      />
    </section>
  );
}
