"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { EVENT } from "@/data/event";

/**
 * Minimal identity frame — the winged emblem and the presenter line.
 * Kept deliberately sparse: no nav items yet, since the rest of the site
 * doesn't exist as a built experience yet. Fades in via GSAP once the
 * hero reveal reaches it (see Hero.jsx); starts invisible via className
 * so nothing flashes before the timeline runs.
 */
const SiteHeader = forwardRef(function SiteHeader(_props, ref) {
  return (
    <header
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 opacity-0 sm:px-10 sm:py-7"
    >
      <div className="h-8 w-8 opacity-90 sm:h-9 sm:w-9">
        <Image
          src="/assets/olympe/logo/blood2.PNG"
          alt="OLYMPE"
          width={240}
          height={240}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-chrome-dark sm:text-[11px]">
        {EVENT.presenter}
      </p>
    </header>
  );
});

export default SiteHeader;
