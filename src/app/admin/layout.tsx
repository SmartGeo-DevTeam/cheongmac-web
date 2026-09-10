import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import {
  canAccessAdmin,
  canEditContent,
  getRoleLabel,
  normalizeRole,
} from '@/_lib/roles';
import { SidebarInset, SidebarProvider } from '@/_shadcn/ui/sidebar';
import {
  Database,
  ExternalLink,
  FileText,
  LayoutDashboard,
  ListTree,
  PanelBottom,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminSidebar from './_components/admin-sidebar';

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
                      href="/admin/common/navigation"
                      className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                      aria-label="LNB 메뉴 관리"
                    >
                      <ListTree className="size-4" />
                    </Link>
                    <Link
                      href="/admin/common/bottom-banners"
                      className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                      aria-label="공통 페이지 하단 배너"
                    >
                      <PanelBottom className="size-4" />
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
                      aria-label="권한 관리"
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
                  href="/admin/doctors"
                  className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                  aria-label="의료진 관리"
                >
                  <Stethoscope className="size-4" />
                </Link>

                <Link
                  href="/admin/content-relations"
                  className="inline-flex size-9 items-center justify-center rounded-md text-[#52525B] hover:bg-[#F4F4F5]"
                  aria-label="데이터 관리"
                >
                  <Database className="size-4" />
                </Link>
              </nav>

              <Link
                href="/"
                className="hidden h-9 items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 text-sm font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B] md:inline-flex"
              >
                <ExternalLink className="size-4" />
                홈페이지 보기
              </Link>
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
