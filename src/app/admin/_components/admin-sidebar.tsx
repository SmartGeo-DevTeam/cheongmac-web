'use client';

import { getRoleLabel } from '@/_lib/roles';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/_shadcn/ui/sidebar';
import {
  Database,
  FileText,
  LayoutDashboard,
  ListTree,
  PanelBottom,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({
  name,
  email,
  role,
  canAccessDashboard,
}: {
  name: string;
  email: string;
  role: string;
  canAccessDashboard: boolean;
}) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="rounded-xl bg-[#18181B] px-4 py-4 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4" />
            CHEONGMAC ADMIN
          </div>
          <p className="mt-2 truncate text-xs text-white/60">{email}</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>관리</SidebarGroupLabel>
          <SidebarMenu>
            {canAccessDashboard ? (
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin" active={pathname === '/admin'}>
                  <LayoutDashboard className="size-4" />
                  대시보드
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>

        {canAccessDashboard ? (
          <SidebarGroup>
            <SidebarGroupLabel>공통</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/common/navigation"
                  active={
                    pathname === '/admin/common/navigation' ||
                    pathname.startsWith('/admin/common/navigation/')
                  }
                >
                  <ListTree className="size-4" />
                  LNB 메뉴 관리
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/common/bottom-banners"
                  active={
                    pathname === '/admin/common/bottom-banners' ||
                    pathname.startsWith('/admin/common/bottom-banners/')
                  }
                >
                  <PanelBottom className="size-4" />
                  공통 페이지 하단 배너
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : null}

        {canAccessDashboard ? (
          <SidebarGroup>
            <SidebarGroupLabel>회원</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/members"
                  active={
                    pathname === '/admin/members' ||
                    pathname.startsWith('/admin/members/')
                  }
                >
                  <Users className="size-4" />
                  전체 회원
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/roles"
                  active={
                    pathname === '/admin/roles' ||
                    pathname.startsWith('/admin/roles/')
                  }
                >
                  <ShieldCheck className="size-4" />
                  권한 관리
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : null}

        <SidebarGroup>
          <SidebarGroupLabel>콘텐츠</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content"
                active={
                  pathname === '/admin/content' ||
                  pathname.startsWith('/admin/content/')
                }
              >
                <FileText className="size-4" />
                콘텐츠 관리
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/doctors"
                active={
                  pathname === '/admin/doctors' ||
                  pathname.startsWith('/admin/doctors/')
                }
              >
                <Stethoscope className="size-4" />
                의료진 관리
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>관계형 콘텐츠 DB</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/specialties"
                active={pathname.startsWith('/admin/content-relations/specialties')}
              >
                <Database className="size-4" />
                진료분야
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/schedules"
                active={pathname.startsWith('/admin/content-relations/schedules')}
              >
                <Database className="size-4" />
                진료시간표
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/presentations"
                active={pathname.startsWith('/admin/content-relations/presentations')}
              >
                <Database className="size-4" />
                발표 이력
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/reviews"
                active={pathname.startsWith('/admin/content-relations/reviews')}
              >
                <Database className="size-4" />
                환자 후기
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/media"
                active={pathname.startsWith('/admin/content-relations/media')}
              >
                <Database className="size-4" />
                미디어
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/consultations"
                active={pathname.startsWith('/admin/content-relations/consultations')}
              >
                <Database className="size-4" />
                의학상담
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="truncate text-sm font-semibold text-[#27272A]">{name}</p>
        <p className="mt-1 text-xs text-[#A1A1AA]">{getRoleLabel(role)}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
