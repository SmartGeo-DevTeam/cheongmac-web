import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { ACTIVITY_EVENT_LABELS, type ActivityEventType } from '@/_lib/activity-types';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin } from '@/_lib/roles';
import { Badge } from '@/_shadcn/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shadcn/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shadcn/ui/table';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

const PROVIDER_LABELS: Record<string, string> = {
  google: 'Google',
  naver: '네이버',
  kakao: '카카오',
};

function formatDate(value: Date | null | undefined) {
  if (!value) return '-';

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(value);
}

function formatDuration(totalSeconds: number | null | undefined) {
  const seconds = Math.max(0, totalSeconds ?? 0);

  if (seconds < 60) return `${seconds}초`;

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  if (minutes < 60) {
    return remainder ? `${minutes}분 ${remainder}초` : `${minutes}분`;
  }

  const hours = Math.floor(minutes / 60);
  const minuteRemainder = minutes % 60;
  return `${hours}시간 ${minuteRemainder}분`;
}

function providerBadgeClass(provider: string) {
  if (provider === 'kakao') return 'border-transparent bg-[#f6de05] text-[#191919]';
  if (provider === 'naver') return 'border-transparent bg-[#02c158] text-white';
  if (provider === 'google') return 'border-transparent bg-[#4285F4] text-white';
  return 'border-[#E4E4E7] bg-white text-[#52525B]';
}

function eventLabel(value: string) {
  return ACTIVITY_EVENT_LABELS[value as ActivityEventType] ?? value;
}

function eventDetail(metadata: unknown) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return '-';
  }

  const record = metadata as Record<string, unknown>;

  if (typeof record.targetPath === 'string') return record.targetPath;
  if (typeof record.targetHost === 'string') return record.targetHost;

  return '-';
}

