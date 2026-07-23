import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllCases } from '@/lib/cases';
import { Reveal } from '@/components/ui/Reveal';
import { PillarTag, CaseIllustration } from '@/components/case/CaseBits';

export async function CasesSection({ locale }: { locale: string }) {
  const t = await getTranslations();
  const cases = await getAllCases(locale);
  if (cases.length === 0) return null;

  const [featured, ...rest] = cases;

  const badgeFor = (source: string) =>
    source === 'screenshot_reel'
      ? t('case.realScreenshot')
      : t('case.illustrative');

  return (
    <section id="cases" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{t('sections.casesKicker')}</p>
          <h2 className="text-3xl font-semibold text-gradient">
            {t('sections.casesTitle')}
          </h2>
          <p className="text-lg text-muted">{t('sections.casesIntro')}</p>
        </header>
      </Reveal>

      {/* Featured — the flagship case */}
      {featured && (
        <Reveal>
          <Link
            href={`/case/${featured.frontmatter.slug}`}
            className="group mb-6 grid gap-8 rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-line-strong md:grid-cols-2 md:p-6"
          >
            <div className="order-2 flex flex-col justify-between gap-6 md:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <PillarTag pillar={featured.frontmatter.pillar} locale={locale} />
                  <span className="data-label">
                    {featured.frontmatter.company} · {featured.frontmatter.period}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-ink">
                  {featured.frontmatter.title}
                </h3>
                <p className="mt-3 text-muted">{featured.frontmatter.summary}</p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold tracking-tight text-accent">
                    {featured.frontmatter.metricDisplay}
                  </p>
                  <p className="mt-1 max-w-[24ch] text-xs text-faint">
                    {featured.frontmatter.metricLabel}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {t('cta.readCase')}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <CaseIllustration
                illustration={featured.frontmatter.illustration}
                badgeLabel={badgeFor(featured.frontmatter.illustration.source)}
                badgeNote={t('case.illustrativeNote')}
              />
            </div>
          </Link>
        </Reveal>
      )}

      {/* Remaining cases */}
      <ul className="grid gap-6 sm:grid-cols-2">
        {rest.map((c, i) => (
          <Reveal as="li" key={c.frontmatter.slug} index={i}>
            <Link
              href={`/case/${c.frontmatter.slug}`}
              className="group flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <PillarTag pillar={c.frontmatter.pillar} locale={locale} />
                <span className="text-2xl font-semibold tracking-tight text-accent">
                  {c.frontmatter.metricDisplay}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-ink">
                  {c.frontmatter.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{c.frontmatter.summary}</p>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="data-label">{c.frontmatter.company}</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {t('cta.readCase')}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
