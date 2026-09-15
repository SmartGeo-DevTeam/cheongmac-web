import {
  getCurrentSession,
  isActiveMember,
} from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin, normalizeRole } from '@/_lib/roles';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function integer(
  value: string | string[] | undefined,
  fallback: number,
) {
  const parsed = Number.parseInt(first(value) ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

const HIDDEN_HISTORY_KEYS =
  /(^id$|id$|ids$|itemkey$|password|hash|token|secret|captcha)/i;

function sanitizeForDisplay(value: unknown, depth = 0): unknown {
  if (depth > 5) return '[생략]';

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForDisplay(item, depth + 1));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !HIDDEN_HISTORY_KEYS.test(key))
        .map(([key, nested]) => [
          key,
          sanitizeForDisplay(nested, depth + 1),
        ]),
    );
  }

  return value;
}

function actionLabel(action: string) {
  const labels: Record<string, string> = {
    CREATE: '추가',
    UPDATE: '수정',
    DELETE: '삭제',
    REORDER: '순서 변경',
    RESET: '초기화',
    UPLOAD: '업로드',
    CHANGE: '변경',
  };

  return labels[action] ?? action;
}

function sourceLabel(source: string | null) {
  if (source === 'INLINE_EDITOR') return '사용자 화면 편집';
  if (source === 'PUBLIC_FORM') return '사용자 입력/가입';
  if (source === 'SYSTEM') return '시스템';
  return '관리자 페이지';
}

function inferLocation(
  targetType: string,
  action: string,
  metadata: unknown,
  explicitPath: string | null,
) {
  if (explicitPath) {
    return {
      label: explicitPath,
      href: explicitPath.startsWith('/admin') ? explicitPath : null,
    };
  }

  const meta = record(metadata);
  const pageKey = typeof meta.pageKey === 'string' ? meta.pageKey : '';
  const itemType = typeof meta.itemType === 'string' ? meta.itemType : '';

  if (targetType.startsWith('ManagedPageItem:')) {
    if (pageKey === 'home') {
      const map: Record<string, string> = {
        slide: '/admin/home/cover-slides',
        popup: '/admin/home/popups',
        specialty: '/admin/home/specialties',
        'middle-banner': '/admin/home/middle-banner',
      };
      const href = map[itemType] ?? '/admin/home/cover-slides';
      return { label: href, href };
    }

    const key = pageKey || targetType.split(':')[1] || '';
    return {
      label: key ? `/admin/pages/${key}` : '페이지 데이터 관리',
      href: key ? `/admin/pages/${key}` : null,
    };
  }

  if (targetType === 'DoctorReview') {
    return {
      label: '/admin/content-relations/reviews',
      href: '/admin/content-relations/reviews',
    };
  }

  if (targetType === 'Doctor' || targetType.startsWith('Doctor')) {
    return { label: '/admin/doctors', href: '/admin/doctors' };
  }

  const locations: Array<[RegExp, string]> = [
    [/MedicalConsultation/i, '/admin/content-relations/consultations'],
    [/CustomerVoice/i, '/admin/customer-voice'],
    [/NavigationMenu/i, '/admin/common/navigation'],
    [/PageBottomBanner/i, '/admin/common/bottom-banners'],
    [/Typography/i, '/admin/common/typography'],
    [/PageContentBlock/i, '/admin/common/page-copy'],
    [/Content/i, '/admin/content'],
    [/User|Member/i, '/admin/members'],
  ];

  for (const [pattern, href] of locations) {
    if (pattern.test(targetType)) return { label: href, href };
  }

  if (action.startsWith('INLINE_')) {
    const publicPath =
      typeof meta.publicPath === 'string' ? meta.publicPath : '/';
    return { label: `사용자 화면 ${publicPath}`, href: null };
  }

  return { label: targetType, href: null };
}

