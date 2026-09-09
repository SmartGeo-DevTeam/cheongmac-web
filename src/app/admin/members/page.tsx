import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
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

export default async function AdminMembersPage() {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const users = await prisma.user.findMany({
    where: { membershipStatus: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: {
      accounts: {
        select: { providerId: true },
      },
      loginLogs: {
        orderBy: { loggedInAt: 'desc' },
        take: 1,
        select: { loggedInAt: true },
      },
      _count: {
        select: { loginLogs: true },
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
    loginCount: user._count.loginLogs,
    lastLoginAt: user.loginLogs[0]?.loggedInAt.toISOString() ?? null,
    createdAt: user.createdAt.toISOString(),
  }));

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          전체 회원
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          홈페이지 가입을 마친 회원을 확인합니다. 회원 이름을 누르면 로그인 횟수와 최근 방문 기록을 자세히 볼 수 있습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원 목록</CardTitle>
          <CardDescription>
            현재 가입을 완료한 회원은 {users.length.toLocaleString()}명입니다. 로그인 기록은 이번 기능 적용 이후부터 쌓입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MemberDataTable
            data={members}
            mode="members"
            emptyMessage="찾으시는 회원이 없습니다."
          />
        </CardContent>
      </Card>
    </section>
  );
}
