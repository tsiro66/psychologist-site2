"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const PRELOADER_TEXT = "Lorem ipsum dolor sit amet";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const chars = gsap.utils.toArray<HTMLElement>("[data-preloader-char]");

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Phase 1: Blur in — char by char, left to right
    tl.to(chars, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5,
      stagger: 0.02,
      ease: "power1.inOut",
    });

    // Phase 2: Hold
    tl.to({}, { duration: 0.6 });

    // Phase 3: Blur out — char by char, left to right
    tl.to(chars, {
      opacity: 0.06,
      filter: "blur(12px)",
      duration: 1,
      stagger: 0.015,
      ease: "power1.inOut",
    });

    // Phase 4: Overlay fades out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <p className="text-2xl md:text-3xl lg:text-5xl text-zinc-300 font-light">
        {PRELOADER_TEXT.split("").map((ch, i) => (
          <span
            key={i}
            data-preloader-char
            className="inline-block whitespace-pre opacity-[0.06]"
            style={{ filter: "blur(12px)" }}
          >
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}
