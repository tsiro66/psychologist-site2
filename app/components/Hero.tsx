"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADING_LINES = ["Your mind", "deserves", "gentle attention."];
const INTRO_TEXT = "Not every wound is visible.";

function SplitChars({
  lines,
  italic,
}: {
  lines: string[];
  italic?: number;
}) {
  return (
    <>
      {lines.map((line, li) => (
        <span className="block" key={li}>
          {line.split("").map((ch, ci) => (
            <span
              key={`${li}-${ci}`}
              data-char
              className={`inline-block whitespace-pre opacity-[0.06] ${li === italic ? "italic font-normal" : ""}`}
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

export default function Hero() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Entrance: image scale-in (delayed for preloader) ── */
      const PRELOADER_DELAY = 3.4;

      gsap.fromTo(
        "[data-hero-image]",
        { scale: 1.12 },
        { scale: 1, duration: 2, ease: "power3.out", delay: PRELOADER_DELAY }
      );

      /* ── Entrance: intro text — smooth blur sweep left→right ── */
      const introChars = gsap.utils.toArray("[data-intro-char]");
      gsap.to(introChars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: 0.01,
        ease: "power1.inOut",
        delay: PRELOADER_DELAY + 0.5,
      });

      /* ── Scroll-driven ── */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Portal circle expands — covers image by going on top
      scrollTl.fromTo(
        portalRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(150% at 50% 50%)", duration: 0.45, ease: "none" },
        0
      );

      // Letter-by-letter: blur → clear, low opacity → full
      const chars = gsap.utils.toArray("[data-char]");
      scrollTl.to(
        chars,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          stagger: 0.012,
          ease: "none",
        },
        0
      );

      // Text fades back out
      scrollTl.to(
        chars,
        {
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.25,
          stagger: 0.006,
          ease: "none",
        },
        0.55
      );

      // Background transitions to cream
      scrollTl.to(
        "[data-portal-bg]",
        {
          backgroundColor: "#F0E6D8",
          duration: 0.3,
          ease: "none",
        },
        0.7
      );

      // Transition page background to cream — fills any sub-pixel gaps
      scrollTl.to(
        document.body,
        {
          backgroundColor: "#F0E6D8",
          duration: 0.35,
          ease: "none",
        },
        0.6
      );

      // Hide the fixed hero once it's fully cream — eliminates the
      // compositing layer entirely before Philosophy enters the viewport.
      // Body bg is already cream by 0.95, so this is invisible (cream → cream).
      scrollTl.to(
        fixedRef.current,
        {
          autoAlpha: 0,
          duration: 0.04,
          ease: "none",
        },
        0.95
      );
    }, fixedRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Fixed hero — always behind everything, no sticky boundary = no seam */}
      <div
        ref={fixedRef}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* ── Layer 1: Hero image ── */}
        <div data-hero-image className="absolute inset-0 will-change-transform">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/50 to-black/80" />
        </div>

        {/* ── Text over image (bottom-left, blurs in on load) ── */}
        <div className="absolute inset-0 flex items-end z-10 px-6 md:px-10 lg:px-16 pb-8 md:pb-10">
          <p className="text-xl md:text-2xl lg:text-3xl text-zinc-300 font-light">
            {INTRO_TEXT.split("").map((ch, i) => (
              <span
                key={i}
                data-intro-char
                className="inline-block whitespace-pre opacity-[0.06]"
                style={{ filter: "blur(12px)" }}
              >
                {ch}
              </span>
            ))}
          </p>
        </div>

        {/* ── Layer 2: Dark portal — circle grows on scroll, covers image ── */}
        <div
          ref={portalRef}
          className="absolute inset-0 z-20 will-change-[clip-path]"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          <div data-portal-bg className="absolute inset-0 bg-background" />

          {/* Heading — each letter blurred + low opacity, clears on scroll */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="text-center text-[2.5rem] md:text-7xl lg:text-[5.5rem] font-light tracking-tight leading-[1.08] text-white">
              <SplitChars lines={HEADING_LINES} italic={2} />
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll spacer — provides scroll distance for the animation */}
      <div ref={spacerRef} className="h-[350vh] bg-overlay-cream" />
    </>
  );
}
