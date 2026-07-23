import { getTranslations } from 'next-intl/server';
import { getSiteContent } from '@/lib/content';
import { PROFILE, resolveCv } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';

export async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations();
  const { contact } = getSiteContent(locale);
  const cv = resolveCv(locale);
  const cvLabel =
    cv.lang === 'en' ? `${t('cta.downloadCv')} (EN)` : t('cta.downloadCv');

  const coords = [
    { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    {
      label: locale === 'fr' ? 'Téléphone' : 'Phone',
      value: PROFILE.phoneDisplay,
      href: `tel:${PROFILE.phone}`,
    },
    {
      label: 'LinkedIn',
      value: PROFILE.linkedinHandle,
      href: PROFILE.linkedin,
      external: true,
    },
    {
      label: locale === 'fr' ? 'Localisation' : 'Location',
      value: PROFILE.location,
    },
  ];

  return (
    <section id="contact" className="container-x scroll-mt-24 py-20 md:py-28">
      <div className="rounded-3xl border border-line bg-surface/30 p-8 md:p-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          {/* Pitch + primary CTA */}
          <Reveal>
            <div>
              <p className="eyebrow">{t('sections.contactKicker')}</p>
              <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold text-gradient md:text-4xl">
                {t('sections.contactTitle')}
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted">{contact.intro}</p>
              <p className="mt-3 max-w-md text-sm text-faint">
                {contact.availability}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonAnchor href={`mailto:${PROFILE.email}`} variant="primary">
                  {t('cta.email')}
                  <span aria-hidden>→</span>
                </ButtonAnchor>
                <ButtonAnchor href={cv.href} variant="ghost" download>
                  <span aria-hidden>↓</span>
                  {cvLabel}
                </ButtonAnchor>
              </div>

              {!PROFILE.cvAvailable.fr && locale === 'fr' && (
                <p className="mt-3 font-mono text-xs text-faint">
                  Version française du CV bientôt disponible.
                </p>
              )}
            </div>
          </Reveal>

          {/* Coordinates */}
          <Reveal index={1}>
            <ul className="flex flex-col divide-y divide-line">
              {coords.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="data-label">{c.label}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-ink transition-colors hover:text-accent"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-sm text-ink">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Recommendations: honest note, no fabricated testimonial */}
            <p className="mt-8 border-t border-line pt-6 text-sm text-faint">
              {t('labels.recommendationsEmpty')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
