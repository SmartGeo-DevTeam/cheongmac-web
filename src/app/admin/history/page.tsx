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
  ImageIcon,
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
  return value &&
    typeof value === 'object' &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

const HIDDEN_HISTORY_KEYS =
  /(^id$|id$|ids$|itemkey$|password|hash|token|secret|captcha)/i;

const TECHNICAL_HISTORY_KEYS = new Set([
  'pageKey',
  'itemType',
  'sourcePath',
  'publicPath',
  'targetId',
  'fieldKey',
]);

function sanitizeForDisplay(
  value: unknown,
  depth = 0,
): unknown {
  if (depth > 6) return '[생략]';

  if (Array.isArray(value)) {
    return value.map((item) =>
      sanitizeForDisplay(item, depth + 1),
    );
  }

  if (
    value &&
    typeof value === 'object'
  ) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(
          ([key]) =>
            !HIDDEN_HISTORY_KEYS.test(key),
        )
        .map(([key, nested]) => [
          key,
          sanitizeForDisplay(nested, depth + 1),
        ]),
    );
  }

  return value;
}

const FIELD_LABELS: Record<string, string> = {
  title: '제목',
  summary: '요약',
  category: '분류',
  description: '설명',
  content: '내용',
  question: '문의 내용',
  answer: '답변',
  label: '표시명',
  name: '이름',
  email: '이메일',
  phone: '연락처',
  role: '권한',
  status: '상태',
  membershipStatus: '회원 상태',
  department: '진료과',
  position: '직책',
  slug: 'URL 식별자',
  sortOrder: '노출 순서',
  displayOrder: '노출 순서',
  isVisible: '사용자 페이지 노출',
  isHomeVisible: '메인페이지 노출',
  homeQuote: '메인 소개 문구',
  eyebrow: '보조 제목',
  subtitle: '부제목',
  buttonLabel: '버튼 문구',
  href: '연결 주소',
  linkUrl: '연결 주소',
  buttonHref: '버튼 연결 주소',
  backgroundColor: '배경색',
  imageUrl: '대표 이미지',
  desktopImageUrl: 'PC 이미지',
  mobileImageUrl: '모바일 이미지',
  beforeImageUrl: '변경 전 이미지',
  afterImageUrl: '변경 후 이미지',
  image: '이미지',
  images: '이미지',
  url: '파일/이미지',
  patientName: '환자명',
  age: '나이',
  gender: '성별',
  treatment: '치료/수술',
  reviewedAt: '후기일',
  keywords: '키워드',
  publishedAt: '게시일',
  date: '날짜',
  kind: '유형',
  floor: '층',
  icon: '아이콘',
  iconColor: '아이콘 색상',
  emoji: '이모지',
  visiblePaths: '노출 페이지',
  linkTitle: '링크 문구',
  phoneConsultRequested: '전화 상담 요청',
  attachmentName: '첨부파일',
  answerDate: '답변일',
  isPrivate: '비공개',
};

const PAGE_LABELS: Record<string, string> = {
  home: '메인페이지',
  tour: '병원 둘러보기',
  equipment: '첨단의료장비',
  exchange: '학술교류',
  society: '학회활동',
  cases: '치료사례',
  notice: '공지사항',
  news: '청맥뉴스',
  'partner-hospital': '의료협약병원',
  'common-content-banners': '공통 콘텐츠 배너',
};

const HOME_ITEM_LABELS: Record<string, string> = {
  slide: '커버 슬라이드',
  popup: '메인 팝업',
  specialty: '진료분야 카드',
  'middle-banner': '중간 배너',
};

function fieldLabel(path: string) {
  const parts = path.split('.');
  const key = parts[parts.length - 1] ?? path;
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];

  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replaceAll('_', ' ')
    .trim();
}

function flattenForDiff(
  value: unknown,
  prefix = '',
  output = new Map<string, unknown>(),
) {
  const sanitized = sanitizeForDisplay(value);

  if (
    sanitized &&
    typeof sanitized === 'object' &&
    !Array.isArray(sanitized)
  ) {
    for (const [key, nested] of Object.entries(
      sanitized as Record<string, unknown>,
    )) {
      if (
        HIDDEN_HISTORY_KEYS.test(key) ||
        TECHNICAL_HISTORY_KEYS.has(key)
      ) {
        continue;
      }

      if (key === 'data') {
        flattenForDiff(nested, prefix, output);
        continue;
      }

      const nextPrefix = prefix
        ? `${prefix}.${key}`
        : key;

      if (
        nested &&
        typeof nested === 'object' &&
        !Array.isArray(nested)
      ) {
        flattenForDiff(nested, nextPrefix, output);
      } else {
        output.set(nextPrefix, nested);
      }
    }

    return output;
  }

  if (prefix) output.set(prefix, sanitized);
  return output;
}

