'use client';

import { uploadManagedPageAsset } from '@/app/admin/_actions/managed-pages';
import type { ManagedPageKey } from '@/_lib/page-management-config';
import { Copy, ImageUp } from 'lucide-react';
import { useState } from 'react';

type Props = {
  pageKey: ManagedPageKey;
  itemId: string;
  itemType: string;
  fieldKey: string;
};

export function JsonAssetUploader({
  pageKey,
  itemId,
  itemType,
  fieldKey,
}: Props) {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.set('file', file);

    try {
      const result = await uploadManagedPageAsset(
        pageKey,
        itemId,
        itemType,
        fieldKey,
        formData,
      );

      if (!result.ok || !result.url) {
        setMessage(
          result.error ?? '이미지를 업로드하지 못했습니다.',
        );
        return;
      }

      setUrl(result.url);
      setMessage(
        '업로드 완료. 아래 URL을 JSON의 이미지 값에 넣고 저장해주세요.',
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
    <div className="rounded-md border border-dashed border-[#D4D4D8] bg-[#FAFAFA] p-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5]">
          <ImageUp className="size-4" />
          {uploading ? 'Azure 업로드 중...' : 'JSON용 이미지 업로드'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            disabled={uploading}
            className="sr-only"
            onChange={(event) => {
              void upload(event.target.files?.[0]);
              event.currentTarget.value = '';
            }}
          />
        </label>

        {url ? (
          <button
            type="button"
            onClick={() => void navigator.clipboard.writeText(url)}
            className="inline-flex items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5]"
          >
            <Copy className="size-4" />
            URL 복사
          </button>
        ) : null}
      </div>

      {url ? (
        <input
          readOnly
          value={url}
          className="mt-2 h-9 w-full rounded-md border border-[#E4E4E7] bg-white px-2 text-[11px] text-[#52525B]"
        />
      ) : null}

      {message ? (
        <p className="mt-2 break-keep text-[11px] leading-5 text-[#71717A]">{message}</p>
      ) : (
        <p className="mt-2 break-keep text-[11px] leading-5 text-[#8A8A91]">
          JSON 안에 이미지 URL이 필요한 경우 여기서 먼저 업로드할 수 있습니다. 저장 후 더 이상 참조되지 않는 기존 managed Blob은 자동 정리됩니다.
        </p>
      )}
    </div>
  );
}
