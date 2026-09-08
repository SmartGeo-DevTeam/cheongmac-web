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
} from '@/components/ui/card';
import { redirect } from 'next/navigation';

export default async function AdminRolesPage() {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const role = normalizeRole(session.user.role);
  const users = await prisma.user.findMany({
    where: { membershipStatus: 'ACTIVE' },
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
          가입한 회원에게 콘텐츠 관리 권한이나 전체 관리자 권한을 줄 수 있습니다. 최고 관리자 권한은 안전을 위해 이 화면에서 바꿀 수 없습니다.
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
            관리자 페이지에서 가장 높은 권한을 가진 계정입니다.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원별 권한</CardTitle>
          <CardDescription>
            이름으로 회원을 찾은 뒤 원하는 권한을 선택하고 적용 버튼을 누르세요. 일반 회원으로 되돌리면 관리자 권한이 해제됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberDataTable
            data={members}
            mode="roles"
            currentUserId={session.user.id}
            canManageRoles={canManageMemberRoles(role)}
            emptyMessage="찾으시는 회원이 없습니다."
          />
        </CardContent>
      </Card>
    </section>
  );
}
