import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  canAccessAdmin,
  canEditContent,
  getRoleLabel,
  normalizeRole,
} from '@/_lib/roles';
import { Badge } from '@/_shadcn/ui/badge';
import { SidebarInset, SidebarProvider } from '@/_shadcn/ui/sidebar';
import AdminSidebar from './_components/admin-sidebar';
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session)) {
    redirect('/signin?callbackURL=/admin');
  }

  const role = normalizeRole(session.user.role);

  if (!canEditContent(role)) {
    redirect('/');
  }

  const canAccessDashboard = canAccessAdmin(role);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#FAFAFA]">
      <SidebarProvider>
        <AdminSidebar
          name={session.user.name}
          email={session.user.email}
          role={role}
          canAccessDashboard={canAccessDashboard}
        />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-[#E4E4E7] bg-white px-4 md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#18181B]">
                청맥병원 관리자
              </p>
              <p className="mt-0.5 truncate text-xs text-[#A1A1AA] md:hidden">
                {session.user.name} · {getRoleLabel(role)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <nav className="flex items-center gap-1 md:hidden">
                {canAccessDashboard ? (
                  <>
                    <Link
                      href="/admin"
                      className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                      aria-label="대시보드"
                    >
                      <LayoutDashboard className="size-4" />
                    </Link>
                    <Link
                      href="/admin/members"
                      className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                      aria-label="전체 회원"
                    >
                      <Users className="size-4" />
                    </Link>
                    <Link
                      href="/admin/roles"
                      className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                      aria-label="회원 권한 관리"
                    >
                      <ShieldCheck className="size-4" />
                    </Link>
                  </>
                ) : null}
                <Link
                  href="/admin/content"
                  className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                  aria-label="콘텐츠 관리"
                >
                  <FileText className="size-4" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                  aria-label="홈페이지 보기"
                >
                  <ExternalLink className="size-4" />
                </Link>
              </nav>
              <Badge variant="outline" className="hidden md:inline-flex">
                {getRoleLabel(role)}
              </Badge>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1440px] p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
