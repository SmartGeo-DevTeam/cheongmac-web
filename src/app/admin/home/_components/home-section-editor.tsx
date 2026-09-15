import {
  deleteManagedPageItem,
  saveManagedPageItem,
} from '@/app/admin/_actions/managed-pages';
import { ManagedAssetField } from '@/app/admin/pages/[pageKey]/[id]/managed-asset-field';
import {
  getHomeAdminSection,
  getHomeItemTypeConfig,
  type HomeAdminSectionKey,
} from '@/_lib/home-admin-sections';
import { getManagedPageEditorItem } from '@/_lib/managed-pages';
import { getManagedPageConfig } from '@/_lib/page-management-config';
import { ArrowLeft, ExternalLink, Save, Trash2 } from 'lucide-react';
import { randomUUID } from 'node:crypto';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function textValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item): item is string | number =>
          typeof item === 'string' || typeof item === 'number',
      )
      .join('\n');
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return '';
}

export default async function HomeSectionEditor({
  sectionKey,
  id,
}: {
  sectionKey: HomeAdminSectionKey;
  id: string;
}) {
  const section = getHomeAdminSection(sectionKey);
  if (!section) notFound();

  const config = getManagedPageConfig('home');
  const typeConfig = getHomeItemTypeConfig(config.itemTypes, section);
  if (!typeConfig) notFound();

  const item = await getManagedPageEditorItem('home', id);
  if (id !== 'new' && (!item || item.itemType !== section.itemType)) {
    notFound();
  }

  const data = record(item?.data);
  const itemKey =
    item?.itemKey ?? `home:${section.itemType}:${randomUUID()}`;

  const saveAction = saveManagedPageItem.bind(
    null,
    'home',
    id,
    section.itemType,
  );

  const deleteAction = item
    ? deleteManagedPageItem.bind(null, 'home', item.id)
    : null;

  const deleteLocked =
    Boolean(item?.isVisible) &&
    ['slide', 'popup'].includes(section.itemType);

  return (
    <section className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Link
            href={section.href}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-[#18181B]"
          >
            <ArrowLeft className="size-3.5" />
            {section.label} 목록
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {item
              ? `${section.singularLabel} 수정`
              : `${section.singularLabel} 추가`}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#71717A]">
            {section.description}
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-4 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
        >
          사용자 화면
          <ExternalLink className="size-4" />
        </Link>
      </div>

      <form
        action={saveAction}
        className="space-y-6 rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6"
      >
        <input type="hidden" name="_itemKey" value={itemKey} />

        <div>
          <label
            htmlFor="home-managed-sort-order"
            className="text-sm font-semibold text-[#3F3F46]"
          >
            노출 순서
          </label>
          <input
            id="home-managed-sort-order"
            name="_sortOrder"
            type="number"
            min={0}
            defaultValue={item?.sortOrder ?? 0}
            className="mt-2 h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#A1A1AA]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {typeConfig.fields.map((field) => {
            const value =
              field.key === 'isVisible'
                ? item?.isVisible ?? true
                : data[field.key];

            const isImageField =
              typeConfig.imageFields?.includes(field.key) ?? false;

            if (field.type === 'checkbox') {
              return (
                <label
                  key={field.key}
                  className="flex min-h-10 items-center gap-2 rounded-md border border-[#E4E4E7] px-3 text-sm font-medium text-[#52525B]"
                >
                  <input
                    name={field.key}
                    type="checkbox"
                    defaultChecked={Boolean(value)}
                    className="size-4 accent-[#006651]"
                  />
                  {field.label}
                </label>
              );
            }

            if (isImageField) {
              return (
                <div key={field.key} className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#3F3F46]">
                    {field.label}
                    {field.required ? (
                      <span className="ml-1 text-red-500">*</span>
                    ) : null}
                  </label>
                  <div className="mt-2">
                    <ManagedAssetField
                      pageKey="home"
                      itemId={id}
                      itemType={section.itemType}
                      fieldKey={field.key}
                      defaultValue={value}
                      multiline={field.type === 'lines'}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  </div>
                  {field.description ? (
                    <p className="mt-1.5 text-[11px] leading-5 text-[#8A8A91]">
                      {field.description}
                    </p>
                  ) : null}
                </div>
              );
            }

            if (field.type === 'textarea' || field.type === 'lines') {
              return (
                <div key={field.key} className="md:col-span-2">
                  <label
                    htmlFor={`home-managed-${field.key}`}
                    className="text-sm font-semibold text-[#3F3F46]"
                  >
                    {field.label}
                    {field.required ? (
                      <span className="ml-1 text-red-500">*</span>
                    ) : null}
                  </label>
                  <textarea
                    id={`home-managed-${field.key}`}
                    name={field.key}
                    required={field.required}
                    defaultValue={textValue(value)}
                    placeholder={field.placeholder}
                    className="mt-2 min-h-28 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm leading-6 text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]"
                  />
                  {field.description ? (
                    <p className="mt-1.5 text-[11px] leading-5 text-[#8A8A91]">
                      {field.description}
                    </p>
                  ) : null}
                </div>
              );
            }

            if (field.type === 'select') {
              return (
                <div key={field.key}>
                  <label
                    htmlFor={`home-managed-${field.key}`}
                    className="text-sm font-semibold text-[#3F3F46]"
                  >
                    {field.label}
                    {field.required ? (
                      <span className="ml-1 text-red-500">*</span>
                    ) : null}
                  </label>
                  <select
                    id={`home-managed-${field.key}`}
                    name={field.key}
                    required={field.required}
                    defaultValue={textValue(value)}
                    className="mt-2 h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B]"
                  >
                    <option value="">선택</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={field.key}>
                <label
                  htmlFor={`home-managed-${field.key}`}
                  className="text-sm font-semibold text-[#3F3F46]"
                >
                  {field.label}
                  {field.required ? (
                    <span className="ml-1 text-red-500">*</span>
                  ) : null}
                </label>
                <input
                  id={`home-managed-${field.key}`}
                  name={field.key}
                  type={
                    field.type === 'number'
                      ? 'number'
                      : field.type === 'date'
                        ? 'date'
                        : 'text'
                  }
                  required={field.required}
                  defaultValue={textValue(value)}
                  placeholder={field.placeholder}
                  className="mt-2 h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#18181B] outline-none placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]"
                />
                {field.description ? (
                  <p className="mt-1.5 text-[11px] leading-5 text-[#8A8A91]">
                    {field.description}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E4E4E7] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {item && deleteAction ? (
              deleteLocked ? (
                <p className="text-xs text-[#A16207]">
                  활성 상태의 {section.singularLabel}은 먼저 비활성화한 뒤
                  삭제할 수 있습니다.
                </p>
              ) : (
                <button
                  formAction={deleteAction}
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  삭제
                </button>
              )
            ) : null}
          </div>

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#18181B] px-5 text-sm font-semibold text-white hover:bg-[#27272A]"
          >
            <Save className="size-4" />
            저장
          </button>
        </div>
      </form>
    </section>
  );
}
