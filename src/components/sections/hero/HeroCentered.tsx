"use client";

import TextBox from "@/components/Textbox";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import LogoMarquee, { type MarqueeItem } from "@/components/shared/LogoMarquee";
import { cls } from "@/lib/utils";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "@/components/shared/AvatarGroup";

type HeroCenteredBackgroundProps = Extract<
  HeroBackgroundVariantProps,
  | { variant: "plain" }
  | { variant: "animated-grid" }
  | { variant: "canvas-reveal" }
  | { variant: "cell-wave" }
  | { variant: "downward-rays-animated" }
  | { variant: "downward-rays-animated-grid" }
  | { variant: "downward-rays-static" }
  | { variant: "downward-rays-static-grid" }
  | { variant: "gradient-bars" }
  | { variant: "radial-gradient" }
  | { variant: "rotated-rays-animated" }
  | { variant: "rotated-rays-animated-grid" }
  | { variant: "rotated-rays-static" }
  | { variant: "rotated-rays-static-grid" }
  | { variant: "sparkles-gradient" }
>;

interface HeroCenteredProps {
  title: string;
  description: string;
  background: HeroCenteredBackgroundProps;
  avatars: Avatar[];
  avatarText?: string;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  marqueeItems?: MarqueeItem[];
  marqueeSpeed?: number;
  showMarqueeCard?: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  avatarGroupClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  marqueeClassName?: string;
  marqueeItemClassName?: string;
  marqueeCardClassName?: string;
  marqueeImageClassName?: string;
  marqueeTextClassName?: string;
  marqueeIconClassName?: string;
}

const HeroCentered = ({
  title,
  description,
  background,
  avatars,
  avatarText,
  buttons,
  buttonAnimation,
  marqueeItems,
  marqueeSpeed = 30,
  showMarqueeCard = true,
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  avatarGroupClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  marqueeClassName = "",
  marqueeItemClassName = "",
  marqueeCardClassName = "",
  marqueeImageClassName = "",
  marqueeTextClassName = "",
  marqueeIconClassName = "",
}: HeroCenteredProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-svh md:h-screen flex flex-col items-center justify-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
        <TextBox
          title={title}
          description={description}
          avatars={avatars}
          avatarText={avatarText}
          avatarsAbove={true}
          buttons={buttons}
          buttonAnimation={buttonAnimation}
          className={cls("md:max-w-7/10 mx-auto flex flex-col gap-3 md:gap-3", textBoxClassName)}
          titleClassName={cls("text-7xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-lg md:text-xl leading-tight", descriptionClassName)}
          avatarGroupClassName={avatarGroupClassName}
          buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-3", buttonContainerClassName)}
          buttonClassName={buttonClassName}
          buttonTextClassName={buttonTextClassName}
          center={true}
        />
      </div>

      {marqueeItems && marqueeItems.length > 0 && (
        <LogoMarquee
          items={marqueeItems}
          speed={marqueeSpeed}
          showCard={showMarqueeCard}
          className={cls("absolute bottom-6 left-1/2 -translate-x-1/2 w-content-width z-10", marqueeClassName)}
          itemClassName={marqueeItemClassName}
          cardClassName={marqueeCardClassName}
          imageClassName={marqueeImageClassName}
          textClassName={marqueeTextClassName}
          iconClassName={marqueeIconClassName}
        />
      )}
    </section>
  );
};

HeroCentered.displayName = "HeroCentered";

export default HeroCentered;
