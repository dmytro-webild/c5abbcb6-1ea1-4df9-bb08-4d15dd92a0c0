"use client";

import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import LogoMarquee, { type MarqueeItem } from "@/components/shared/LogoMarquee";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "@/components/shared/AvatarGroup";

type HeroSplitBackgroundProps = Extract<
  HeroBackgroundVariantProps,
  | { variant: "plain" }
  | { variant: "animated-grid" }
  | { variant: "canvas-reveal" }
  | { variant: "cell-wave" }
  | { variant: "downward-rays-animated" }
  | { variant: "downward-rays-animated-grid" }
  | { variant: "downward-rays-static" }
  | { variant: "downward-rays-static-grid" }
  | { variant: "glowing-orb" }
  | { variant: "gradient-bars" }
  | { variant: "radial-gradient" }
  | { variant: "rotated-rays-animated" }
  | { variant: "rotated-rays-animated-grid" }
  | { variant: "rotated-rays-static" }
  | { variant: "rotated-rays-static-grid" }
  | { variant: "sparkles-gradient" }
>;

interface HeroSplitProps {
  title: string;
  description: string;
  background: HeroSplitBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  avatars?: Avatar[];
  mediaAnimation: ButtonAnimationType;
  avatarText?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  ariaLabel?: string;
  imagePosition?: "left" | "right";
  fixedMediaHeight?: boolean;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
  avatarGroupClassName?: string;
  marqueeItems?: MarqueeItem[];
  marqueeSpeed?: number;
  showMarqueeCard?: boolean;
  marqueeClassName?: string;
  marqueeItemClassName?: string;
  marqueeCardClassName?: string;
  marqueeImageClassName?: string;
  marqueeTextClassName?: string;
  marqueeIconClassName?: string;
}

const HeroSplit = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  avatars,
  mediaAnimation,
  avatarText,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  ariaLabel = "Hero section",
  imagePosition = "right",
  fixedMediaHeight = true,
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
  avatarGroupClassName = "",
  marqueeItems,
  marqueeSpeed = 30,
  showMarqueeCard = true,
  marqueeClassName = "",
  marqueeItemClassName = "",
  marqueeCardClassName = "",
  marqueeImageClassName = "",
  marqueeTextClassName = "",
  marqueeIconClassName = "",
}: HeroSplitProps) => {
  const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

  const mediaContent = (
    <div ref={mediaContainerRef} className={cls(
      "w-full h-fit md:w-1/2 overflow-hidden rounded-theme-capped card p-4 md:max-h-[75svh]",
      fixedMediaHeight && "h-100 md:h-[65vh]",
      mediaWrapperClassName
    )}>
      <MediaContent
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        imageAlt={imageAlt}
        videoAriaLabel={videoAriaLabel}
        imageClassName={cls("h-full min-h-0", imageClassName)}
      />
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-fit py-hero-page-padding md:py-0 md:h-svh flex items-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto flex flex-col md:flex-row gap-13 md:gap-15 items-center relative z-10", containerClassName)}>
        {imagePosition === "left" && mediaContent}

        <div className={cls("w-full md:w-1/2")}>
          {/* Mobile */}
          <TextBox
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            avatars={avatars}
            avatarText={avatarText}
            avatarGroupClassName={cls("!mt-5", avatarGroupClassName)}
            className={cls("flex flex-col gap-3 md:hidden", textBoxClassName)}
            titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
            descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-[1.2] text-center md:text-left", descriptionClassName)}
            tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
            buttonClassName={cls("", buttonClassName)}
            buttonTextClassName={cls("text-base", buttonTextClassName)}
            center={true}
          />
          {/* Desktop */}
          <TextBox
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            avatars={avatars}
            avatarText={avatarText}
            avatarGroupClassName={cls("", avatarGroupClassName)}
            className={cls("hidden md:flex flex-col gap-3 md:gap-4", textBoxClassName)}
            titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
            descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-tight text-center md:text-left", descriptionClassName)}
            tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
            buttonClassName={cls("", buttonClassName)}
            buttonTextClassName={cls("text-base", buttonTextClassName)}
            center={false}
          />
        </div>

        {imagePosition === "right" && mediaContent}
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

HeroSplit.displayName = "HeroSplit";

export default HeroSplit;
