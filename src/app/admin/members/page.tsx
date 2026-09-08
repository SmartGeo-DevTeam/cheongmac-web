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
} from '@/components/ui/card';
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

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          전체 회원
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
          홈페이지 가입을 마친 회원을 확인합니다. 이름, 이메일, 휴대전화번호로 원하는 회원을 쉽게 찾을 수 있습니다.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원 목록</CardTitle>
          <CardDescription>
            현재 가입을 완료한 회원은 {users.length.toLocaleString()}명입니다. 회원 이름이나 연락처를 검색하거나 가입일 순으로 정렬해 볼 수 있습니다.
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
