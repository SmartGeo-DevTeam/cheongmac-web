import AdminDataTable, {
  type AdminDataTableColumn,
  type AdminDataTableRow,
} from '@/app/admin/_components/admin-data-table';
import { getCurrentSession, isActiveMember } from '@/_lib/auth-session';
import { prisma } from '@/_lib/prisma';
import { canAccessAdmin, normalizeRole } from '@/_lib/roles';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function integer(value: string | string[] | undefined, fallback: number) {
  const parsed = Number.parseInt(first(value) ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function categoryLabel(value: string) {
  if (value === 'praise') return '칭찬/감사';
  if (value === 'suggestion') return '건의사항';
  if (value === 'complaint') return '불만/고충';
  return value;
}

function statusLabel(value: string) {
  if (value === 'RECEIVED') return '접수';
  if (value === 'IN_PROGRESS') return '처리중';
  if (value === 'COMPLETED') return '완료';
  if (value === 'ARCHIVED') return '보관';
  return value;
}

export default async function AdminCustomerVoicePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    page?: string | string[];
    pageSize?: string | string[];
    category?: string | string[];
    status?: string | string[];
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
  const category = first(params.category)?.trim() || undefined;
  const status = first(params.status)?.trim() || undefined;
  const pageSizeValue = integer(params.pageSize, 10);
  const pageSize = [10, 20, 50].includes(pageSizeValue) ? pageSizeValue : 10;
  const requestedPage = Math.max(1, integer(params.page, 1));

  const where = {
    ...(category ? { category } : {}),
    ...(status ? { status } : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' as const } },
            { content: { contains: query, mode: 'insensitive' as const } },
            { name: { contains: query, mode: 'insensitive' as const } },
            { phone: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const total = await prisma.customerVoiceSubmission.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const items = await prisma.customerVoiceSubmission.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const columns: AdminDataTableColumn[] = [
    { key: 'category', label: '분류', className: 'w-[110px] min-w-[110px]' },
    { key: 'title', label: '제목', className: 'w-[32%] min-w-[260px]' },
    { key: 'writer', label: '작성자', className: 'w-[180px] min-w-[180px]' },
    { key: 'status', label: '상태', className: 'w-[90px] min-w-[90px]' },
    { key: 'date', label: '접수일', className: 'w-[130px] min-w-[130px]' },
    { key: 'actions', label: '관리', className: 'w-[100px] min-w-[100px] text-right' },
  ];

  const rows: AdminDataTableRow[] = items.map((item) => ({
    id: item.id,
    cells: {
      category: (
        <span className="whitespace-nowrap text-xs font-medium text-[#52525B]">
          {categoryLabel(item.category)}
        </span>
      ),
      title: (
        <div className="min-w-0">
          <p className="truncate font-semibold text-[#27272A]">{item.title}</p>
          <p className="mt-1 line-clamp-1 text-xs text-[#A1A1AA]">
            {item.content}
          </p>
        </div>
      ),
      writer: (
        <div className="text-xs leading-5 text-[#71717A]">
          <p className="font-medium text-[#52525B]">{item.name}</p>
          <p>{item.phone}</p>
        </div>
      ),
      status: (
        <span className="inline-flex whitespace-nowrap rounded-full bg-[#F4F4F5] px-2 py-1 text-[11px] font-medium text-[#52525B]">
          {statusLabel(item.status)}
        </span>
      ),
      date: (
        <time className="whitespace-nowrap text-xs text-[#71717A]">
          {new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(item.createdAt)}
        </time>
      ),
      actions: (
        <div className="flex justify-end">
          <Link
            href={`/admin/customer-voice/${item.id}`}
            className="inline-flex h-9 min-w-[76px] items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#E4E4E7] bg-white px-3 text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5]"
          >
            <Eye className="size-3.5" />
            보기
          </Link>
        </div>
      ),
    },
  }));

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium text-[#A1A1AA]">소통공간</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
          고객의 소리
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#71717A]">
          홈페이지에서 접수된 칭찬/감사, 건의사항, 불만/고충 내역을 확인합니다.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ['', '전체 분류'],
          ['praise', '칭찬/감사'],
          ['suggestion', '건의사항'],
          ['complaint', '불만/고충'],
        ].map(([value, label]) => (
          <Link
            key={value || 'all'}
            href={
              value
                ? `/admin/customer-voice?category=${value}`
                : '/admin/customer-voice'
            }
            className={`rounded-full border px-4 py-2 text-xs font-medium ${
              (category ?? '') === value
                ? 'border-[#18181B] bg-[#18181B] text-white'
                : 'border-[#E4E4E7] bg-white text-[#71717A]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <AdminDataTable
        columns={columns}
        rows={rows}
        basePath="/admin/customer-voice"
        query={query}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        searchPlaceholder="제목, 내용, 작성자, 연락처 검색"
        extraParams={{ category, status }}
      />
    </section>
  );
}
