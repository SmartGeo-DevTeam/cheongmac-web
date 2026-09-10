'use client';

import type {
  TypographySettingValue,
  TypographyTag,
} from '@/_lib/typography';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import {
  Monitor,
  RotateCcw,
  Save,
  Smartphone,
} from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { saveTypographySettings } from './actions';

const TAG_LABELS: Record<TypographyTag, string> = {
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6',
  p: 'P',
};

const SAMPLE_TEXT: Record<TypographyTag, string> = {
  h1: '페이지 대표 제목입니다',
  h2: '본문의 큰 섹션 제목입니다',
  h3: '세부 섹션 제목입니다',
  h4: '본문 소제목입니다',
  h5: '작은 소제목입니다',
  h6: '보조 제목입니다',
  p: '본문 문장은 읽기 편한 크기와 줄높이를 기준으로 표시됩니다.',
};

function cloneSettings(
  values: TypographySettingValue[],
): TypographySettingValue[] {
  return values.map((value) => ({ ...value }));
}

function NumberField({
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
}) {
  return (
    <div className="relative">
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
        className="pr-11"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A1A1AA]">
        {suffix}
      </span>
    </div>
  );
}

function Preview({
  setting,
}: {
  setting: TypographySettingValue;
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      <div className="min-w-0 overflow-hidden rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] p-4">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#71717A]">
          <Smartphone className="size-3.5" />
          모바일
        </div>
        <div
          className="break-keep text-[#27272A]"
          style={{
            fontSize: setting.mobileFontSize,
            lineHeight: setting.mobileLineHeight,
            fontWeight: setting.tag === 'p' ? 400 : 700,
          }}
        >
          {SAMPLE_TEXT[setting.tag]}
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] p-4">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#71717A]">
          <Monitor className="size-3.5" />
          데스크탑
        </div>
        <div
          className="break-keep text-[#27272A]"
          style={{
            fontSize: setting.desktopFontSize,
            lineHeight: setting.desktopLineHeight,
            fontWeight: setting.tag === 'p' ? 400 : 700,
          }}
        >
          {SAMPLE_TEXT[setting.tag]}
        </div>
      </div>
    </div>
  );
}

export default function TypographyManager({
  initialSettings,
}: {
  initialSettings: TypographySettingValue[];
}) {
  const [saved, setSaved] = useState(() =>
    cloneSettings(initialSettings),
  );
  const [draft, setDraft] = useState(() =>
    cloneSettings(initialSettings),
  );
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const isDirty = useMemo(
    () => JSON.stringify(saved) !== JSON.stringify(draft),
    [draft, saved],
  );

  const update = (
    tag: TypographyTag,
    key: Exclude<keyof TypographySettingValue, 'tag'>,
    value: number,
  ) => {
    setMessage('');
    setDraft((current) =>
      current.map((item) =>
        item.tag === tag ? { ...item, [key]: value } : item,
      ),
    );
  };

  const reset = () => {
    setDraft(cloneSettings(saved));
    setMessage('');
  };

  const save = () => {
    setMessage('');

    startTransition(async () => {
      const result = await saveTypographySettings(draft);

      setMessage(
        result.ok
          ? result.success ?? '저장했습니다.'
          : result.error ?? '저장하지 못했습니다.',
      );

      if (result.ok) {
        setSaved(cloneSettings(draft));
      }
    });
  };

  return (
    <div className="space-y-5">
      {message ? (
        <div className="rounded-lg bg-[#F4F4F5] px-4 py-3 text-sm text-[#52525B]">
          {message}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white">
        <div className="border-b border-[#E4E4E7] px-5 py-4">
          <p className="text-sm font-semibold text-[#27272A]">
            전역 본문 태그 설정
          </p>
          <p className="mt-1 text-xs leading-5 text-[#71717A]">
            모바일은 1280px 미만, 데스크탑은 1280px 이상에서 적용됩니다.
            font-size는 px, line-height는 배수 값으로 저장됩니다.
          </p>
        </div>

        <div className="divide-y divide-[#EEEEF0]">
          {draft.map((setting) => (
            <section
              key={setting.tag}
              className="grid gap-5 p-5 xl:grid-cols-[84px_minmax(0,440px)_minmax(0,1fr)] xl:items-start"
            >
              <div>
                <span className="inline-flex min-w-12 items-center justify-center rounded-md bg-[#18181B] px-2.5 py-1.5 text-sm font-semibold text-white">
                  {TAG_LABELS[setting.tag]}
                </span>
                {setting.tag === 'p' ? (
                  <p className="mt-2 text-xs leading-5 text-[#A1A1AA]">
                    본문 문단
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#ECECEF] p-4">
                  <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#52525B]">
                    <Smartphone className="size-4" />
                    모바일
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1.5">
                      <span className="text-xs text-[#71717A]">
                        font-size
                      </span>
                      <NumberField
                        value={setting.mobileFontSize}
                        min={10}
                        max={120}
                        step={1}
                        suffix="px"
                        onChange={(value) =>
                          update(
                            setting.tag,
                            'mobileFontSize',
                            value,
                          )
                        }
                      />
                    </label>
                    <label className="space-y-1.5">
                      <span className="text-xs text-[#71717A]">
                        line-height
                      </span>
                      <NumberField
                        value={setting.mobileLineHeight}
                        min={0.8}
                        max={3}
                        step={0.05}
                        suffix="×"
                        onChange={(value) =>
                          update(
                            setting.tag,
                            'mobileLineHeight',
                            value,
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-[#ECECEF] p-4">
                  <div className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#52525B]">
                    <Monitor className="size-4" />
                    데스크탑
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1.5">
                      <span className="text-xs text-[#71717A]">
                        font-size
                      </span>
                      <NumberField
                        value={setting.desktopFontSize}
                        min={10}
                        max={160}
                        step={1}
                        suffix="px"
                        onChange={(value) =>
                          update(
                            setting.tag,
                            'desktopFontSize',
                            value,
                          )
                        }
                      />
                    </label>
                    <label className="space-y-1.5">
                      <span className="text-xs text-[#71717A]">
                        line-height
                      </span>
                      <NumberField
                        value={setting.desktopLineHeight}
                        min={0.8}
                        max={3}
                        step={0.05}
                        suffix="×"
                        onChange={(value) =>
                          update(
                            setting.tag,
                            'desktopLineHeight',
                            value,
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Preview setting={setting} />
            </section>
          ))}
        </div>
      </div>

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-2 rounded-xl border border-[#E4E4E7] bg-white/95 p-3 shadow-lg backdrop-blur">
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          disabled={!isDirty || isPending}
        >
          <RotateCcw className="size-4" />
          변경 취소
        </Button>
        <Button
          type="button"
          onClick={save}
          disabled={!isDirty || isPending}
        >
          <Save className="size-4" />
          {isPending ? '저장 중...' : '전체 저장'}
        </Button>
      </div>
    </div>
  );
}
