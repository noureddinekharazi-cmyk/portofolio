import { ImageResponse } from 'next/og';

export const alt = 'Nour Eddine Kharazi — Digital Marketing Specialist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TAGLINE = {
  fr: 'Je transforme des process marketing en systèmes qui tournent seuls.',
  en: 'I turn marketing processes into systems that run themselves.',
} as const;

const AVAIL = {
  fr: 'Disponible en CDI · Septembre 2026 · Paris',
  en: 'Available · September 2026 · Paris',
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === 'en' ? 'en' : 'fr';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b0d',
          padding: '72px',
          fontFamily: 'sans-serif',
          backgroundImage:
            'radial-gradient(1000px 500px at 100% 0%, rgba(94,230,255,0.16), transparent 60%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#5ee6ff',
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#5ee6ff',
            }}
          />
          Digital Marketing Specialist
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: '#a6adb8', fontSize: 34 }}>
            Nour Eddine Kharazi
          </div>
          <div
            style={{
              color: '#e9ecf1',
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: 960,
            }}
          >
            {TAGLINE[lang]}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#838b97',
            fontSize: 26,
            borderTop: '1px solid #242932',
            paddingTop: 28,
          }}
        >
          <span>{AVAIL[lang]}</span>
          <span style={{ color: '#5ee6ff' }}>data · seo · automation</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
