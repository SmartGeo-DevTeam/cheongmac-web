import {
  deleteManagedPageItem,
  saveManagedPageItem,
} from '@/app/admin/_actions/managed-pages';
import {
  getManagedPageEditorItem,
} from '@/_lib/managed-pages';
import {
  getManagedItemTypeConfig,
  getManagedPageConfig,
  isManagedPageKey,
  type ManagedField,
} from '@/_lib/page-management-config';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const inputClass =
  'h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]';
const textareaClass =
  'min-h-32 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm leading-6 text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]';

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function dataRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function fieldValue(data: Record<string, unknown>, field: ManagedField) {
  const value = data[field.key];

  if (field.type === 'lines') {
    return Array.isArray(value)
      ? value.filter((item) => typeof item === 'string').join('\n')
      : '';
  }

  if (field.type === 'json') {
    if (value === undefined || value === null) return '';
    return JSON.stringify(value, null, 2);
  }

  if (field.type === 'checkbox') {
    return Boolean(value);
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return '';
}

function ManagedFieldInput({
  field,
  data,
  visible,
}: {
  field: ManagedField;
  data: Record<string, unknown>;
  visible: boolean;
}) {
  if (field.key === 'isVisible') {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-[#52525B]">
        <input
          id="managed-item-visible"
          name="isVisible"
          type="checkbox"
          defaultChecked={visible}
          className="size-4 accent-[#18181B]"
        />
        사용자 페이지에 노출
      </label>
    );
  }

  const value = fieldValue(data, field);

  if (field.type === 'checkbox') {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-[#52525B]">
        <input
          id={`managed-item-${field.key}`}
          name={field.key}
          type="checkbox"
          defaultChecked={Boolean(value)}
          className="size-4 accent-[#18181B]"
        />
        {field.label}
      </label>
    );
  }

  return (
    <div className={field.type === 'textarea' || field.type === 'lines' || field.type === 'json' ? 'md:col-span-2' : ''}>
      <label
        htmlFor={`managed-item-${field.key}`}
        className="mb-1.5 block text-xs font-medium text-[#52525B]"
      >
        {field.label}
        {field.required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>

      {field.type === 'select' ? (
        <select
          id={`managed-item-${field.key}`}
          name={field.key}
          defaultValue={String(value)}
          required={field.required}
          className={inputClass}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === 'textarea' || field.type === 'lines' || field.type === 'json' ? (
        <textarea
          id={`managed-item-${field.key}`}
          name={field.key}
          defaultValue={String(value)}
          required={field.required}
          placeholder={field.placeholder}
          className={`${textareaClass} ${field.type === 'json' ? 'font-mono text-xs' : ''}`}
        />
      ) : (
        <input
          id={`managed-item-${field.key}`}
          name={field.key}
          type={
            field.type === 'number'
              ? 'number'
              : field.type === 'date'
                ? 'date'
                : field.type === 'url'
                  ? 'url'
                  : 'text'
          }
          defaultValue={value as string | number}
          required={field.required}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}

      {field.description ? (
        <p className="mt-1.5 break-keep text-[11px] leading-5 text-[#8A8A91]">
          {field.description}
        </p>
      ) : null}
    </div>
  );
}

export default async function AdminManagedPageEdit({
  params,
  searchParams,
}: {
  params: Promise<{ pageKey: string; id: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const [{ pageKey, id }, query] = await Promise.all([params, searchParams]);

  if (!isManagedPageKey(pageKey)) notFound();

  const config = getManagedPageConfig(pageKey);
  const item = await getManagedPageEditorItem(pageKey, id);

  if (id !== 'new' && !item) notFound();

  const requestedType = first(query.type);
  const itemType = item?.itemType ?? requestedType ?? config.itemTypes[0]?.value;
  if (!itemType) notFound();

  const typeConfig = getManagedItemTypeConfig(pageKey, itemType);
  if (!typeConfig) notFound();

  const data = dataRecord(item?.data);
  const action = saveManagedPageItem.bind(null, pageKey, id, itemType);

  return (
    <section className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href={`/admin/pages/${pageKey}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-[#18181B]"
          >
            <ArrowLeft className="size-3.5" />
            {config.label}
          </Link>

          <p className="mt-4 text-xs font-medium text-[#A1A1AA]">
            {config.groupLabel} · {typeConfig.label}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {id === 'new' ? `${typeConfig.label} 추가` : `${typeConfig.label} 수정`}
          </h1>
        </div>

        {item ? (
          <form action={deleteManagedPageItem.bind(null, pageKey, item.id)}>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 bg-white px-4 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 className="size-4" />
              삭제
            </button>
          </form>
        ) : null}
      </div>

      <form action={action} className="space-y-5">
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-[#27272A]">관리 정보</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="managed-item-key"
                className="mb-1.5 block text-xs font-medium text-[#52525B]"
              >
                관리용 ID
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="managed-item-key"
                name="_itemKey"
                required
                readOnly={Boolean(item)}
                defaultValue={item?.itemKey ?? ''}
                placeholder={
                  pageKey === 'notice'
                    ? '예: september-closure'
                    : pageKey === 'cases' || pageKey === 'news'
                      ? '예: 18'
                      : '영문/숫자 식별자'
                }
                className={`${inputClass} ${item ? 'bg-[#F4F4F5] text-[#71717A]' : ''}`}
              />
              <p className="mt-1.5 text-[11px] leading-5 text-[#8A8A91]">
                공지사항·치료사례·청맥뉴스는 상세 URL 식별자로도 사용되며, 등록 후에는 변경할 수 없습니다.
              </p>
            </div>

            <div>
              <label
                htmlFor="managed-item-order"
                className="mb-1.5 block text-xs font-medium text-[#52525B]"
              >
                노출 순서
              </label>
              <input
                id="managed-item-order"
                name="_sortOrder"
                type="number"
                min={0}
                defaultValue={item?.sortOrder ?? 0}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-[#27272A]">
            {typeConfig.label} 내용
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {typeConfig.fields.map((field) => (
              <ManagedFieldInput
                key={field.key}
                field={field}
                data={data}
                visible={item?.isVisible ?? true}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-[#18181B] px-5 text-sm font-medium text-white hover:bg-[#27272A]"
          >
            <Save className="size-4" />
            저장
          </button>
        </div>
      </form>
    </section>
  );
}
