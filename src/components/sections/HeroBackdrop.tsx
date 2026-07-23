/**
 * Hero backdrop — "Signal" texture.
 * Pure CSS (grid + accent glow + slow drift), GPU-light so it never touches LCP.
 *
 * To use the generated Higgsfield background (see assets-manifest.json): drop the
 * optimized file at public/generated/hero-signal.webp and set HERO_IMAGE below.
 * Until then the CSS backdrop is used and no broken image is served.
 */
const HERO_IMAGE: string | null = null; // e.g. '/generated/hero-signal.webp'

export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* generated topography (optional, decorative, non-LCP) */}
      {HERO_IMAGE && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen motion-reduce:opacity-25"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
      )}

      {/* faint systems grid */}
      <div className="absolute inset-0 grid-backdrop opacity-60" />

      {/* accent signal glow */}
      <div
        className="absolute left-1/2 top-[-10%] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full opacity-40 blur-[120px] motion-safe:animate-drift"
        style={{
          background:
            'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 60%)',
        }}
      />

      {/* horizon line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      {/* base vignette to keep text contrast high */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, transparent 40%, var(--color-base) 100%)',
        }}
      />
    </div>
  );
}
