'use client';

import { updateMemberRole } from '@/app/admin/_actions/member-role';
import AddAdminDialog from '@/app/admin/_components/add-admin-dialog';
import { Badge } from '@/_shadcn/ui/badge';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shadcn/ui/table';
import { ROLE_LABELS, normalizeRole, type UserRole } from '@/_lib/roles';
import {
  type ColumnDef,
  type FilterFn,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

export type AdminMemberRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  membershipStatus: string;
  providers: string[];
  createdAt: string;
};

type Props = {
  data: AdminMemberRow[];
  mode: 'members' | 'roles';
  currentUserId?: string;
  canManageRoles?: boolean;
  emptyMessage?: string;
};

const PROVIDER_LABELS: Record<string, string> = {
  google: 'Google',
  naver: '네이버',
  kakao: '카카오',
};

const assignableRoles: UserRole[] = ['MEMBER', 'EDITOR', 'ADMIN'];

function formatPhoneNumber(value: string | null) {
  if (!value) return '-';

  const digits = value.replace(/\D/g, '');

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return value;
}

function providerBadgeClass(provider: string) {
  if (provider === 'kakao') {
    return 'border-transparent bg-[#f6de05] text-[#191919]';
  }

  if (provider === 'naver') {
    return 'border-transparent bg-[#02c158] text-white';
  }

  if (provider === 'google') {
    return 'border-transparent bg-[#4285F4] text-white';
  }

  return 'border-[#E4E4E7] bg-white text-[#52525B]';
}

function roleBadgeClass(role: UserRole) {
  if (role === 'SUPER_ADMIN') {
    return 'border-[#F59E0B]/30 bg-[#FFFBEB] text-[#B45309]';
  }

  if (role === 'ADMIN') {
    return 'border-[#7C3AED]/20 bg-[#F5F3FF] text-[#6D28D9]';
  }

  if (role === 'EDITOR') {
    return 'border-[#0F766E]/20 bg-[#F0FDFA] text-[#0F766E]';
  }

  return 'border-[#E4E4E7] bg-white text-[#52525B]';
}

function SortHeader({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 font-medium text-[#71717A]"
    >
      {label}
      <ArrowUpDown className="size-3.5" />
    </button>
  );
}

function RoleControl({
  user,
  currentUserId,
}: {
  user: AdminMemberRow;
  currentUserId: string;
}) {
  const router = useRouter();
  const currentRole = normalizeRole(user.role);
  const [nextRole, setNextRole] = useState<UserRole>(currentRole);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setNextRole(normalizeRole(user.role));
  }, [user.role]);

  if (user.id === currentUserId) {
    return <span className="text-xs text-[#A1A1AA]">내 계정</span>;
  }

  if (currentRole === 'SUPER_ADMIN') {
    return <span className="text-xs text-[#A1A1AA]">변경할 수 없음</span>;
  }

  const handleChange = () => {
    if (nextRole === currentRole) return;

    const confirmed = window.confirm(
      `${user.name}님의 권한을 '${ROLE_LABELS[nextRole]}'(으)로 변경하시겠습니까?`,
    );

    if (!confirmed) return;

    setMessage('');
    startTransition(async () => {
      const result = await updateMemberRole({
        userId: user.id,
        role: nextRole as 'MEMBER' | 'EDITOR' | 'ADMIN',
      });

      if (!result.ok) {
        setMessage(result.error ?? '권한 변경에 실패했습니다.');
        return;
      }

      router.refresh();
    });
  };

  return (
    <div className="flex min-w-[230px] flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <select
          value={nextRole}
          onChange={(event) => setNextRole(event.target.value as UserRole)}
          disabled={isPending}
          className="h-9 min-w-[128px] rounded-md border border-[#D4D4D8] bg-white px-2.5 text-xs text-[#27272A] disabled:opacity-50"
          aria-label={`${user.name} 권한 선택`}
        >
          {assignableRoles.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          disabled={isPending || nextRole === currentRole}
          onClick={handleChange}
        >
          {isPending ? '변경 중' : '적용'}
        </Button>
      </div>
      {message ? <span className="text-[11px] text-red-600">{message}</span> : null}
    </div>
  );
}

