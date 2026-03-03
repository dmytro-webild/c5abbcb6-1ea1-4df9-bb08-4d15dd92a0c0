"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

interface BentoRevealIconProps {
  icon: LucideIcon;
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const BentoRevealIcon = ({
  icon: Icon,
  useInvertedBackground,
  className = "",
}: BentoRevealIconProps) => {
  void useInvertedBackground;

  return (
    <div
      className={cls(
        "group relative h-full w-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <div className="relative h-26 w-[6.5rem]">
        <div
          className="absolute right-full top-1/2 -mt-48 transition-transform duration-500 ease-out group-hover:-translate-x-12"
          style={{ transform: "translateX(calc(52px + 1px - 2px))" }}
        >
          <div className="relative h-96 aspect-[224/280] -scale-x-100">
            <svg viewBox="0 0 224 280" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path fill="currentColor" className="text-background-accent/10" d="M8 .25a8 8 0 0 0-8 8v91.704c0 2.258.954 4.411 2.628 5.927l10.744 9.738A7.998 7.998 0 0 1 16 121.546v36.408a7.998 7.998 0 0 1-2.628 5.927l-10.744 9.738A7.998 7.998 0 0 0 0 179.546v92.204a8 8 0 0 0 8 8h308a8 8 0 0 0 8-8V8.25a8 8 0 0 0-8-8H8Z" />
              <path stroke="currentColor" className="text-background-accent" d="M.5 99.954V8.25A7.5 7.5 0 0 1 8 .75h308a7.5 7.5 0 0 1 7.5 7.5v263.5a7.5 7.5 0 0 1-7.5 7.5H8a7.5 7.5 0 0 1-7.5-7.5v-92.204a7.5 7.5 0 0 1 2.464-5.557l10.744-9.737a8.5 8.5 0 0 0 2.792-6.298v-36.408a8.5 8.5 0 0 0-2.792-6.298l-10.744-9.737A7.5 7.5 0 0 1 .5 99.954Z" />
            </svg>
          </div>
        </div>

        <div
          className="absolute left-full top-1/2 -mt-48 transition-transform duration-500 ease-out group-hover:translate-x-12"
          style={{ transform: "translateX(calc(-52px - 1px + 2px))" }}
        >
          <div className="relative h-96 aspect-[224/280]">
            <svg viewBox="0 0 224 280" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path fill="currentColor" className="text-background-accent/10" d="M8 .25a8 8 0 0 0-8 8v91.704c0 2.258.954 4.411 2.628 5.927l10.744 9.738A7.998 7.998 0 0 1 16 121.546v36.408a7.998 7.998 0 0 1-2.628 5.927l-10.744 9.738A7.998 7.998 0 0 0 0 179.546v92.204a8 8 0 0 0 8 8h308a8 8 0 0 0 8-8V8.25a8 8 0 0 0-8-8H8Z" />
              <path stroke="currentColor" className="text-background-accent" d="M.5 99.954V8.25A7.5 7.5 0 0 1 8 .75h308a7.5 7.5 0 0 1 7.5 7.5v263.5a7.5 7.5 0 0 1-7.5 7.5H8a7.5 7.5 0 0 1-7.5-7.5v-92.204a7.5 7.5 0 0 1 2.464-5.557l10.744-9.737a8.5 8.5 0 0 0 2.792-6.298v-36.408a8.5 8.5 0 0 0-2.792-6.298l-10.744-9.737A7.5 7.5 0 0 1 .5 99.954Z" />
            </svg>
          </div>
        </div>

        <div className="relative w-full h-full p-2">
          <div className="relative w-full h-full primary-button rounded-theme flex items-center justify-center">
            <Icon className="relative z-10 h-4/10 w-auto text-primary-cta-text" strokeWidth={1.25} />
          </div>
        </div>
        <div
          className="absolute inset-px z-10 rounded-full mix-blend-overlay"
          style={{ clipPath: "circle(50%)" }}
        >
          <div
            className="absolute inset-0 z-10 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
            style={{
              backgroundImage: "linear-gradient(to bottom right, transparent 30%, black, transparent 70%)",
              transform: "translate(-65px, -65px)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

BentoRevealIcon.displayName = "BentoRevealIcon";

export default memo(BentoRevealIcon);
