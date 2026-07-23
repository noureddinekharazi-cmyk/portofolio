'use client';

import {
  animate,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Animated number that counts up when scrolled into view.
 * With reduced motion, the final value is shown immediately — no delay,
 * no waiting for an animation to reveal information.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1.2,
}: {
  value: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const formatted = display.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} aria-hidden="true">
      {formatted}
    </span>
  );
}
