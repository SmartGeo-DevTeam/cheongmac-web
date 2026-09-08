'use client';

import {
  searchMembersForRole,
  updateMemberRole,
  type MemberRoleSearchResult,
} from '@/app/admin/_actions/member-role';
import { Button } from '@/_shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shadcn/ui/dialog';
import { Input } from '@/_shadcn/ui/input';
import { Search, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type AssignableAdminRole = 'EDITOR' | 'ADMIN';

const ROLE_LABELS: Record<AssignableAdminRole, string> = {
  EDITOR: '콘텐츠 관리자',
  ADMIN: '전체 관리자',
};

export default function AddAdminDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MemberRoleSearchResult[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [role, setRole] = useState<AssignableAdminRole>('EDITOR');
  const [message, setMessage] = useState('');
  const [isSearching, startSearchTransition] = useTransition();
  const [isSaving, startSaveTransition] = useTransition();

  const reset = () => {
    setQuery('');
    setResults([]);
    setSelectedUserId('');
    setRole('EDITOR');
    setMessage('');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  };

  const handleSearch = () => {
    setMessage('');
    setSelectedUserId('');

    startSearchTransition(async () => {
      const result = await searchMembersForRole(query);

      if (!result.ok) {
        setResults([]);
        setMessage(result.error ?? '회원 검색에 실패했습니다.');
        return;
      }

      setResults(result.users);

      if (!result.users.length) {
        setMessage('해당 이메일로 찾을 수 있는 일반 회원이 없습니다.');
      }
    });
  };

  const selectedUser = results.find((user) => user.id === selectedUserId);

  const handleAdd = () => {
    if (!selectedUser) {
      setMessage('권한을 줄 회원을 먼저 선택해주세요.');
      return;
    }

    setMessage('');
    startSaveTransition(async () => {
      const result = await updateMemberRole({
        userId: selectedUser.id,
        role,
      });

      if (!result.ok) {
        setMessage(result.error ?? '관리자 추가에 실패했습니다.');
        return;
      }

      setOpen(false);
      reset();
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="size-4" />
          관리자 추가
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>관리자 추가</DialogTitle>
          <DialogDescription>
            가입을 완료한 일반 회원을 이메일로 찾은 뒤 필요한 권한을 선택해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#3F3F46]">
              회원 이메일 검색
            </label>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#A1A1AA]" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSearch();
                    }
                  }}
                  placeholder="example@naver.com"
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                onClick={handleSearch}
                disabled={isSearching || query.trim().length < 3}
              >
                {isSearching ? '검색 중' : '검색'}
              </Button>
            </div>
          </div>

          {results.length ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#3F3F46]">검색 결과</p>
              <div className="max-h-56 space-y-2 overflow-y-auto">
                {results.map((user) => {
                  const selected = selectedUserId === user.id;

                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setMessage('');
                      }}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                        selected
                          ? 'border-[#18181B] bg-[#FAFAFA]'
                          : 'border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#27272A]">{user.name}</p>
                      <p className="mt-1 text-xs text-[#71717A]">{user.email}</p>
                      {user.phone ? (
                        <p className="mt-1 text-xs text-[#A1A1AA]">{user.phone}</p>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#3F3F46]">
              부여할 권한
            </label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as AssignableAdminRole)}
              className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#27272A]"
            >
              <option value="EDITOR">콘텐츠 관리자</option>
              <option value="ADMIN">전체 관리자</option>
            </select>
            <p className="mt-2 text-xs leading-5 text-[#A1A1AA]">
              최고 관리자 권한은 이 화면에서 추가할 수 없습니다.
            </p>
          </div>

          {selectedUser ? (
            <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm text-[#52525B]">
              <strong className="font-semibold text-[#27272A]">{selectedUser.name}</strong> 회원에게{' '}
              <strong className="font-semibold text-[#27272A]">{ROLE_LABELS[role]}</strong> 권한을 부여합니다.
            </div>
          ) : null}

          {message ? (
            <p className="rounded-md bg-[#F8F8F8] px-3 py-2 text-sm text-[#71717A]">
              {message}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
            취소
          </Button>
          <Button onClick={handleAdd} disabled={!selectedUser || isSaving}>
            {isSaving ? '추가 중' : '관리자 추가'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
