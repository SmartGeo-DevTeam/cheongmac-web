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
import NavigationManager, {
  type NavigationAdminItem,
} from './navigation-manager';

export default async function AdminNavigationPage() {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const rows = await prisma.navigationMenu.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      parentId: true,
      title: true,
      href: true,
      sortOrder: true,
      isVisible: true,
    },
  });

  const childrenByParent = new Map<string, NavigationAdminItem[]>();

  for (const row of rows) {
    if (!row.parentId) continue;

    const list = childrenByParent.get(row.parentId) ?? [];
    list.push({ ...row, children: [] });
    childrenByParent.set(row.parentId, list);
  }

  const navigation: NavigationAdminItem[] = rows
    .filter((row) => !row.parentId)
    .map((row) => ({
      ...row,
      children: childrenByParent.get(row.id) ?? [],
    }));

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          LNB 메뉴 관리
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          홈페이지 상단 메뉴와 그 아래에 열리는 메뉴의 이름, 연결 주소, 노출 여부와 순서를 관리합니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>메뉴 구성</CardTitle>
          <CardDescription>
            위·아래 화살표로 같은 단계의 메뉴 순서를 바꿀 수 있습니다. 숨김으로 저장한 메뉴는 홈페이지에서는 보이지 않지만 이 화면에는 남아 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationManager initialItems={navigation} />
        </CardContent>
      </Card>
    </section>
  );
}
