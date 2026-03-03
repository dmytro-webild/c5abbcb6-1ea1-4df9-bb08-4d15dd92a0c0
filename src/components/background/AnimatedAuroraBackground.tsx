"use client";
import React, { memo } from "react";
import { cls } from "@/lib/utils";

interface AnimatedAuroraBackgroundProps {
  className?: string;
  showRadialGradient?: boolean;
  /**
   * Inverts the aurora colors for better visibility.
   * Use `true` for light backgrounds (makes aurora darker/inverted)
   * Use `false` for dark backgrounds (keeps aurora colors vibrant)
   */
  invertColors: boolean;
}

const AnimatedAuroraBackground = ({
  className,
  showRadialGradient = true,
  invertColors,
}: AnimatedAuroraBackgroundProps) => {
  return (
    <div
      className={cls(
        "fixed inset-0 -z-10 bg-background",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className={cls(
            "[--base-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)] [--aurora:repeating-linear-gradient(100deg,var(--color-primary-cta)_10%,var(--color-accent)_15%,var(--color-secondary-cta)_20%,var(--color-accent)_25%,var(--color-primary-cta)_30%)] [background-image:var(--base-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] filter blur-[10px] after:content-[''] after:absolute after:inset-0 after:[background-image:var(--base-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[animation:aurora_60s_linear_infinite] after:[background-attachment:fixed] after:mix-blend-difference pointer-events-none absolute -inset-[10px] opacity-30 will-change-transform",
            invertColors && "invert",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        ></div>
      </div>
    </div>
  );
};

AnimatedAuroraBackground.displayName = "AnimatedAuroraBackground";

export default memo(AnimatedAuroraBackground);
