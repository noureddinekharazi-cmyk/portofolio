import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';

export async function TimelineSection({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { timeline, certifications } = getSiteContent(locale);

  const work = timeline.filter((i) => i.kind === 'work');
  const education = timeline.filter((i) => i.kind === 'education');

  return (
    <section id="path" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal>
        <header className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="eyebrow">{t('sections.pathKicker')}</p>
          <h2 className="text-3xl font-semibold text-gradient">
            {t('sections.pathTitle')}
          </h2>
        </header>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* Experience */}
        <div>
          <p className="data-label mb-6">{t('labels.experience')}</p>
          <ol className="relative flex flex-col gap-8 border-l border-line pl-6">
            {work.map((item, i) => (
              <Reveal as="li" key={`${item.org}-${i}`} index={i} className="relative">
                <span
                  className="absolute -left-[1.7rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-base"
                  aria-hidden
                />
                <p className="font-mono text-xs text-faint">{item.period}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="text-sm text-accent">
                  {item.org}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-muted">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong"
                        aria-hidden
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Education + certifications */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="data-label mb-6">{t('labels.education')}</p>
            <ol className="flex flex-col gap-6">
              {education.map((item, i) => (
                <Reveal as="li" key={`${item.org}-${i}`} index={i}>
                  <p className="font-mono text-xs text-faint">{item.period}</p>
                  <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-muted">{item.org}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <p className="data-label mb-4">{t('labels.certifications')}</p>
            <ul className="flex flex-col gap-2">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface/40 px-3 py-2"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span className="text-sm text-ink">{c.name}</span>
                  <span className="ml-auto font-mono text-xs text-faint">
                    {c.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
