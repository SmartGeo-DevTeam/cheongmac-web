import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import { Triangle } from 'lucide-react';
import { Fragment } from 'react';
import { admissionProcedure } from '@/app/_data/guide/hospitalized/preparation/procedure';

export default function HospitalizedPreparationProcedure() {
  return (
    <section id="guide-hospitalized-admission-procedure">
      <Inner>
        <SectionBlock title="입원 절차" variant="side">
          <ul className="mt-5 grid gap-2 xl:mt-0 xl:flex xl:items-center xl:gap-3">
            {admissionProcedure.map((item, index) => (
              <Fragment key={item.title}>
                <li className="px-6 py-5 rounded-xl border border-default break-keep xl:flex-1 xl:px-10 xl:py-6">
                  <div className="flex items-center gap-2 xl:gap-3">
                    <span className="font-black text-[24px] text-accent-ai-strong xl:text-[34px]">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3 className="text-mo-heading-2 xl:text-pc-heading-2">
                      {item.title}
                    </h3>
                  </div>

                  {item.description && (
                    <p className="text-mo-body-2 text-secondary xl:mt-1 xl:pt-3 xl:border-t xl:border-default xl:text-[18px]">
                      {item.description}
                    </p>
                  )}
                </li>

                {/* 마지막 절차를 제외하고 연결 화살표 표시 */}
                {index < admissionProcedure.length - 1 && (
                  <li
                    aria-hidden="true"
                    role="presentation"
                    className="flex items-center justify-center"
                  >
                    <Triangle className="size-3 fill-gray-400 stroke-0 rotate-180 xl:size-4 xl:rotate-90" />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </SectionBlock>
      </Inner>
    </section>
  );
}
