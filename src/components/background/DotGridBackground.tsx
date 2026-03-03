"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

type GridSize = "small" | "medium" | "large";

interface DotGridBackgroundProps {
  size?: GridSize;
  className?: string;
  perspectiveThreeD?: boolean;
}

const GRID_SIZES: Record<GridSize, string> = {
  small: "1vw 1vw",
  medium: "2vw 2vw",
  large: "4vw 4vw",
};

const DotGridBackground = ({
  size = "medium",
  className = "",
  perspectiveThreeD = false
}: DotGridBackgroundProps) => {
  return (
    <div
      className={cls(
        "fixed inset-0 -z-10 bg-background [mask-image:radial-gradient(circle_at_center,white_0%,transparent_90%)]",
        perspectiveThreeD && "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--background-accent) 30%, transparent) 1px, transparent 1px)",
        backgroundSize: GRID_SIZES[size],
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
};

DotGridBackground.displayName = "DotGridBackground";

export default memo(DotGridBackground);