function comparable(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

type DiffRow = {
  key: string;
  label: string;
  before: unknown;
  after: unknown;
};

function buildDiffRows(
  beforeValue: unknown,
  afterValue: unknown,
  fallbackValue?: unknown,
): DiffRow[] {
  const before = flattenForDiff(beforeValue);
  let after = flattenForDiff(afterValue);

  if (!after.size && fallbackValue !== undefined) {
    after = flattenForDiff(fallbackValue);
  }

  const keys = new Set([
    ...before.keys(),
    ...after.keys(),
  ]);

  return [...keys]
    .filter(
      (key) =>
        comparable(before.get(key)) !==
        comparable(after.get(key)),
    )
    .sort((a, b) => a.localeCompare(b, 'ko'))
    .map((key) => ({
      key,
      label: fieldLabel(key),
      before: before.get(key),
      after: after.get(key),
    }));
}

function humanValue(
  value: unknown,
  fieldKey: string,
) {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '없음';
  }

  if (typeof value === 'boolean') {
    if (
      fieldKey.toLowerCase().includes('visible')
    ) {
      return value ? '노출' : '미노출';
    }

    return value ? '예' : '아니오';
  }

  if (Array.isArray(value)) {
    if (!value.length) return '없음';

    return value
      .map((item) =>
        typeof item === 'object'
          ? JSON.stringify(item)
          : String(item),
      )
      .join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function imageUrls(
  value: unknown,
  fieldKey: string,
) {
  const values = Array.isArray(value)
    ? value
    : [value];

  return values
    .flatMap((item) =>
      typeof item === 'string'
        ? item.split(/\r?\n/).map((part) => part.trim())
        : [],
    )
    .filter(Boolean)
    .filter((url) => {
      if (
        !url.startsWith('http://') &&
        !url.startsWith('https://') &&
        !url.startsWith('/')
      ) {
        return false;
      }

      return (
        /(image|photo|avatar|thumbnail|banner|logo)/i.test(
          fieldKey,
        ) ||
        /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(
          url,
        ) ||
        /blob\.core\.windows\.net/i.test(url)
      );
    })
    .slice(0, 6);
}

function isLinkValue(value: unknown) {
  return (
    typeof value === 'string' &&
    /^(https?:\/\/|\/)/.test(value)
  );
}

function DiffValue({
  value,
  fieldKey,
  side,
}: {
  value: unknown;
  fieldKey: string;
  side: 'before' | 'after';
}) {
  const images = imageUrls(value, fieldKey);
  const text = humanValue(value, fieldKey);
  const isBefore = side === 'before';

  return (
    <div
      className={`min-w-0 border-l-4 px-3 py-3 ${
        isBefore
          ? 'border-[#FCA5A5] bg-[#FEF2F2]'
          : 'border-[#86EFAC] bg-[#F0FDF4]'
      }`}
    >
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 shrink-0 font-mono text-sm font-bold ${
            isBefore
              ? 'text-[#B91C1C]'
              : 'text-[#15803D]'
          }`}
        >
          {isBefore ? '−' : '+'}
        </span>
        <div className="min-w-0 flex-1">
          {images.length ? (
            <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {images.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-md border border-black/10 bg-white"
                  title="이미지 미리보기"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="변경 이미지 미리보기"
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                </a>
              ))}
            </div>
          ) : null}

          {isLinkValue(value) ? (
            <a
              href={String(value)}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-xs leading-5 text-[#2563EB] underline underline-offset-2"
            >
              {text}
            </a>
          ) : (
            <p className="whitespace-pre-wrap break-words text-xs leading-5 text-[#3F3F46]">
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
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
  if (source === 'INLINE_EDITOR') {
    return '사용자 화면 편집';
  }
  if (source === 'PUBLIC_FORM') {
    return '사용자 입력/가입';
  }
  if (source === 'SYSTEM') return '시스템';
  return '관리자 페이지';
}

function changeMethodLabel(
  source: string | null,
  operation: string,
) {
  const operationText = actionLabel(operation);

  if (source === 'INLINE_EDITOR') {
    return `사용자 화면 빠른 편집으로 ${operationText}`;
  }
  if (source === 'PUBLIC_FORM') {
    return `사용자 입력으로 ${operationText}`;
  }
  if (source === 'SYSTEM') {
    return `시스템에서 ${operationText}`;
  }

  return `관리자 페이지에서 ${operationText}`;
}

function locationLabel(path: string) {
  const pairs: Array<[string, string]> = [
    ['/admin/home/cover-slides', '커버 슬라이드 관리'],
    ['/admin/home/popups', '메인 팝업 관리'],
    ['/admin/home/specialties', '진료분야 카드 관리'],
    ['/admin/home/middle-banner', '중간 배너 관리'],
    ['/admin/doctors', '의료진 관리'],
    ['/admin/content-relations/reviews', '환자 후기 관리'],
    ['/admin/content-relations/consultations', '의학상담 관리'],
    ['/admin/content-relations/specialties', '진료분야 데이터 관리'],
    ['/admin/content-relations/schedules', '진료시간표 관리'],
    ['/admin/content-relations/presentations', '발표 이력 관리'],
    ['/admin/content-relations/media', '미디어 관리'],
    ['/admin/customer-voice', '고객의 소리 관리'],
    ['/admin/common/navigation', 'LNB 메뉴 관리'],
    ['/admin/common/bottom-banners', '공통 페이지 하단 배너 관리'],
    ['/admin/common/typography', '본문 타이포그래피 관리'],
    ['/admin/common/page-copy', '페이지 정적 문구·링크 관리'],
    ['/admin/members', '회원 관리'],
    ['/admin/roles', '권한 관리'],
  ];

  for (const [prefix, label] of pairs) {
    if (path.startsWith(prefix)) return label;
  }

  const pageMatch = path.match(
    /^\/admin\/pages\/([^/?#]+)/,
  );
  if (pageMatch) {
    const pageKey = decodeURIComponent(pageMatch[1]);
    return `${PAGE_LABELS[pageKey] ?? pageKey} 관리`;
  }

  if (path.startsWith('/community/')) {
    return `사용자 화면 ${path}`;
  }

  return path;
}

function inferLocation(
  targetType: string,
  action: string,
  metadata: unknown,
  explicitPath: string | null,
) {
  if (explicitPath) {
    return {
      label: locationLabel(explicitPath),
      href: explicitPath.startsWith('/admin')
        ? explicitPath
        : null,
    };
  }

  const meta = record(metadata);
  const pageKey =
    typeof meta.pageKey === 'string'
      ? meta.pageKey
      : '';
  const itemType =
    typeof meta.itemType === 'string'
      ? meta.itemType
      : '';

  if (targetType.startsWith('ManagedPageItem:')) {
    if (pageKey === 'home') {
      const map: Record<string, string> = {
        slide: '/admin/home/cover-slides',
        popup: '/admin/home/popups',
        specialty: '/admin/home/specialties',
        'middle-banner': '/admin/home/middle-banner',
      };
      const href =
        map[itemType] ?? '/admin/home/cover-slides';
      return {
        label: locationLabel(href),
        href,
      };
    }

    const key =
      pageKey ||
      targetType.split(':')[1] ||
      '';
    const href = key
      ? `/admin/pages/${key}`
      : null;

    return {
      label: href
        ? locationLabel(href)
        : '페이지 데이터 관리',
      href,
    };
  }

  if (targetType === 'DoctorReview') {
    const href = '/admin/content-relations/reviews';
    return {
      label: locationLabel(href),
      href,
    };
  }

  if (
    targetType === 'Doctor' ||
    targetType.startsWith('Doctor')
  ) {
    const href = '/admin/doctors';
    return {
      label: locationLabel(href),
      href,
    };
  }

  const locations: Array<
    [RegExp, string]
  > = [
    [
      /MedicalConsultation/i,
      '/admin/content-relations/consultations',
    ],
    [/CustomerVoice/i, '/admin/customer-voice'],
    [/NavigationMenu/i, '/admin/common/navigation'],
    [/PageBottomBanner/i, '/admin/common/bottom-banners'],
    [/Typography/i, '/admin/common/typography'],
    [/PageContentBlock/i, '/admin/common/page-copy'],
    [/User|Member/i, '/admin/members'],
  ];

  for (const [pattern, href] of locations) {
    if (pattern.test(targetType)) {
      return {
        label: locationLabel(href),
        href,
      };
    }
  }

  if (action.startsWith('INLINE_')) {
    const publicPath =
      typeof meta.publicPath === 'string'
        ? meta.publicPath
        : '/';

    return {
      label: `사용자 화면 ${publicPath}`,
      href: null,
    };
  }

  return {
    label: targetType,
    href: null,
  };
}

function targetLabel(
  targetType: string,
  metadata: unknown,
) {
  const meta = record(metadata);
  const pageKey =
    typeof meta.pageKey === 'string'
      ? meta.pageKey
      : '';
  const itemType =
    typeof meta.itemType === 'string'
      ? meta.itemType
      : '';
  const title =
    typeof meta.title === 'string'
      ? meta.title
      : '';

  let base = targetType.replace(
    /^ManagedPageItem:/,
    '',
  );

  if (
    targetType.startsWith('ManagedPageItem:')
  ) {
    if (pageKey === 'home') {
      base =
        HOME_ITEM_LABELS[itemType] ??
        '메인페이지 데이터';
    } else {
      base =
        PAGE_LABELS[pageKey] ??
        PAGE_LABELS[base] ??
        base;
    }
  } else {
    const labels: Record<string, string> = {
      Doctor: '의료진',
      DoctorReview: '환자 후기',
      MedicalConsultation: '의학상담',
      CustomerVoiceSubmission: '고객의 소리',
      NavigationMenu: 'LNB 메뉴',
      PageBottomBanner: '공통 하단 배너',
      PageContentBlock: '페이지 문구',
      UserMembership: '회원 정보',
      ManagedPageAsset: '페이지 이미지',
    };
    base = labels[targetType] ?? base;
  }

  return title &&
    !base.includes(title)
    ? `${base} · ${title}`
    : base;
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
  if (page > 1) {
    params.set('page', String(page));
  }

  const qs = params.toString();
  return qs
    ? `/admin/history?${qs}`
    : '/admin/history';
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
    !canAccessAdmin(
      normalizeRole(session.user.role),
    )
  ) {
    redirect('/admin');
  }

  const params = await searchParams;
  const query =
    first(params.q)?.trim().slice(0, 120) ?? '';
  const source =
    first(params.source)?.trim().slice(0, 40) ?? '';
  const requestedPage = Math.max(
    1,
    integer(params.page, 1),
  );
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

  const total =
    await prisma.adminAuditLog.count({
      where,
    });
  const totalPages = Math.max(
    1,
    Math.ceil(total / pageSize),
  );
  const page = Math.min(
    requestedPage,
    totalPages,
  );

  const logs =
    await prisma.adminAuditLog.findMany({
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
        <p className="text-xs font-medium text-[#A1A1AA]">
          히스토리
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          변경 이력
        </h1>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-[#71717A]">
          누가, 어디에서, 어떤 데이터를 어떻게
          변경했는지 확인합니다. 변경 전·후 값은
          GitHub diff처럼 비교하며 이미지 변경은
          미리보기로 함께 표시합니다.
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
            placeholder="변경 내용, 데이터 종류, 변경자 검색"
            className="h-10 w-full rounded-md border border-[#D4D4D8] pl-9 pr-3 text-sm outline-none focus:border-[#A1A1AA]"
          />
        </div>
        <select
          name="source"
          defaultValue={source}
          className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#52525B]"
        >
          <option value="">
            전체 변경 위치
          </option>
          <option value="ADMIN_PAGE">
            관리자 페이지
          </option>
          <option value="INLINE_EDITOR">
            사용자 화면 편집
          </option>
          <option value="PUBLIC_FORM">
            사용자 입력/가입
          </option>
          <option value="SYSTEM">
            시스템
          </option>
        </select>
        <button
          type="submit"
          className="h-10 rounded-md bg-[#18181B] px-5 text-sm font-semibold text-white"
        >
          조회
        </button>
      </form>

      <div className="space-y-4">
        {logs.length ? (
          logs.map((log, logIndex) => {
            const actorName =
              log.actorName ||
              log.actor?.name ||
              (log.source === 'PUBLIC_FORM'
                ? '비회원 사용자'
                : '시스템');
            const actorEmail =
              log.actorEmail ||
              log.actor?.email ||
              '';
            const operation =
              log.operation || 'CHANGE';
            const metadata = record(
              log.metadata,
            );
            const location = inferLocation(
              log.targetType,
              log.action,
              log.metadata,
              log.sourcePath,
            );
            const beforeValue =
              log.beforeData ??
              metadata.before ??
              null;
            const afterValue =
              log.afterData ??
              metadata.after ??
              (operation === 'DELETE'
                ? null
                : log.metadata);
            const diffRows = buildDiffRows(
              beforeValue,
              afterValue,
              log.metadata,
            );
            const rowNumber =
              (page - 1) * pageSize +
              logIndex +
              1;

            return (
              <article
                key={log.id}
                className="rounded-xl border border-[#E4E4E7] bg-white p-4 md:p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-[11px] font-semibold tabular-nums text-[#71717A]">
                      {rowNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#18181B] px-2.5 py-1 text-[11px] font-semibold text-white">
                          {actionLabel(operation)}
                        </span>
                        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-medium text-[#52525B]">
                          {sourceLabel(log.source)}
                        </span>
                      </div>

                      <h2 className="mt-3 break-keep text-base font-semibold text-[#27272A]">
                        {targetLabel(
                          log.targetType,
                          log.metadata,
                        )}
                      </h2>

                      <p className="mt-1 text-sm text-[#52525B]">
                        <strong className="font-semibold">
                          {actorName}
                        </strong>
                        님이{' '}
                        {changeMethodLabel(
                          log.source,
                          operation,
                        )}
                        했습니다.
                      </p>

                      {actorEmail ? (
                        <p className="mt-1 text-xs text-[#A1A1AA]">
                          {actorEmail}
                          {log.actorRole
                            ? ` · ${log.actorRole}`
                            : ''}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <time className="shrink-0 text-xs text-[#71717A]">
                    {new Intl.DateTimeFormat(
                      'ko-KR',
                      {
                        timeZone: 'Asia/Seoul',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      },
                    ).format(log.createdAt)}
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
                  <span className="text-[#52525B]">
                    {changeMethodLabel(
                      log.source,
                      operation,
                    )}
                  </span>

                  <span className="font-semibold text-[#71717A]">
                    변경 항목
                  </span>
                  <span className="break-words text-[#52525B]">
                    {diffRows.length
                      ? `${diffRows.length}개 항목`
                      : '세부 값 기록 없음'}
                  </span>
                </div>

                {diffRows.length ? (
                  <details className="mt-3 overflow-hidden rounded-lg border border-[#E4E4E7] bg-white">
                    <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#3F3F46]">
                      변경 상세 보기
                    </summary>

                    <div className="border-t border-[#E4E4E7]">
                      <div className="flex items-center gap-2 bg-[#FAFAFA] px-4 py-2 text-xs font-semibold text-[#71717A]">
                        <ImageIcon className="size-3.5" />
                        변경 내용 비교
                      </div>

                      <div className="divide-y divide-[#ECECEF]">
                        {diffRows.map((row) => (
                          <div
                            key={row.key}
                            className="p-4"
                          >
                            <p className="mb-2 text-xs font-semibold text-[#52525B]">
                              {row.label}
                            </p>

                            <div className="grid gap-2 xl:grid-cols-2">
                              <DiffValue
                                value={row.before}
                                fieldKey={row.key}
                                side="before"
                              />
                              <DiffValue
                                value={row.after}
                                fieldKey={row.key}
                                side="after"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ) : (
                  <div className="mt-3 rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA] px-4 py-4 text-xs text-[#71717A]">
                    이 기록은 과거 로그이거나 세부 전·후
                    값이 저장되지 않아 비교할 값이 없습니다.
                  </div>
                )}
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
          총 {total.toLocaleString('ko-KR')}건 ·
          최근순
        </p>

        <div className="flex items-center gap-2">
          <Link
            href={historyHref({
              page: Math.max(
                1,
                page - 1,
              ),
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
              page: Math.min(
                totalPages,
                page + 1,
              ),
              query,
              source,
            })}
            aria-disabled={
              page >= totalPages
            }
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
