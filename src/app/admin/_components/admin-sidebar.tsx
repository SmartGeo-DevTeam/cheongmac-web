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
  Activity,
  Bell,
  BookOpen,
  Building2,
  CalendarClock,
  Clapperboard,
  FileText,
  Handshake,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  ListTree,
  MessageCircle,
  MessagesSquare,
  Microscope,
  Newspaper,
  PanelBottom,
  Presentation,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

function menuActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
                  active={menuActive(pathname, '/admin/common/navigation')}
                >
                  <ListTree className="size-4" />
                  LNB 메뉴 관리
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/common/bottom-banners"
                  active={menuActive(pathname, '/admin/common/bottom-banners')}
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
                  active={menuActive(pathname, '/admin/members')}
                >
                  <Users className="size-4" />
                  전체 회원
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/roles"
                  active={menuActive(pathname, '/admin/roles')}
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
                active={menuActive(pathname, '/admin/content')}
              >
                <FileText className="size-4" />
                콘텐츠 관리
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>병원 소개</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/doctors"
                active={menuActive(pathname, '/admin/doctors')}
              >
                <Stethoscope className="size-4" />
                의료진/진료과
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/tour"
                active={menuActive(pathname, '/admin/pages/tour')}
              >
                <Building2 className="size-4" />
                병원 둘러보기
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/equipment"
                active={menuActive(pathname, '/admin/pages/equipment')}
              >
                <Microscope className="size-4" />
                첨단의료장비
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>교육·연구</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/exchange"
                active={menuActive(pathname, '/admin/pages/exchange')}
              >
                <Handshake className="size-4" />
                학술교류
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/society"
                active={menuActive(pathname, '/admin/pages/society')}
              >
                <Presentation className="size-4" />
                학회활동
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>소통공간</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/cases"
                active={menuActive(pathname, '/admin/pages/cases')}
              >
                <HeartPulse className="size-4" />
                치료사례
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/consultations"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/consultations',
                )}
              >
                <MessagesSquare className="size-4" />
                의학상담
              </SidebarMenuButton>
            </SidebarMenuItem>
            {canAccessDashboard ? (
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="/admin/customer-voice"
                  active={menuActive(pathname, '/admin/customer-voice')}
                >
                  <MessageCircle className="size-4" />
                  고객의 소리
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>병원소식</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/notice"
                active={menuActive(pathname, '/admin/pages/notice')}
              >
                <Bell className="size-4" />
                공지사항
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/news"
                active={menuActive(pathname, '/admin/pages/news')}
              >
                <Newspaper className="size-4" />
                청맥뉴스
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>이용안내</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/pages/partner-hospital"
                active={menuActive(pathname, '/admin/pages/partner-hospital')}
              >
                <Hospital className="size-4" />
                의료협약병원
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>데이터 관리</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/specialties"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/specialties',
                )}
              >
                <Activity className="size-4" />
                진료분야
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/schedules"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/schedules',
                )}
              >
                <CalendarClock className="size-4" />
                진료시간표
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/presentations"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/presentations',
                )}
              >
                <BookOpen className="size-4" />
                발표 이력
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/reviews"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/reviews',
                )}
              >
                <MessageCircle className="size-4" />
                환자 후기
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/admin/content-relations/media"
                active={menuActive(
                  pathname,
                  '/admin/content-relations/media',
                )}
              >
                <Clapperboard className="size-4" />
                미디어
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