function historyHref({
  page,
  query,
  source,
}: {
  page: number;
  query: string;
  source: string;
}) {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (source) params.set('source', source);
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/admin/history?${qs}` : '/admin/history';
}

function jsonText(value: unknown) {
  const sanitized = sanitizeForDisplay(value);
  if (sanitized === null || sanitized === undefined) return '';
  return JSON.stringify(sanitized, null, 2) ?? '';
}

export default async function AdminHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    source?: string | string[];
    page?: string | string[];
  }>;
}) {
  const session = await getCurrentSession();
  if (
    !session ||
    !isActiveMember(session) ||
    !canAccessAdmin(normalizeRole(session.user.role))
  ) {
    redirect('/admin');
  }

  const params = await searchParams;
  const query = first(params.q)?.trim().slice(0, 120) ?? '';
  const source = first(params.source)?.trim().slice(0, 40) ?? '';
  const requestedPage = Math.max(1, integer(params.page, 1));
  const pageSize = 50;

  const where = {
    ...(source ? { source } : {}),
    ...(query
      ? {
          OR: [
            {
              action: {
                contains: query,
                mode: 'insensitive' as const,
              },
            },
            {
              targetType: {
                contains: query,
                mode: 'insensitive' as const,
              },
            },
            {
              actorName: {
                contains: query,
                mode: 'insensitive' as const,
              },
            },
            {
              actorEmail: {
                contains: query,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {}),
  };

  const total = await prisma.adminAuditLog.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const logs = await prisma.adminAuditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      actor: {
        select: {
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium text-[#A1A1AA]">관리</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          변경 이력
        </h1>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-[#71717A]">
          관리자 수정, 사용자 화면 빠른 편집, 사용자 입력 등 데이터 변경
          이력을 시간순으로 확인합니다. 내부 DB 식별자는 화면에 표시하지
          않습니다.
        </p>
      </div>

      <form
        method="get"
        className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4 md:flex-row md:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="변경 작업, 데이터 종류, 변경자 검색"
            className="h-10 w-full rounded-md border border-[#D4D4D8] pl-9 pr-3 text-sm outline-none focus:border-[#A1A1AA]"
          />
        </div>
        <select
          name="source"
          defaultValue={source}
          className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#52525B]"
        >
          <option value="">전체 변경 위치</option>
          <option value="ADMIN_PAGE">관리자 페이지</option>
          <option value="INLINE_EDITOR">사용자 화면 편집</option>
          <option value="PUBLIC_FORM">사용자 입력/가입</option>
          <option value="SYSTEM">시스템</option>
        </select>
        <button
          type="submit"
          className="h-10 rounded-md bg-[#18181B] px-5 text-sm font-semibold text-white"
        >
          조회
        </button>
      </form>

      <div className="space-y-3">
        {logs.length ? (
          logs.map((log) => {
            const actorName =
              log.actorName ||
              log.actor?.name ||
              (log.source === 'PUBLIC_FORM' ? '비회원 사용자' : '시스템');
            const actorEmail = log.actorEmail || log.actor?.email || '';
            const operation = log.operation || 'CHANGE';
            const location = inferLocation(
              log.targetType,
              log.action,
              log.metadata,
              log.sourcePath,
            );

            const metadata = record(log.metadata);
            const beforeText = jsonText(
              log.beforeData ?? metadata.before,
            );
            const afterText = jsonText(
              log.afterData ?? metadata.after ?? log.metadata,
            );
            const visibleChangedFields = log.changedFields.filter(
              (field) => !HIDDEN_HISTORY_KEYS.test(field),
            );

            return (
              <article
                key={log.id}
                className="rounded-xl border border-[#E4E4E7] bg-white p-4 md:p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#18181B] px-2.5 py-1 text-[11px] font-semibold text-white">
                        {actionLabel(operation)}
                      </span>
                      <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-medium text-[#52525B]">
                        {sourceLabel(log.source)}
                      </span>
                      <span className="text-xs font-medium text-[#52525B]">
                        {log.targetType.replace(/^ManagedPageItem:/, '')}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="font-semibold text-[#27272A]">
                        {actorName}
                      </p>
                      {actorEmail ? (
                        <p className="mt-0.5 text-xs text-[#A1A1AA]">
                          {actorEmail}
                          {log.actorRole ? ` · ${log.actorRole}` : ''}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <time className="text-xs text-[#71717A]">
                    {new Intl.DateTimeFormat('ko-KR', {
                      timeZone: 'Asia/Seoul',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }).format(log.createdAt)}
                  </time>
                </div>

                <div className="mt-4 grid gap-3 rounded-lg bg-[#FAFAFA] p-3 text-xs md:grid-cols-[120px_1fr]">
                  <span className="font-semibold text-[#71717A]">
                    변경 위치
                  </span>
                  <div>
                    {location.href ? (
                      <Link
                        href={location.href}
                        className="inline-flex items-center gap-1 font-medium text-[#006651] hover:underline"
                      >
                        {location.label}
                        <ExternalLink className="size-3" />
                      </Link>
                    ) : (
                      <span className="text-[#52525B]">
                        {location.label}
                      </span>
                    )}
                  </div>

                  <span className="font-semibold text-[#71717A]">
                    변경 방식
                  </span>
                  <span className="text-[#52525B]">{log.action}</span>

                  {visibleChangedFields.length ? (
                    <>
                      <span className="font-semibold text-[#71717A]">
                        변경 항목
                      </span>
                      <span className="break-words text-[#52525B]">
                        {visibleChangedFields.join(', ')}
                      </span>
                    </>
                  ) : null}
                </div>

                {beforeText || afterText ? (
                  <details className="mt-3 rounded-lg border border-[#E4E4E7] bg-white">
                    <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-[#52525B]">
                      변경 상세 보기
                    </summary>
                    <div className="grid gap-3 border-t border-[#E4E4E7] p-3 xl:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[11px] font-semibold text-[#A1A1AA]">
                          변경 전
                        </p>
                        <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all rounded-md bg-[#F7F7F8] p-3 text-[11px] leading-5 text-[#52525B]">
                          {beforeText || '기록 없음'}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-2 text-[11px] font-semibold text-[#A1A1AA]">
                          변경 후 / 상세
                        </p>
                        <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all rounded-md bg-[#F7F7F8] p-3 text-[11px] leading-5 text-[#52525B]">
                          {afterText || '기록 없음'}
                        </pre>
                      </div>
                    </div>
                  </details>
                ) : null}
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-[#D4D4D8] bg-[#FAFAFA] px-5 py-16 text-center text-sm text-[#A1A1AA]">
            조건에 맞는 변경 이력이 없습니다.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[#71717A]">
          총 {total.toLocaleString('ko-KR')}건 · 최근순
        </p>

        <div className="flex items-center gap-2">
          <Link
            href={historyHref({
              page: Math.max(1, page - 1),
              query,
              source,
            })}
            aria-disabled={page <= 1}
            className={`inline-flex h-9 items-center gap-1 rounded-md border px-3 text-xs ${
              page <= 1
                ? 'pointer-events-none border-[#E4E4E7] text-[#D4D4D8]'
                : 'border-[#D4D4D8] text-[#52525B]'
            }`}
          >
            <ChevronLeft className="size-3.5" />
            이전
          </Link>
          <span className="px-2 text-xs text-[#71717A]">
            {page} / {totalPages}
          </span>
          <Link
            href={historyHref({
              page: Math.min(totalPages, page + 1),
              query,
              source,
            })}
            aria-disabled={page >= totalPages}
            className={`inline-flex h-9 items-center gap-1 rounded-md border px-3 text-xs ${
              page >= totalPages
                ? 'pointer-events-none border-[#E4E4E7] text-[#D4D4D8]'
                : 'border-[#D4D4D8] text-[#52525B]'
            }`}
          >
            다음
            <ChevronRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