export default function MemberDataTable({
  data,
  mode,
  currentUserId = '',
  canManageRoles = false,
  emptyMessage = '조건에 맞는 회원이 없습니다.',
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [providerFilter, setProviderFilter] = useState('ALL');

  const globalSearch: FilterFn<AdminMemberRow> = (row, _columnId, filterValue) => {
    const keyword = String(filterValue ?? '').trim().toLocaleLowerCase('ko-KR');

    if (!keyword) return true;

    const user = row.original;
    const searchable = [
      user.name,
      user.email,
      formatPhoneNumber(user.phone),
      ...(mode === 'roles' ? [ROLE_LABELS[normalizeRole(user.role)]] : []),
      ...(mode === 'members'
        ? user.providers.map((provider) => PROVIDER_LABELS[provider] ?? provider)
        : []),
    ]
      .join(' ')
      .toLocaleLowerCase('ko-KR');

    return searchable.includes(keyword);
  };

  const columns = useMemo<ColumnDef<AdminMemberRow>[]>(() => {
    const sharedColumns: ColumnDef<AdminMemberRow>[] = [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <SortHeader
            label="회원"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          />
        ),
        cell: ({ row }) => (
          <div className="min-w-[180px]">
            <p className="font-medium text-[#27272A]">{row.original.name}</p>
            <p className="mt-1 text-xs text-[#A1A1AA]">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: 'phone',
        header: '휴대전화',
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm">
            {formatPhoneNumber(row.original.phone)}
          </span>
        ),
      },
    ];

    if (mode === 'members') {
      sharedColumns.push({
        id: 'providers',
        accessorFn: (row) => row.providers.join(','),
        header: '가입 방법',
        filterFn: (row, _id, value) =>
          value === 'ALL' || row.original.providers.includes(String(value)),
        cell: ({ row }) => (
          <div className="flex min-w-[120px] flex-wrap gap-1">
            {row.original.providers.length ? (
              row.original.providers.map((provider) => (
                <Badge
                  key={provider}
                  variant="outline"
                  className={providerBadgeClass(provider)}
                >
                  {PROVIDER_LABELS[provider] ?? provider}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-[#A1A1AA]">-</span>
            )}
          </div>
        ),
      });
    }

    if (mode === 'roles') {
      sharedColumns.push({
        accessorKey: 'role',
        header: '현재 권한',
        filterFn: (row, id, value) =>
          value === 'ALL' || normalizeRole(String(row.getValue(id))) === value,
        cell: ({ row }) => {
          const role = normalizeRole(row.original.role);
          return (
            <Badge variant="outline" className={roleBadgeClass(role)}>
              {ROLE_LABELS[role]}
            </Badge>
          );
        },
      });
    }

    sharedColumns.push({
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <SortHeader
          label="가입일"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      ),
      sortingFn: (rowA, rowB, columnId) =>
        new Date(String(rowA.getValue(columnId))).getTime() -
        new Date(String(rowB.getValue(columnId))).getTime(),
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-xs text-[#71717A]">
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(row.original.createdAt))}
        </span>
      ),
    });

    if (mode === 'roles' && canManageRoles) {
      sharedColumns.push({
        id: 'actions',
        header: '권한 변경',
        enableSorting: false,
        cell: ({ row }) => (
          <RoleControl user={row.original} currentUserId={currentUserId} />
        ),
      });
    }

    return sharedColumns;
  }, [canManageRoles, currentUserId, mode]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  const applyRoleFilter = (value: string) => {
    setRoleFilter(value);
    table.getColumn('role')?.setFilterValue(value === 'ALL' ? undefined : value);
    table.setPageIndex(0);
  };

  const applyProviderFilter = (value: string) => {
    setProviderFilter(value);
    table.getColumn('providers')?.setFilterValue(value === 'ALL' ? undefined : value);
    table.setPageIndex(0);
  };

  const pageCount = Math.max(1, table.getPageCount());
  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1AA]" />
          <Input
            value={globalFilter ?? ''}
            onChange={(event) => {
              setGlobalFilter(event.target.value);
              table.setPageIndex(0);
            }}
            placeholder="이름, 이메일, 휴대전화번호 검색"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {mode === 'members' ? (
            <select
              value={providerFilter}
              onChange={(event) => applyProviderFilter(event.target.value)}
              className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#3F3F46]"
              aria-label="가입 방법 선택"
            >
              <option value="ALL">모든 가입 방법</option>
              <option value="google">Google</option>
              <option value="naver">네이버</option>
              <option value="kakao">카카오</option>
            </select>
          ) : null}

          {mode === 'roles' ? (
            <>
              <select
                value={roleFilter}
                onChange={(event) => applyRoleFilter(event.target.value)}
                className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#3F3F46]"
                aria-label="관리자 권한 선택"
              >
                <option value="ALL">모든 권한</option>
                <option value="EDITOR">콘텐츠 관리자</option>
                <option value="ADMIN">전체 관리자</option>
                <option value="SUPER_ADMIN">최고 관리자</option>
              </select>
              {canManageRoles ? <AddAdminDialog /> : null}
            </>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#E4E4E7] bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-[#A1A1AA]"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#71717A]">
          검색 결과{' '}
          <strong className="font-semibold text-[#27272A]">{filteredCount}</strong>명 · 페이지{' '}
          {table.getState().pagination.pageIndex + 1} / {pageCount}
        </p>

        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(event) => {
              table.setPageSize(Number(event.target.value));
              table.setPageIndex(0);
            }}
            className="h-9 rounded-md border border-[#D4D4D8] bg-white px-2.5 text-xs text-[#52525B]"
            aria-label="한 페이지에 표시할 회원 수"
          >
            <option value="10">10명씩</option>
            <option value="20">20명씩</option>
            <option value="50">50명씩</option>
          </select>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="이전 페이지"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="다음 페이지"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
