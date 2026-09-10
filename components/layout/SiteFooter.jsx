"use client";

const INSTAGRAM_LINKS = {
  olympe: "https://www.instagram.com/olympeindia/",
  sidejou: "https://www.instagram.com/sid_ejou/",
};

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Top divider */}
      <div className="h-px w-full bg-white/[0.08]" />

      <div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#a85b35]">
              OLYMPE INDIA × SIDEJOU INVITES
            </p>

            <h2 className="mt-7 font-sans text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.78] tracking-[-0.07em] text-white/90">
              OLYMPE
              <span className="block">INDIA</span>
            </h2>

            <p className="mt-8 max-w-md text-xs uppercase leading-6 tracking-[0.18em] text-white/35">
              MUSIC / ART / CULTURE / BEYOND
            </p>
          </div>

          {/* Events */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">
              THE NIGHTS
            </p>

            <div className="mt-7 space-y-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/70">
                  27 NOV — DELHI
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
                  OLYMPE INDIA × SIDEJOU
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-white/70">
                  28 NOV — MUMBAI
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
                  OLYMPE INDIA × SIDEJOU
                </p>
              </div>
            </div>
          </div>

          {/* Follow */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">
              FOLLOW
            </p>

            <div className="mt-7 flex flex-col items-start gap-4">
              <a
                href={INSTAGRAM_LINKS.olympe}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow OLYMPE INDIA on Instagram"
                className="group inline-flex items-center gap-4 border-b border-white/[0.12] pb-3 transition-colors duration-300 hover:border-[#a85b35]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#a85b35]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  OLYMPE INDIA
                </span>

                <span className="text-xs text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href={INSTAGRAM_LINKS.sidejou}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SIDEJOU on Instagram"
                className="group inline-flex items-center gap-4 border-b border-white/[0.12] pb-3 transition-colors duration-300 hover:border-[#a85b35]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#a85b35]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  SIDEJOU
                </span>

                <span className="text-xs text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="mt-20 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/20">
              DELHI / MUMBAI / INDIA
            </p>

            <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/20">
              2026 — OLYMPE INDIA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}