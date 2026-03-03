"use client";

import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import LogoMarquee, { type MarqueeItem } from "@/components/shared/LogoMarquee";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "@/components/shared/AvatarGroup";

export interface CarouselMediaItem {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

type HeroSplitDoubleCarouselBackgroundProps = Extract<
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

interface HeroSplitDoubleCarouselProps {
  title: string;
  description: string;
  background: HeroSplitDoubleCarouselBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  avatars?: Avatar[];
  avatarText?: string;
  leftCarouselItems: CarouselMediaItem[];
  rightCarouselItems: CarouselMediaItem[];
  ariaLabel?: string;
  carouselPosition?: "left" | "right";
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  carouselWrapperClassName?: string;
  carouselColumnClassName?: string;
  carouselItemClassName?: string;
  carouselImageClassName?: string;
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

const HeroSplitDoubleCarousel = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  avatars,
  avatarText,
  leftCarouselItems,
  rightCarouselItems,
  ariaLabel = "Hero section",
  carouselPosition = "right",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  carouselWrapperClassName = "",
  carouselColumnClassName = "",
  carouselItemClassName = "",
  carouselImageClassName = "",
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
}: HeroSplitDoubleCarouselProps) => {
  const duplicatedLeftItems = [...leftCarouselItems, ...leftCarouselItems, ...leftCarouselItems, ...leftCarouselItems];
  const duplicatedRightItems = [...rightCarouselItems, ...rightCarouselItems, ...rightCarouselItems, ...rightCarouselItems];

  const renderColumn = (items: CarouselMediaItem[], direction: "up" | "down") => (
    <div className={cls("flex-1 h-full min-h-0 overflow-hidden mask-fade-y-medium", carouselColumnClassName)}>
      <div className={cls("flex flex-col gap-4 px-px", direction === "up" ? "animate-marquee-vertical" : "animate-marquee-vertical-reverse")}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cls("relative card aspect-square rounded-theme-capped p-1 overflow-hidden flex-shrink-0", carouselItemClassName)}
          >
            <div className="h-full w-full rounded-[calc(var(--radius-theme-capped)*0.92)] overflow-hidden">
              <MediaContent
                imageSrc={item.imageSrc}
                videoSrc={item.videoSrc}
                imageAlt={item.imageAlt || ""}
                videoAriaLabel={item.videoAriaLabel || "Carousel video"}
                imageClassName={cls("h-full w-full object-cover rounded-none!", carouselImageClassName)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const carouselContent = (
    <div className="w-full md:w-1/2 overflow-hidden h-100 md:h-screen py-hero-page-padding" >
      <div
        className={cls(
          "w-full h-full overflow-hidden",
          carouselWrapperClassName
        )}
      >
        <div className="h-full flex gap-4">
          {renderColumn(duplicatedLeftItems, "up")}
          {renderColumn(duplicatedRightItems, "down")}
        </div>
      </div>
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-fit py-hero-page-padding md:py-0 md:h-svh flex items-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto flex flex-col md:flex-row gap-13 md:gap-15 items-center relative z-10", containerClassName)}>
        {carouselPosition === "left" && carouselContent}

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

        {carouselPosition === "right" && carouselContent}
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

HeroSplitDoubleCarousel.displayName = "HeroSplitDoubleCarousel";

export default HeroSplitDoubleCarousel;
