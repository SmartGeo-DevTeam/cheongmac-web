import {
  deleteRelatedContent,
  saveRelatedContent,
} from '@/app/admin/_actions/related-content';
import {
  getAdminDoctors,
  getRelatedContentEditorData,
} from '@/_lib/related-content';
import {
  isRelatedContentResource,
  RELATED_CONTENT_META,
  type RelatedContentResource,
} from '@/_lib/related-content-types';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function value(
  values: Record<string, string | number | boolean>,
  key: string,
) {
  const current = values[key];
  return typeof current === 'string' || typeof current === 'number'
    ? current
    : '';
}

function checked(
  values: Record<string, string | number | boolean>,
  key: string,
) {
  return values[key] === true;
}

const inputClass =
  'flex h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm text-[#18181B] shadow-sm outline-none transition placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]';
const textareaClass =
  'flex min-h-28 w-full rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-sm text-[#18181B] shadow-sm outline-none transition placeholder:text-[#A1A1AA] focus:border-[#A1A1AA]';
const labelClass =
  'mb-1.5 block text-xs font-medium text-[#52525B]';

function Field({
  label,
  name,
  values,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  values: Record<string, string | number | boolean>;
  placeholder?: string;
  type?: 'text' | 'number' | 'date' | 'url';
}) {
  return (
    <div>
      <label htmlFor={`related-content-${name}`} className={labelClass}>
        {label}
      </label>
      <input
        id={`related-content-${name}`}
        name={name}
        type={type}
        defaultValue={value(values, name)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function TextareaField({
  label,
  name,
  values,
  placeholder,
}: {
  label: string;
  name: string;
  values: Record<string, string | number | boolean>;
  placeholder?: string;
}) {
  return (
    <div className="md:col-span-2">
      <label htmlFor={`related-content-${name}`} className={labelClass}>
        {label}
      </label>
      <textarea
        id={`related-content-${name}`}
        name={name}
        defaultValue={String(value(values, name))}
        placeholder={placeholder}
        className={textareaClass}
      />
    </div>
  );
}

function VisibilityFields({
  values,
  resource,
}: {
  values: Record<string, string | number | boolean>;
  resource: RelatedContentResource;
}) {
  return (
    <div className="flex flex-wrap gap-5 md:col-span-2">
      <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
        <input
          id="related-content-visible"
          name="isVisible"
          type="checkbox"
          defaultChecked={checked(values, 'isVisible')}
          className="size-4 accent-[#18181B]"
        />
        사용자 페이지 노출
      </label>

      {resource === 'media' ? (
        <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
          <input
            id="related-content-featured"
            name="isFeatured"
            type="checkbox"
            defaultChecked={checked(values, 'isFeatured')}
            className="size-4 accent-[#18181B]"
          />
          대표 미디어
        </label>
      ) : null}

      {resource === 'consultations' ? (
        <>
          <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
            <input
              id="related-content-private"
              name="isPrivate"
              type="checkbox"
              defaultChecked={checked(values, 'isPrivate')}
              className="size-4 accent-[#18181B]"
            />
            비공개 상담
          </label>
          <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
            <input
              id="related-content-link-icon"
              name="hasLinkIcon"
              type="checkbox"
              defaultChecked={checked(values, 'hasLinkIcon')}
              className="size-4 accent-[#18181B]"
            />
            링크 아이콘
          </label>
        </>
      ) : null}
    </div>
  );
}

function ResourceFields({
  resource,
  values,
}: {
  resource: RelatedContentResource;
  values: Record<string, string | number | boolean>;
}) {
  switch (resource) {
    case 'specialties':
      return (
        <>
          <Field
            label="진료분야명"
            name="name"
            values={values}
            placeholder="예: 하지정맥류"
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
          <TextareaField
            label="설명"
            name="description"
            values={values}
            placeholder="진료분야 설명(선택)"
          />
        </>
      );

    case 'schedules':
      return (
        <>
          <Field
            label="시간대/이름"
            name="label"
            values={values}
            placeholder="예: 오전"
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
          {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const).map(
            (key) => {
              const labels = {
                mon: '월',
                tue: '화',
                wed: '수',
                thu: '목',
                fri: '금',
                sat: '토',
              };

              return (
                <div key={key}>
                  <label
                    htmlFor={`related-content-${key}`}
                    className={labelClass}
                  >
                    {labels[key]}
                  </label>
                  <select
                    id={`related-content-${key}`}
                    name={key}
                    defaultValue={String(value(values, key))}
                    className={inputClass}
                  >
                    <option value="진료">진료</option>
                    <option value="휴진">휴진</option>
                    <option value="문의">문의</option>
                  </select>
                </div>
              );
            },
          )}
        </>
      );

    case 'presentations':
      return (
        <>
          <Field
            label="발표/논문 제목"
            name="title"
            values={values}
          />
          <Field
            label="학회/기관"
            name="organization"
            values={values}
          />
          <Field
            label="발표일"
            name="presentedAt"
            values={values}
            type="date"
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
          <Field
            label="이미지 URL"
            name="imageUrl"
            values={values}
          />
          <Field
            label="링크 URL"
            name="linkUrl"
            values={values}
          />
          <TextareaField
            label="설명"
            name="description"
            values={values}
          />
        </>
      );

    case 'reviews':
      return (
        <>
          <Field
            label="환자명(마스킹)"
            name="patientName"
            values={values}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="나이"
              name="age"
              values={values}
              type="number"
            />
            <Field
              label="성별"
              name="gender"
              values={values}
            />
          </div>
          <Field
            label="치료정보"
            name="treatment"
            values={values}
          />
          <Field
            label="후기 이미지 URL"
            name="imageUrl"
            values={values}
          />
          <Field
            label="후기일"
            name="reviewedAt"
            values={values}
            type="date"
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
          <TextareaField
            label="후기 내용"
            name="content"
            values={values}
          />
        </>
      );

    case 'media':
      return (
        <>
          <div>
            <label htmlFor="related-content-kind" className={labelClass}>
              미디어 종류
            </label>
            <select
              id="related-content-kind"
              name="kind"
              defaultValue={String(value(values, 'kind'))}
              className={inputClass}
            >
              <option value="VIDEO">영상</option>
              <option value="ARTICLE">기사</option>
              <option value="SOCIAL">SNS</option>
              <option value="OTHER">기타</option>
            </select>
          </div>
          <Field label="제목" name="title" values={values} />
          <Field label="출처" name="source" values={values} />
          <Field
            label="게시일"
            name="publishedAt"
            values={values}
            type="date"
          />
          <Field
            label="썸네일 URL"
            name="thumbnailUrl"
            values={values}
          />
          <Field
            label="링크 URL"
            name="linkUrl"
            values={values}
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
        </>
      );

    case 'consultations':
      return (
        <>
          <Field
            label="대분류"
            name="categoryPrimary"
            values={values}
          />
          <Field
            label="세부분류"
            name="categorySecondary"
            values={values}
          />
          <div className="md:col-span-2">
            <Field label="상담 제목" name="title" values={values} />
          </div>
          <TextareaField
            label="질문"
            name="questionText"
            values={values}
            placeholder="문단마다 한 줄씩 입력"
          />
          <TextareaField
            label="답변"
            name="answerText"
            values={values}
            placeholder="문단마다 한 줄씩 입력"
          />
          <Field
            label="첨부 이미지 URL"
            name="imageUrl"
            values={values}
          />
          <Field
            label="노출 순서"
            name="sortOrder"
            values={values}
            type="number"
          />
          <Field
            label="게시일"
            name="publishedAt"
            values={values}
            type="date"
          />
          <Field
            label="답변일"
            name="answerDate"
            values={values}
            type="date"
          />
        </>
      );
  }
}

export default async function RelatedContentEditPage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;

  if (!isRelatedContentResource(resource)) notFound();

  const [editor, doctors] = await Promise.all([
    getRelatedContentEditorData(resource, id),
    getAdminDoctors(),
  ]);

  if (!editor) notFound();

  const meta = RELATED_CONTENT_META[resource];
  const saveAction = saveRelatedContent.bind(null, resource, id);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href={meta.href}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#71717A] hover:text-[#18181B]"
          >
            <ArrowLeft className="size-3.5" />
            {meta.label} 목록
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#18181B] md:text-3xl">
            {id === 'new'
              ? `${meta.singularLabel} 추가`
              : `${meta.singularLabel} 수정`}
          </h1>
        </div>

        {id !== 'new' ? (
          <form action={deleteRelatedContent.bind(null, resource, id)}>
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

      <form action={saveAction} className="space-y-5">
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          <h2 className="text-base font-semibold text-[#27272A]">
            {meta.singularLabel} 정보
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ResourceFields
              resource={resource}
              values={editor.values}
            />
            <VisibilityFields
              resource={resource}
              values={editor.values}
            />
          </div>
        </div>

        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 md:p-6">
          <div>
            <h2 className="text-base font-semibold text-[#27272A]">
              관련 의료진
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#71717A]">
              {resource === 'media'
                ? '미디어는 각 의료진 DB에서 최대 4개까지 선택합니다. 이 화면에서는 현재 연결 상태만 확인합니다.'
                : '이 데이터를 함께 사용하는 원장을 선택하세요. 하나의 데이터에 여러 의료진을 연결할 수 있습니다.'}
            </p>
          </div>

          {resource === 'media' ? (
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {doctors
                .filter((doctor) => editor.doctorIds.includes(doctor.id))
                .map((doctor) => (
                  <Link
                    key={doctor.id}
                    href={`/admin/doctors/${doctor.id}`}
                    className="flex items-start justify-between gap-3 rounded-lg border border-[#E4E4E7] px-3 py-3 hover:bg-[#FAFAFA]"
                  >
                    <span className="min-w-0">
                      <strong className="block text-sm font-semibold text-[#27272A]">
                        {doctor.name} {doctor.position}
                      </strong>
                      <span className="mt-0.5 block text-xs text-[#A1A1AA]">
                        {doctor.department}
                      </span>
                    </span>
                    <span className="shrink-0 text-[11px] font-semibold text-[#006651]">
                      의료진 DB
                    </span>
                  </Link>
                ))}

              {!editor.doctorIds.length ? (
                <div className="rounded-lg border border-dashed border-[#D4D4D8] px-4 py-8 text-center text-xs text-[#A1A1AA] sm:col-span-2 xl:col-span-3">
                  아직 이 미디어를 선택한 의료진이 없습니다.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {doctors.map((doctor) => (
                <label
                  key={doctor.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#E4E4E7] px-3 py-3 hover:bg-[#FAFAFA]"
                >
                  <input
                    id={`related-doctor-${doctor.id}`}
                    name="doctorIds"
                    value={doctor.id}
                    type="checkbox"
                    defaultChecked={editor.doctorIds.includes(doctor.id)}
                    className="mt-0.5 size-4 accent-[#18181B]"
                  />
                  <span className="min-w-0">
                    <strong className="block text-sm font-semibold text-[#27272A]">
                      {doctor.name} {doctor.position}
                    </strong>
                    <span className="mt-0.5 block text-xs text-[#A1A1AA]">
                      {doctor.department}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}
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
