'use client';

import { useState, type KeyboardEvent } from 'react';
import type { OcclusionTreatmentMethod } from '@/app/_types/vascular/arterial/occlusion/treatments';
import TreatmentDetail from './detail';

type TreatmentSelectorProps = {
  methods: readonly OcclusionTreatmentMethod[];
};

const inactiveDesktopBackgrounds = [
  'xl:bg-green-700',
  'xl:bg-green-700',
  'xl:bg-[#3C8375]',
  'xl:bg-[#3C8375]',
  'xl:bg-green-300',
];

export default function TreatmentSelector({ methods }: TreatmentSelectorProps) {
  const [activeId, setActiveId] = useState(methods[0]?.id ?? '');
  const selected = methods.find((method) => method.id === activeId) ?? methods[0];

  if (!selected) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': next = (index + 1) % methods.length; break;
      case 'ArrowLeft':
      case 'ArrowUp': next = (index - 1 + methods.length) % methods.length; break;
      case 'Home': next = 0; break;
      case 'End': next = methods.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveId(methods[next].id);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="하지동맥폐색증 치료 방법"
        className="mt-5 grid grid-cols-2 gap-1 text-[15px] xl:mt-20 xl:grid-cols-5"
      >
        {methods.map((method, index) => {
          const active = selected.id === method.id;
          return (
            <button
              key={method.id}
              type="button"
              role="tab"
              id={`vascular-arterial-occlusion-treatments-${method.id}-tab`}
              aria-selected={active}
              aria-controls={active ? `vascular-arterial-occlusion-treatments-${method.id}` : undefined}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(method.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`py-2.5 rounded-lg border border-default xl:px-4 xl:py-6 xl:rounded-t-[20px] xl:rounded-b-none xl:border-0 xl:text-left
                ${active
                  ? 'bg-green-700 xl:bg-base'
                  : `bg-base ${inactiveDesktopBackgrounds[index] ?? 'xl:bg-green-700'}`}`}
            >
              <span
                className={`hidden xl:block xl:font-medium xl:text-[16px]
                  ${active ? 'xl:text-green-900' : 'xl:text-inverse'}`}
              >
                {method.category}
              </span>
              <span
                className={`${active ? 'font-semibold text-inverse xl:font-bold xl:text-green-900' : 'font-medium text-gray-700 xl:font-bold xl:text-inverse'} xl:text-[22px]`}
              >
                {method.title}
              </span>
            </button>
          );
        })}
      </div>
      <TreatmentDetail method={selected} />
    </div>
  );
}
