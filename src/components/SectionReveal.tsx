import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  parallaxOffset?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  parallaxOffset = 0,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
  const yParallax = useSpring(rawY, { stiffness: 100, damping: 20 });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50, filter: 'blur(8px)' };
      case 'down':
        return { opacity: 0, y: -50, filter: 'blur(8px)' };
      case 'left':
        return { opacity: 0, x: -50, filter: 'blur(8px)' };
      case 'right':
        return { opacity: 0, x: 50, filter: 'blur(8px)' };
      case 'none':
      default:
        return { opacity: 0, filter: 'blur(6px)' };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple iOS cubic-bezier physics curve
      }}
      style={parallaxOffset !== 0 ? { y: yParallax } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};
