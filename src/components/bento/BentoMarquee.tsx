"use client";

import { memo } from "react";
import Marquee from "react-fast-marquee";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type BentoMarqueeProps = {
  centerIcon: LucideIcon;
  useInvertedBackground: InvertedBackground;
  className?: string;
} & (
  | { variant: "text"; texts: string[] }
  | { variant: "icon"; icons: LucideIcon[] }
);

const BentoMarquee = (props: BentoMarqueeProps) => {
  const { centerIcon, useInvertedBackground, className = "" } = props;
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
  const CenterIcon = centerIcon;
  const items = props.variant === "text"
    ? [...props.texts, ...props.texts]
    : [...props.icons, ...props.icons];

  return (
    <div
      className={cls("relative h-full w-full flex flex-col overflow-hidden", className)}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)"
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-1/2 h-auto w-full flex flex-col justify-center gap-2 opacity-60">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <Marquee
            key={rowIndex}
            gradient={false}
            speed={10}
            direction={rowIndex % 2 === 0 ? "left" : "right"}
          >
            {items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={cls("relative mx-1 card rounded-theme flex items-center justify-center", props.variant === "icon" ? "p-2 aspect-square" : "px-4 py-2")}
              >
                {props.variant === "text" ? (
                  <p className={cls("text-sm leading-tight", shouldUseLightText ? "text-background" : "text-foreground")}>{item as string}</p>
                ) : (
                  (() => {
                    const Icon = item as LucideIcon;
                    return <Icon className={cls("h-1/2 w-1/2", shouldUseLightText ? "text-background" : "text-foreground")} strokeWidth={1.5} />;
                  })()
                )}
              </div>
            ))}
          </Marquee>
        ))}
      </div>
      <div className="absolute! top-1/2 left-1/2 -translate-1/2 z-10 h-18 w-auto aspect-square primary-button backdrop-blur-xs rounded-theme flex items-center justify-center">
        <CenterIcon className="h-4/10 w-4/10 text-primary-cta-text" strokeWidth={1.5} />
      </div>
    </div>
  );
};

BentoMarquee.displayName = "BentoMarquee";

export default memo(BentoMarquee);
