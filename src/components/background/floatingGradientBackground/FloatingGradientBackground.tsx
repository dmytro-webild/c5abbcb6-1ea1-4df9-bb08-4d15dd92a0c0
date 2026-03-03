"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import "./FloatingGradientBackground.css";

interface FloatingGradientBackgroundProps {
  className?: string;
}

const FloatingGradientBackground = ({
  className = "",
}: FloatingGradientBackgroundProps) => {
  return (
    <div
      className={cls(
        "fixed top-0 bottom-0 left-0 right-0 w-full h-full z-0 pointer-events-none blur-[40px]",
        "[mask-image:linear-gradient(to_bottom,transparent,#010101_20%,#010101_80%,transparent)]",
        "[mask-composite:intersect]",
        "[-webkit-mask-image:linear-gradient(to_bottom,transparent,#010101_20%,#010101_80%,transparent)]",
        "[-webkit-mask-composite:destination-in]",
        "floating-gradient-background-container",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute opacity-[0.075] floating-gradient-background-circle-one" />
      <div className="absolute opacity-[0.125] floating-gradient-background-circle-two" />
      <div className="absolute opacity-[0.125] floating-gradient-background-circle-three" />
      <div className="absolute opacity-[0.15] floating-gradient-background-circle-four" />
      <div className="absolute opacity-[0.075] floating-gradient-background-circle-five" />
    </div>
  );
};

FloatingGradientBackground.displayName = "FloatingGradientBackground";

export default memo(FloatingGradientBackground);
