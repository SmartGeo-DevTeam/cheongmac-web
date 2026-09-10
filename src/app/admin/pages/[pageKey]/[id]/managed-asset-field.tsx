'use client';

import { uploadManagedPageAsset } from '@/app/admin/_actions/managed-pages';
import type { ManagedPageKey } from '@/_lib/page-management-config';
import { ImageUp, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Props = {
  pageKey: ManagedPageKey;
  itemId: string;
  itemType: string;
  fieldKey: string;
  defaultValue: unknown;
  multiline: boolean;
  required?: boolean;
  placeholder?: string;
};

function initialText(value: unknown, multiline: boolean) {
  if (multiline) {
    if (Array.isArray(value)) {
      return value
        .filter((item): item is string => typeof item === 'string')
        .join('\n');
    }
    return typeof value === 'string' ? value : '';
  }

  return typeof value === 'string' ? value : '';
}

export function ManagedAssetField({
  pageKey,
  itemId,
  itemType,
  fieldKey,
  defaultValue,
  multiline,
  required,
  placeholder,
}: Props) {
  const [value, setValue] = useState(() =>
    initialText(defaultValue, multiline),
  );
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    setMessage('');

    try {
      const nextUrls: string[] = [];
      const selected = multiline
        ? Array.from(files)
        : Array.from(files).slice(0, 1);

      for (const file of selected) {
        const formData = new FormData();
        formData.set('file', file);

        const result = await uploadManagedPageAsset(
          pageKey,
          itemId,
          itemType,
          fieldKey,
          formData,
        );

        if (!result.ok || !result.url) {
          throw new Error(
            result.error ?? '이미지를 업로드하지 못했습니다.',
          );
        }

        nextUrls.push(result.url);
      }

      if (multiline) {
        setValue((current) =>
          [current.trim(), ...nextUrls]
            .filter(Boolean)
            .join('\n'),
        );
      } else {
        setValue(nextUrls[0] ?? '');
      }

      setMessage(
        multiline
          ? `${nextUrls.length}개 이미지를 Azure에 업로드했습니다. 저장 버튼을 눌러 확정해주세요.`
          : '새 이미지를 Azure에 업로드했습니다. 저장 버튼을 눌러 확정해주세요.',
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '이미지를 업로드하지 못했습니다.',
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {multiline ? (
        <textarea
          id={`managed-item-${fieldKey}`}
          name={fieldKey}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required={required}
          placeholder={placeholder}
          className="min-h-32 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm leading-6 text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]"
        />
      ) : (
        <input
          id={`managed-item-${fieldKey}`}
          name={fieldKey}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required={required}
          placeholder={placeholder ?? 'Azure Blob URL 또는 기존 이미지 경로'}
          className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]"
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5]">
          <ImageUp className="size-4" />
          {uploading ? 'Azure 업로드 중...' : multiline ? '이미지 추가' : '이미지 변경'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            multiple={multiline}
            disabled={uploading}
            className="sr-only"
            onChange={(event) => {
              void uploadFiles(event.target.files);
              event.currentTarget.value = '';
            }}
          />
        </label>

        {value.trim() ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => {
              setValue('');
              setMessage(
                '이미지 제거를 예약했습니다. 저장하면 기존 managed Blob도 정리됩니다.',
              );
            }}
            className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="size-4" />
            {multiline ? '전체 이미지 제거' : '이미지 제거'}
          </button>
        ) : null}
      </div>

      <p className="break-keep text-[11px] leading-5 text-[#8A8A91]">
        새 파일은 먼저 Azure에 업로드되고, 저장이 완료된 뒤 더 이상 사용하지 않는 기존 managed Blob이 삭제됩니다.
      </p>

      {message ? (
        <p className="break-keep text-xs leading-5 text-[#52525B]">{message}</p>
      ) : null}
    </div>
  );
}
