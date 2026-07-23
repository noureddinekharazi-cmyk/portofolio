import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/**
 * Standard section shell: anchor id, eyebrow, title, optional intro.
 * Keeps vertical rhythm consistent across the page.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  headerAlign = 'left',
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  headerAlign?: 'left' | 'center';
}) {
  return (
    <section
      id={id}
      className={['container-x scroll-mt-24 py-20 md:py-28', className]
        .filter(Boolean)
        .join(' ')}
    >
      {(eyebrow || title || intro) && (
        <Reveal>
          <header
            className={[
              'mb-12 flex max-w-2xl flex-col gap-4',
              headerAlign === 'center' ? 'mx-auto text-center' : '',
            ].join(' ')}
          >
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="text-3xl font-semibold text-gradient">{title}</h2>
            )}
            {intro && <p className="text-lg text-muted">{intro}</p>}
          </header>
        </Reveal>
      )}
      {children}
    </section>
  );
}
