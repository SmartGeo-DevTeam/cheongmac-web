import { getCurrentSession } from '@/_lib/auth-session';
import { canAccessAdmin } from '@/_lib/roles';
import { prisma } from '@/_lib/prisma';
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
    ['활성 회원', members.toLocaleString()],
    ['관리 콘텐츠', contents.toLocaleString()],
    ['콘텐츠 수정 이력', revisions.toLocaleString()],
  ];

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#222222]">관리자 대시보드</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-[#777777]">{label}</p>
            <p className="mt-3 text-3xl font-bold text-[#222222]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
