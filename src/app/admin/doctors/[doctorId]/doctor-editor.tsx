'use client';

import {
  saveDoctor,
  uploadDoctorImage,
  type DoctorAdminCareer,
  type DoctorAdminConsultation,
  type DoctorAdminMedia,
  type DoctorAdminPayload,
  type DoctorAdminPresentation,
  type DoctorAdminReview,
} from '@/app/admin/_actions/doctor';
import type { DoctorImageKind } from '@/_lib/doctors';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import { Textarea } from '@/_shadcn/ui/textarea';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  ImageUp,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const IMAGE_LABELS: Record<DoctorImageKind, string> = {
  COVER: '대표 이미지',
  PROFILE: '프로필 이미지',
  CUTOUT: '누끼 이미지',
  MOTION: '움직이는 GIF',
};

const DAY_FIELDS = [
  ['mon', '월'],
  ['tue', '화'],
  ['wed', '수'],
  ['thu', '목'],
  ['fri', '금'],
  ['sat', '토'],
] as const;

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
        <h2 className="text-base font-semibold text-[#27272A]">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-[#71717A]">{description}</p>
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

function Visibility({
  id,
  checked,
  onChange,
  label = '노출',
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 text-xs text-[#52525B]">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[#18181B]"
      />
      {label}
    </label>
  );
}

function RowActions({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="grid size-8 place-items-center rounded-md border border-[#E4E4E7] text-[#71717A] disabled:opacity-30"
        aria-label="위로 이동"
      >
        <ArrowUp className="size-4" />
      </button>
      <button
        type="button"
        disabled={index === length - 1}
        onClick={() => onMove(index, index + 1)}
        className="grid size-8 place-items-center rounded-md border border-[#E4E4E7] text-[#71717A] disabled:opacity-30"
        aria-label="아래로 이동"
      >
        <ArrowDown className="size-4" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="grid size-8 place-items-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
        aria-label="삭제"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

function moveItem<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function DoctorEditor({
  initial,
}: {
  initial: DoctorAdminPayload;
}) {
  const router = useRouter();
  const [data, setData] = useState<DoctorAdminPayload>(initial);
  const [message, setMessage] = useState('');
  const [uploadingKind, setUploadingKind] =
    useState<DoctorImageKind | null>(null);
  const [isPending, startTransition] = useTransition();

  const patch = <K extends keyof DoctorAdminPayload>(
    key: K,
    value: DoctorAdminPayload[K],
  ) => {
    setMessage('');
    setData((current) => ({ ...current, [key]: value }));
  };

  const save = () => {
    setMessage('');
    startTransition(async () => {
      const result = await saveDoctor(data);
      setMessage(result.ok ? result.success ?? '저장했습니다.' : result.error ?? '저장하지 못했습니다.');
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

    const result = await uploadDoctorImage(data.id, kind, formData);
    setUploadingKind(null);

    if (!result.ok || !result.url) {
      setMessage(result.error ?? '이미지를 업로드하지 못했습니다.');
      return;
    }

    patch(
      'images',
      data.images.map((item) =>
        item.kind === kind ? { ...item, url: result.url! } : item,
      ),
    );
    setMessage(result.success ?? '이미지를 업로드했습니다.');
    router.refresh();
  };

  return (
    <section className="space-y-5 pb-24">
      <div className="flex flex-col gap-4 rounded-xl border border-[#E4E4E7] bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">의료진 데이터베이스</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#18181B]">
            {data.name} {data.position}
          </h1>
          <p className="mt-1 text-sm text-[#71717A]">
            전문분야 · 학력/약력 · 발표 · 후기 · 미디어 · 상담을 관계형으로 관리합니다.
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
          <Button onClick={save} disabled={isPending}>
            <Save className="size-4" />
            {isPending ? '저장 중...' : '전체 저장'}
          </Button>
        </div>
      </div>

      {message ? (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.includes('했습니다')
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      ) : null}

      <Section
        title="기본정보"
        description="의료진 URL, 이름, 직책, 진료과, 소개, 예약 링크와 사용자 페이지 노출 순서를 관리합니다."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="admin-doctor-slug">slug</Label>
            <Input
              id="admin-doctor-slug"
              name="doctorSlug"
              value={data.slug}
              onChange={(event) => patch('slug', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="admin-doctor-name">성명</Label>
            <Input
              id="admin-doctor-name"
              name="doctorName"
              value={data.name}
              onChange={(event) => patch('name', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="admin-doctor-position">직책</Label>
            <Input
              id="admin-doctor-position"
              name="doctorPosition"
              value={data.position}
              onChange={(event) => patch('position', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="admin-doctor-department">진료과 / 전문의</Label>
            <Input
              id="admin-doctor-department"
              name="doctorDepartment"
              value={data.department}
              onChange={(event) => patch('department', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="admin-doctor-reservation">예약 링크</Label>
            <Input
              id="admin-doctor-reservation"
              name="doctorReservationHref"
              value={data.reservationHref}
              onChange={(event) => patch('reservationHref', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="admin-doctor-order">노출 순서</Label>
            <Input
              id="admin-doctor-order"
              name="doctorDisplayOrder"
              type="number"
              min={0}
              value={data.displayOrder}
              onChange={(event) =>
                patch('displayOrder', Number(event.target.value) || 0)
              }
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="admin-doctor-bio">소개</Label>
            <Textarea
              id="admin-doctor-bio"
              name="doctorBio"
              value={data.bio}
              onChange={(event) => patch('bio', event.target.value)}
              placeholder="추후 의료진 소개 영역에서 사용할 수 있습니다."
            />
          </div>
          <Visibility
            id="admin-doctor-visible"
            checked={data.isVisible}
            onChange={(checked) => patch('isVisible', checked)}
            label="사용자 페이지에 의료진 노출"
          />
        </div>
      </Section>

      <Section
        title="이미지 4종"
        description="DB에는 이미지 URL/메타데이터를 저장하고 실제 파일은 Supabase Storage에 저장합니다. URL 직접 입력도 가능합니다."
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
                      alt={image.alt || IMAGE_LABELS[image.kind]}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-[#A1A1AA]">이미지 없음</span>
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
                            ? { ...item, url: event.target.value }
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
                            ? { ...item, alt: event.target.value }
                            : item,
                        ),
                      )
                    }
                    className="mt-2"
                    placeholder="대체 텍스트"
                  />

                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#D4D4D8] bg-white px-3 py-2 text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5]">
                    <ImageUp className="size-4" />
                    {uploadingKind === image.kind ? '업로드 중...' : '파일 업로드'}
                    <input
                      id={`admin-doctor-image-${image.kind.toLowerCase()}-file`}
                      name={`doctorImage.${image.kind}.file`}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      disabled={uploadingKind !== null}
                      className="sr-only"
                      onChange={(event) =>
                        void uploadImage(image.kind, event.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="전문 진료분야"
        description="상단 의료진 정보와 의료진 목록 검색에 동일한 관계 데이터를 사용합니다."
      >
        <div className="space-y-3">
          {data.specialties.map((item, index) => (
            <div
              key={`specialty-${index}`}
              className="flex flex-col gap-3 rounded-lg border border-[#ECECEF] p-3 md:flex-row md:items-start"
            >
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                <Input
                  id={`admin-doctor-specialty-${index}-name`}
                  name={`doctorSpecialty.${index}.name`}
                  value={item.name}
                  onChange={(event) =>
                    patch(
                      'specialties',
                      data.specialties.map((row, rowIndex) =>
                        rowIndex === index
                          ? { ...row, name: event.target.value }
                          : row,
                      ),
                    )
                  }
                  placeholder="전문분야명"
                />
                <Input
                  id={`admin-doctor-specialty-${index}-description`}
                  name={`doctorSpecialty.${index}.description`}
                  value={item.description}
                  onChange={(event) =>
                    patch(
                      'specialties',
                      data.specialties.map((row, rowIndex) =>
                        rowIndex === index
                          ? { ...row, description: event.target.value }
                          : row,
                      ),
                    )
                  }
                  placeholder="설명(선택)"
                />
                <Visibility
                  id={`admin-doctor-specialty-${index}-visible`}
                  checked={item.isVisible}
                  onChange={(checked) =>
                    patch(
                      'specialties',
                      data.specialties.map((row, rowIndex) =>
                        rowIndex === index ? { ...row, isVisible: checked } : row,
                      ),
                    )
                  }
                />
              </div>

              <RowActions
                index={index}
                length={data.specialties.length}
                onMove={(from, to) =>
                  patch('specialties', moveItem(data.specialties, from, to))
                }
                onRemove={() =>
                  patch(
                    'specialties',
                    data.specialties.filter((_, rowIndex) => rowIndex !== index),
                  )
                }
              />
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() =>
              patch('specialties', [
                ...data.specialties,
                { name: '', description: '', isVisible: true },
              ])
            }
          >
            <Plus className="size-4" /> 전문분야 추가
          </Button>
        </div>
      </Section>

      <Section title="학력 및 약력">
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
                      data.careers.map((row, rowIndex) =>
                        rowIndex === index
                          ? {
                              ...row,
                              kind: event.target.value as DoctorAdminCareer['kind'],
                            }
                          : row,
                      ),
                    )
                  }
                  className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm"
                >
                  <option value="EDUCATION">학력</option>
                  <option value="CAREER">약력</option>
                </select>
                <Input
                  id={`admin-doctor-career-${index}-content`}
                  name={`doctorCareer.${index}.content`}
                  value={item.content}
                  onChange={(event) =>
                    patch(
                      'careers',
                      data.careers.map((row, rowIndex) =>
                        rowIndex === index
                          ? { ...row, content: event.target.value }
                          : row,
                      ),
                    )
                  }
                  placeholder="학력 또는 약력"
                />
                <Visibility
                  id={`admin-doctor-career-${index}-visible`}
                  checked={item.isVisible}
                  onChange={(checked) =>
                    patch(
                      'careers',
                      data.careers.map((row, rowIndex) =>
                        rowIndex === index ? { ...row, isVisible: checked } : row,
                      ),
                    )
                  }
                />
              </div>
              <RowActions
                index={index}
                length={data.careers.length}
                onMove={(from, to) =>
                  patch('careers', moveItem(data.careers, from, to))
                }
                onRemove={() =>
                  patch(
                    'careers',
                    data.careers.filter((_, rowIndex) => rowIndex !== index),
                  )
                }
              />
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() =>
              patch('careers', [
                ...data.careers,
                { kind: 'CAREER', content: '', isVisible: true },
              ])
            }
          >
            <Plus className="size-4" /> 학력/약력 추가
          </Button>
        </div>
      </Section>

      <Section title="진료시간표">
        <div className="space-y-3">
          {data.schedules.map((item, index) => (
            <div
              key={`schedule-${index}`}
              className="rounded-lg border border-[#ECECEF] p-3"
            >
              <div className="flex items-start gap-3">
                <div className="grid min-w-0 flex-1 gap-2 md:grid-cols-7">
                  <Input
                    id={`admin-doctor-schedule-${index}-label`}
                    name={`doctorSchedule.${index}.label`}
                    value={item.label}
                    onChange={(event) =>
                      patch(
                        'schedules',
                        data.schedules.map((row, rowIndex) =>
                          rowIndex === index
                            ? { ...row, label: event.target.value }
                            : row,
                        ),
                      )
                    }
                    placeholder="오전/오후"
                  />
                  {DAY_FIELDS.map(([key, label]) => (
                    <label key={key} className="text-xs text-[#71717A]">
                      <span className="mb-1 block">{label}</span>
                      <select
                        id={`admin-doctor-schedule-${index}-${key}`}
                        name={`doctorSchedule.${index}.${key}`}
                        value={item[key]}
                        onChange={(event) =>
                          patch(
                            'schedules',
                            data.schedules.map((row, rowIndex) =>
                              rowIndex === index
                                ? { ...row, [key]: event.target.value }
                                : row,
                            ),
                          )
                        }
                        className="h-10 w-full rounded-md border border-[#D4D4D8] bg-white px-2 text-sm"
                      >
                        <option>진료</option>
                        <option>휴진</option>
                        <option>문의</option>
                      </select>
                    </label>
                  ))}
                </div>
                <RowActions
                  index={index}
                  length={data.schedules.length}
                  onMove={(from, to) =>
                    patch('schedules', moveItem(data.schedules, from, to))
                  }
                  onRemove={() =>
                    patch(
                      'schedules',
                      data.schedules.filter((_, rowIndex) => rowIndex !== index),
                    )
                  }
                />
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() =>
              patch('schedules', [
                ...data.schedules,
                {
                  label: '',
                  mon: '진료',
                  tue: '진료',
                  wed: '진료',
                  thu: '진료',
                  fri: '진료',
                  sat: '문의',
                },
              ])
            }
          >
            <Plus className="size-4" /> 시간대 추가
          </Button>
        </div>
      </Section>

      <PresentationEditor data={data} patch={patch} />
      <ReviewEditor data={data} patch={patch} />
      <MediaEditor data={data} patch={patch} />
      <ConsultationEditor data={data} patch={patch} />

      <div className="fixed bottom-5 right-5 z-[120] flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white p-3 shadow-lg">
        {message ? (
          <span className="max-w-[360px] truncate text-xs text-[#71717A]">
            {message}
          </span>
        ) : null}
        <Button onClick={save} disabled={isPending}>
          <Save className="size-4" />
          {isPending ? '저장 중...' : '전체 저장'}
        </Button>
      </div>
    </section>
  );
}

type PatchFn = <K extends keyof DoctorAdminPayload>(
  key: K,
  value: DoctorAdminPayload[K],
) => void;

function PresentationEditor({
  data,
  patch,
}: {
  data: DoctorAdminPayload;
  patch: PatchFn;
}) {
  const update = (
    index: number,
    value: Partial<DoctorAdminPresentation>,
  ) =>
    patch(
      'presentations',
      data.presentations.map((row, rowIndex) =>
        rowIndex === index ? { ...row, ...value } : row,
      ),
    );

  return (
    <Section title="의료진 발표 이력">
      <div className="space-y-3">
        {data.presentations.map((item, index) => (
          <div key={`presentation-${index}`} className="rounded-lg border border-[#ECECEF] p-3">
            <div className="flex gap-3">
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                <Input id={`admin-presentation-${index}-title`} name={`doctorPresentation.${index}.title`} value={item.title} onChange={(e) => update(index, { title: e.target.value })} placeholder="발표/논문 제목" />
                <Input id={`admin-presentation-${index}-organization`} name={`doctorPresentation.${index}.organization`} value={item.organization} onChange={(e) => update(index, { organization: e.target.value })} placeholder="학회/기관" />
                <Input id={`admin-presentation-${index}-date`} name={`doctorPresentation.${index}.date`} type="date" value={item.presentedAt} onChange={(e) => update(index, { presentedAt: e.target.value })} />
                <Input id={`admin-presentation-${index}-image`} name={`doctorPresentation.${index}.imageUrl`} value={item.imageUrl} onChange={(e) => update(index, { imageUrl: e.target.value })} placeholder="이미지 URL" />
                <Input id={`admin-presentation-${index}-link`} name={`doctorPresentation.${index}.linkUrl`} value={item.linkUrl} onChange={(e) => update(index, { linkUrl: e.target.value })} placeholder="링크 URL" />
                <Visibility id={`admin-presentation-${index}-visible`} checked={item.isVisible} onChange={(checked) => update(index, { isVisible: checked })} />
                <Textarea id={`admin-presentation-${index}-description`} name={`doctorPresentation.${index}.description`} value={item.description} onChange={(e) => update(index, { description: e.target.value })} placeholder="설명" className="md:col-span-2" />
              </div>
              <RowActions index={index} length={data.presentations.length} onMove={(from, to) => patch('presentations', moveItem(data.presentations, from, to))} onRemove={() => patch('presentations', data.presentations.filter((_, i) => i !== index))} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => patch('presentations', [...data.presentations, { title: '', organization: '', description: '', imageUrl: '', linkUrl: '', presentedAt: '', isVisible: true }])}>
          <Plus className="size-4" /> 발표 이력 추가
        </Button>
      </div>
    </Section>
  );
}

function ReviewEditor({
  data,
  patch,
}: {
  data: DoctorAdminPayload;
  patch: PatchFn;
}) {
  const update = (index: number, value: Partial<DoctorAdminReview>) =>
    patch('reviews', data.reviews.map((row, i) => i === index ? { ...row, ...value } : row));

  return (
    <Section title="환자 후기">
      <div className="space-y-3">
        {data.reviews.map((item, index) => (
          <div key={`review-${index}`} className="rounded-lg border border-[#ECECEF] p-3">
            <div className="flex gap-3">
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                <Input id={`admin-review-${index}-patient`} name={`doctorReview.${index}.patientName`} value={item.patientName} onChange={(e) => update(index, { patientName: e.target.value })} placeholder="환자명(마스킹)" />
                <div className="grid grid-cols-2 gap-3">
                  <Input id={`admin-review-${index}-age`} name={`doctorReview.${index}.age`} type="number" value={item.age} onChange={(e) => update(index, { age: e.target.value })} placeholder="나이" />
                  <Input id={`admin-review-${index}-gender`} name={`doctorReview.${index}.gender`} value={item.gender} onChange={(e) => update(index, { gender: e.target.value })} placeholder="성별" />
                </div>
                <Input id={`admin-review-${index}-treatment`} name={`doctorReview.${index}.treatment`} value={item.treatment} onChange={(e) => update(index, { treatment: e.target.value })} placeholder="치료정보" />
                <Input id={`admin-review-${index}-image`} name={`doctorReview.${index}.imageUrl`} value={item.imageUrl} onChange={(e) => update(index, { imageUrl: e.target.value })} placeholder="후기 이미지 URL" />
                <Input id={`admin-review-${index}-date`} name={`doctorReview.${index}.reviewedAt`} type="date" value={item.reviewedAt} onChange={(e) => update(index, { reviewedAt: e.target.value })} />
                <Visibility id={`admin-review-${index}-visible`} checked={item.isVisible} onChange={(checked) => update(index, { isVisible: checked })} />
                <Textarea id={`admin-review-${index}-content`} name={`doctorReview.${index}.content`} value={item.content} onChange={(e) => update(index, { content: e.target.value })} placeholder="후기 내용(선택)" className="md:col-span-2" />
              </div>
              <RowActions index={index} length={data.reviews.length} onMove={(from, to) => patch('reviews', moveItem(data.reviews, from, to))} onRemove={() => patch('reviews', data.reviews.filter((_, i) => i !== index))} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => patch('reviews', [...data.reviews, { patientName: '', age: '', gender: '', treatment: '', content: '', imageUrl: '', reviewedAt: '', isVisible: true }])}>
          <Plus className="size-4" /> 환자 후기 추가
        </Button>
      </div>
    </Section>
  );
}

function MediaEditor({
  data,
  patch,
}: {
  data: DoctorAdminPayload;
  patch: PatchFn;
}) {
  const update = (index: number, value: Partial<DoctorAdminMedia>) =>
    patch('media', data.media.map((row, i) => i === index ? { ...row, ...value } : row));

  return (
    <Section title="미디어">
      <div className="space-y-3">
        {data.media.map((item, index) => (
          <div key={`media-${index}`} className="rounded-lg border border-[#ECECEF] p-3">
            <div className="flex gap-3">
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                <select id={`admin-media-${index}-kind`} name={`doctorMedia.${index}.kind`} value={item.kind} onChange={(e) => update(index, { kind: e.target.value })} className="h-10 rounded-md border border-[#D4D4D8] bg-white px-3 text-sm">
                  <option value="VIDEO">영상</option>
                  <option value="ARTICLE">기사</option>
                  <option value="SOCIAL">SNS</option>
                  <option value="OTHER">기타</option>
                </select>
                <Input id={`admin-media-${index}-title`} name={`doctorMedia.${index}.title`} value={item.title} onChange={(e) => update(index, { title: e.target.value })} placeholder="미디어 제목" />
                <Input id={`admin-media-${index}-source`} name={`doctorMedia.${index}.source`} value={item.source} onChange={(e) => update(index, { source: e.target.value })} placeholder="출처" />
                <Input id={`admin-media-${index}-thumbnail`} name={`doctorMedia.${index}.thumbnailUrl`} value={item.thumbnailUrl} onChange={(e) => update(index, { thumbnailUrl: e.target.value })} placeholder="썸네일 URL" />
                <Input id={`admin-media-${index}-link`} name={`doctorMedia.${index}.linkUrl`} value={item.linkUrl} onChange={(e) => update(index, { linkUrl: e.target.value })} placeholder="링크 URL" />
                <Input id={`admin-media-${index}-date`} name={`doctorMedia.${index}.publishedAt`} type="date" value={item.publishedAt} onChange={(e) => update(index, { publishedAt: e.target.value })} />
                <Visibility id={`admin-media-${index}-featured`} checked={item.isFeatured} onChange={(checked) => update(index, { isFeatured: checked })} label="대표 미디어" />
                <Visibility id={`admin-media-${index}-visible`} checked={item.isVisible} onChange={(checked) => update(index, { isVisible: checked })} />
              </div>
              <RowActions index={index} length={data.media.length} onMove={(from, to) => patch('media', moveItem(data.media, from, to))} onRemove={() => patch('media', data.media.filter((_, i) => i !== index))} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => patch('media', [...data.media, { kind: 'VIDEO', title: '', source: '', thumbnailUrl: '', linkUrl: '/', publishedAt: '', isFeatured: false, isVisible: true }])}>
          <Plus className="size-4" /> 미디어 추가
        </Button>
      </div>
    </Section>
  );
}

function ConsultationEditor({
  data,
  patch,
}: {
  data: DoctorAdminPayload;
  patch: PatchFn;
}) {
  const update = (index: number, value: Partial<DoctorAdminConsultation>) =>
    patch('consultations', data.consultations.map((row, i) => i === index ? { ...row, ...value } : row));

  return (
    <Section
      title="의학상담"
      description="/community/consultation과 의료진 상세페이지가 동일한 상담 레코드를 사용합니다. 질문과 답변은 문단마다 한 줄씩 입력하세요."
    >
      <div className="space-y-3">
        {data.consultations.map((item, index) => (
          <div key={`consultation-${item.id ?? 'new'}-${index}`} className="rounded-lg border border-[#ECECEF] p-3">
            <div className="flex gap-3">
              <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                <Input id={`admin-consultation-${index}-primary`} name={`doctorConsultation.${index}.categoryPrimary`} value={item.categoryPrimary} onChange={(e) => update(index, { categoryPrimary: e.target.value })} placeholder="대분류" />
                <Input id={`admin-consultation-${index}-secondary`} name={`doctorConsultation.${index}.categorySecondary`} value={item.categorySecondary} onChange={(e) => update(index, { categorySecondary: e.target.value })} placeholder="세부분류" />
                <Input id={`admin-consultation-${index}-title`} name={`doctorConsultation.${index}.title`} value={item.title} onChange={(e) => update(index, { title: e.target.value })} placeholder="상담 제목" className="md:col-span-2" />
                <Textarea id={`admin-consultation-${index}-question`} name={`doctorConsultation.${index}.question`} value={item.questionText} onChange={(e) => update(index, { questionText: e.target.value })} placeholder="질문 문단 (한 줄당 한 문단)" className="md:col-span-2" />
                <Textarea id={`admin-consultation-${index}-answer`} name={`doctorConsultation.${index}.answer`} value={item.answerText} onChange={(e) => update(index, { answerText: e.target.value })} placeholder="답변 문단 (한 줄당 한 문단)" className="md:col-span-2" />
                <Input id={`admin-consultation-${index}-image`} name={`doctorConsultation.${index}.imageUrl`} value={item.imageUrl} onChange={(e) => update(index, { imageUrl: e.target.value })} placeholder="첨부 이미지 URL" />
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-xs text-[#71717A]">게시일<Input id={`admin-consultation-${index}-published`} name={`doctorConsultation.${index}.publishedAt`} type="date" value={item.publishedAt} onChange={(e) => update(index, { publishedAt: e.target.value })} className="mt-1" /></label>
                  <label className="text-xs text-[#71717A]">답변일<Input id={`admin-consultation-${index}-answer-date`} name={`doctorConsultation.${index}.answerDate`} type="date" value={item.answerDate} onChange={(e) => update(index, { answerDate: e.target.value })} className="mt-1" /></label>
                </div>
                <div className="flex flex-wrap gap-4 md:col-span-2">
                  <Visibility id={`admin-consultation-${index}-visible`} checked={item.isVisible} onChange={(checked) => update(index, { isVisible: checked })} />
                  <Visibility id={`admin-consultation-${index}-private`} checked={item.isPrivate} onChange={(checked) => update(index, { isPrivate: checked })} label="비공개" />
                  <Visibility id={`admin-consultation-${index}-link-icon`} checked={item.hasLinkIcon} onChange={(checked) => update(index, { hasLinkIcon: checked })} label="링크 아이콘" />
                </div>
              </div>
              <RowActions index={index} length={data.consultations.length} onMove={(from, to) => patch('consultations', moveItem(data.consultations, from, to))} onRemove={() => patch('consultations', data.consultations.filter((_, i) => i !== index))} />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => patch('consultations', [...data.consultations, { categoryPrimary: '정맥', categorySecondary: '', title: '', questionText: '', imageUrl: '', isPrivate: false, hasLinkIcon: false, answerText: '', answerDate: '', publishedAt: new Date().toISOString().slice(0, 10), isVisible: true }])}>
          <Plus className="size-4" /> 의학상담 추가
        </Button>
      </div>
    </Section>
  );
}
