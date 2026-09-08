'use client';

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
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
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
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content"
                active={pathname === '/admin/content' || pathname.startsWith('/admin/content/')}
              >
                <FileText className="size-4" />
                콘텐츠 관리
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>바로가기</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/">
                <ExternalLink className="size-4" />
                홈페이지 보기
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="truncate text-sm font-semibold text-[#27272A]">{name}</p>
        <p className="mt-1 text-xs text-[#A1A1AA]">{role}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
