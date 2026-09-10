"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import Hero from "@/components/hero/Hero";
import EventSection from "@/components/sections/EventSection";
import LineupSection from "@/components/sections/LineupSection";
import BrandSection from "@/components/sections/BrandSection";
import TicketsSection from "@/components/sections/TicketsSection";
import SiteFooter from "@/components/layout/SiteFooter";
import StickyTickets from "@/components/common/StickyTickets";

const HERO_ASSETS = {
  wing: "/assets/olympe/hero/wing.webp",
  logo: "/assets/olympe/hero/olympe-india.png",
};

function BackgroundEmblem() {
  const emblemRef = useRef(null);

  useEffect(() => {
    let frame;

    const update = () => {
      frame = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        /*
         * Start revealing the background emblem
         * as the hero begins leaving the viewport.
         */
        const revealProgress = Math.min(
          1,
          Math.max(0, (scrollY - viewportHeight * 0.55) /
            (viewportHeight * 0.8))
        );

        /*
         * Fade it out much later.
         * This keeps it present through the main content.
         */
        const fadeOutProgress = Math.min(
          1,
          Math.max(
            0,
            (scrollY - viewportHeight * 2.8) /
              (viewportHeight * 1.2)
          )
        );

        const opacity =
          revealProgress *
          0.065 *
          (1 - fadeOutProgress);

        /*
         * Very subtle parallax.
         */
        const translateY = -revealProgress * 25;

        /*
         * Tiny scale change.
         */
        const scale = 1 + revealProgress * 0.05;

        if (emblemRef.current) {
          emblemRef.current.style.opacity = String(opacity);

          emblemRef.current.style.transform =
            `translate3d(-50%, calc(-50% + ${translateY}px), 0) scale(${scale})`;
        }
      });
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={emblemRef}
      className="pointer-events-none fixed left-1/2 top-1/2 z-10 w-[min(94vw,1050px)] -translate-x-1/2 -translate-y-1/2 opacity-0"
      aria-hidden="true"
    >
      <div className="relative aspect-[1.75/1] w-full">
        {/* Left wing */}
        <div className="absolute inset-y-0 left-0 w-[49%]">
          <Image
            src={HERO_ASSETS.wing}
            alt=""
            fill
            sizes="100vw"
            className="object-contain opacity-70"
            draggable={false}
          />
        </div>

        {/* Right wing */}
        <div className="absolute inset-y-0 right-0 w-[49%] scale-x-[-1]">
          <Image
            src={HERO_ASSETS.wing}
            alt=""
            fill
            sizes="100vw"
            className="object-contain opacity-70"
            draggable={false}
          />
        </div>

        {/* OLYMPE INDIA */}
        <div className="absolute left-1/2 top-[34%] z-10 w-[60%] -translate-x-1/2 -translate-y-1/2 sm:w-[54%] lg:w-[50%]">
          <Image
            src={HERO_ASSETS.logo}
            alt=""
            width={1000}
            height={1000}
            className="h-auto w-full"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Persistent emblem behind the entire experience */}
      <BackgroundEmblem />

      <main className="relative z-0 bg-ink">
        <Hero />
        <EventSection />
        <LineupSection />
        <BrandSection />
        <TicketsSection />
      </main>

      <SiteFooter />
      <StickyTickets />
    </>
  );
}