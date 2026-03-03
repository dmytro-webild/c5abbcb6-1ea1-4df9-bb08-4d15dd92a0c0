"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const useElasticEffect = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);
  const hoverLockedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = useCallback(() => {
    const el = elementRef.current;
    if (!el || hoverLockedRef.current) return;

    hoverLockedRef.current = true;
    setTimeout(() => {
      hoverLockedRef.current = false;
    }, 500);

    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const stretch = 0.75 * fs;
    const sx = (w + stretch) / w;
    const sy = (h - stretch * 0.33) / h;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap
      .timeline()
      .to(el, { scaleX: sx, scaleY: sy, duration: 0.1, ease: "power1.out" })
      .to(el, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1, 0.3)" });
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [handleMouseEnter]);

  return elementRef;
};

export default useElasticEffect;
