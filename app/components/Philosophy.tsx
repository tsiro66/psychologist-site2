"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT = "Healing is not about becoming someone new.";
const FOLLOW_UP = "It\u2019s about returning to who you were before the world told you to be something else.";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Statement lines ── */
      const statementWords = gsap.utils.toArray<HTMLElement>("[data-statement-word]");
      gsap.from(statementWords, {
        scrollTrigger: {
          trigger: "[data-statement]",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        opacity: 0.08,
        yPercent: 40,
        filter: "blur(6px)",
        stagger: 0.05,
        ease: "none",
      });

      /* ── Follow-up ── */
      gsap.from("[data-follow-up]", {
        scrollTrigger: {
          trigger: "[data-follow-up]",
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 30,
        ease: "none",
      });

      /* ── Divider line ── */
      gsap.from("[data-divider]", {
        scrollTrigger: {
          trigger: "[data-divider]",
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
      });

      /* ── Pillar cards ── */
      const pillars = gsap.utils.toArray<HTMLElement>("[data-pillar]");
      pillars.forEach((pillar) => {
        gsap.from(pillar, {
          scrollTrigger: {
            trigger: pillar,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          ease: "none",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 lg:py-56 px-6 md:px-10 lg:px-16"
    >
      {/* ── Large statement ── */}
      <div className="max-w-5xl mx-auto mb-16 md:mb-24">
        <h2
          data-statement
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-overlay-teal"
        >
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} data-statement-word className="inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        <p
          data-follow-up
          className="mt-8 md:mt-12 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-overlay-teal/70"
        >
          {FOLLOW_UP}
        </p>
      </div>

    </section>
  );
}
