'use client';

import {
  createNavigationItem,
  moveNavigationItem,
  updateNavigationItem,
} from '@/app/admin/_actions/navigation-menu';
import { Badge } from '@/_shadcn/ui/badge';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import {
  ArrowDown,
  ArrowUp,
  CornerDownRight,
  ExternalLink,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

export type NavigationAdminItem = {
  id: string;
  parentId: string | null;
  title: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
  children: NavigationAdminItem[];
};

type Props = {
  initialItems: NavigationAdminItem[];
};

function MenuEditorRow({
  item,
  index,
  count,
  depth,
}: {
  item: NavigationAdminItem;
  index: number;
  count: number;
  depth: 0 | 1;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [href, setHref] = useState(item.href);
  const [isVisible, setIsVisible] = useState(item.isVisible);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTitle(item.title);
    setHref(item.href);
    setIsVisible(item.isVisible);
  }, [item.href, item.isVisible, item.title]);

  const save = () => {
    setMessage('');

    startTransition(async () => {
      const result = await updateNavigationItem({
        id: item.id,
        title,
        href,
        isVisible,
      });

      if (!result.ok) {
        setMessage(result.error ?? '저장하지 못했습니다.');
        return;
      }

      setMessage('저장했습니다.');
      router.refresh();
    });
  };

  const move = (direction: 'UP' | 'DOWN') => {
    setMessage('');

    startTransition(async () => {
      const result = await moveNavigationItem({ id: item.id, direction });

      if (!result.ok) {
        setMessage(result.error ?? '순서를 바꾸지 못했습니다.');
        return;
      }

      router.refresh();
    });
  };

  return (
    <div
      className={
        depth === 0
          ? 'rounded-xl border border-[#E4E4E7] bg-white p-4'
          : 'rounded-lg border border-[#ECECEF] bg-[#FAFAFA] p-3'
      }
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {depth === 1 ? (
            <CornerDownRight className="size-4 shrink-0 text-[#A1A1AA]" />
          ) : null}
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label={`${item.title} 메뉴 이름`}
            className="min-w-0 xl:max-w-[220px]"
          />
          {!isVisible ? (
            <Badge variant="secondary" className="shrink-0">
              숨김
            </Badge>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Input
            value={href}
            onChange={(event) => setHref(event.target.value)}
            aria-label={`${item.title} 연결 주소`}
            className="min-w-0"
          />
          <Link
            href={href || '/'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-[#71717A] hover:bg-[#F4F4F5]"
            aria-label="연결 주소 새 창에서 보기"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex h-10 items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 text-sm text-[#52525B]">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(event) => setIsVisible(event.target.checked)}
              className="size-4 accent-[#18181B]"
            />
            홈페이지에 보이기
          </label>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-10"
              disabled={isPending || index === 0}
              onClick={() => move('UP')}
              aria-label={`${item.title} 위로 이동`}
            >
              <ArrowUp className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10"
              disabled={isPending || index === count - 1}
              onClick={() => move('DOWN')}
              aria-label={`${item.title} 아래로 이동`}
            >
              <ArrowDown className="size-4" />
            </Button>
          </div>

          <Button disabled={isPending} onClick={save}>
            {isPending ? '처리 중...' : '저장'}
          </Button>
        </div>
      </div>

      {message ? (
        <p
          className={`mt-2 text-xs ${
            message === '저장했습니다.' ? 'text-[#15803D]' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

export default function NavigationManager({ initialItems }: Props) {
  const router = useRouter();
  const [parentId, setParentId] = useState('ROOT');
  const [title, setTitle] = useState('');
  const [href, setHref] = useState('');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const parents = useMemo(
    () => initialItems.filter((item) => item.parentId === null),
    [initialItems],
  );

  const addMenu = () => {
    setMessage('');

    startTransition(async () => {
      const result = await createNavigationItem({
        parentId: parentId === 'ROOT' ? null : parentId,
        title,
        href,
      });

      if (!result.ok) {
        setMessage(result.error ?? '메뉴를 추가하지 못했습니다.');
        return;
      }

      setTitle('');
      setHref('');
      setMessage('메뉴를 추가했습니다.');
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-dashed border-[#D4D4D8] bg-[#FAFAFA] p-4">
        <div className="flex items-center gap-2">
          <Plus className="size-4 text-[#52525B]" />
          <h2 className="text-sm font-semibold text-[#27272A]">메뉴 추가</h2>
        </div>
        <p className="mt-1 text-xs leading-5 text-[#71717A]">
          상위 메뉴를 새로 만들거나, 기존 상위 메뉴 아래에 하위 메뉴를 추가할 수 있습니다.
        </p>

        <div className="mt-4 grid gap-2 xl:grid-cols-[220px_minmax(180px,240px)_minmax(260px,1fr)_auto]">
          <select
            value={parentId}
            onChange={(event) => setParentId(event.target.value)}
            className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#3F3F46]"
            aria-label="메뉴 위치"
          >
            <option value="ROOT">상위 메뉴로 추가</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.title} 아래에 추가
              </option>
            ))}
          </select>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="메뉴 이름"
          />
          <Input
            value={href}
            onChange={(event) => setHref(event.target.value)}
            placeholder="연결 주소 예: /community/notice"
          />
          <Button disabled={isPending} onClick={addMenu}>
            {isPending ? '추가 중...' : '추가'}
          </Button>
        </div>

        {message ? (
          <p
            className={`mt-2 text-xs ${
              message === '메뉴를 추가했습니다.' ? 'text-[#15803D]' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>

      <div className="space-y-4">
        {initialItems.length ? (
          initialItems.map((item, index) => (
            <div key={item.id} className="space-y-2">
              <MenuEditorRow
                item={item}
                index={index}
                count={initialItems.length}
                depth={0}
              />

              {item.children.length ? (
                <div className="ml-4 space-y-2 border-l border-[#E4E4E7] pl-4 md:ml-8 md:pl-5">
                  {item.children.map((child, childIndex) => (
                    <MenuEditorRow
                      key={child.id}
                      item={child}
                      index={childIndex}
                      count={item.children.length}
                      depth={1}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-[#E4E4E7] py-12 text-center text-sm text-[#A1A1AA]">
            등록된 메뉴가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
