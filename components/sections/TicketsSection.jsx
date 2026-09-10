"use client";

import { useRef } from "react";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { EVENT } from "@/data/event";

/**
 * The closing CTA — editorial, not a SaaS button bank. Each city is its
 * own large, immediately-scannable line linking straight to its exact
 * supplied booking destination, opened in a new tab per the brief.
 */
export default function TicketsSection() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <section ref={rootRef} className="relative bg-ink px-6 py-28 text-center sm:px-12 lg:px-20">
      <SectionLabel index="05" label="TICKETS" className="mb-14 block sm:mb-20" />

      <div className="mx-auto flex max-w-2xl flex-col divide-y divide-graphite-2 border-y border-graphite-2">
        {EVENT.dates.map((entry) => (
          <a
            key={entry.city}
            href={entry.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group flex flex-col items-center gap-2 py-9 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-chrome-dark">
              {entry.date} — {entry.city}
            </span>
            <span className="font-display text-3xl tracking-wide text-chrome-light transition-colors group-hover:text-copper sm:text-4xl">
              GET TICKETS
            </span>
            <span className="font-mono text-xs text-chrome-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:text-copper">
              →
            </span>
          </a>
        ))}
      </div>

      <p
        data-reveal
        className="mt-14 font-mono text-[10px] uppercase tracking-[0.4em] text-chrome-dark"
      >
        {EVENT.presenter}
      </p>
    </section>
  );
}
