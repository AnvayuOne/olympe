"use client";

import { useEffect, useRef, useState } from "react";

const EVENTS = [
  {
    chapter: "01",
    date: "27 NOV",
    city: "DELHI",
    statement: "ONE NIGHT. ONE FREQUENCY.",
    ticketUrl:
      "https://www.skillboxes.com/events/olympe-india-x-sidejou-invites-sbnnehpv",
  },
  {
    chapter: "02",
    date: "28 NOV",
    city: "MUMBAI",
    statement: "THE FREQUENCY CONTINUES.",
    ticketUrl:
      "https://sortmyscene.com/event/olympe-india-x-sidejou-invites-nov-28-2026",
  },
];

export default function EventSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink text-white"
    >
      {/* Atmospheric glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(180,92,45,0.9) 0%, rgba(180,92,45,0) 70%)",
        }}
      />

      {/* Top section label */}
      <div
        className={`relative mx-auto max-w-[1500px] px-6 pt-24 transition-all duration-1000 sm:px-10 lg:px-16 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/40 sm:text-[10px]">
            N°02 — THE EVENT
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/20 sm:text-[10px]">
            OLYMPE INDIA × SIDEJOU
          </span>
        </div>

        <div className="mt-8 h-px w-full bg-white/[0.08]" />
      </div>

      {/* Main introduction */}
      <div
        className={`relative mx-auto max-w-[1500px] px-6 pb-28 pt-20 text-center transition-all delay-100 duration-1000 sm:px-10 sm:pt-28 lg:px-16 lg:pb-36 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.65em] text-[#a85b35] sm:text-xs">
          A HIGHER FREQUENCY
        </p>

        <h2 className="mt-8 font-sans text-[clamp(4rem,10vw,10rem)] font-black leading-[0.78] tracking-[-0.075em] text-white/90">
          OLYMPE
          <span className="block">INDIA</span>
        </h2>

        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            <span className="text-white/90">
              TWO CITIES. TWO NIGHTS. ONE FREQUENCY.
            </span>
            <br />
            <span className="mt-2 block">
              SIDEJOU INVITES brings OLYMPE INDIA to India for two nights of
              uncompromising electronic music — Delhi and Mumbai, November
              2026.
            </span>
          </p>
        </div>
      </div>

      {/* Event chapters */}
      <div
        className={`relative mx-auto max-w-[1250px] px-6 pb-28 transition-all delay-200 duration-1000 sm:px-10 lg:pb-36 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {EVENTS.map((event, index) => (
            <article
              key={event.city}
              className={`group relative px-6 py-10 sm:px-12 md:py-14 ${
                index === 0
                  ? "border-b border-white/[0.08] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              {/* Chapter header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/35 sm:text-[10px]">
                  CHAPTER {event.chapter}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#a85b35]/70 sm:text-[10px]">
                  OLYMPE / 2026
                </span>
              </div>

              {/* Date */}
              <p className="mt-12 font-mono text-sm font-medium tracking-[0.25em] text-white/70">
                {event.date}
              </p>

              {/* City */}
              <h3 className="mt-4 font-sans text-[clamp(4rem,8vw,7rem)] font-black leading-[0.8] tracking-[-0.07em] text-white/90 transition-transform duration-700 group-hover:translate-x-2">
                {event.city}
              </h3>

              {/* Divider */}
              <div className="mt-10 h-px w-full bg-white/[0.08]" />

              {/* Event identity */}
              <div className="mt-7 flex items-start justify-between gap-8">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-[#a85b35]">
                    SIDEJOU INVITES
                  </p>

                  <p className="mt-4 max-w-[220px] text-xs uppercase leading-6 tracking-[0.16em] text-white/45">
                    {event.statement}
                  </p>
                </div>

                {/* Frequency indicator */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a85b35]" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Ticket CTA */}
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-5 border-b border-white/20 pb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/75 transition-all duration-300 hover:border-[#a85b35] hover:text-white"
              >
                GET TICKETS
                <span className="text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>

      {/* Frequency line */}
      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div className="relative flex items-center">
          <div className="h-px flex-1 bg-white/[0.08]" />

          <div className="relative mx-6 flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[#a85b35]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/25">
              FREQUENCY
            </span>

            <span className="h-1 w-1 rounded-full bg-[#a85b35]" />
          </div>

          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>
      </div>

      {/* Technical metadata */}
      <div
        className={`mx-auto max-w-[1500px] px-6 pb-20 pt-10 transition-all delay-300 duration-1000 sm:px-10 lg:px-16 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-mono text-[8px] uppercase tracking-[0.35em] text-white/25 sm:gap-x-12">
          <span>10 ARTISTS</span>
          <span className="text-[#a85b35]/50">/</span>
          <span>02 CITIES</span>
          <span className="text-[#a85b35]/50">/</span>
          <span>02 NIGHTS</span>
          <span className="text-[#a85b35]/50">/</span>
          <span>01 FREQUENCY</span>
        </div>
      </div>
    </section>
  );
}