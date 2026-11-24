'use client';

import Inner from '@/app/_components/common/inner';
import type { ClinicStrength } from '@/app/_types/vascular/strength';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';
import ClinicStrengthItem from './item';

type Props = {
  id: string;
  headingLines: readonly string[];
  items: readonly ClinicStrength[];
};

/** 텍스트와 진료 강점 항목을 Props로 전달받는 공통 섹션. */
export default function ClinicStrengths({ id, headingLines, items }: Props) {
  const headingRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.85', 'end 0.45'],
  });
  const firstFill = useTransform(scrollYProgress, [0.18, 0.52], [0, 100]);
  const secondFill = useTransform(scrollYProgress, [0.52, 0.86], [0, 100]);
  const firstGradient = useMotionTemplate`linear-gradient(to right, #262C35 ${firstFill}%, #B0B6BE ${firstFill}%)`;
  const secondGradient = useMotionTemplate`linear-gradient(to right, #262C35 ${secondFill}%, #B0B6BE ${secondFill}%)`;
  const gradients = [firstGradient, secondGradient];

  return (
    <section id={id}>
      <Inner>
        <div
          className="w-full pt-30 pb-20 flex flex-col justify-center items-center
            xl:pt-60"
        >
          <div ref={headingRef}>
            {headingLines.map((line, index) => (
              <motion.h2
                key={`${id}-heading-${index}`}
                className="text-center break-keep font-extrabold text-pc-title-2
                  xl:text-pc-display-1"
                style={
                  reduceMotion
                    ? { color: '#262C35' }
                    : {
                        backgroundImage: gradients[index % gradients.length],
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }
                }
              >
                {line}
              </motion.h2>
            ))}
          </div>

          <ul
            className="mt-10 w-full grid gap-3
              xl:mt-24 xl:grid-cols-6 xl:gap-6"
          >
            {items.map((item, index) => (
              <ClinicStrengthItem
                id={`${id}-${item.id}`}
                key={item.id}
                item={item}
                className={index === 3 ? 'xl:col-start-2' : undefined}
              />
            ))}
          </ul>
        </div>
      </Inner>
    </section>
  );
}
