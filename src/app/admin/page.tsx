import { getCurrentSession } from '@/_lib/auth-session';
import { canAccessAdmin } from '@/_lib/roles';
import { prisma } from '@/_lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, History, Users } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getCurrentSession();

  if (!session || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const [members, contents, revisions] = await Promise.all([
    prisma.user.count({ where: { membershipStatus: 'ACTIVE' } }),
    prisma.content.count(),
    prisma.contentRevision.count(),
  ]);

  const cards = [
    {
      label: '활성 회원',
      value: members.toLocaleString(),
      icon: Users,
      description: '홈페이지 회원 전환을 완료한 사용자',
    },
    {
      label: '관리 콘텐츠',
      value: contents.toLocaleString(),
      icon: FileText,
      description: 'CMS에서 관리 중인 콘텐츠 키',
    },
    {
      label: '콘텐츠 수정 이력',
      value: revisions.toLocaleString(),
      icon: History,
      description: '생성 및 수정 시 누적된 revision',
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Overview</Badge>
          <Badge variant="outline">{session.user.role}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          관리자 대시보드
        </h1>
        <p className="mt-2 text-sm text-[#71717A]">
          회원과 홈페이지 콘텐츠 운영 현황을 확인합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, description }) => (
          <Card key={label}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-[#71717A]">{label}</CardTitle>
              <div className="grid size-9 place-items-center rounded-lg bg-[#F4F4F5] text-[#52525B]">
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-[-0.03em] text-[#18181B]">{value}</p>
              <p className="mt-2 text-xs leading-5 text-[#A1A1AA]">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
