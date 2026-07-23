import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getSiteContent } from '@/lib/content';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';

export async function MetricsBand({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { metrics } = getSiteContent(locale);

  return (
    <section id="results" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{t('sections.resultsKicker')}</p>
          <h2 className="text-3xl font-semibold text-gradient">
            {t('sections.resultsTitle')}
          </h2>
          <p className="text-lg text-muted">{t('sections.resultsIntro')}</p>
        </header>
      </Reveal>

      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <Reveal as="li" key={m.id} index={i}>
            <Link
              href={`/case/${m.caseSlug}`}
              className="group flex h-full flex-col justify-between gap-6 bg-base p-6 transition-colors hover:bg-surface focus-visible:bg-surface md:p-8"
              aria-label={`${m.label} — ${t('a11y.metricLink')}`}
            >
              <div>
                <div className="flex items-baseline font-semibold tracking-tight">
                  {m.prefix && (
                    <span className="text-3xl text-accent md:text-4xl">
                      {m.prefix}
                    </span>
                  )}
                  <span className="text-5xl tabular-nums md:text-6xl">
                    <CountUp value={m.value} />
                  </span>
                  {m.suffix && (
                    <span className="text-2xl text-muted md:text-3xl">
                      {m.suffix}
                    </span>
                  )}
                  {/* accessible static value for screen readers */}
                  <span className="sr-only">
                    {m.prefix}
                    {m.value}
                    {m.suffix}
                  </span>
                </div>
                <p className="mt-3 max-w-[26ch] text-base text-ink">{m.label}</p>
              </div>

              <div>
                <p className="border-t border-line pt-3 text-xs leading-relaxed text-faint">
                  {m.measure}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {t('cta.readCase')}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
