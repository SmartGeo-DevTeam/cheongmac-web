import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import {
  ClipboardPenLine,
  FileCheck2,
  IdCard,
  Soup,
  Triangle,
  UserRoundCheck,
} from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import HospitalizedBulletNotices from '@/app/_ui/guide/hospitalized/bullet-notices';
import { dischargeProcedure } from '@/app/_data/guide/hospitalized/discharge/procedure';

// 퇴원 절차별 아이콘
const dischargeIcons = [
  UserRoundCheck,
  ClipboardPenLine,
  IdCard,
  Soup,
  FileCheck2,
];

export default function HospitalizedDischargeProcedure() {
  return (
    <section id="guide-hospitalized-discharge-procedure">
      <Inner>
        <SectionBlock title="퇴원 절차">
          <HospitalizedBulletNotices
            notices={['정규 퇴원 시간은 평일 09:00 ~ 17:30 입니다.']}
          />

          <ul
            className="mt-5 space-y-5
            xl:mt-10 xl:flex xl:items-stretch xl:gap-3 xl:space-y-0"
          >
            {dischargeProcedure.map((procedure, index) => {
              const Icon = dischargeIcons[index];

              return (
                <Fragment key={procedure.title}>
                  <li
                    className="flex gap-3
                    xl:flex-1 xl:pt-4 xl:pb-8 xl:flex-col xl:items-center xl:rounded-xl xl:bg-subtle"
                  >
                    {/* 아이콘과 연결 화살표 */}
                    <div
                      className="size-17.5 flex items-center justify-center rounded-full bg-subtle
                    xl:size-26"
                    >
                      <Icon
                        className="size-8 text-green-300
                      xl:size-12"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* 퇴원 절차 내용 */}
                    <div
                      className="mt-3
                      xl:mt-0"
                    >
                      <div
                        className="flex items-center gap-1
                      xl:flex-col"
                      >
                        <span
                          className="text-mo-label text-accent
                        xl:font-bold xl:text-[18px]"
                        >
                          {String(index + 1).padStart(2, '0')}.
                        </span>

                        <h3
                          className="font-bold text-[18px]
                        xl:text-pc-heading-2"
                        >
                          {procedure.title}
                        </h3>
                      </div>

                      <p
                        className="break-keep text-mo-body-2 text-tertiary
                      xl:mt-2 xl:px-8 xl:text-center xl:text-pc-body-2"
                      >
                        {procedure.description}
                      </p>
                    </div>
                  </li>

                  {index < dischargeProcedure.length - 1 && (
                    <div
                      className="hidden
                      xl:flex xl:items-center"
                    >
                      <Triangle
                        className="size-3 fill-gray-400 stroke-0 rotate-180
                        xl:size-4 xl:rotate-90"
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </ul>
        </SectionBlock>
      </Inner>
    </section>
  );
}
