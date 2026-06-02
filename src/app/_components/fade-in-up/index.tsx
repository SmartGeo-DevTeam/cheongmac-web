'use client';

import { motion, type Variants } from 'framer-motion';

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

type FadeInUpProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
};

export default function FadeInUp({
  children,
  className,
  once = true,
  delay = 0,
}: FadeInUpProps): React.ReactNode {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once,
        amount: 0,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
