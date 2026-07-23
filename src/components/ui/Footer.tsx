import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PROFILE } from '@/lib/site';

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-ink">
            <span className="text-accent">/</span> {PROFILE.name}
          </p>
          <p className="mt-1 text-sm text-muted">{t('footer.built')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-muted transition-colors hover:text-accent"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <Link
            href={{ pathname: '/', hash: 'contact' }}
            className="text-muted transition-colors hover:text-accent"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>
      <div className="container-x pb-8">
        <p className="font-mono text-xs text-faint">
          © {year} — {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
