'use client';

import {
  resetInlineContentBlock,
  saveInlineContentBlock,
  uploadInlineContentImage,
} from '@/app/_actions/inline-content';
import type {
  InlineContentData,
  InlineContentField,
} from '@/_lib/inline-content-shared';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import { Textarea } from '@/_shadcn/ui/textarea';
import {
  ExternalLink,
  ImagePlus,
  RotateCcw,
  Save,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';

type Entry = {
  path: string;
  label: string;
  fields: readonly InlineContentField[];
  data: InlineContentData;
  persisted: boolean;
};

function clone(value: InlineContentData) {
  return { ...value };
}

export default function PageCopyAdminClient({
  entries,
  initialPath,
}: {
  entries: Entry[];
  initialPath: string;
}) {
  const [selectedPath, setSelectedPath] = useState(initialPath);
  const selected = useMemo(
    () => entries.find((entry) => entry.path === selectedPath) ?? entries[0],
    [entries, selectedPath],
  );
  const [draftByPath, setDraftByPath] = useState<Record<string, InlineContentData>>(
    Object.fromEntries(entries.map((entry) => [entry.path, clone(entry.data)])),
  );
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  if (!selected) {
    return (
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-6 text-sm text-[#71717A]">
        관리할 페이지 설정이 없습니다.
      </div>
    );
  }

  const draft = draftByPath[selected.path] ?? clone(selected.data);
  const orderedFields = [
    ...selected.fields.filter((field) => field.type !== 'image'),
    ...selected.fields.filter((field) => field.type === 'image'),
  ];

  const setValue = (key: string, value: string) => {
    setMessage('');
    setDraftByPath((current) => ({
      ...current,
      [selected.path]: {
        ...(current[selected.path] ?? selected.data),
        [key]: value,
      },
    }));
  };

  const save = () => {
    setMessage('');

    startTransition(async () => {
      const result = await saveInlineContentBlock({
        pageKey: 'page-copy',
        sectionKey: selected.path,
        label: selected.label,
        publicPath: selected.path,
        data: draft,
      });

      setMessage(
        result.ok
          ? result.success ?? '저장했습니다.'
          : result.error ?? '저장하지 못했습니다.',
      );
    });
  };

  const reset = () => {
    if (!window.confirm('이 페이지의 DB 수정값을 기본값으로 되돌릴까요?')) {
      return;
    }

    setMessage('');

    startTransition(async () => {
      const result = await resetInlineContentBlock({
        pageKey: 'page-copy',
        sectionKey: selected.path,
        label: selected.label,
        publicPath: selected.path,
      });

      setMessage(
        result.ok
          ? '기본값으로 되돌렸습니다. 화면 새로고침 후 기본값을 확인할 수 있습니다.'
          : result.error ?? '초기화하지 못했습니다.',
      );
    });
  };

  const uploadImage = (field: InlineContentField, file: File) => {
    setMessage('');

    startTransition(async () => {
      const formData = new FormData();
      formData.set('file', file);

      const result = await uploadInlineContentImage(
        {
          pageKey: 'page-copy',
          sectionKey: selected.path,
          fieldKey: field.key,
        },
        formData,
      );

      if (!result.ok || !result.url) {
        setMessage(result.error ?? '이미지를 업로드하지 못했습니다.');
        return;
      }

      setValue(field.key, result.url);
      setMessage('이미지를 업로드했습니다. 저장 버튼을 눌러 반영해주세요.');
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit rounded-xl border border-[#E4E4E7] bg-white p-3">
        <div className="px-2 pb-2 text-xs font-semibold text-[#71717A]">
          페이지 선택
        </div>
        <div className="space-y-1">
          {entries.map((entry) => (
            <button
              key={entry.path}
              type="button"
              onClick={() => {
                setSelectedPath(entry.path);
                setMessage('');
              }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                entry.path === selected.path
                  ? 'bg-[#18181B] font-semibold text-white'
                  : 'text-[#52525B] hover:bg-[#F4F4F5]'
              }`}
            >
              <span className="block">{entry.label}</span>
              <span
                className={`mt-0.5 block truncate text-[11px] ${
                  entry.path === selected.path
                    ? 'text-white/60'
                    : 'text-[#A1A1AA]'
                }`}
              >
                {entry.path}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-5">
        <div className="flex flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#18181B]">
              {selected.label}
            </h2>
            <p className="mt-1 text-xs text-[#71717A]">
              {selected.path}
            </p>
          </div>

          <Link
            href={selected.path}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cm-green"
          >
            사용자 화면 열기
            <ExternalLink className="size-4" />
          </Link>
        </div>

        <div className="space-y-5 rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          {orderedFields.map((field) => {
            const value = draft[field.key] ?? '';

            return (
              <div key={field.key} className="space-y-2">
                <div>
                  <label
                    htmlFor={`page-copy-${field.key}`}
                    className="text-sm font-semibold text-[#27272A]"
                  >
                    {field.label}
                  </label>
                  {field.description ? (
                    <p className="mt-1 text-xs leading-5 text-[#71717A]">
                      {field.description}
                    </p>
                  ) : null}
                </div>

                {field.type === 'textarea' || field.type === 'editor' ? (
                  <Textarea
                    id={`page-copy-${field.key}`}
                    value={value}
                    rows={field.rows ?? (field.type === 'editor' ? 10 : 5)}
                    onChange={(event) =>
                      setValue(field.key, event.target.value)
                    }
                  />
                ) : field.type === 'image' ? (
                  <div className="space-y-3">
                    {value ? (
                      <div
                        className="h-44 rounded-lg border border-[#E4E4E7] bg-[#F7F7F8] bg-contain bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url("${value.replaceAll('"', '%22')}")`,
                        }}
                      />
                    ) : (
                      <div className="grid h-36 place-items-center rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA] text-[#A1A1AA]">
                        <ImagePlus className="size-6" />
                      </div>
                    )}

                    <Input
                      id={`page-copy-${field.key}`}
                      value={value}
                      onChange={(event) =>
                        setValue(field.key, event.target.value)
                      }
                    />

                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 py-2 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]">
                      <UploadCloud className="size-4" />
                      이미지 업로드
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                        className="sr-only"
                        disabled={isPending}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) uploadImage(field, file);
                          event.currentTarget.value = '';
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <Input
                    id={`page-copy-${field.key}`}
                    type={field.type === 'url' ? 'url' : 'text'}
                    value={value}
                    onChange={(event) =>
                      setValue(field.key, event.target.value)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        {message ? (
          <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm leading-6 text-[#52525B]">
            {message}
          </div>
        ) : null}

        <div className="flex flex-wrap justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            disabled={isPending}
          >
            <RotateCcw className="size-4" />
            기본값으로
          </Button>

          <Button type="button" onClick={save} disabled={isPending}>
            <Save className="size-4" />
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}
