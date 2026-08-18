'use client';

import { openMacGptSearch } from '@/app/_components/mac-gpt-search';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RELATED_ITEMS = ['하지정맥류', '정계정맥류', '골반정맥류'];

export default function ConsultationSidebar() {
  return (
    <aside className="space-y-8 xl:space-y-11">
      <section>
        <div className="mb-3 flex items-end justify-between xl:block">
          <h3 className="text-[17px] font-bold tracking-[-0.04em] text-[#292F36] xl:text-[22px]">
            관련 콘텐츠
          </h3>
          <Link
            href="/"
            className="text-[10px] tracking-[-0.03em] text-[#8D939B] xl:mt-1 xl:block xl:text-[12px]"
          >
            질환정보 바로가기
          </Link>
        </div>

        <div className="space-y-2">
          {RELATED_ITEMS.map((item) => (
            <Link
              key={item}
              href="/"
              className="flex min-h-11 items-center justify-between rounded-[7px] bg-[#F5F6F7] px-3.5 text-[13px] font-medium tracking-[-0.035em] text-[#4B5159] xl:min-h-12 xl:px-4 xl:text-[14px]"
            >
              <span>{item}</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-[#555B63] xl:size-9">
                <ArrowUpRight className="size-4" strokeWidth={1.7} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-[17px] font-bold tracking-[-0.04em] text-[#292F36] xl:text-[22px]">
          이달의 칼럼
        </h3>
        <Link
          href="/"
          className="relative block min-h-[118px] rounded-[8px] bg-[#F5F6F7] p-4 pr-12 xl:min-h-[132px] xl:p-5"
        >
          <p className="text-[10px] font-semibold tracking-[-0.03em] text-[#626971] xl:text-[12px]">
            혈관외과 박용범 원장
          </p>
          <p className="mt-3 whitespace-pre-line text-[13px] font-medium leading-[1.55] tracking-[-0.04em] text-[#333941] xl:text-[15px]">
            {
              '자궁근종 수술 고민?\n로봇 vs 복강경 vs 색전술\n나에게 맞는 선택은?'
            }
          </p>
          <span className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-white xl:size-9">
            <ArrowUpRight className="size-4" strokeWidth={1.7} />
          </span>
        </Link>
      </section>

      <section>
        <button
          type="button"
          onClick={() => openMacGptSearch('다리 부종과 하지정맥류가 궁금해요')}
          className="relative block min-h-[148px] w-full overflow-hidden rounded-[8px] bg-[#DFF5EF] p-4 text-left xl:min-h-[168px] xl:p-5"
        >
          <h3 className="text-[17px] font-bold tracking-[-0.04em] text-[#28323A] xl:text-[20px]">
            맥GPT에게 물어보기
          </h3>
          <p className="mt-1 max-w-[155px] break-keep text-[11px] leading-[1.55] tracking-[-0.03em] text-[#55616A] xl:max-w-[175px] xl:text-[13px]">
            AI에게 질환 관련 문의하고 실시간으로 답변을 받아보세요.
          </p>

          <Image
            src="/assets/community/consultation/macgpt-atom.png"
            alt="맥GPT"
            width={105}
            height={72}
            className="bottom-0 left-3 h-auto w-[105px] xl:left-4 xl:w-[120px]"
          />

          <span className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-full bg-white xl:size-9">
            <ArrowUpRight className="size-4" strokeWidth={1.7} />
          </span>
        </button>
      </section>
    </aside>
  );
}
