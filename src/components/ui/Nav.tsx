'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LangSwitcher } from './LangSwitcher';

const SECTIONS = [
  { id: 'results', key: 'results' },
  { id: 'cases', key: 'cases' },
  { id: 'stack', key: 'stack' },
  { id: 'labs', key: 'labs' },
  { id: 'path', key: 'path' },
  { id: 'contact', key: 'contact' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-line bg-base/80 backdrop-blur-md'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav
        className="container-x flex h-16 items-center justify-between gap-4"
        aria-label={t('menu')}
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">/</span> {t('brand')}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <Link
                href={{ pathname: '/', hash: s.id }}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {t(s.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line bg-base/95 backdrop-blur-md md:hidden">
          <ul className="container-x flex flex-col py-4">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link
                  href={{ pathname: '/', hash: s.id }}
                  className="block border-b border-line/60 py-3 text-lg text-ink"
                  onClick={() => setOpen(false)}
                >
                  {t(s.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-4">
      <span
        className={[
          'absolute left-0 h-0.5 w-4 bg-current transition-all duration-300',
          open ? 'top-1.5 rotate-45' : 'top-0',
        ].join(' ')}
      />
      <span
        className={[
          'absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity duration-200',
          open ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      />
      <span
        className={[
          'absolute left-0 h-0.5 w-4 bg-current transition-all duration-300',
          open ? 'top-1.5 -rotate-45' : 'top-3',
        ].join(' ')}
      />
    </span>
  );
}
