"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type TimelineItem = {
  label: string;
  detail: string;
};

interface BentoTimelineProps {
  heading: string;
  subheading: string;
  items: [TimelineItem, TimelineItem, TimelineItem];
  completedLabel: string;
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const itemDelays = [
  { check: 'delay-[150ms]', label: 'delay-[200ms]', detail: 'delay-[250ms]' },
  { check: 'delay-[350ms]', label: 'delay-[400ms]', detail: 'delay-[450ms]' },
  { check: 'delay-[550ms]', label: 'delay-[600ms]', detail: 'delay-[650ms]' },
] as const;

const BentoTimeline = ({
  heading,
  subheading,
  items,
  completedLabel,
  useInvertedBackground,
  className = "",
}: BentoTimelineProps) => {
  void useInvertedBackground;

  return (
    <div
      className={cls(
        "group relative h-full w-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-full aspect-square rounded-full border border-background-accent/30 scale-100" />
        <div className="absolute h-full aspect-square rounded-full border border-background-accent/30 scale-80" />
        <div className="absolute h-full aspect-square rounded-full border border-background-accent/30 scale-60" />
      </div>

      <div className="relative max-w-full min-w-0 flex flex-col gap-3 p-4 mask-fade-y-small">
        <div className="card shadow rounded-theme-capped p-3 flex items-center gap-2">
          <Loader className="h-[var(--text-sm)] w-auto text-primary transition-transform duration-1000 ease-out group-hover:rotate-[360deg]" strokeWidth={1.5} />
          <p className="text-xs text-foreground truncate">{heading}</p>
          <p className="text-xs text-foreground/75 ml-auto text-nowrap">{subheading}</p>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="card shadow rounded-theme-capped px-3 py-2 flex items-center gap-2"
          >
            <div className="relative h-6 w-auto aspect-square card shadow rounded-theme flex items-center justify-center">
              <div className="absolute! h-3/10 w-3/10 primary-button rounded-theme transition-opacity duration-300 group-hover:opacity-0" />
              <div
                className={cls(
                  "absolute! inset-0 rounded-theme primary-button flex items-center justify-center",
                  "opacity-0 scale-75 transition-all duration-300",
                  `group-hover:opacity-100 group-hover:scale-100 ${itemDelays[index].check}`
                )}
              >
                <Check className="h-1/2 w-1/2 text-primary-cta-text" strokeWidth={2} />
              </div>
            </div>

            <div className="w-full min-w-0 max-w-full flex-1 flex items-center gap-10 justify-between">
              <p
                className={cls(
                  "text-xs text-foreground truncate opacity-0 transition-all duration-300",
                  `group-hover:opacity-100 ${itemDelays[index].label}`
                )}
              >
                {item.label}
              </p>
              <p
                className={cls(
                  "text-xs text-foreground/75 text-nowrap opacity-0 translate-y-1 transition-all duration-300",
                  `group-hover:opacity-100 group-hover:translate-y-0 ${itemDelays[index].detail}`
                )}
              >
                {item.detail}
              </p>
            </div>
          </div>
        ))}

        <div className="primary-button rounded-theme-capped p-3 flex items-center justify-center">
          <div className="absolute flex gap-2 transition-opacity duration-500 delay-[900ms] group-hover:opacity-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2 w-auto aspect-square rounded-theme bg-primary-cta-text" />
            ))}
          </div>
          <p
            className="text-xs text-primary-cta-text truncate opacity-0 transition-opacity duration-500 delay-[900ms] group-hover:opacity-100"
          >
            {completedLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

BentoTimeline.displayName = "BentoTimeline";

export default memo(BentoTimeline);
