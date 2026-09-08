import { getCurrentSession } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/_shadcn/ui/card';
import { FileText, History, ShieldCheck, Users } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getCurrentSession();

  if (!session || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const [members, managers, contents, revisions] = await Promise.all([
    prisma.user.count({ where: { membershipStatus: 'ACTIVE' } }),
    prisma.user.count({
      where: {
        membershipStatus: 'ACTIVE',
        role: { in: ['EDITOR', 'ADMIN', 'SUPER_ADMIN'] },
      },
    }),
    prisma.content.count(),
    prisma.contentRevision.count(),
  ]);

  const cards = [
    {
      label: '가입 회원',
      value: members.toLocaleString(),
      icon: Users,
      description: '홈페이지 가입을 마친 회원 수입니다.',
    },
    {
      label: '관리자 계정',
      value: managers.toLocaleString(),
      icon: ShieldCheck,
      description: '콘텐츠 또는 회원 권한을 관리할 수 있는 계정 수입니다.',
    },
    {
      label: '관리 콘텐츠',
      value: contents.toLocaleString(),
      icon: FileText,
      description: '홈페이지에서 직접 관리할 수 있도록 등록된 내용 수입니다.',
    },
    {
      label: '콘텐츠 변경 기록',
      value: revisions.toLocaleString(),
      icon: History,
      description: '콘텐츠를 새로 저장하거나 수정한 기록 수입니다.',
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          관리자 대시보드
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#71717A]">
          홈페이지 회원과 관리자, 콘텐츠 관리 현황을 한눈에 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, description }) => (
          <Card key={label}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#71717A]">
                {label}
              </CardTitle>
              <div className="grid size-9 place-items-center rounded-lg bg-[#F4F4F5] text-[#52525B]">
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-[-0.03em] text-[#18181B]">
                {value}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#71717A]">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
