import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  getAllCases,
  getCase,
  getAdjacentCases,
  getCaseSlugs,
} from '@/lib/cases';
import { SITE_URL } from '@/lib/site';
import {
  PillarTag,
  StackChips,
  CaseIllustration,
} from '@/components/case/CaseBits';
import { mdxComponents } from '@/components/case/mdxComponents';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = await getCaseSlugs(locale);
    for (const slug of slugs) params.push({ locale, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = await getCase(locale, slug);
  if (!doc) return {};
  const { frontmatter: fm } = doc;
  const path = `/case/${slug}`;

  return {
    title: fm.title,
    description: fm.summary,
    alternates: {
      canonical: locale === 'fr' ? path : `/en${path}`,
      languages: {
        fr: path,
        en: `/en${path}`,
        'x-default': path,
      },
    },
    openGraph: {
      type: 'article',
      title: fm.title,
      description: fm.summary,
      url: `${SITE_URL}${locale === 'fr' ? '' : '/en'}${path}`,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const doc = await getCase(locale, slug);
  if (!doc) notFound();
  const { frontmatter: fm, body } = doc;
  const { prev, next } = await getAdjacentCases(locale, slug);

  const badgeLabel =
    fm.illustration.source === 'screenshot_reel'
      ? t('case.realScreenshot')
      : t('case.illustrative');

  const mdx =
    body.length > 0
      ? (await compileMDX({ source: body, components: mdxComponents })).content
      : null;

  return (
    <article className="pt-28 pb-24">
      <div className="container-x">
        <Link
          href={{ pathname: '/', hash: 'cases' }}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span> {t('cta.allCases')}
        </Link>

        <header className="mt-8 grid gap-8 border-b border-line pb-10 md:grid-cols-[1.6fr_1fr] md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <PillarTag pillar={fm.pillar} locale={locale} />
              <span className="data-label">
                {fm.company} · {fm.role} · {fm.period}
              </span>
            </div>
            <h1 className="mt-5 max-w-[20ch] text-4xl font-semibold">
              {fm.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{fm.summary}</p>
          </div>
          <div className="md:text-right">
            <p className="text-5xl font-semibold tracking-tight text-accent">
              {fm.metricDisplay}
            </p>
            <p className="mt-2 text-sm text-faint md:ml-auto md:max-w-[24ch]">
              {fm.metricLabel}
            </p>
          </div>
        </header>
      </div>

      <div className="container-x mt-10">
        <CaseIllustration
          illustration={fm.illustration}
          badgeLabel={badgeLabel}
          badgeNote={t('case.illustrativeNote')}
          priority
        />
      </div>

      <div className="container-x mt-14 grid gap-12 md:grid-cols-[1.6fr_1fr]">
        {/* Reading column */}
        <div className="flex flex-col gap-10">
          <Block label={t('case.context')}>
            <p>{fm.context}</p>
          </Block>

          <Block label={t('case.problem')}>
            <p>{fm.problem}</p>
          </Block>

          <Block label={t('case.approach')}>
            <ul className="flex flex-col gap-3">
              {fm.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Block>

          {/* The obstacle — the credibility section, given weight */}
          <div className="rounded-xl border border-line-strong bg-surface/50 p-6">
            <p className="eyebrow mb-3">{t('case.obstacle')}</p>
            <p className="text-lg leading-relaxed text-ink">{fm.obstacle}</p>
          </div>

          <Block label={t('case.result')}>
            <p className="text-lg text-ink">{fm.result}</p>
            <p className="mt-3 border-l-2 border-line-strong pl-3 text-sm text-faint">
              <span className="font-mono uppercase tracking-wider">
                {t('case.measure')}
              </span>
              {' — '}
              {fm.measure}
            </p>
          </Block>

          {mdx && <div className="prose-case flex flex-col gap-4">{mdx}</div>}

          {fm.aside && (
            <aside className="rounded-xl border border-line bg-base p-6">
              <p className="eyebrow mb-3">{fm.aside.title}</p>
              <p className="text-muted">{fm.aside.body}</p>
            </aside>
          )}
        </div>

        {/* Meta column */}
        <aside className="flex flex-col gap-8 md:sticky md:top-24 md:self-start">
          <div>
            <p className="data-label mb-3">{t('case.stack')}</p>
            <StackChips stack={fm.stack} />
          </div>
          <div>
            <p className="data-label mb-3">{t('case.linkedTag')}</p>
            <PillarTag pillar={fm.pillar} locale={locale} />
          </div>
        </aside>
      </div>

      {/* Prev / next */}
      <nav className="container-x mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/case/${prev.slug}`}
            className="group rounded-xl border border-line p-5 transition-colors hover:border-line-strong"
          >
            <span className="data-label">← {t('case.prev')}</span>
            <p className="mt-2 text-ink group-hover:text-accent">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/case/${next.slug}`}
            className="group rounded-xl border border-line p-5 text-right transition-colors hover:border-line-strong sm:col-start-2"
          >
            <span className="data-label">{t('case.next')} →</span>
            <p className="mt-2 text-ink group-hover:text-accent">{next.title}</p>
          </Link>
        )}
      </nav>
    </article>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="eyebrow mb-3">{label}</p>
      <div className="text-base leading-relaxed text-muted [&_p]:text-muted">
        {children}
      </div>
    </section>
  );
}
