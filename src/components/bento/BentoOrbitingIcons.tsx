"use client";

import { memo } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type OrbitingItem = {
  icon: LucideIcon;
  ring?: 1 | 2 | 3; // Which ring to orbit on (1=innermost, 3=outermost), defaults to 2
  duration?: number; // Animation duration in seconds, defaults to 10
};

interface BentoOrbitingIconsProps {
  centerIcon: LucideIcon;
  items: OrbitingItem[];
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const BentoOrbitingIcons = ({
  centerIcon,
  items,
  useInvertedBackground,
  className = "",
}: BentoOrbitingIconsProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
  const CenterIcon = centerIcon;

  const circleStyles = "secondary-button border border-background-accent! shadow rounded-full";

  return (
    <div
      className={cls("relative h-full flex flex-col overflow-hidden", className)}
      style={{
        perspective: "2000px",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in"
      }}
    >
      <div
        className="flex-1 rounded-t-theme-capped gap-2 flex items-center justify-center w-full h-full inset-x-0 p-2 relative"
        style={{
          transform: "rotateY(20deg) rotateX(20deg) rotateZ(-20deg)"
        }}
      >
        {/* Background concentric circles */}
        <div className={cls("absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 h-[15rem] w-[15rem] z-[9] opacity-85", circleStyles)} />
        <div className={cls("absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 h-[20rem] w-[20rem] z-[8] opacity-65", circleStyles)} />
        <div className={cls("absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 h-[25rem] w-[25rem] z-[7] opacity-45", circleStyles)} />
        <div className={cls("absolute! top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0 h-[30rem] w-[30rem] z-[6] opacity-25", circleStyles)} />

        {/* Center circle with icon */}
        <div className={cls("absolute! inset-0 shrink-0 h-40 w-[10rem] z-10 m-auto flex items-center justify-center", circleStyles)}>

          <div className="absolute! primary-button h-[5rem] w-[5rem] rounded-full flex items-center justify-center" >
            <CenterIcon className="absolute h-1/2 w-1/2 text-primary-cta-text" strokeWidth={1.25} />
          </div>

          {/* Orbiting items */}
          {items.map((item, index) => {
            const Icon = item.icon;
            const ring = item.ring || 2;
            // Ring radii: 7.5rem=120px, 10rem=160px, 12.5rem=200px
            const radiusMap = { 1: 120, 2: 160, 3: 200 };
            const radius = radiusMap[ring];
            const duration = item.duration || 10;
            // Evenly distribute items around the circle
            const initialPosition = (360 / items.length) * index;

            return (
              <div
                key={index}
                className={cls("!absolute top-1/2 left-1/2 h-[2.5rem] w-[2.5rem] card shadow rounded-theme flex items-center justify-center")}
                style={{
                  marginLeft: '-1.25rem',
                  marginTop: '-1.25rem',
                  animation: `orbit ${duration}s linear infinite`,
                  "--initial-position": `${initialPosition}deg`,
                  "--translate-position": `${radius}px`,
                  "--orbit-duration": `${duration}s`,
                } as React.CSSProperties & {
                  "--initial-position": string;
                  "--translate-position": string;
                  "--orbit-duration": string;
                }}
              >
                <Icon className={cls("h-4/10 w-4/10", shouldUseLightText ? "text-background" : "text-foreground")} strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BentoOrbitingIcons.displayName = "BentoOrbitingIcons";

export default memo(BentoOrbitingIcons);
