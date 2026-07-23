import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-strong hover:shadow-[0_10px_40px_-12px_var(--color-accent-glow)]',
  ghost:
    'border border-line-strong text-ink hover:border-accent hover:text-accent',
};

/** Internal locale-aware link button. */
export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className,
}: {
  href: ComponentProps<typeof Link>['href'];
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </Link>
  );
}

/** Plain anchor (external links, mailto, downloads). */
export function ButtonAnchor({
  href,
  variant = 'primary',
  children,
  className,
  download,
  external,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={[base, variants[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  );
}
