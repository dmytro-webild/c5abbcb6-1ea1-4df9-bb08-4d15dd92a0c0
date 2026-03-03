"use client";

import { memo } from "react";
import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/background/GlowingEffect";
import { GLOWING_EFFECT_PROPS } from "./constants";
import { cls } from "@/lib/utils";

export interface FeatureBorderGlowItemData {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureBorderGlowItemProps {
  item: FeatureBorderGlowItemData;
  index: number;
  className?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  shouldUseLightText?: boolean;
}

const FeatureBorderGlowItem = memo(function FeatureBorderGlowItem({
  item,
  index,
  className = "",
  iconContainerClassName = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  shouldUseLightText = false,
}: FeatureBorderGlowItemProps) {
  const Icon = item.icon;

  return (
    <article
      key={`feature-${index}`}
      className={cls("card relative rounded-theme-capped min-h-0 h-full", className)}
      aria-label={item.title}
    >
      <div className="relative z-10 w-full h-full p-5 flex flex-col justify-between gap-5">
        <div
          className={cls(
            "h-15 w-[3.75rem] aspect-square primary-button rounded-theme flex items-center justify-center",
            iconContainerClassName
          )}
        >
          <Icon
            className={cls(
              "w-[35%] aspect-square text-primary-cta-text",
              iconClassName
            )}
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3
            className={cls(
              "text-2xl font-medium leading-tight",
              shouldUseLightText && "text-background",
              titleClassName
            )}
          >
            {item.title}
          </h3>
          <p
            className={cls(
              "text-sm leading-tight",
              shouldUseLightText ? "text-background" : "text-foreground",
              descriptionClassName
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
      <GlowingEffect {...GLOWING_EFFECT_PROPS} />
    </article>
  );
});

FeatureBorderGlowItem.displayName = "FeatureBorderGlowItem";

export default FeatureBorderGlowItem;
