'use client';

import type { TreatmentMethod } from '@/app/_types/vascular/treatment-method';
import { useState, type KeyboardEvent } from 'react';
import TreatmentDetail from './detail';

type TreatmentSelectorProps = {
  id: string;
  ariaLabel: string;
  methods: readonly TreatmentMethod[];
};

const inactiveDesktopBackgrounds = [
  'xl:bg-green-700',
  'xl:bg-green-700',
  'xl:bg-[#3C8375]',
  'xl:bg-[#3C8375]',
  'xl:bg-green-300',
];

/** 치료법 선택 탭과 키보드 이동을 모든 질환 페이지에서 동일하게 처리합니다. */
export default function TreatmentSelector({
  id,
  ariaLabel,
  methods,
}: TreatmentSelectorProps) {
  const [activeId, setActiveId] = useState(methods[0]?.id ?? '');
  const selected =
    methods.find((method) => method.id === activeId) ?? methods[0];

  if (!selected) return null;

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % methods.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + methods.length) % methods.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = methods.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveId(methods[next].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <div id={`${id}-selector`}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`mt-5 grid grid-cols-2 gap-1 text-[15px]
          xl:mt-20 xl:grid-cols-5`}
      >
        {methods.map((method, index) => {
          const active = selected.id === method.id;
          return (
            <button
              key={method.id}
              type="button"
              role="tab"
              id={`${id}-${method.id}-tab`}
              aria-selected={active}
              aria-controls={active ? `${id}-${method.id}` : undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(method.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`py-2.5 rounded-lg border border-default
                ${active ? 'bg-green-700' : 'bg-base'}
                xl:px-6 xl:py-6 xl:rounded-t-[20px] xl:rounded-b-none xl:border-0 xl:text-left
                ${
                  active
                    ? 'xl:bg-base'
                    : (inactiveDesktopBackgrounds[index] ?? 'xl:bg-green-700')
                }`}
            >
              <span
                className={`hidden
                  xl:block xl:font-medium xl:text-[16px]
                  ${active ? 'xl:text-green-900' : 'xl:text-inverse'}`}
              >
                {method.category}
              </span>
              <span
                className={`${active ? 'font-semibold text-inverse' : 'font-medium text-gray-700'}
                  xl:font-bold xl:text-[22px]
                  ${active ? 'xl:text-green-900' : 'xl:text-inverse'}`}
              >
                {method.title}
              </span>
            </button>
          );
        })}
      </div>
      <TreatmentDetail id={id} method={selected} />
    </div>
  );
}
