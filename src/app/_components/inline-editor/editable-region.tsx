'use client';

import {
  resetInlineContentBlock,
  saveInlineContentBlock,
  uploadInlineContentImage,
} from '@/app/_actions/inline-content';
import { useInlineEditMode } from '@/app/_providers/inline-edit-provider';
import type {
  InlineContentData,
  InlineContentField,
} from '@/_lib/inline-content-shared';
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
  ImagePlus,
  RotateCcw,
  Save,
  Settings2,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from 'react';

function cloneData(value: InlineContentData) {
  return { ...value };
}

export default function EditableRegion({
  pageKey,
  sectionKey,
  label,
  publicPath,
  fields = [],
  data = {},
  persisted = false,
  adminHref,
  adminLabel = '관리자에서 상세 수정',
  adminDescription,
  secondaryAdminHref,
  secondaryAdminLabel = '정적 문구·링크 관리자',
  secondaryAdminDescription,
  allowReset = true,
  className,
  children,
}: {
  pageKey: string;
  sectionKey: string;
  label: string;
  publicPath: string;
  fields?: readonly InlineContentField[];
  data?: InlineContentData;
  persisted?: boolean;
  adminHref?: string;
  adminLabel?: string;
  adminDescription?: string;
  secondaryAdminHref?: string;
  secondaryAdminLabel?: string;
  secondaryAdminDescription?: string;
  allowReset?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { canEdit, editMode } = useInlineEditMode();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(() => cloneData(data));
  const [draft, setDraft] = useState(() => cloneData(data));
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSaved(cloneData(data));
    setDraft(cloneData(data));
  }, [data]);

  const hasInlineFields = fields.length > 0;
  const isDirty = useMemo(
    () => JSON.stringify(saved) !== JSON.stringify(draft),
    [draft, saved],
  );

  const orderedFields = useMemo(
    () => [
      ...fields.filter((field) => field.type !== 'image'),
      ...fields.filter((field) => field.type === 'image'),
    ],
    [fields],
  );

  const setValue = (key: string, value: string) => {
    setMessage('');
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const save = () => {
    if (!hasInlineFields) return;

    setMessage('');

    startTransition(async () => {
      const result = await saveInlineContentBlock({
        pageKey,
        sectionKey,
        label,
        publicPath,
        data: draft,
      });

      if (!result.ok) {
        setMessage(
          result.error ?? '콘텐츠를 저장하지 못했습니다.',
        );
        return;
      }

      setSaved(cloneData(draft));
      setMessage(result.success ?? '저장했습니다.');
      setOpen(false);
      router.refresh();
    });
  };

  const reset = () => {
    if (!hasInlineFields || !allowReset) return;

    if (
      !window.confirm(
        '이 영역을 코드에 정의된 기본 콘텐츠로 되돌릴까요?',
      )
    ) {
      return;
    }

    setMessage('');

    startTransition(async () => {
      const result = await resetInlineContentBlock({
        pageKey,
        sectionKey,
        label,
        publicPath,
      });

      if (!result.ok) {
        setMessage(
          result.error ?? '기본 콘텐츠로 되돌리지 못했습니다.',
        );
        return;
      }

      setOpen(false);
      router.refresh();
    });
  };

  const uploadImage = (
    field: InlineContentField,
    file: File,
  ) => {
    setMessage('');

    startTransition(async () => {
      const formData = new FormData();
      formData.set('file', file);

      const result = await uploadInlineContentImage(
        {
          pageKey,
          sectionKey,
          fieldKey: field.key,
        },
        formData,
      );

      if (!result.ok || !result.url) {
        setMessage(
          result.error ?? '이미지를 업로드하지 못했습니다.',
        );
        return;
      }

      setValue(field.key, result.url);
      setMessage(result.success ?? '이미지를 업로드했습니다.');
    });
  };

  const showEditor = canEdit && editMode;
  const showControl =
    showEditor && (hasInlineFields || Boolean(adminHref));

  const editControlClassName =
    'absolute right-3 top-3 z-[65] hidden size-9 items-center justify-center rounded-full border border-cm-orange/25 bg-white text-cm-orange shadow-[0_5px_18px_rgba(0,0,0,0.14)] transition hover:bg-[#FFF6EF] group-hover/cms:flex focus-visible:flex';

  return (
    <div
      className={cn(
        'relative',
        showControl &&
          'group/cms outline outline-1 outline-dashed outline-transparent hover:outline-cm-orange/60',
        className,
      )}
      data-cm-editable={showControl ? 'true' : undefined}
      data-cm-page-key={showControl ? pageKey : undefined}
      data-cm-section-key={showControl ? sectionKey : undefined}
      data-cm-edit-kind={
        showControl
          ? hasInlineFields
            ? adminHref
              ? 'hybrid'
              : 'inline'
            : 'admin'
          : undefined
      }
    >
      {children}

      {showControl ? (
        hasInlineFields ? (
          <button
            type="button"
            onClick={() => {
              setDraft(cloneData(saved));
              setMessage('');
              setOpen(true);
            }}
            className={editControlClassName}
            aria-label={`${label} 수정`}
            title={`${label} 수정`}
          >
            <Settings2 className="size-4.5" />
          </button>
        ) : adminHref ? (
          <Link
            href={adminHref}
            className={editControlClassName}
            aria-label={`${label} 관리자에서 수정`}
            title={`${label} 관리자에서 수정`}
          >
            <Settings2 className="size-4.5" />
          </Link>
        ) : null
      ) : null}

      {hasInlineFields ? (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            if (isPending) return;

            if (!next && isDirty) {
              const confirmed = window.confirm(
                '저장하지 않은 변경사항이 있습니다. 닫을까요?',
              );

              if (!confirmed) return;
            }

            setOpen(next);
          }}
        >
          <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{label} 수정</DialogTitle>
              <DialogDescription>
                문구는 한 글자 단위까지 자유롭게 수정할 수 있습니다.
                저장하면 DB에 기록되고 현재 페이지에 바로 반영됩니다.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {orderedFields.map((field) => {
                const value = draft[field.key] ?? '';

                return (
                  <label
                    key={field.key}
                    className="block space-y-2"
                  >
                    <div>
                      <span className="text-sm font-semibold text-[#27272A]">
                        {field.label}
                      </span>
                      {field.description ? (
                        <p className="mt-1 text-xs leading-5 text-[#71717A]">
                          {field.description}
                        </p>
                      ) : null}
                    </div>

                    {field.type === 'textarea' ||
                    field.type === 'editor' ? (
                      <Textarea
                        value={value}
                        required={field.required}
                        rows={
                          field.rows ??
                          (field.type === 'editor' ? 5 : 4)
                        }
                        onChange={(event) =>
                          setValue(field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                        className={cn(
                          field.type === 'editor' &&
                            'min-h-[96px] max-h-[240px] leading-7',
                        )}
                      />
                    ) : field.type === 'image' ? (
                      <div className="space-y-3">
                        {value ? (
                          <div
                            className="h-40 w-full rounded-lg border border-[#E4E4E7] bg-[#F7F7F8] bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url("${value.replaceAll(
                                '"',
                                '%22',
                              )}")`,
                            }}
                            aria-label={`${field.label} 미리보기`}
                          />
                        ) : (
                          <div className="grid h-32 place-items-center rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA] text-[#A1A1AA]">
                            <ImagePlus className="size-6" />
                          </div>
                        )}

                        <Input
                          value={value}
                          onChange={(event) =>
                            setValue(
                              field.key,
                              event.target.value,
                            )
                          }
                          placeholder={
                            field.placeholder ??
                            '이미지 URL 또는 /assets/...'
                          }
                        />

                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 py-2 text-sm font-medium text-[#52525B] transition hover:bg-[#F4F4F5]">
                          <UploadCloud className="size-4" />
                          이미지 업로드
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                            className="sr-only"
                            disabled={isPending}
                            onChange={(event) => {
                              const file =
                                event.target.files?.[0];

                              if (file) {
                                uploadImage(field, file);
                              }

                              event.currentTarget.value = '';
                            }}
                          />
                        </label>
                      </div>
                    ) : (
                      <Input
                        type={
                          field.type === 'url' ? 'url' : 'text'
                        }
                        value={value}
                        required={field.required}
                        onChange={(event) =>
                          setValue(field.key, event.target.value)
                        }
                        placeholder={field.placeholder}
                      />
                    )}
                  </label>
                );
              })}
            </div>

            {adminHref ? (
              <div className="rounded-xl border border-[#DCE9E5] bg-[#F4FAF8] p-4">
                <div className="text-sm font-semibold text-[#285E51]">
                  연결 데이터 상세 관리
                </div>
                <p className="mt-1 text-xs leading-5 text-[#5F756F]">
                  {adminDescription ??
                    '목록 추가·삭제·정렬·관계 연결처럼 복잡한 데이터는 관리자 화면에서 수정합니다.'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={adminHref}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#285E51] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#214F45]"
                  >
                    {adminLabel}
                    <ExternalLink className="size-4" />
                  </Link>

                  {secondaryAdminHref ? (
                    <Link
                      href={secondaryAdminHref}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#BFD8D1] bg-white px-3 py-2 text-sm font-semibold text-[#285E51] transition hover:bg-[#EDF7F4]"
                    >
                      {secondaryAdminLabel}
                      <ExternalLink className="size-4" />
                    </Link>
                  ) : null}
                </div>

                {secondaryAdminDescription ? (
                  <p className="mt-2 text-xs leading-5 text-[#5F756F]">
                    {secondaryAdminDescription}
                  </p>
                ) : null}
              </div>
            ) : null}

            {message ? (
              <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm leading-6 text-[#52525B]">
                {message}
              </div>
            ) : null}

            <DialogFooter className="sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={reset}
                disabled={isPending || !persisted || !allowReset}
                title={
                  !allowReset
                    ? '부분 영역에서는 전체 페이지 초기화를 지원하지 않습니다. 정적 문구 관리자에서 초기화해주세요.'
                    : persisted
                      ? 'DB 수정값을 삭제하고 코드 기본값으로 되돌립니다.'
                      : '현재 기본 콘텐츠를 사용 중입니다.'
                }
              >
                <RotateCcw className="size-4" />
                기본값으로
              </Button>

              <div className="flex justify-end gap-2">
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
                  disabled={isPending || !isDirty}
                  onClick={save}
                >
                  <Save className="size-4" />
                  {isPending ? '저장 중...' : '저장'}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
