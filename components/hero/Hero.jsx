"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";

const HERO_ASSETS = {
  wing: "/assets/olympe/hero/wing.webp",
  logo: "/assets/olympe/hero/olympe-india.png",
};

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const artworkRef = useRef(null);
  const wingsRef = useRef(null);
  const logoRef = useRef(null);
  const reflectionRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([artworkRef.current, copyRef.current], { opacity: 1 });
        return;
      }

      gsap.fromTo(
        artworkRef.current,
        { opacity: 0, y: 18, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(
        copyRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.45 },
      );

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(artworkRef.current, {
            y: -p * 42,
            scale: 1 - p * 0.055,
          });
          gsap.set(wingsRef.current, {
            y: -p * 8,
            scale: 1 - p * 0.018,
          });
          gsap.set(logoRef.current, {
            y: -p * 16,
            scale: 1 - p * 0.035,
          });
          gsap.set(reflectionRef.current, {
            y: p * 8,
            opacity: 0.22 - p * 0.12,
          });
          gsap.set(copyRef.current, {
            y: -p * 28,
            opacity: Math.max(0, 1 - p * 1.35),
          });
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative h-[180vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* sparse atmospheric field */}
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute left-[12%] top-[18%] h-px w-px bg-chrome-light shadow-[0_0_8px_rgba(209,208,202,0.7)]" />
          <div className="absolute left-[78%] top-[24%] h-px w-px bg-chrome-light shadow-[0_0_8px_rgba(209,208,202,0.65)]" />
          <div className="absolute left-[23%] top-[42%] h-px w-px bg-chrome-light shadow-[0_0_7px_rgba(209,208,202,0.55)]" />
          <div className="absolute left-[86%] top-[52%] h-px w-px bg-chrome-light shadow-[0_0_8px_rgba(209,208,202,0.6)]" />
          <div className="absolute left-[68%] top-[12%] h-px w-px bg-chrome-light shadow-[0_0_8px_rgba(209,208,202,0.5)]" />
        </div>

        {/* subtle halo / vertical light */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-28vh] h-[58vh] w-[58vh] -translate-x-1/2 rounded-full"
          style={{
            border: "1px solid rgba(225,222,214,0.14)",
            boxShadow: "0 0 70px rgba(225,222,214,0.035)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[42vh] w-px -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, rgba(225,222,214,0.16), transparent)" }}
        />

        <div ref={copyRef} className="pointer-events-none absolute inset-0 z-30 opacity-0">
          <div className="absolute left-[4%] top-[5%] font-mono text-[9px] uppercase tracking-[0.28em] text-chrome sm:text-[10px]">
            <span className="block">OLYMPE INDIA</span>
            <span className="mt-1 block text-chrome-dark">DELHI / MUMBAI</span>
          </div>
          <div className="absolute right-[4%] top-[5%] text-right font-mono text-[9px] uppercase tracking-[0.28em] text-chrome sm:text-[10px]">
            <span className="block">27 NOV — DELHI</span>
            <span className="mt-1 block text-chrome-dark">28 NOV — MUMBAI</span>
          </div>
          <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.35em] text-chrome-dark">
            <span>Scroll</span>
            <span className="h-6 w-px bg-gradient-to-b from-chrome-dark to-transparent" />
          </div>
        </div>

        {/* Complete emblem: one centered coordinate system. */}
        <div
          ref={artworkRef}
          className="absolute left-1/2 top-1/2 z-20 w-[min(94vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <div ref={wingsRef} className="relative mx-auto aspect-[1.75/1] w-full">
            <div className="absolute inset-y-0 left-0 w-[49%]">
              <Image
                src={HERO_ASSETS.wing}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 40vw, 440px"
                className="pointer-events-none object-contain object-center"
                draggable={false}
              />
            </div>
            <div className="absolute inset-y-0 right-0 w-[49%] scale-x-[-1]">
              <Image
                src={HERO_ASSETS.wing}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 40vw, 440px"
                className="pointer-events-none object-contain object-center"
                draggable={false}
              />
            </div>
            <div
              ref={logoRef}
              className="absolute left-1/2 top-[34%] z-10 w-[60%] -translate-x-1/2 -translate-y-1/2 sm:w-[54%] lg:w-[50%]"
            >
              <Image
                src={HERO_ASSETS.logo}
                alt="OLYMPE INDIA"
                width={1000}
                height={1000}
                priority
                className="h-auto w-full"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* dark glossy floor + soft wing reflection */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[23vh] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
          <div
            ref={reflectionRef}
            className="absolute left-1/2 top-[7%] h-[110%] w-[min(86vw,780px)] -translate-x-1/2 scale-y-[-0.38] opacity-[0.22] blur-[8px]"
            style={{
              backgroundImage: `url(${HERO_ASSETS.wing}), url(${HERO_ASSETS.wing})`,
              backgroundPosition: "left center, right center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "48% auto, 48% auto",
              transformOrigin: "center top",
              maskImage: "linear-gradient(to bottom, black, transparent 78%)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#111111] via-[#090909]/70 to-transparent" />
          <div className="absolute bottom-[12%] left-1/2 h-px w-[58vw] max-w-[760px] -translate-x-1/2 bg-gradient-to-r from-transparent via-chrome-dark/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
