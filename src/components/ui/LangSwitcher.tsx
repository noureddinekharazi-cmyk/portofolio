'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LangSwitcher() {
  const t = useTranslations('lang');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // Preserve the current route (incl. dynamic params) across locales.
      router.replace(
        // @ts-expect-error -- params typing is loose for dynamic routes
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className="flex items-center rounded-full border border-line bg-surface p-0.5"
      role="group"
      aria-label={t('label')}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={active ? 'true' : undefined}
            aria-label={active ? undefined : t('switchTo')}
            disabled={isPending}
            className={[
              'rounded-full px-2.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors',
              active
                ? 'bg-accent text-accent-ink'
                : 'text-muted hover:text-ink',
            ].join(' ')}
          >
            {t(loc as 'fr' | 'en')}
          </button>
        );
      })}
    </div>
  );
}
