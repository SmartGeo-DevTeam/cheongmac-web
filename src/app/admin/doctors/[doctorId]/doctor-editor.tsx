'use client';

import {
  deleteDoctorImage,
  saveDoctor,
  uploadDoctorImage,
  type DoctorAdminPayload,
} from '@/app/admin/_actions/doctor';
import type { DoctorImageKind } from '@/_lib/doctors';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import { Textarea } from '@/_shadcn/ui/textarea';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ExternalLink,
  ImageUp,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useState,
  useTransition,
} from 'react';

const IMAGE_LABELS: Record<
  DoctorImageKind,
  string
> = {
  COVER: '대표 이미지',
  PROFILE: '프로필 이미지',
  CUTOUT: '누끼 이미지',
  MOTION: '움직이는 GIF',
};

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open
      className="rounded-xl border border-[#E4E4E7] bg-white shadow-sm"
    >
      <summary className="cursor-pointer list-none px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-[#27272A]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[#71717A]">
            {description}
          </p>
        ) : null}
      </summary>
      <div className="border-t border-[#F0F0F2] px-5 py-5 md:px-6">
        {children}
      </div>
    </details>
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium text-[#52525B]"
    >
      {children}
    </label>
  );
}

function moveItem<T>(
  items: T[],
  from: number,
  to: number,
) {
  if (to < 0 || to >= items.length) return items;

  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function DoctorEditor({
  initial,
  relationCounts,
  mediaOptions,
}: {
  initial: DoctorAdminPayload;
  relationCounts: {
    label: string;
    count: number;
    href: string;
  }[];
  mediaOptions: {
    id: string;
    title: string;
    kind: string;
    source: string | null;
    isVisible: boolean;
  }[];
}) {
  const router = useRouter();
  const [data, setData] =
    useState<DoctorAdminPayload>(initial);
  const [message, setMessage] = useState('');
  const [uploadingKind, setUploadingKind] =
    useState<DoctorImageKind | null>(null);
  const [isPending, startTransition] =
    useTransition();

  const patch = <
    K extends keyof DoctorAdminPayload,
  >(
    key: K,
    value: DoctorAdminPayload[K],
  ) => {
    setMessage('');
    setData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const save = () => {
    setMessage('');

    startTransition(async () => {
      const result = await saveDoctor(data);

      setMessage(
        result.ok
          ? result.success ?? '저장했습니다.'
          : result.error ??
              '저장하지 못했습니다.',
      );

      if (result.ok) router.refresh();
    });
  };

  const uploadImage = async (
    kind: DoctorImageKind,
    file: File | undefined,
  ) => {
    if (!file) return;

    setMessage('');
    setUploadingKind(kind);

    const formData = new FormData();
    formData.set('file', file);

    const result = await uploadDoctorImage(
      data.id,
      kind,
      formData,
    );

    setUploadingKind(null);

    if (!result.ok || !result.url) {
      setMessage(
        result.error ??
          '이미지를 업로드하지 못했습니다.',
      );
      return;
    }

    patch(
      'images',
      data.images.map((item) =>
        item.kind === kind
          ? { ...item, url: result.url! }
          : item,
      ),
    );

    setMessage(
      result.success ??
        '이미지를 업로드했습니다.',
    );
    router.refresh();
  };

  const removeImage = async (kind: DoctorImageKind) => {
    setMessage('');
    setUploadingKind(kind);

    const result = await deleteDoctorImage(data.id, kind);

    setUploadingKind(null);

    if (!result.ok) {
      setMessage(result.error ?? '이미지를 제거하지 못했습니다.');
      return;
    }

    patch(
      'images',
      data.images.map((item) =>
        item.kind === kind ? { ...item, url: '' } : item,
      ),
    );
    setMessage(result.success ?? '이미지를 제거했습니다.');
    router.refresh();
  };

  return (
    <section className="space-y-5 pb-24">
      <div className="flex flex-col gap-4 rounded-xl border border-[#E4E4E7] bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">
            의료진 데이터베이스
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B]">
            {data.name} {data.position}
          </h1>
          <p className="mt-1 text-sm text-[#71717A]">
            의료진 고유정보와 이 의료진에게 노출할 미디어 4개를 관리합니다.
            진료분야·시간표·발표·후기·상담은 각 데이터 관리 메뉴에서 연결합니다.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/about/doctors/${data.slug}`}
            target="_blank"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#E4E4E7] px-3 text-sm font-medium text-[#52525B] hover:bg-[#F4F4F5]"
          >
            <ExternalLink className="size-4" />
            페이지 보기
          </Link>

          <Button
            onClick={save}
            disabled={isPending}
          >
            <Save className="size-4" />
            {isPending
              ? '저장 중...'
              : '의료진 정보 저장'}
          </Button>
        </div>
      </div>

      {message ? (
        <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm text-[#52525B]">
          {message}
        </div>
      ) : null}

      <Section
        title="기본정보"
        description="의료진 URL, 이름, 직책, 진료과, 소개, 예약 링크와 노출 순서를 관리합니다."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="admin-doctor-slug">
              slug
            </Label>
            <Input
              id="admin-doctor-slug"
              name="doctorSlug"
              value={data.slug}
              onChange={(event) =>
                patch('slug', event.target.value)
              }
            />
          </div>

          <div>
            <Label htmlFor="admin-doctor-name">
              성명
            </Label>
            <Input
              id="admin-doctor-name"
              name="doctorName"
              value={data.name}
              onChange={(event) =>
                patch('name', event.target.value)
              }
            />
          </div>

          <div>
            <Label htmlFor="admin-doctor-position">
              직책
            </Label>
            <Input
              id="admin-doctor-position"
              name="doctorPosition"
              value={data.position}
              onChange={(event) =>
                patch(
                  'position',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label htmlFor="admin-doctor-department">
              진료과 / 전문의
            </Label>
            <Input
              id="admin-doctor-department"
              name="doctorDepartment"
              value={data.department}
              onChange={(event) =>
                patch(
                  'department',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label htmlFor="admin-doctor-reservation">
              예약 링크
            </Label>
            <Input
              id="admin-doctor-reservation"
              name="doctorReservationHref"
              value={data.reservationHref}
              onChange={(event) =>
                patch(
                  'reservationHref',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <Label htmlFor="admin-doctor-order">
              노출 순서
            </Label>
            <Input
              id="admin-doctor-order"
              name="doctorDisplayOrder"
              type="number"
              min={0}
              value={data.displayOrder}
              onChange={(event) =>
                patch(
                  'displayOrder',
                  Number(event.target.value) || 0,
                )
              }
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="admin-doctor-bio">
              소개
            </Label>
            <Textarea
              id="admin-doctor-bio"
              name="doctorBio"
              value={data.bio}
              onChange={(event) =>
                patch('bio', event.target.value)
              }
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
            <input
              id="admin-doctor-visible"
              name="doctorVisible"
              type="checkbox"
              checked={data.isVisible}
              onChange={(event) =>
                patch(
                  'isVisible',
                  event.target.checked,
                )
              }
              className="size-4 accent-[#18181B]"
            />
            사용자 페이지에 의료진 노출
          </label>
        </div>
      </Section>

      <Section
        title="이미지 4종"
        description="대표, 프로필, 누끼, 움직이는 GIF 이미지는 의료진 고유 데이터입니다."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {data.images.map((image) => (
            <article
              key={image.kind}
              className="rounded-xl border border-[#E4E4E7] p-4"
            >
              <div className="flex gap-4">
                <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#F4F4F5]">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={
                        image.alt ||
                        IMAGE_LABELS[image.kind]
                      }
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-[#A1A1AA]">
                      이미지 없음
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[#27272A]">
                    {IMAGE_LABELS[image.kind]}
                  </h3>

                  <Input
                    id={`admin-doctor-image-${image.kind.toLowerCase()}-url`}
                    name={`doctorImage.${image.kind}.url`}
                    value={image.url}
                    onChange={(event) =>
                      patch(
                        'images',
                        data.images.map((item) =>
                          item.kind === image.kind
                            ? {
                                ...item,
                                url: event.target.value,
                              }
                            : item,
                        ),
                      )
                    }
                    className="mt-2"
                    placeholder="/assets/... 또는 https://..."
                  />

                  <Input
                    id={`admin-doctor-image-${image.kind.toLowerCase()}-alt`}
                    name={`doctorImage.${image.kind}.alt`}
                    value={image.alt}
                    onChange={(event) =>
                      patch(
                        'images',
                        data.images.map((item) =>
                          item.kind === image.kind
                            ? {
                                ...item,
                                alt: event.target.value,
                              }
                            : item,
                        ),
                      )
                    }
                    className="mt-2"
                    placeholder="대체 텍스트"
                  />

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5]">
                      <ImageUp className="size-4" />
                      {uploadingKind === image.kind
                        ? 'Azure 업로드 중...'
                        : image.url
                          ? '이미지 변경'
                          : '이미지 추가'}
                      <input
                        id={`admin-doctor-image-${image.kind.toLowerCase()}-file`}
                        name={`doctorImage.${image.kind}.file`}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                        disabled={uploadingKind !== null}
                        className="sr-only"
                        onChange={(event) =>
                          void uploadImage(
                            image.kind,
                            event.target.files?.[0],
                          )
                        }
                      />
                    </label>

                    {image.url ? (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploadingKind !== null}
                        onClick={() => void removeImage(image.kind)}
                        className="h-9 gap-2 border-red-200 px-3 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                        이미지 삭제
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="학력 및 약력"
        description="학력·약력은 해당 의료진 고유 이력으로 유지합니다."
      >
        <div className="space-y-3">
          {data.careers.map((item, index) => (
            <div
              key={`career-${index}`}
              className="flex gap-3 rounded-lg border border-[#ECECEF] p-3"
            >
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[150px_1fr_auto]">
                <select
                  id={`admin-doctor-career-${index}-kind`}
                  name={`doctorCareer.${index}.kind`}
                  value={item.kind}
                  onChange={(event) =>
                    patch(
                      'careers',
                      data.careers.map(
                        (row, rowIndex) =>
                          rowIndex === index
                            ? {
                                ...row,
                                kind: event.target
                                  .value as
                                  | 'EDUCATION'
                                  | 'CAREER',
                              }
                            : row,
                      ),
                    )
                  }
                  className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm"
                >
                  <option value="EDUCATION">
                    학력
                  </option>
                  <option value="CAREER">
                    약력
                  </option>
                </select>

                <Input
                  id={`admin-doctor-career-${index}-content`}
                  name={`doctorCareer.${index}.content`}
                  value={item.content}
                  onChange={(event) =>
                    patch(
                      'careers',
                      data.careers.map(
                        (row, rowIndex) =>
                          rowIndex === index
                            ? {
                                ...row,
                                content:
                                  event.target
                                    .value,
                              }
                            : row,
                      ),
                    )
                  }
                />

                <label className="inline-flex items-center gap-2 text-xs text-[#52525B]">
                  <input
                    id={`admin-doctor-career-${index}-visible`}
                    name={`doctorCareer.${index}.visible`}
                    type="checkbox"
                    checked={item.isVisible}
                    onChange={(event) =>
                      patch(
                        'careers',
                        data.careers.map(
                          (row, rowIndex) =>
                            rowIndex === index
                              ? {
                                  ...row,
                                  isVisible:
                                    event.target
                                      .checked,
                                }
                              : row,
                        ),
                      )
                    }
                    className="size-4 accent-[#18181B]"
                  />
                  노출
                </label>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() =>
                    patch(
                      'careers',
                      moveItem(
                        data.careers,
                        index,
                        index - 1,
                      ),
                    )
                  }
                  className="grid size-8 place-items-center rounded-md border border-[#E4E4E7] text-[#71717A] disabled:opacity-30"
                  aria-label="위로 이동"
                >
                  <ArrowUp className="size-4" />
                </button>

                <button
                  type="button"
                  disabled={
                    index ===
                    data.careers.length - 1
                  }
                  onClick={() =>
                    patch(
                      'careers',
                      moveItem(
                        data.careers,
                        index,
                        index + 1,
                      ),
                    )
                  }
                  className="grid size-8 place-items-center rounded-md border border-[#E4E4E7] text-[#71717A] disabled:opacity-30"
                  aria-label="아래로 이동"
                >
                  <ArrowDown className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    patch(
                      'careers',
                      data.careers.filter(
                        (_, rowIndex) =>
                          rowIndex !== index,
                      ),
                    )
                  }
                  className="grid size-8 place-items-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                  aria-label="삭제"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() =>
              patch('careers', [
                ...data.careers,
                {
                  kind: 'CAREER',
                  content: '',
                  isVisible: true,
                },
              ])
            }
          >
            <Plus className="size-4" />
            학력/약력 추가
          </Button>
        </div>
      </Section>

      <Section
        title="의료진 미디어"
        description="미디어 DB에 등록된 콘텐츠 중 이 의료진 상세페이지에 노출할 항목을 최대 4개까지 순서대로 선택합니다."
      >
        <div className="flex flex-col gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => {
              const selectedId = data.mediaIds[index] ?? '';
              const selectedElsewhere = new Set(
                data.mediaIds.filter(
                  (mediaId, mediaIndex) =>
                    mediaId && mediaIndex !== index,
                ),
              );

              return (
                <div
                  key={`doctor-media-slot-${index}`}
                  className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4"
                >
                  <Label htmlFor={`admin-doctor-media-${index}`}>
                    미디어 {index + 1}
                  </Label>

                  <select
                    id={`admin-doctor-media-${index}`}
                    name={`doctorMediaSelection.${index}`}
                    value={selectedId}
                    onChange={(event) => {
                      const next = Array.from(
                        { length: 4 },
                        (_, mediaIndex) =>
                          data.mediaIds[mediaIndex] ?? '',
                      );
                      next[index] = event.target.value;
                      patch('mediaIds', next);
                    }}
                    className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-3 text-sm text-[#27272A]"
                  >
                    <option value="">선택 안 함</option>
                    {mediaOptions.map((media) => (
                      <option
                        key={media.id}
                        value={media.id}
                        disabled={selectedElsewhere.has(media.id)}
                      >
                        {media.title}
                        {media.source ? ` · ${media.source}` : ''}
                        {!media.isVisible ? ' · 미노출' : ''}
                      </option>
                    ))}
                  </select>

                  {selectedId ? (
                    <Link
                      href={`/admin/content-relations/media/${selectedId}`}
                      className="mt-2 inline-flex text-xs font-medium text-[#006651] underline underline-offset-4"
                    >
                      선택한 미디어 수정
                    </Link>
                  ) : (
                    <p className="mt-2 text-xs text-[#A1A1AA]">
                      사용자 의료진 상세페이지에서는 선택 순서대로 최대 4개가 노출됩니다.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E4E4E7] bg-white px-4 py-3">
            <p className="text-xs leading-5 text-[#71717A]">
              새 미디어를 먼저 등록해야 한다면 미디어 DB에서 추가한 뒤 이 화면으로 돌아와 선택하세요.
            </p>
            <Link
              href="/admin/content-relations/media"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5]"
            >
              미디어 DB 열기
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section
        title="연결 데이터"
        description="의료진과 연결된 각 데이터베이스를 확인하고 관리합니다. 데이터 자체는 해당 관리 메뉴에서 독립적으로 유지됩니다."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {relationCounts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-[#E4E4E7] bg-white p-4 transition hover:border-[#B7CFC8] hover:bg-[#FAFCFB]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#27272A]">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    연결된 데이터 {item.count}건
                  </p>
                </div>
                <ArrowRight className="size-4 text-[#A1A1AA] transition group-hover:text-[#006651]" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <div className="fixed bottom-5 right-5 z-[120] rounded-xl border border-[#E4E4E7] bg-white p-3 shadow-lg">
        <Button
          onClick={save}
          disabled={isPending}
        >
          <Save className="size-4" />
          {isPending
            ? '저장 중...'
            : '의료진 정보 저장'}
        </Button>
      </div>
    </section>
  );
}
