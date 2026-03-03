"use client";

import { memo, useState, useEffect, useCallback } from "react";
import { cls } from "@/lib/utils";

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";
const BOTTOM_THRESHOLD = 50;
const TOP_THRESHOLD = 50;

interface BlurBottomBackgroundProps {
  className?: string;
}

const BlurBottomBackground = ({
  className = ""
}: BlurBottomBackgroundProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

    setIsAtTop(scrollTop <= TOP_THRESHOLD);
    setIsAtBottom(distanceFromBottom <= BOTTOM_THRESHOLD);
  }, []);

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={cls(
        "fixed pointer-events-none backdrop-blur-xl w-full h-30 left-0 bottom-0 z-[500] transition-opacity duration-500 ease-out",
        isAtTop || isAtBottom ? "opacity-0" : "opacity-100",
        className
      )}
      style={{ maskImage: MASK_GRADIENT }}
      aria-hidden="true"
    />
  );
};

BlurBottomBackground.displayName = "BlurBottomBackground";

export default memo(BlurBottomBackground);
