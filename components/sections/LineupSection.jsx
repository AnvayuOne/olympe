"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";
import SectionLabel from "@/components/common/SectionLabel";
import {
  LINEUP,
  ARTIST_ASPECT_RATIO,
} from "@/data/lineup";

const GAP = 24;
const COPY_COUNT = 5;
const START_COPY = 2;

function getVisibleCount(width) {
  if (width >= 1200) return 5;
  if (width >= 700) return 3;
  return 1;
}

function getItemWidth(width, count) {
  const horizontalPadding =
    width >= 1200
      ? 160
      : width >= 700
        ? 96
        : 40;

  const maxContentWidth =
    width >= 1200
      ? 1500
      : width >= 700
        ? 1100
        : width - horizontalPadding;

  const contentWidth = Math.min(
    width - horizontalPadding,
    maxContentWidth
  );

  const rawWidth =
    (contentWidth - GAP * (count - 1)) / count;

  if (count === 1) {
  return Math.min(rawWidth, 560);
}

if (count === 3) {
  return Math.min(rawWidth, 460);
}

return Math.min(rawWidth, 390);
}

export default function LineupSection() {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);

  const reducedMotion =
    usePrefersReducedMotion();

  useScrollReveal(
    rootRef,
    "[data-reveal]",
    {
      stagger: 0.05,
    }
  );

  const [layout, setLayout] = useState({
    count: 5,
    itemWidth: 280,
  });

  /*
   * We keep several copies of the lineup.
   *
   * This lets the carousel move forever:
   *
   * COPY 1
   * COPY 2
   * COPY 3  <-- starting area
   * COPY 4
   * COPY 5
   *
   * When we get close to an edge, we silently jump
   * back to the equivalent poster in the middle copy.
   */

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [physicalIndex, setPhysicalIndex] =
    useState(
      START_COPY * LINEUP.length
    );

  const physicalIndexRef =
    useRef(
      START_COPY * LINEUP.length
    );

  const activeIndexRef =
    useRef(0);

  const [dragOffset, setDragOffset] =
    useState(0);

  const draggingRef = useRef({
    active: false,
    startX: 0,
    lastX: 0,
  });

  const autoTimerRef = useRef(null);
  const resetTimerRef = useRef(null);

  const slot =
    layout.itemWidth + GAP;

  const viewportWidth =
    layout.count * layout.itemWidth +
    (layout.count - 1) * GAP;

  /*
   * The active poster is ALWAYS positioned
   * exactly at the center of the viewport.
   */

  const baseTranslate =
    viewportWidth / 2 -
    layout.itemWidth / 2 -
    physicalIndex * slot;

  /*
   * Responsive layout.
   */

  useEffect(() => {
    function measure() {
      const width =
        window.innerWidth;

      const count =
        getVisibleCount(width);

      const itemWidth =
        getItemWidth(
          width,
          count
        );

      setLayout({
        count,
        itemWidth,
      });
    }

    measure();

    window.addEventListener(
      "resize",
      measure
    );

    return () =>
      window.removeEventListener(
        "resize",
        measure
      );
  }, []);

  /*
   * Convert a physical index into
   * the actual lineup index 0–9.
   */

  const normalizeIndex = useCallback(
    (index) => {
      return (
        ((index % LINEUP.length) +
          LINEUP.length) %
        LINEUP.length
      );
    },
    []
  );

  /*
   * Move the carousel to a specific artist.
   */

  const moveTo = useCallback(
    (
      target,
      {
        immediate = false,
        fromAuto = false,
      } = {}
    ) => {
      let next = target;

      /*
       * Keep the physical index comfortably
       * inside the duplicated copies.
       */

      const lowerBoundary =
        LINEUP.length;

      const upperBoundary =
        LINEUP.length *
        (COPY_COUNT - 2);

      if (
        next <=
        lowerBoundary
      ) {
        next +=
          LINEUP.length * 2;

        immediate = true;
      }

      if (
        next >=
        upperBoundary
      ) {
        next -=
          LINEUP.length * 2;

        immediate = true;
      }

      const normalized =
        normalizeIndex(next);

      physicalIndexRef.current =
        next;

      activeIndexRef.current =
        normalized;

      setActiveIndex(
        normalized
      );

      setPhysicalIndex(next);

      /*
       * The timeout is only used to clear
       * any temporary reset state.
       */

      if (!fromAuto) {
        clearTimeout(
          autoTimerRef.current
        );
      }

      if (immediate) {
        setDragOffset(0);
      }
    },
    [normalizeIndex]
  );

  /*
   * Automatic slow movement.
   */

  const scheduleAuto = useCallback(
    () => {
      clearTimeout(
        autoTimerRef.current
      );

      if (reducedMotion) return;

      autoTimerRef.current =
        setTimeout(() => {
          moveTo(
            physicalIndexRef.current +
              1,
            {
              fromAuto: true,
            }
          );
        }, 4200);
    },
    [moveTo, reducedMotion]
  );

  useEffect(() => {
    scheduleAuto();

    return () => {
      clearTimeout(
        autoTimerRef.current
      );
    };
  }, [
    physicalIndex,
    scheduleAuto,
  ]);

  /*
   * Seamlessly recycle the physical index
   * back into the middle copy.
   */

  useEffect(() => {
    clearTimeout(
      resetTimerRef.current
    );

    const lowerLimit =
      LINEUP.length + 1;

    const upperLimit =
      LINEUP.length *
        (COPY_COUNT - 1) -
      2;

    if (
      physicalIndex <=
        lowerLimit ||
      physicalIndex >=
        upperLimit
    ) {
      resetTimerRef.current =
        setTimeout(() => {
          const recycled =
            START_COPY *
              LINEUP.length +
            activeIndexRef.current;

          physicalIndexRef.current =
            recycled;

          setPhysicalIndex(
            recycled
          );
        }, 950);
    }

    return () => {
      clearTimeout(
        resetTimerRef.current
      );
    };
  }, [physicalIndex]);

  /*
   * Drag / swipe.
   */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    if (!viewport) return;

    function pointerDown(event) {
      draggingRef.current = {
        active: true,
        startX: event.clientX,
        lastX: event.clientX,
      };

      setDragOffset(0);

      viewport.setPointerCapture?.(
        event.pointerId
      );

      clearTimeout(
        autoTimerRef.current
      );
    }

    function pointerMove(event) {
      if (
        !draggingRef.current.active
      ) {
        return;
      }

      const delta =
        event.clientX -
        draggingRef.current.startX;

      draggingRef.current.lastX =
        event.clientX;

      setDragOffset(delta);
    }

    function pointerUp(event) {
      if (
        !draggingRef.current.active
      ) {
        return;
      }

      const delta =
        draggingRef.current.lastX -
        draggingRef.current.startX;

      draggingRef.current.active =
        false;

      const threshold =
        Math.max(
          40,
          layout.itemWidth *
            0.15
        );

      if (
        Math.abs(delta) >=
        threshold
      ) {
        if (delta < 0) {
          moveTo(
            physicalIndexRef.current +
              1
          );
        } else {
          moveTo(
            physicalIndexRef.current -
              1
          );
        }
      }

      setDragOffset(0);

      viewport.releasePointerCapture?.(
        event.pointerId
      );

      scheduleAuto();
    }

    function pointerCancel(event) {
      draggingRef.current.active =
        false;

      setDragOffset(0);

      viewport.releasePointerCapture?.(
        event.pointerId
      );

      scheduleAuto();
    }

    viewport.addEventListener(
      "pointerdown",
      pointerDown
    );

    viewport.addEventListener(
      "pointermove",
      pointerMove
    );

    viewport.addEventListener(
      "pointerup",
      pointerUp
    );

    viewport.addEventListener(
      "pointercancel",
      pointerCancel
    );

    return () => {
      viewport.removeEventListener(
        "pointerdown",
        pointerDown
      );

      viewport.removeEventListener(
        "pointermove",
        pointerMove
      );

      viewport.removeEventListener(
        "pointerup",
        pointerUp
      );

      viewport.removeEventListener(
        "pointercancel",
        pointerCancel
      );
    };
  }, [
    layout.itemWidth,
    moveTo,
    scheduleAuto,
  ]);

  /*
   * Horizontal wheel / trackpad.
   */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    if (!viewport) return;

    let locked = false;

    function wheel(event) {
      if (
        Math.abs(event.deltaX) <=
        Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();

      if (locked) return;

      locked = true;

      clearTimeout(
        autoTimerRef.current
      );

      if (event.deltaX > 0) {
        moveTo(
          physicalIndexRef.current +
            1
        );
      } else {
        moveTo(
          physicalIndexRef.current -
            1
        );
      }

      setTimeout(() => {
        locked = false;
        scheduleAuto();
      }, 850);
    }

    viewport.addEventListener(
      "wheel",
      wheel,
      {
        passive: false,
      }
    );

    return () => {
      viewport.removeEventListener(
        "wheel",
        wheel
      );
    };
  }, [
    moveTo,
    scheduleAuto,
  ]);

  /*
   * Clicking a poster.
   */

  const selectArtist =
    useCallback(
      (physicalTarget) => {
        const current =
          physicalIndexRef.current;

        const delta =
          physicalTarget - current;

        /*
         * Choose the shortest route
         * around the loop.
         */

        let adjustedDelta =
          delta;

        if (
          delta >
          LINEUP.length / 2
        ) {
          adjustedDelta -=
            LINEUP.length;
        }

        if (
          delta <
          -LINEUP.length / 2
        ) {
          adjustedDelta +=
            LINEUP.length;
        }

        moveTo(
          current +
            adjustedDelta
        );

        scheduleAuto();
      },
      [moveTo, scheduleAuto]
    );

  /*
   * Create duplicated lineup.
   */

  const artists = [];

  for (
    let copy = 0;
    copy < COPY_COUNT;
    copy++
  ) {
    LINEUP.forEach(
      (artist, index) => {
        artists.push({
          ...artist,
          originalIndex:
            index,
          physicalIndex:
            copy *
              LINEUP.length +
            index,
          key: `${copy}-${artist.name}`,
        });
      }
    );
  }

  const featured =
    LINEUP[activeIndex];

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-ink px-6 py-24 sm:px-12 sm:py-28 lg:px-20"
    >
      {/* Header */}

      <div
        data-reveal
        className="mb-10 flex items-end justify-between gap-6 sm:mb-14"
      >
        <SectionLabel
          index="03"
          label="THE LINEUP"
        />

        <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark sm:block">
          {LINEUP.length} ACTS — DELHI &amp;
          MUMBAI
        </p>
      </div>

      {/* Carousel */}

      <div
        ref={viewportRef}
        data-reveal
        className="relative mx-auto overflow-hidden"
        style={{
          width:
            viewportWidth,
          maxWidth:
            "100%",
          touchAction:
            "pan-y",
          cursor:
            draggingRef.current?.active
              ? "grabbing"
              : "grab",
        }}
      >
        {/* Copper top rail */}

        <div
          className="pointer-events-none absolute left-1/2 top-0 z-40 h-px w-32 -translate-x-1/2 bg-copper/40 sm:w-44"
          aria-hidden="true"
        />

        {/* Copper bottom rail */}

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-40 h-px w-32 -translate-x-1/2 bg-copper/20 sm:w-44"
          aria-hidden="true"
        />

        {/* Subtle center glow */}

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/[0.035] blur-3xl"
          aria-hidden="true"
        />

        {/* Moving track */}

        <div
          className="relative flex"
          style={{
            gap: GAP,
            transform: `translate3d(${
              baseTranslate +
              dragOffset
            }px, 0, 0)`,
            transition:
              draggingRef.current?.active
                ? "none"
                : reducedMotion
                  ? "none"
                  : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange:
              "transform",
          }}
        >
          {artists.map(
            (artist) => {
              const distance =
                Math.abs(
                  artist.physicalIndex -
                    physicalIndex
                );

              let scale = 0.82;
              let opacity = 0.48;
              let brightness = 0.7;

              if (
                distance === 1
              ) {
                scale = 0.93;
                opacity = 0.74;
                brightness = 0.84;
              }

              if (
                distance === 2
              ) {
                scale = 0.84;
                opacity = 0.55;
                brightness = 0.72;
              }

              if (
                distance === 0
              ) {
                scale = 1;
                opacity = 1;
                brightness = 1;
              }

              return (
                <button
                  key={
                    artist.key
                  }
                  type="button"
                  aria-label={`View ${artist.name}`}
                  onClick={() =>
                    selectArtist(
                      artist.physicalIndex
                    )
                  }
                  className="relative shrink-0 border-0 bg-transparent p-0 outline-none"
                  style={{
                    width:
                      layout.itemWidth,
                    aspectRatio:
                      ARTIST_ASPECT_RATIO,
                    transform: `scale(${scale})`,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transition:
                      draggingRef.current?.active
                        ? "none"
                        : reducedMotion
                          ? "none"
                          : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease, filter 700ms ease",
                    transformOrigin:
                      "center center",
                    zIndex:
                      distance ===
                      0
                        ? 30
                        : Math.max(
                            1,
                            20 -
                              distance
                          ),
                  }}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden bg-graphite ${
                      distance === 0
                        ? "ring-1 ring-copper/50"
                        : "ring-1 ring-white/[0.05]"
                    }`}
                  >
                    <Image
                      src={
                        artist.image
                      }
                      alt={
                        artist.name
                      }
                      fill
                      sizes="(max-width: 699px) 85vw, (max-width: 1199px) 30vw, 20vw"
                      priority={
                        artist.originalIndex <
                        3
                      }
                      loading={
                        artist.originalIndex <
                        3
                          ? "eager"
                          : "lazy"
                      }
                      className="pointer-events-none object-cover"
                      draggable={
                        false
                      }
                    />

                    {/* Active poster sheen */}

                    {distance ===
                      0 && (
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/25"
                        aria-hidden="true"
                      />
                    )}

                    {/* Bottom cinematic fade */}

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Active artist */}

      <div
        data-reveal
        className="mt-8 flex flex-col items-center justify-center text-center"
      >
        <div className="mb-3 flex items-center gap-4">
          <span className="h-px w-8 bg-copper/40" />

          <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-copper">
            {String(
              featured.index
            ).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {LINEUP.length}
          </span>

          <span className="h-px w-8 bg-copper/40" />
        </div>

        <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-chrome-light sm:text-3xl">
          {featured.name}
        </h3>

        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.35em] text-chrome-dark">
          DRAG · SWIPE · SCROLL
        </p>
      </div>
    </section>
  );
}