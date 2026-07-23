'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Progressive-enhancement scroll reveal.
 *
 * Content is visible by default (no JS, slow hydration, crawlers → readable).
 * When JS is active (`html.js`), the element starts subtly offset and reveals
 * on scroll via IntersectionObserver. `prefers-reduced-motion` is honored in CSS.
 * No animation ever gates access to information.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    // Already within (or above) the viewport on mount → show immediately.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    io.observe(el);
    // Safety net: never leave content hidden if the observer never fires.
    const fallback = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error -- ref type varies by tag, safe at runtime
      ref={ref}
      className={['reveal', className].filter(Boolean).join(' ')}
      data-in={shown ? 'true' : 'false'}
      style={{ '--reveal-delay': `${index * 60}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
