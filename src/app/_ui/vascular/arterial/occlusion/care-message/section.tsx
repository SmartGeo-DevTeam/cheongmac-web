'use client';

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { occlusionCareMessageLines } from '@/app/_data/vascular/arterial/occlusion/care-message/content';

export default function OcclusionCareMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const firstFill = useTransform(scrollYProgress, [0.18, 0.52], [0, 100]);
  const secondFill = useTransform(scrollYProgress, [0.52, 0.86], [0, 100]);
  const firstGradient = useMotionTemplate`linear-gradient(to right, #262C35 ${firstFill}%, #B0B6BE ${firstFill}%)`;
  const secondGradient = useMotionTemplate`linear-gradient(to right, #262C35 ${secondFill}%, #B0B6BE ${secondFill}%)`;
  const gradients = [firstGradient, secondGradient];

  return (
    <section ref={sectionRef} id="vascular-arterial-occlusion-care-message">
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-center break-keep font-extrabold text-pc-title-2 xl:text-pc-display-1">
        {occlusionCareMessageLines.map((line, index) => (
          <motion.h2
            key={line}
            style={reduceMotion
              ? { color: '#262C35' }
              : { backgroundImage: gradients[index], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {line}
          </motion.h2>
        ))}
      </div>
    </section>
  );
}
