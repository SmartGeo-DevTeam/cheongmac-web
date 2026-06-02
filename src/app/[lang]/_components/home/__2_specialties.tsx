'use client';

import { useHome } from '@/app/_providers/home-provider';
import { useViewport } from '@/app/_providers/viewport-provider';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';

type SpecialtyCard = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
};

type SpecialtyStackCardProps = {
  specialty: SpecialtyCard;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  viewportHeight: number;
};

const MOBILE_STACK_GAP = 80;
const DESKTOP_STACK_GAP = 100;

const specialties: SpecialtyCard[] = [
  {
    title: '동맥질환',
    description:
      '동맥경화에 의해 혈관이 좁아지거나 막혀서 나타나는 질환과 혈관벽이 부풀어서 생기는 질환이 있습니다.',
    tags: ['하지정맥류', '폐쇄성 말초동맥질환', '버거씨병', '레이노증후군'],
    image: '/images/home/specialties/m-bg-1.png',
    href: '/',
  },
  {
    title: '정맥질환',
    description:
      '다리에서 심장으로 혈액을 보내는 정맥의 기능 장애로 발생합니다. 혈관이 튀어나오거나, 묵직한 통증, 부종, 피부 색소 침착, 심하면 궤양까지 발생할 수 있으며 진행성 질환으로 조기 치료가 중요합니다.',
    tags: ['하지정맥류', '만성 정맥 부전', '심부정맥혈전증', '레이노증후군'],
    image: '/images/home/specialties/m-bg-2.png',
    href: '/',
  },
  {
    title: '희귀특수질환',
    description:
      '해부학적 구조의 기형이나 주변 장기의 압박으로 인해 혈류가 방해받아 발생하는 복합적 혈관 질환까지 케어합니다.',
    tags: ['호두까기 증후군', 'KT 증후군', '메이터너 증후군', '레이노증후군'],
    image: '/images/home/specialties/m-bg-3.png',
    href: '/',
  },
  {
    title: '투석 혈관',
    description:
      '혈액 투석을 위한 혈관 접근로 조성 및 유지 관리를 전문으로 합니다. 환자 개개인의 혈관 상태에 맞는 맞춤형 투석혈관으로 혈관 전문의가 직접 케어해드립니다.',
    tags: [
      '투석 혈관 조성·관리',
      '자가혈관 조성술',
      '인조혈관 조성술',
      '교정술 및 축소술',
      '펌카테터 삽입・제거',
    ],
    image: '/images/home/specialties/m-bg-4.png',
    href: '/',
  },
  {
    title: '고압산소치료',
    description:
      '100% 고농도 산소를 호흡하여 혈액 내 산소 농도를 높이고 손상된 조직의 재생을 극대화하는 첨단 치료법으로 세포의 재생을 깨웁니다.',
    tags: ['난치성 상처', '잠수병', '화상', '가스중독', '수술 후 회복 촉진'],
    image: '/images/home/specialties/m-bg-5.png',
    href: '/',
  },
];

function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();

    window.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  return viewportHeight;
}

function useElementHeight<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateHeight = () => {
      setHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(element);

    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [ref]);

  return height;
}

function SpecialtyStackCard({
  specialty,
  index,
  total,
  scrollYProgress,
  isMobile,
  viewportHeight,
}: SpecialtyStackCardProps) {
  const stackGap = isMobile ? MOBILE_STACK_GAP : DESKTOP_STACK_GAP;

  const stackedY = index * stackGap;
  const hiddenY = viewportHeight + index * stackGap;

  const animatedCardsCount = total - 1;
  const segment = 1 / animatedCardsCount;

  const isFirstCard = index === 0;

  const start = isFirstCard ? 0 : (index - 1) * segment;
  const end = isFirstCard ? 1 : start + segment;

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [isFirstCard ? 0 : hiddenY, stackedY],
  );

  const cardBackground: CSSProperties = {
    backgroundImage: `url('${specialty.image}')`,
    backgroundSize: 'cover',
  };

  return (
    <motion.article
      style={{
        y,
        zIndex: index + 1,
      }}
      className="absolute top-0"
    >
      <Link
        href={specialty.href}
        className="px-8 py-10 flex flex-col rounded-tl-[20px] rounded-bl-[20px] bg-cover bg-center bg-no-repeat shadow-[0_12px_32px_rgba(81,81,81,0.12)]
        xl:px-11 xl:pt-12 xl:pb-52 xl:rounded-[20px]"
        style={cardBackground}
      >
        <h3
          className="font-bold text-xl
          xl:text-[26px]"
        >
          {specialty.title}
        </h3>

        <p
          className="mt-5
          xl:w-[70%] xl:text-lg"
        >
          {specialty.description}
        </p>

        <div
          className="mt-10 w-[80%] flex flex-wrap gap-x-1 gap-y-2
          xl:w-[60%]"
        >
          {specialty.tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-0.5 rounded-full bg-white font-medium text-sm text-[#262C35]
              xl:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}

export default function Home__Specialties() {
  const { lang } = useHome();
  const { isMobile } = useViewport();

  const sectionRef = useRef<HTMLElement | null>(null);
  const stackAreaRef = useRef<HTMLDivElement | null>(null);

  const viewportHeight = useViewportHeight();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative mt-17.5 h-[260vh] bg-white
      xl:mt-0 xl:h-[200vh]"
    >
      <div
        className="sticky top-17.5 flex h-screen
        xl:top-60 xl:px-0 xl:h-auto"
      >
        <div
          className="mx-auto w-full h-screen max-w-7xl flex flex-col gap-7.5
          xl:px-5 xl:h-[70vh] xl:flex-row xl:gap-20"
        >
          <div
            className="px-5 text-center
            xl:flex-4 xl:p-0 xl:text-left"
          >
            <p className="font-medium text-lg text-[#FF8A3D]">진료분야</p>

            <h2
              className="mt-5 leading-[130%] font-medium text-3xl text-[#252B33]
              xl:mt-2 xl:font-bold xl:text-[40px]"
            >
              혈관 질환 전 영역을
              <br />
              책임집니다.
            </h2>

            <div
              className="mt-6 leading-[150%] text-[#262C35]
              xl:mt-10 xl:text-lg"
            >
              <p>
                우리 몸 구석구석 닿지 않는 곳 없는 혈관,
                <br />
                건강의 시작과 끝은 결국 혈관입니다.
              </p>

              <p className="mt-5">
                청맥은 숨은 근본 문제까지 찾아 해결해드립니다.
              </p>
            </div>
          </div>

          <div
            ref={stackAreaRef}
            className="relative min-h-0 flex-1 pl-5 pb-10
            xl:flex-6 xl:h-[66.6vh] xl:p-0"
          >
            <div className="relative h-full w-full">
              {specialties.map((specialty, index) => (
                <SpecialtyStackCard
                  key={specialty.title}
                  specialty={specialty}
                  index={index}
                  total={specialties.length}
                  scrollYProgress={scrollYProgress}
                  isMobile={isMobile}
                  viewportHeight={viewportHeight}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
