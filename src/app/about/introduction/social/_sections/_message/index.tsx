import Inner from '@/app/_components/common/inner';
import Image from 'next/image';

export default function Message() {
  return (
    <section id="introduction-social-message">
      <div
        className="mt-15 border-b-2 border-b-strong
      xl:mt-50 xl:border-0"
      >
        <Inner usePaddingHorizontalInMobile={false}>
          <div
            className="grid grid-cols-1
            xl:grid-cols-2 xl:gap-5"
          >
            <div
              className="relative w-full aspect-375/220
            xl:aspect-square xl:rounded-xl xl:overflow-clip"
            >
              <Image
                src={`/introduction/social/hands.png`}
                alt="hands"
                fill
                className="object-cover"
              />
            </div>
            <div
              className="px-5 pt-5 pb-20 space-y-3 text-center
          xl:flex xl:flex-col xl:justify-center xl: xl:items-center"
            >
              <p
                className="text-mo-label text-accent
              xl:text-[16px]"
              >
                마음을 나누는 일, 나눔으로 잇는 건강한 지역사회
              </p>
              <p
                className="text-mo-title-1
              xl:text-pc-title-1"
              >
                우리의 작은 실천이 모여
                <br />
                따뜻한 세상을
                <br />
                연결한다고 믿습니다.
              </p>
            </div>
          </div>
        </Inner>
      </div>
    </section>
  );
}
