"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

type GridSize = "small" | "medium" | "large";

interface GridBackroundProps {
  size?: GridSize;
  className?: string;
  perspectiveThreeD?: boolean;
}

const GRID_SIZES: Record<GridSize, string> = {
  small: "6.25vw 6.25vw",
  medium: "10vw 10vw",
  large: "20vw 20vw",
};

const GridBackround = ({
  size = "medium",
  className = "",
  perspectiveThreeD = false
}: GridBackroundProps) => {
  return (
    <div
      className={cls(
        "fixed inset-0 -z-10 bg-background [mask-image:radial-gradient(circle_at_center,white_0%,transparent_90%)]",
        perspectiveThreeD && "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, color-mix(in srgb, var(--background-accent) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--background-accent) 10%, transparent) 1px, transparent 1px)",
        backgroundSize: GRID_SIZES[size],
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
};

GridBackround.displayName = "GridBackround";

export default memo(GridBackround);
