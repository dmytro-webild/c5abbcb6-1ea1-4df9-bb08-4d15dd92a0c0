"use client";

import { memo, Fragment } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

export type TaskItem = {
  icon: LucideIcon;
  label: string;
  time: string;
};

interface Bento3DTaskListProps {
  title: string;
  items: TaskItem[];
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const Bento3DTaskList = ({
  title,
  items,
  useInvertedBackground,
  className = "",
}: Bento3DTaskListProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  return (
    <div
      className={cls("h-full w-full flex items-center justify-center", className)}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in"
      }}
    >
      <div
        className={cls(
          "relative w-80 md:w-25 p-6 card rounded-theme-capped flex flex-col gap-3 translate-x-4 -translate-y-5"
        )}
        style={{
          transform: "rotateX(30deg) rotateY(30deg) rotateZ(-30deg)",
          transformStyle: "preserve-3d"
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-[var(--text-base)] w-auto aspect-square rounded-theme primary-button" />
          <h3 className={cls("text-base leading-tight", shouldUseLightText ? "text-background" : "text-foreground")}>
            {title}
          </h3>
        </div>

        <div className="relative w-full min-w-0 secondary-button rounded-theme-capped flex flex-col p-5 gap-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Fragment key={index}>
                <div
                  className={cls(
                    "w-full min-w-0 flex items-center justify-between gap-3"
                  )}
                >
                  <div className="w-full min-w-0 flex items-center gap-3">
                    <div
                      className="h-6 w-auto aspect-square rounded-theme flex items-center justify-center primary-button"
                    >
                      <Icon className="h-4/10 w-4/10 aspect-square text-primary-cta-text" strokeWidth={1.5} />
                    </div>
                    <p className={cls("text-sm truncate", shouldUseLightText ? "text-background" : "text-foreground")}>
                      {item.label}
                    </p>
                  </div>
                  <p className={cls("text-xs text-nowrap", shouldUseLightText ? "text-background/75" : "text-foreground/75")}>
                    {item.time}
                  </p>
                </div>
                {index !== items.length - 1 && (
                  <div className="h-px bg-background-accent/50" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Bento3DTaskList.displayName = "Bento3DTaskList";

export default memo(Bento3DTaskList);
