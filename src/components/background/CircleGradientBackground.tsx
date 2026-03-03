"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

type DiagonalVariant = "primary" | "secondary";

interface CircleGradientBackgroundProps {
  className?: string;
  diagonal?: DiagonalVariant;
}

const CircleGradientBackground = ({
  className = "",
  diagonal = "primary",
}: CircleGradientBackgroundProps) => {
  const isPrimary = diagonal === "primary";

  return (
    <div
      className={cls("fixed top-0 left-0 right-0 bottom-0 h-screen w-full -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cls(
          "fixed w-100 md:w-70 h-auto aspect-square rounded-full opacity-10",
          isPrimary ? "top-0 right-0 translate-x-1/2 -translate-y-1/2" : "top-0 left-0 -translate-x-1/2 -translate-y-1/2"
        )}
        style={{
          background: `radial-gradient(circle at center, var(--color-background-accent) 35%, transparent 70%)`,
        }}
      />
      <div
        className={cls(
          "fixed w-100 md:w-70 h-auto aspect-square rounded-full opacity-10",
          isPrimary ? "bottom-0 left-0 -translate-x-1/2 translate-y-1/2" : "bottom-0 right-0 translate-x-1/2 translate-y-1/2"
        )}
        style={{
          background: `radial-gradient(circle at center, var(--color-background-accent) 35%, transparent 70%)`,
        }}
      />
    </div>
  );
};

CircleGradientBackground.displayName = "CircleGradientBackground";

export default memo(CircleGradientBackground);
