import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card';
import { redirect } from 'next/navigation';
import BottomBannerManager, {
  type AdminBottomBannerItem,
  type BottomBannerPageOption,
} from './bottom-banner-manager';

export default async function AdminBottomBannersPage() {
  const session = await getCurrentSession();

  if (
    !session ||
    !isActiveMember(session) ||
    !canAccessAdmin(session.user.role)
  ) {
    redirect('/admin/content');
  }

  const [banners, navigationRows] = await Promise.all([
    prisma.pageBottomBanner.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        emoji: true,
        iconColor: true,
        title: true,
        linkTitle: true,
        href: true,
        sortOrder: true,
        isVisible: true,
        visiblePaths: true,
      },
    }),
    prisma.navigationMenu.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        parentId: true,
        title: true,
        href: true,
        sortOrder: true,
      },
    }),
  ]);

  const parentTitleById = new Map(
    navigationRows
      .filter((row) => !row.parentId)
      .map((row) => [row.id, row.title] as const),
  );

  const seenPaths = new Set<string>();
  const pageOptions: BottomBannerPageOption[] = [];

  for (const row of navigationRows) {
    if (!row.parentId || !row.href.startsWith('/')) continue;
    if (seenPaths.has(row.href)) continue;

    seenPaths.add(row.href);

    pageOptions.push({
      path: row.href,
      label: row.title,
      group: parentTitleById.get(row.parentId) ?? '기타',
    });
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          공통 페이지 하단 배너
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          사용자 페이지 하단에 공통으로 노출되는 3개의 바로가기 배너를 관리합니다.
          배너별 이모지, 아이콘 색상, 제목, 링크 문구와 링크 주소를 설정하고,
          LNB에 등록된 페이지 중 원하는 페이지에만 노출할 수 있습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>하단 배너 3개</CardTitle>
          <CardDescription>
            페이지 체크를 해제하면 해당 페이지에서는 배너가 렌더링되지 않습니다.
            LNB에 새 페이지가 추가되면 이 화면의 노출 페이지 선택 목록에도 자동으로 반영됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BottomBannerManager
            initialItems={banners as AdminBottomBannerItem[]}
            pageOptions={pageOptions}
          />
        </CardContent>
      </Card>
    </section>
  );
}
