import { Triangle } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import type { ProcedureItem } from '../types';

export default function ProcedureList({ items }: { items: ProcedureItem[] }) {
  return (
    <ul
      className={`mt-5 grid gap-2
        xl:mt-0 xl:flex xl:items-center xl:gap-3`}
    >
      {items.map((item, index) => (
        <Fragment key={item.title}>
          <li
            className="px-6 py-5 rounded-xl border border-default break-keep
            xl:flex-1 xl:px-10 xl:py-6"
          >
            <div
              className="flex items-center gap-2
              xl:gap-3"
            >
              <span
                className="font-black text-[24px] text-accent-ai-strong
                xl:text-[34px]"
              >
                {String(index + 1).padStart(2, '0')}.
              </span>
              <h3
                className="text-mo-heading-2
                xl:text-pc-heading-2"
              >
                {item.title}
              </h3>
            </div>
            <p
              className="text-mo-body-2 text-secondary
              xl:mt-1 xl:pt-3 xl:border-t xl:border-default xl:text-[18px]"
            >
              {item.description}
            </p>
          </li>

          {/* 마지막 아이템을 제외하고 화살표 표시 */}
          {index < items.length - 1 && (
            <li
              aria-hidden="true"
              role="presentation"
              className="flex items-center justify-center"
            >
              <Triangle
                className="size-3 fill-gray-400 stroke-0 rotate-180
                xl:size-4 xl:rotate-90"
              />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
}
