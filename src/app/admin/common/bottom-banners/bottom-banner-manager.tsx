'use client';

import {
  updatePageBottomBanner,
  type UpdatePageBottomBannerInput,
} from '@/app/admin/_actions/page-bottom-banner';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

export type AdminBottomBannerItem = {
  id: string;
  emoji: string;
  iconColor: string;
  title: string;
  linkTitle: string;
  href: string;
  sortOrder: number;
  isVisible: boolean;
  visiblePaths: string[];
};

export type BottomBannerPageOption = {
  path: string;
  label: string;
  group: string;
};

function normalized(values: string[]) {
  return [...values].sort();
}

function BannerEditor({
  item,
  pageOptions,
}: {
  item: AdminBottomBannerItem;
  pageOptions: BottomBannerPageOption[];
}) {
  const router = useRouter();
  const [emoji, setEmoji] = useState(item.emoji);
  const [iconColor, setIconColor] = useState(item.iconColor);
  const [title, setTitle] = useState(item.title);
  const [linkTitle, setLinkTitle] = useState(item.linkTitle);
  const [href, setHref] = useState(item.href);
  const [isVisible, setIsVisible] = useState(item.isVisible);
  const [visiblePaths, setVisiblePaths] = useState<string[]>(
    normalized(item.visiblePaths),
  );
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setEmoji(item.emoji);
    setIconColor(item.iconColor);
    setTitle(item.title);
    setLinkTitle(item.linkTitle);
    setHref(item.href);
    setIsVisible(item.isVisible);
    setVisiblePaths(normalized(item.visiblePaths));
    setMessage('');
  }, [item]);

  const isDirty =
    emoji !== item.emoji ||
    iconColor.toUpperCase() !== item.iconColor.toUpperCase() ||
    title !== item.title ||
    linkTitle !== item.linkTitle ||
    href !== item.href ||
    isVisible !== item.isVisible ||
    JSON.stringify(normalized(visiblePaths)) !==
      JSON.stringify(normalized(item.visiblePaths));

  const groups = useMemo(() => {
    const map = new Map<string, BottomBannerPageOption[]>();

    for (const option of pageOptions) {
      const list = map.get(option.group) ?? [];
      list.push(option);
      map.set(option.group, list);
    }

    return Array.from(map.entries());
  }, [pageOptions]);

  const togglePath = (path: string, checked: boolean) => {
    setMessage('');
    setVisiblePaths((current) => {
      if (checked) return normalized(Array.from(new Set([...current, path])));
      return current.filter((value) => value !== path);
    });
  };

  const save = () => {
    if (!isDirty || isPending) return;

    const input: UpdatePageBottomBannerInput = {
      id: item.id,
      emoji,
      iconColor,
      title,
      linkTitle,
      href,
      isVisible,
      visiblePaths,
    };

    setMessage('');

    startTransition(async () => {
      const result = await updatePageBottomBanner(input);

      if (!result.ok) {
        setMessage(result.error ?? '저장하지 못했습니다.');
        return;
      }

      setMessage('저장했습니다.');
      router.refresh();
    });
  };

  return (
    <article className="rounded-xl border border-[#E4E4E7] bg-white p-4 md:p-5">
      <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-medium text-[#A1A1AA]">
            배너 {item.sortOrder + 1}
          </p>

          <div className="mt-3 flex min-h-[112px] items-center gap-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-4">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
              style={{ backgroundColor: iconColor || '#006651' }}
              aria-hidden="true"
            >
              {emoji || '✨'}
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-base text-[#27272A]">
                {title || '배너 제목'}
              </strong>
              <span className="mt-1 block truncate text-sm text-[#71717A]">
                {linkTitle || '바로가기'}
              </span>
            </span>
          </div>

          <label className="mt-3 inline-flex h-10 items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-3 text-sm text-[#52525B]">
            <input
              id={`admin-bottom-banner-${item.id}-visible`}
              name={`adminBottomBanner.${item.id}.isVisible`}
              type="checkbox"
              checked={isVisible}
              onChange={(event) => {
                setMessage('');
                setIsVisible(event.target.checked);
              }}
              className="size-4 accent-[#18181B]"
            />
            배너 사용
          </label>
        </div>

        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#52525B]">이모지</span>
              <Input
                id={`admin-bottom-banner-${item.id}-emoji`}
                name={`adminBottomBanner.${item.id}.emoji`}
                value={emoji}
                maxLength={12}
                onChange={(event) => {
                  setMessage('');
                  setEmoji(event.target.value);
                }}
                placeholder="예: 📅"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#52525B]">
                아이콘 배경색
              </span>
              <div className="flex gap-2">
                <input
                  id={`admin-bottom-banner-${item.id}-color-picker`}
                  name={`adminBottomBanner.${item.id}.colorPicker`}
                  type="color"
                  value={/^#[0-9A-Fa-f]{6}$/.test(iconColor) ? iconColor : '#006651'}
                  onChange={(event) => {
                    setMessage('');
                    setIconColor(event.target.value.toUpperCase());
                  }}
                  className="h-10 w-12 rounded-md border border-[#D4D4D8] bg-white p-1"
                  aria-label={`${item.sortOrder + 1}번 배너 아이콘 색상 선택`}
                />
                <Input
                  id={`admin-bottom-banner-${item.id}-color`}
                  name={`adminBottomBanner.${item.id}.iconColor`}
                  value={iconColor}
                  onChange={(event) => {
                    setMessage('');
                    setIconColor(event.target.value);
                  }}
                  placeholder="#006651"
                />
              </div>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#52525B]">제목</span>
              <Input
                id={`admin-bottom-banner-${item.id}-title`}
                name={`adminBottomBanner.${item.id}.title`}
                value={title}
                maxLength={60}
                onChange={(event) => {
                  setMessage('');
                  setTitle(event.target.value);
                }}
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#52525B]">
                링크 타이틀
              </span>
              <Input
                id={`admin-bottom-banner-${item.id}-link-title`}
                name={`adminBottomBanner.${item.id}.linkTitle`}
                value={linkTitle}
                maxLength={30}
                onChange={(event) => {
                  setMessage('');
                  setLinkTitle(event.target.value);
                }}
              />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#52525B]">링크 주소</span>
            <div className="flex gap-2">
              <Input
                id={`admin-bottom-banner-${item.id}-href`}
                name={`adminBottomBanner.${item.id}.href`}
                value={href}
                onChange={(event) => {
                  setMessage('');
                  setHref(event.target.value);
                }}
                placeholder="/community/notice"
              />
              <Link
                href={href || '/'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-[#71717A] hover:bg-[#F4F4F5]"
                aria-label={`${item.sortOrder + 1}번 배너 링크 새 창에서 보기`}
              >
                <ExternalLink className="size-4" />
              </Link>
            </div>
          </label>

          <fieldset className="rounded-xl border border-[#E4E4E7] p-4">
            <legend className="px-1 text-sm font-semibold text-[#27272A]">
              노출 페이지
            </legend>
            <p className="mb-4 mt-1 text-xs leading-5 text-[#71717A]">
              체크한 사용자 페이지에서만 이 배너가 노출됩니다.
            </p>

            <div className="grid gap-4 lg:grid-cols-2">
              {groups.map(([group, options]) => (
                <div key={group}>
                  <p className="mb-2 text-xs font-semibold text-[#71717A]">
                    {group}
                  </p>
                  <div className="space-y-2">
                    {options.map((option, optionIndex) => {
                      const checked = visiblePaths.includes(option.path);
                      const checkboxId = `admin-bottom-banner-${item.id}-page-${optionIndex}-${option.path.replace(/[^A-Za-z0-9]/g, '-')}`;

                      return (
                        <label
                          key={option.path}
                          htmlFor={checkboxId}
                          className="flex cursor-pointer items-center gap-2 text-sm text-[#3F3F46]"
                        >
                          <input
                            id={checkboxId}
                            name={`adminBottomBanner.${item.id}.visiblePaths`}
                            type="checkbox"
                            value={option.path}
                            checked={checked}
                            onChange={(event) =>
                              togglePath(option.path, event.target.checked)
                            }
                            className="size-4 accent-[#18181B]"
                          />
                          <span>{option.label}</span>
                          <span className="text-xs text-[#A1A1AA]">
                            {option.path}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-end gap-3">
            {message ? (
              <p
                className={`mr-auto text-xs ${
                  message === '저장했습니다.'
                    ? 'text-[#15803D]'
                    : 'text-red-600'
                }`}
              >
                {message}
              </p>
            ) : null}

            <Button disabled={isPending || !isDirty} onClick={save}>
              {isPending ? '처리 중...' : '저장'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BottomBannerManager({
  initialItems,
  pageOptions,
}: {
  initialItems: AdminBottomBannerItem[];
  pageOptions: BottomBannerPageOption[];
}) {
  return (
    <div className="space-y-4">
      {initialItems.map((item) => (
        <BannerEditor
          key={item.id}
          item={item}
          pageOptions={pageOptions}
        />
      ))}
    </div>
  );
}
