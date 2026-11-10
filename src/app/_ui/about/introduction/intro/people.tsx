import Inner from '@/app/_components/common/inner';
import IntroductionIntroSectionHeading from '@/app/_ui/about/introduction/intro/section-heading';
import Image from 'next/image';
import { peopleImages } from '@/app/_data/about/introduction/intro/people';

export default function IntroductionIntroPeople() {
  return (
    <section id="about-introduction-people">
      <div
        className="pt-20 pb-15 bg-[url('/introduction/intro/people-m.png')] bg-cover bg-center bg-no-repeat
        xl:py-30 xl:bg-[url('/introduction/intro/people-pc.png')]"
      >
        <Inner className="text-center">
          <IntroductionIntroSectionHeading
            subTitle="청맥이 만난 사람들"
            title={
              <>
                치료를 넘어,
                <br />
                사람에게 남은 이야기
              </>
            }
            subTitleColor="text-brand"
            titleColor="text-primary"
          />
        </Inner>

        <div
          className="mx-auto mt-10 px-3 grid w-full grid-cols-2 items-start gap-3
        xl:mt-20 xl:grid-cols-3 xl:gap-5 xl:max-w-212.5"
        >
          <div
            className="hidden flex-col gap-3.5
          xl:mt-24 xl:flex xl:gap-5"
          >
            {peopleImages.left.map((image) => (
              <div
                key={image.id}
                className={`w-full ${image.aspect} rounded-xl border border-white overflow-hidden`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1000}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div
            className="flex min-w-0 flex-col gap-3
          xl:gap-5"
          >
            {peopleImages.center.map((image) => (
              <div
                key={image.id}
                className={`w-full ${image.aspect} rounded-xl border border-white overflow-hidden`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1000}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div
            className="mt-9 flex min-w-0 flex-col gap-3
          xl:mt-14 xl:gap-5"
          >
            {peopleImages.right.map((image) => (
              <div
                key={image.id}
                className={`w-full ${image.aspect} rounded-xl border border-white overflow-hidden`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1000}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