export default async function AdminMemberDetailPage({ params }: PageProps) {
  const session = await getCurrentSession();

  if (!session || !isActiveMember(session) || !canAccessAdmin(session.user.role)) {
    redirect('/admin/content');
  }

  const { id } = await params;

  const member = await prisma.user.findFirst({
    where: {
      id,
      membershipStatus: 'ACTIVE',
    },
    include: {
      accounts: {
        select: { providerId: true },
      },
    },
  });

  if (!member) notFound();

  const [
    loginCount,
    lastLogin,
    pageViewCount,
    activitySummary,
    recentLogins,
    recentSessions,
    recentPageViews,
    recentEvents,
  ] = await Promise.all([
    prisma.userLoginLog.count({ where: { userId: id } }),
    prisma.userLoginLog.findFirst({
      where: { userId: id },
      orderBy: { loggedInAt: 'desc' },
    }),
    prisma.userPageView.count({ where: { userId: id } }),
    prisma.userActivitySession.aggregate({
      where: { userId: id },
      _sum: { engagedSeconds: true },
      _max: { lastActiveAt: true },
    }),
    prisma.userLoginLog.findMany({
      where: { userId: id },
      orderBy: { loggedInAt: 'desc' },
      take: 10,
    }),
    prisma.userActivitySession.findMany({
      where: { userId: id },
      orderBy: { startedAt: 'desc' },
      take: 15,
    }),
    prisma.userPageView.findMany({
      where: { userId: id },
      orderBy: { enteredAt: 'desc' },
      take: 30,
    }),
    prisma.userActivityEvent.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 30,
    }),
  ]);

  const providers = Array.from(
    new Set(member.accounts.map((account) => account.providerId)),
  );

  return (
    <section className="space-y-6">
      <div>
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#71717A] hover:text-[#18181B]"
        >
          <ArrowLeft className="size-4" />
          전체 회원으로
        </Link>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
              {member.name}
            </h1>
            <p className="mt-1 text-sm text-[#71717A]">
              {member.email} · {member.phone ?? '휴대전화 정보 없음'}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {providers.map((provider) => (
              <Badge
                key={provider}
                variant="outline"
                className={providerBadgeClass(provider)}
              >
                {PROVIDER_LABELS[provider] ?? provider}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>총 로그인</CardDescription>
            <CardTitle className="text-2xl">{loginCount.toLocaleString()}회</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>최근 로그인</CardDescription>
            <CardTitle className="text-base">{formatDate(lastLogin?.loggedInAt)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>방문 페이지</CardDescription>
            <CardTitle className="text-2xl">{pageViewCount.toLocaleString()}회</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>실제 활동 시간</CardDescription>
            <CardTitle className="text-base">
              {formatDuration(activitySummary._sum.engagedSeconds)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>최근 활동</CardDescription>
            <CardTitle className="text-base">
              {formatDate(activitySummary._max.lastActiveAt)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 방문 흐름</CardTitle>
          <CardDescription>
            한 번의 방문에서 어디로 들어와 어떤 페이지에서 마지막 활동을 했는지 확인합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
                  <TableHead>방문 시작</TableHead>
                  <TableHead>첫 페이지</TableHead>
                  <TableHead>마지막 페이지</TableHead>
                  <TableHead>페이지 수</TableHead>
                  <TableHead>활동 시간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSessions.length ? (
                  recentSessions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap text-xs text-[#71717A]">
                        {formatDate(item.startedAt)}
                      </TableCell>
                      <TableCell className="max-w-[260px] truncate text-sm">
                        {item.entryPath ?? '-'}
                      </TableCell>
                      <TableCell className="max-w-[260px] truncate text-sm">
                        {item.exitPath ?? '-'}
                      </TableCell>
                      <TableCell>{item.pageViewCount}회</TableCell>
                      <TableCell>{formatDuration(item.engagedSeconds)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-sm text-[#A1A1AA]">
                      아직 방문 기록이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>페이지 방문 기록</CardTitle>
          <CardDescription>
            최근 30개의 페이지 방문과 실제 화면을 보고 있던 시간을 보여줍니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
                  <TableHead>방문 일시</TableHead>
                  <TableHead>페이지</TableHead>
                  <TableHead>활동 시간</TableHead>
                  <TableHead>다음 페이지</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPageViews.length ? (
                  recentPageViews.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap text-xs text-[#71717A]">
                        {formatDate(item.enteredAt)}
                      </TableCell>
                      <TableCell>
                        <p className="max-w-[360px] truncate font-medium text-[#27272A]">
                          {item.pageTitle ?? item.path}
                        </p>
                        <p className="mt-1 max-w-[360px] truncate text-xs text-[#A1A1AA]">
                          {item.path}
                        </p>
                      </TableCell>
                      <TableCell>{formatDuration(item.engagedSeconds)}</TableCell>
                      <TableCell className="max-w-[260px] truncate text-sm text-[#71717A]">
                        {item.nextPath ?? '-'}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={item.path}
                          target="_blank"
                          className="inline-flex size-8 items-center justify-center rounded-md text-[#71717A] hover:bg-[#F4F4F5]"
                          aria-label={`${item.path} 새 창에서 보기`}
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-sm text-[#A1A1AA]">
                      아직 페이지 방문 기록이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>로그인 기록</CardTitle>
            <CardDescription>최근 10회의 로그인 기록입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLogins.length ? (
              recentLogins.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-[#F0F0F1] pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-[#27272A]">
                      {PROVIDER_LABELS[item.provider ?? ''] ?? item.provider ?? '소셜 로그인'}
                    </p>
                    <p className="mt-1 text-xs text-[#A1A1AA]">
                      {item.deviceType ?? '기기 정보 없음'}
                    </p>
                  </div>
                  <time className="whitespace-nowrap text-xs text-[#71717A]">
                    {formatDate(item.loggedInAt)}
                  </time>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-[#A1A1AA]">
                아직 로그인 기록이 없습니다.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 행동</CardTitle>
            <CardDescription>
              페이지 이동과 추후 연결할 주요 기능 이용 기록을 시간순으로 보여줍니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEvents.length ? (
              recentEvents.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-[#F0F0F1] pb-3 last:border-b-0 last:pb-0"
                >
                  <time className="text-xs text-[#A1A1AA]">
                    {formatDate(item.createdAt)}
                  </time>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#27272A]">
                      {eventLabel(item.eventType)}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#71717A]">
                      {item.path}
                      {eventDetail(item.metadata) !== '-'
                        ? ` → ${eventDetail(item.metadata)}`
                        : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-[#A1A1AA]">
                아직 행동 기록이 없습니다.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
