import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function IntroductionIntroMessage() {
  return (
    <section id="about-introduction-message">
      <div className="mt-20">
        <Inner
          className="grid grid-cols-1
        xl:grid-cols-[5.5fr_4.5fr] xl:grid-rows-[auto_1fr] xl:gap-x-20
      "
        >
          {/* 1 */}
          <div
            className="flex flex-col items-center gap-1 text-center
          xl:col-start-2 xl:col-end-3 xl:items-start xl:text-left"
          >
            <p
              className="text-pc-body-1
            xl:mt-6 xl:text-[32px]"
            >
              이곳은
            </p>
            <div
              className="text-mo-display-2 space-y-1
            xl:space-y-3 xl:text-[48px]"
            >
              <p
                className="px-3 py-2 bg-linear-to-r from-[#FF824F] to-[#F64700] text-white
              xl:xl:mt-3"
              >
                대한민국 혈관특별시
              </p>
              <p>청맥병원입니다.</p>
            </div>
          </div>

          {/* 2 */}
          <div
            className="my-25 px-19
          xl:m-0 xl:p-0 xl:col-start-1 xl:col-end-2 xl:row-start-1 xl:row-end-3
        "
          >
            <div
              className="relative aspect-737/820
            xl:aspect-auto xl:w-full xl:h-full xl:object-cover"
            >
              <Image
                src="/introduction/intro/aeroview.png"
                alt="aeroview"
                fill
              />
            </div>
          </div>

          {/* 3 */}
          <div
            className="space-y-10
          xl:pt-17 xl:col-start-2 xl:col-end-3 xl:text-[20px]"
          >
            <div>
              <p>
                우리 몸 어디에도 혈관이 닿지 않는 곳은 없기에, 혈관 건강을
                지키는 일은 곧 사람의 삶을 지키는 일이라 믿습니다. 2010년 개원
                이후 청맥병원이 오직 혈관질환 한 길을 걸어온 이유입니다.
              </p>
            </div>
            <div>
              <p>그 길의 중심에는 언제나 사람이 있었습니다.</p>
              <p>
                사람을 근본으로 여기는{' '}
                <strong className="text-mo-heading-1 text-accent">
                  이인위본(以人爲本)
                </strong>
                의 정신 아래, 환자 한 분 한 분에게 꼭 필요한 치료를 제공합니다.
              </p>
            </div>
            <div>
              <p>
                진료실 밖에서도 연구하고, 가르치고, 함께 나누는 모든 노력은 결국
                환자를 향합니다. 더 나은 의료를 위해 끊임없이 고민하고 실천하며
                청맥병원은 여러분과 함께, 더 멀리 나아가겠습니다.
              </p>
            </div>
            <div>
              <p className="font-bold text-center">- 청맥병원 일동 -</p>
            </div>
          </div>
        </Inner>
      </div>
    </section>
  );
}
