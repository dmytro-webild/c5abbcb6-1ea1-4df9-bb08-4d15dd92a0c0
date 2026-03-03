"use client";

import { memo, useState, useEffect } from "react";
import { cls } from "@/lib/utils";

type BarData = {
  defaultHeight: number;
  hoverHeight: number;
};

interface BentoAnimatedBarChartProps {
  bars?: BarData[];
  className?: string;
  barClassName?: string;
}

const defaultBars: BarData[] = [
  { defaultHeight: 100, hoverHeight: 40 },
  { defaultHeight: 84, hoverHeight: 100 },
  { defaultHeight: 62, hoverHeight: 75 },
  { defaultHeight: 90, hoverHeight: 50 },
  { defaultHeight: 70, hoverHeight: 90 },
  { defaultHeight: 50, hoverHeight: 60 },
  { defaultHeight: 75, hoverHeight: 85 },
  { defaultHeight: 80, hoverHeight: 70 },
];

const BentoAnimatedBarChart = ({
  bars = defaultBars,
  className = "",
  barClassName = "",
}: BentoAnimatedBarChartProps) => {
  const [activeBar, setActiveBar] = useState(2); // Start at third bar (index 2)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBar((prev) => (prev + 1) % bars.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bars.length]);

  return (
    <div className={cls("group w-full h-full [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]", className)}>
      <style>{`
        .bento-bar {
          height: var(--default-height);
        }
        @media (min-width: 768px) {
          .group:hover .bento-bar {
            height: var(--hover-height) !important;
          }
        }
      `}</style>
      <div className="w-full h-full flex items-end gap-5">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={cls("relative bento-bar w-full rounded-theme transition-all duration-500 ease bg-background-accent", barClassName)}
            style={
              {
                "--default-height": `${bar.defaultHeight}%`,
                "--hover-height": `${bar.hoverHeight}%`,
              } as React.CSSProperties
            }
          >
            <div className={cls("absolute! inset-0 primary-button rounded-theme transition-opacity ease-in-out duration-500", activeBar === index ? "opacity-100" : "opacity-0")} />
          </div>
        ))}
      </div>
    </div>
  );
};

BentoAnimatedBarChart.displayName = "BentoAnimatedBarChart";

export default memo(BentoAnimatedBarChart);
