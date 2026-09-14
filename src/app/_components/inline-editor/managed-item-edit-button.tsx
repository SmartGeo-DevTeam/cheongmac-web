'use client';

import {
  getInlineManagedItem,
  saveInlineManagedItem,
  type InlineManagedField,
  type InlineManagedFieldValue,
  type InlineManagedItemPayload,
} from '@/app/_actions/inline-managed-item';
import { useInlineEditMode } from '@/app/_providers/inline-edit-provider';
import { managedItemAdminHref } from '@/_lib/admin-edit-links';
import { cn } from '@/_lib/utils';
import { Button } from '@/_shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_shadcn/ui/dialog';
import { Input } from '@/_shadcn/ui/input';
import { Textarea } from '@/_shadcn/ui/textarea';
import {
  ExternalLink,
  ListTree,
  Save,
  Settings2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useMemo,
  useState,
  useTransition,
} from 'react';

function initialValues(item: InlineManagedItemPayload) {
  return Object.fromEntries(
    item.fields.map((field) => [field.key, field.value]),
  ) as Record<string, InlineManagedFieldValue>;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: InlineManagedField;
  value: InlineManagedFieldValue;
  onChange: (value: InlineManagedFieldValue) => void;
}) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 rounded-lg border border-[#E4E4E7] px-3 py-3 text-sm text-[#3F3F46]">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-[#18181B]"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[#27272A]">
          {field.label}
        </span>
        <select
          value={String(value)}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#A1A1AA]"
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {field.description ? (
          <p className="text-xs leading-5 text-[#71717A]">
            {field.description}
          </p>
        ) : null}
      </label>
    );
  }

  const multiline =
    field.type === 'textarea' || field.type === 'lines';

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[#27272A]">
        {field.label}
      </span>
      {multiline ? (
        <Textarea
          value={String(value)}
          required={field.required}
          rows={field.type === 'lines' ? 6 : 5}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
        />
      ) : (
        <Input
          type={
            field.type === 'number'
              ? 'number'
              : field.type === 'date'
                ? 'date'
                : field.type === 'url'
                  ? 'url'
                  : 'text'
          }
          value={String(value)}
          required={field.required}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
        />
      )}
      {field.description ? (
        <p className="text-xs leading-5 text-[#71717A]">
          {field.description}
        </p>
      ) : null}
    </label>
  );
}

export default function ManagedItemEditButton({
  pageKey,
  itemKey,
  label,
  focus,
  className,
}: {
  pageKey: string;
  itemKey: string;
  label: string;
  focus?: string;
  className?: string;
}) {
  const router = useRouter();
  const { canEdit, editMode } = useInlineEditMode();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<InlineManagedItemPayload | null>(null);
  const [values, setValues] = useState<Record<string, InlineManagedFieldValue>>({});
  const [sortOrder, setSortOrder] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const detailedHref = useMemo(
    () => managedItemAdminHref(pageKey, itemKey, focus),
    [focus, itemKey, pageKey],
  );

  if (!canEdit || !editMode) return null;

  const openEditor = () => {
    setOpen(true);
    setMessage('');
    setItem(null);

    startTransition(async () => {
      const result = await getInlineManagedItem(pageKey, itemKey);

      if (!result.ok || !result.item) {
        setMessage(result.error ?? '항목 정보를 불러오지 못했습니다.');
        return;
      }

      setItem(result.item);
      setValues(initialValues(result.item));
      setSortOrder(result.item.sortOrder);
      setIsVisible(result.item.isVisible);
    });
  };

  const save = () => {
    if (!item) return;

    setMessage('');

    startTransition(async () => {
      const result = await saveInlineManagedItem({
        pageKey,
        itemKey,
        values,
        sortOrder,
        isVisible,
      });

      if (!result.ok) {
        setMessage(result.error ?? '항목을 저장하지 못했습니다.');
        return;
      }

      setMessage(result.success ?? '저장했습니다.');
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          openEditor();
        }}
        className={cn(
          'absolute right-2 top-2 z-[70] inline-flex size-9 items-center justify-center rounded-full border border-cm-orange/25 bg-white text-cm-orange shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition hover:bg-[#FFF6EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cm-orange/40',
          className,
        )}
        aria-label={`${label} 수정`}
        title={`${label} 수정`}
      >
        <Settings2 className="size-4.5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{label} 빠른 수정</DialogTitle>
            <DialogDescription>
              제목·설명·날짜·분류처럼 직관적인 항목은 여기서 바로 수정합니다.
              이미지, JSON, 삭제처럼 상세한 작업만 관리자 화면을 이용합니다.
            </DialogDescription>
          </DialogHeader>

          {item ? (
            <>
              <div className="space-y-5">
                {item.fields.map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={values[field.key] ?? ''}
                    onChange={(value) =>
                      setValues((current) => ({
                        ...current,
                        [field.key]: value,
                      }))
                    }
                  />
                ))}

                <div className="grid gap-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-[#27272A]">
                      노출 순서
                    </span>
                    <Input
                      type="number"
                      min={0}
                      value={sortOrder}
                      onChange={(event) =>
                        setSortOrder(Number(event.target.value) || 0)
                      }
                    />
                  </label>

                  <label className="flex items-center gap-2 self-end rounded-md border border-[#E4E4E7] bg-white px-3 py-2.5 text-sm font-medium text-[#3F3F46]">
                    <input
                      type="checkbox"
                      checked={isVisible}
                      onChange={(event) => setIsVisible(event.target.checked)}
                      className="size-4 accent-[#18181B]"
                    />
                    사용자 페이지에 노출
                  </label>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-[#DCE9E5] bg-[#F4FAF8] p-4">
                <div>
                  <div className="text-sm font-semibold text-[#285E51]">
                    상세 관리
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#5F756F]">
                    {item.detailedFieldCount > 0
                      ? `이미지·복합 데이터 등 ${item.detailedFieldCount}개 항목은 상세 관리자에서 수정합니다.`
                      : '삭제나 관리용 ID 변경 확인 등은 상세 관리자에서 진행합니다.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/pages/${encodeURIComponent(pageKey)}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#BFD8D1] bg-white px-3 py-2 text-sm font-semibold text-[#285E51] transition hover:bg-[#EDF7F4]"
                  >
                    <ListTree className="size-4" />
                    {item.pageLabel} 전체 관리
                  </Link>

                  <Link
                    href={detailedHref}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#285E51] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#214F45]"
                  >
                    관리자에서 상세 수정
                    <ExternalLink className="size-4" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid min-h-40 place-items-center rounded-xl bg-[#F7F7F8] text-sm text-[#71717A]">
              {isPending ? '항목을 불러오는 중입니다.' : '항목 정보를 불러오지 못했습니다.'}
            </div>
          )}

          {message ? (
            <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm leading-6 text-[#52525B]">
              {message}
            </div>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              disabled={isPending || !item}
              onClick={save}
            >
              <Save className="size-4" />
              {isPending ? '처리 중...' : '저장'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
