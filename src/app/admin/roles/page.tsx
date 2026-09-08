import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import {
  canAccessAdmin,
  canManageMemberRoles,
  normalizeRole,
} from '@/_lib/roles';
import MemberDataTable, {
  type AdminMemberRow,
} from '@/app/admin/_components/member-data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card';
import { redirect } from 'next/navigation';

export default async function AdminRolesPage() {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const role = normalizeRole(session.user.role);
  const users = await prisma.user.findMany({
    where: {
      membershipStatus: 'ACTIVE',
      role: {
        in: ['EDITOR', 'ADMIN', 'SUPER_ADMIN'],
      },
    },
    orderBy: { createdAt: 'desc' },
    include: {
      accounts: {
        select: { providerId: true },
      },
    },
  });

  const members: AdminMemberRow[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    membershipStatus: user.membershipStatus,
    providers: Array.from(
      new Set(user.accounts.map((account) => account.providerId)),
    ),
    createdAt: user.createdAt.toISOString(),
  }));

  const editorCount = users.filter((user) => user.role === 'EDITOR').length;
  const adminCount = users.filter((user) => user.role === 'ADMIN').length;
  const superAdminCount = users.filter(
    (user) => user.role === 'SUPER_ADMIN',
  ).length;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          회원 권한 관리
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          현재 관리자 권한이 있는 회원만 확인합니다. 새로운 관리자는 오른쪽의 관리자 추가 버튼에서 회원 이메일을 검색해 등록할 수 있습니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>콘텐츠 관리자</CardDescription>
            <CardTitle className="text-2xl">{editorCount.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs leading-5 text-[#71717A]">
            홈페이지의 글과 문구를 관리할 수 있습니다.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>전체 관리자</CardDescription>
            <CardTitle className="text-2xl">{adminCount.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs leading-5 text-[#71717A]">
            회원 권한과 홈페이지 콘텐츠를 함께 관리할 수 있습니다.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>최고 관리자</CardDescription>
            <CardTitle className="text-2xl">{superAdminCount.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-xs leading-5 text-[#71717A]">
            가장 높은 권한을 가진 계정이며 이 화면에서는 새로 추가할 수 없습니다.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>관리자 목록</CardTitle>
          <CardDescription>
            현재 권한을 가진 관리자만 표시됩니다. 권한을 일반 회원으로 변경하면 이 목록에서 빠집니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberDataTable
            data={members}
            mode="roles"
            currentUserId={session.user.id}
            canManageRoles={canManageMemberRoles(role)}
            emptyMessage="등록된 관리자가 없습니다."
          />
        </CardContent>
      </Card>
    </section>
  );
}
