/**
 * Hero backdrop — "Signal" texture.
 * Pure CSS (grid + accent glow + slow drift), GPU-light so it never touches LCP.
 * A generated Higgsfield loop can be layered on top in Lot 5 via <video> with a
 * static poster and `prefers-reduced-motion` / mobile guards.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
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
