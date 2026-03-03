"use client";

import { memo } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

interface StackCardProps {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  detail: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  detailClassName?: string;
}

interface Bento3DStackCardProps extends StackCardProps {
  className?: string;
  useInvertedBackground: InvertedBackground;
}

const StackCard = memo(({
  className = "",
  Icon,
  title,
  subtitle,
  detail,
  iconClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  detailClassName = "",
  useInvertedBackground,
}: Bento3DStackCardProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  return (
    <div
      className={cls(
        "relative flex h-35 w-80 md:w-25 p-6 -skew-y-[8deg] card rounded-theme-capped flex-col justify-between transition-all duration-700",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cls(
            "relative h-5 aspect-square primary-button rounded-theme flex items-center justify-center",
            iconClassName
          )}
        >
          <Icon className="h-1/2 w-auto aspect-square text-primary-cta-text" strokeWidth={1.5} />
        </div>
        <p className={cls("text-base", shouldUseLightText ? "text-background" : "text-foreground", titleClassName)}>
          {title}
        </p>
      </div>
      <p className={cls("whitespace-nowrap text-lg", shouldUseLightText ? "text-background" : "text-foreground", subtitleClassName)}>
        {subtitle}
      </p>
      <p className={cls("text-base", shouldUseLightText ? "text-background" : "text-foreground", detailClassName)}>
        {detail}
      </p>
    </div>
  );
});

StackCard.displayName = "StackCard";

interface Bento3DStackCardsProps {
  cards: StackCardProps[];
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const Bento3DStackCards = ({
  cards,
  useInvertedBackground,
  className = "",
}: Bento3DStackCardsProps) => {
  const baseClassNames = [
    "[grid-area:stack] -translate-y-14 hover:-translate-y-20",
    "[grid-area:stack] translate-x-15 translate-y-0 hover:-translate-y-5",
    "[grid-area:stack] translate-x-31 translate-y-15 hover:translate-y-10",
  ];

  const displayCards = cards.slice(0, 3).map((card, index) => ({
    ...card,
    className: `${baseClassNames[index]} ${card.iconClassName || ""}`,
  }));

  return (
    <div
      className={cls("h-full grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700", className)}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, black 0%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, black 0%, black 80%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in"
      }}
    >
      {displayCards.map((cardProps, index) => (
        <StackCard
          key={index}
          {...cardProps}
          useInvertedBackground={useInvertedBackground}
        />
      ))}
    </div>
  );
};

Bento3DStackCards.displayName = "Bento3DStackCards";

export default memo(Bento3DStackCards);
