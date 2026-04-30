"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_LINES = ["Healing is not about", "becoming someone new."];
const FOLLOW_UP_LINES = [
  "It\u2019s about returning",
  "to who you were before the world",
  "told you to be something else.",
];

function SplitChars({
  lines,
  dataAttr,
}: {
  lines: string[];
  dataAttr: string;
}) {
  return (
    <>
      {lines.map((line, li) => (
        <span className="block" key={li}>
          {line.split("").map((ch, ci) => (
            <span
              key={`${li}-${ci}`}
              {...{ [`data-${dataAttr}`]: "" }}
              // Changed opacity-[0.06] to opacity-0
              className="inline-block whitespace-pre opacity-0" 
              style={{ filter: "blur(12px)" }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statementChars = gsap.utils.toArray<HTMLElement>("[data-phil-statement]");
      const followUpChars = gsap.utils.toArray<HTMLElement>("[data-phil-followup]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      /* ── Statement blur in (Starts exactly when section pins at top) ── */
      tl.to(statementChars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.012,
        ease: "none",
      }, 0);

      /* ── Statement blur out ── */
      tl.to(statementChars, {
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.25,
        stagger: 0.006,
        ease: "none",
      }, 0.55);

      /* ── Bg to terracotta ── */
      tl.to(bgRef.current, {
        opacity: 1,
        duration: 0.12,
        ease: "none",
      }, 0.7);

      /* ── Follow-up blur in ── */
      tl.to(followUpChars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.012,
        ease: "none",
      }, 0.75);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      {/* Spacer removed! The sticky div now hits top exactly when the section does */}

      {/* Sticky frame — stays centered while scrolling */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        {/* bg layer — terracotta, fades in during crossfade */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-overlay-terracotta opacity-0 pointer-events-none"
        />

        {/* Statement */}
        <h2
          className="absolute text-center text-3xl md:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-overlay-teal"
        >
          <SplitChars lines={STATEMENT_LINES} dataAttr="phil-statement" />
        </h2>

        {/* Follow-up — same size/weight */}
        <p
          className="absolute max-w-5xl text-center text-3xl md:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-overlay-teal"
        >
          <SplitChars lines={FOLLOW_UP_LINES} dataAttr="phil-followup" />
        </p>
      </div>
    </section>
  );
}