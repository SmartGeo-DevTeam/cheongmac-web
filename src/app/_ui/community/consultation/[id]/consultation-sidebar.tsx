import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ConsultationFieldId } from '@/app/_data/community/consultation/consultations';

/** 디자인 참고용 추천 콘텐츠. 실제 상세 연결은 콘텐츠 API 도입 시 교체합니다. */
const recommendations = [
  { label: '하지정맥류', category: 'varicose' },
  { label: '정계정맥류', category: 'varicocele' },
  { label: '골반정맥류', category: 'pelvic-vein' },
] as const satisfies ReadonlyArray<{
  label: string;
  category: ConsultationFieldId;
}>;

export default function ConsultationSidebar() {
  return (
    <>
      <section
        className="mt-15
        xl:mt-0"
      >
        <div
          className="flex justify-between items-end
          xl:flex-col xl:items-start"
        >
          <h2
            className="font-bold text-[20px]
            xl:text-pc-heading-1"
          >
            관련 콘텐츠
          </h2>
          <p
            className="font-medium text-secondary text-[14px]
            xl:text-[16px]"
          >
            진료분야별 상담 보기
          </p>
        </div>

        <ul
          className="mt-3 space-y-2
          xl:mt-5"
        >
          {recommendations.map((item) => (
            <li key={item.category}>
              <Link
                href={`/community/consultation?category=${item.category}`}
                className="px-5 py-4 flex justify-between items-center rounded-lg bg-subtle font-medium text-[18px]
                xl:px-6 xl:py-2.5 xl:text-[20px]"
              >
                <span>{item.label}</span>
                <div
                  className="size-10.5 flex justify-center items-center rounded-full bg-white
                  xl:size-8"
                >
                  <ArrowUpRight
                    className="size-6
                    xl:size-5"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="relative mt-20
        xl:mt-15"
      >
        <h2
          className="font-bold text-[20px]
          xl:text-pc-heading-1"
        >
          이달의 칼럼
        </h2>

        <div
          className="mt-3 px-5 pt-11.5 pb-15 rounded-xl bg-subtle
          xl:mt-5 xl:p-6 xl:pb-15"
        >
          <p
            className="w-3/5 font-medium text-[18px]
            xl:w-full xl:leading-[170%] xl:text-[16px]"
          >
            자궁근종 수술 고민?
            <br />
            로봇 vs 복강경 vs 색전술
            <br />
            나에게 맞는 선택은?
          </p>

          <div
            className="absolute right-5 bottom-5 size-10.5 flex justify-center items-center rounded-full bg-white
            xl:size-8"
          >
            <ArrowUpRight
              className="size-6
              xl:size-5"
            />
          </div>
        </div>
      </section>

      <section
        className="relative mt-10 mb-16 px-6 pt-16 pb-35 rounded-xl bg-ai-subtle
        xl:mt-15 xl:p-6 xl:pb-30"
      >
        <h3
          className="text-mo-heading-1
          xl:text-pc-heading-1"
        >
          맥GPT에게 물어보기
        </h3>
        <p className="mt-2 text-[16px]">
          AI에게 물어보고 실시간으로 답변을 얻어보세요.
        </p>

        <div
          className="absolute left-0 bottom-0 w-2/5 aspect-179/139
          xl:w-3/5"
        >
          <Image src={`/consultation/ai.png`} alt="ai" fill />
        </div>

        <div
          className="absolute right-5 bottom-5 size-10.5 flex justify-center items-center rounded-full bg-white
            xl:size-8"
        >
          <ArrowUpRight
            className="size-6
              xl:size-5"
          />
        </div>
      </section>
    </>
  );
}
