import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '@/lib/content';
import { PROFILE, resolveCv } from '@/lib/site';
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button';
import { HeroBackdrop } from './HeroBackdrop';

function renderTagline(tagline: string, highlights: string[]) {
  const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'g');
  return tagline.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { hero } = getSiteContent(locale);
  const cvHref = resolveCv(locale).href;

  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="container-x relative flex min-h-[92vh] flex-col justify-center pt-28 pb-20">
        {/* Name + role — server-rendered, readable before any animation */}
        <p className="data-label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-ink">{PROFILE.name}</span>
          <span className="text-line-strong" aria-hidden>
            /
          </span>
          <span className="text-accent">{t('labels.role')}</span>
          <span className="text-line-strong" aria-hidden>
            /
          </span>
          <span>{t('labels.focus')}</span>
        </p>

        <h1 className="mt-6 max-w-[18ch] text-4xl font-semibold leading-[1.03] md:max-w-[20ch]">
          {renderTagline(hero.tagline, hero.highlights)}
        </h1>

        <p className="mt-7 max-w-xl text-lg text-muted">{hero.lede}</p>

        {/* Availability + mobility */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-ink">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('labels.availability')}
          </span>
          <span className="text-sm text-faint">{t('labels.mobility')}</span>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={{ pathname: '/', hash: 'results' }} variant="primary">
            {t('cta.seeResults')}
            <span aria-hidden>→</span>
          </ButtonLink>
          <ButtonAnchor href={cvHref} variant="ghost" download>
            <span aria-hidden>↓</span>
            {t('cta.downloadCv')}
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
