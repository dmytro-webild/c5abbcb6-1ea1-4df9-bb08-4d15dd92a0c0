"use client";

import { memo } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type BentoInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

interface BentoIconInfoCardsProps {
  items: BentoInfoItem[];
  useInvertedBackground: InvertedBackground;
  className?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const BentoIconInfoCards = ({
  items,
  useInvertedBackground,
  className = "",
  cardClassName = "",
  iconWrapperClassName = "",
  iconClassName = "",
  labelClassName = "",
  valueClassName = "",
}: BentoIconInfoCardsProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={cls("h-full min-h-0 overflow-hidden mask-fade-y", className)}>
      <div className="flex flex-col animate-marquee-vertical px-px">
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={cls("card shadow rounded-theme-capped p-3 flex items-center justify-between flex-shrink-0 mb-4", cardClassName)}
            >
              <div className="w-full min-w-0 flex items-center gap-3">
                <div className={cls("h-10 w-auto aspect-square rounded-theme flex items-center justify-center secondary-button", iconWrapperClassName)}>
                  <Icon className={cls("h-4/10 w-4/10 text-secondary-cta-text", iconClassName)} strokeWidth={1.5} />
                </div>
                <p className={cls("text-base truncate", shouldUseLightText ? "text-background" : "text-foreground", labelClassName)}>
                  {item.label}
                </p>
              </div>
              <p className={cls("text-base", shouldUseLightText ? "text-background" : "text-foreground", valueClassName)}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BentoIconInfoCards.displayName = "BentoIconInfoCards";

export default memo(BentoIconInfoCards);
