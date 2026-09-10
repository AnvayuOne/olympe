"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";

const WORDS = [
  { word: "MUSIC", position: "top-left", number: "01" },
  { word: "ART", position: "top-right", number: "02" },
  { word: "CULTURE", position: "bottom-left", number: "03" },
  { word: "BEYOND", position: "bottom-right", number: "04" },
];

export default function BrandSection() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const innerRingRef = useRef(null);
  const glowRef = useRef(null);
  const wordsRef = useRef([]);
  const reducedMotion = usePrefersReducedMotion();

  useScrollReveal(rootRef, "[data-reveal]", {
    stagger: 0.12,
    y: 30,
  });

  useEffect(() => {
    if (!rootRef.current) return undefined;

    if (reducedMotion) {
      gsap.set(
        [
          ringRef.current,
          innerRingRef.current,
          glowRef.current,
          ...wordsRef.current,
        ].filter(Boolean),
        { clearProps: "all" }
      );

      return undefined;
    }

    const ctx = gsap.context(() => {
      // Main orbital rotation
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      // Inner ring moves in the opposite direction
      gsap.to(innerRingRef.current, {
        rotation: -360,
        duration: 70,
        repeat: -1,
        ease: "none",
      });

      // Very subtle central breathing effect
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.55,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll movement for the whole visual system
      gsap.to(ringRef.current, {
        y: -70,
        rotation: "+=90",
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(innerRingRef.current, {
        y: 45,
        rotation: "-=70",
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      wordsRef.current.forEach((word, index) => {
        if (!word) return;

        const direction = index % 2 === 0 ? -1 : 1;

        gsap.to(word, {
          y: direction * 35,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Fine grain */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0.5px,transparent_0.7px)] [background-size:5px_5px]" />

        {/* Large radial atmosphere */}
        <div className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_22%,transparent_65%)]" />

        {/* Central glow */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(190,105,60,0.12)_0%,rgba(190,105,60,0.035)_32%,transparent_70%)] blur-3xl sm:h-[30rem] sm:w-[30rem] lg:h-[38rem] lg:w-[38rem]"
        />
      </div>

      {/* Section label */}
      <div className="relative z-20">
        <SectionLabel
          index="04"
          label="OLYMPE LANGUAGE"
          className="block"
        />
      </div>

      {/* Main composition */}
      <div className="relative mx-auto mt-12 flex min-h-[calc(100svh-13rem)] w-full max-w-[1500px] items-center justify-center sm:mt-8">
        {/* Outer orbital system */}
        <div
          ref={ringRef}
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[76vw] max-w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09]"
          aria-hidden="true"
        >
          {/* Small orbital marker */}
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chrome shadow-[0_0_18px_rgba(255,255,255,0.35)]" />

          {/* Copper marker */}
          <span className="absolute bottom-[11%] left-[8%] h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_14px_rgba(190,105,60,0.55)]" />

          {/* Technical orbit line */}
          <span className="absolute left-1/2 top-1/2 h-[108%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* Inner orbital system */}
        <div
          ref={innerRingRef}
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-[1.45/1] w-[48vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-copper/[0.18]"
          aria-hidden="true"
        >
          <span className="absolute right-[2%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-copper shadow-[0_0_15px_rgba(190,105,60,0.5)]" />
        </div>

        {/* Central identity */}
        <div
          data-reveal
          className="relative z-10 flex flex-col items-center text-center"
        >
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.45em] text-white/35 sm:text-[10px]">
            OLYMPE INDIA / 001
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/25 sm:w-16" />

            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-copper sm:text-[10px]">
              DELHI / MUMBAI
            </span>

            <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/25 sm:w-16" />
          </div>

          <div className="mt-7 h-px w-20 bg-white/10" />

          <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.42em] text-white/25 sm:text-[9px]">
            MUSIC · ART · CULTURE · BEYOND
          </p>
        </div>

        {/* Four manifesto words */}
        {WORDS.map((item, index) => (
          <div
            key={item.word}
            ref={(el) => {
              wordsRef.current[index] = el;
            }}
            data-reveal
            className={`absolute z-10 ${getPositionClasses(item.position)}`}
          >
            <div className="flex items-end gap-3 sm:gap-4">
              <span className="mb-2 font-mono text-[8px] tracking-[0.3em] text-white/20 sm:text-[9px]">
                {item.number}
              </span>

              <h3
                className={`font-display text-[16vw] leading-[0.78] tracking-[-0.045em] sm:text-[11vw] lg:text-[8vw] ${
                  item.word === "ART"
                    ? "text-copper"
                    : "text-chrome-light"
                }`}
              >
                {item.word}
              </h3>
            </div>
          </div>
        ))}

        {/* Crosshair */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.08]" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.08]" />
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="relative z-20 mt-4 flex items-end justify-between border-t border-white/[0.07] pt-5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/25">
            27 NOV — DELHI
          </p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.35em] text-white/25">
            28 NOV — MUMBAI
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/20">
            MUSIC / ART / CULTURE
          </p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.35em] text-white/20">
            INDIA · 2026
          </p>
        </div>
      </div>
    </section>
  );
}

function getPositionClasses(position) {
  switch (position) {
    case "top-left":
      return "left-0 top-[8%] sm:left-[2%] lg:left-[3%]";

    case "top-right":
      return "right-0 top-[24%] text-right sm:right-[2%] lg:right-[3%]";

    case "bottom-left":
      return "bottom-[22%] left-[4%] sm:left-[8%] lg:left-[11%]";

    case "bottom-right":
      return "bottom-[7%] right-0 text-right sm:right-[3%] lg:right-[6%]";

    default:
      return "";
  }
}