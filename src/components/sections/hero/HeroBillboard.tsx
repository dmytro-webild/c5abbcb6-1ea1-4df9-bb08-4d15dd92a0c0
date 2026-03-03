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

type HeroBillboardBackgroundProps = Extract<
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

interface HeroBillboardProps {
  title: string;
  description: string;
  background: HeroBillboardBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  avatars?: Avatar[];
  avatarText?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  mediaAnimation?: ButtonAnimationType;
  marqueeItems?: MarqueeItem[];
  marqueeSpeed?: number;
  showMarqueeCard?: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  avatarGroupClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
  marqueeClassName?: string;
  marqueeItemClassName?: string;
  marqueeCardClassName?: string;
  marqueeImageClassName?: string;
  marqueeTextClassName?: string;
  marqueeIconClassName?: string;
}

const HeroBillboard = ({
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
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  mediaAnimation = "none",
  marqueeItems,
  marqueeSpeed = 30,
  showMarqueeCard = true,
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  avatarGroupClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
  marqueeClassName = "",
  marqueeItemClassName = "",
  marqueeCardClassName = "",
  marqueeImageClassName = "",
  marqueeTextClassName = "",
  marqueeIconClassName = "",
}: HeroBillboardProps) => {
  const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full py-hero-page-padding", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto flex flex-col gap-14 md:gap-15 relative z-10", containerClassName)}>
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
          avatarsAbove={true}
          className={cls("flex flex-col gap-3 md:gap-3", textBoxClassName)}
          titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-base md:text-lg leading-tight", descriptionClassName)}
          tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1", tagClassName)}
          avatarGroupClassName={avatarGroupClassName}
          buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
          buttonClassName={buttonClassName}
          buttonTextClassName={buttonTextClassName}
          center={true}
        />
        <div className="flex flex-col gap-6" >
          <div ref={mediaContainerRef} className={cls("w-full overflow-hidden rounded-theme-capped card p-4", mediaWrapperClassName)}>
            <MediaContent
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              imageAlt={imageAlt}
              videoAriaLabel={videoAriaLabel}
              imageClassName={cls("z-1 aspect-square md:aspect-video", imageClassName)}
            />
          </div>
          {marqueeItems && marqueeItems.length > 0 && (
            <LogoMarquee
              items={marqueeItems}
              speed={marqueeSpeed}
              showCard={showMarqueeCard}
              className={cls("w-content-width mx-auto z-10", marqueeClassName)}
              itemClassName={marqueeItemClassName}
              cardClassName={marqueeCardClassName}
              imageClassName={marqueeImageClassName}
              textClassName={marqueeTextClassName}
              iconClassName={marqueeIconClassName}
            />
          )}
        </div>
      </div>
    </section>
  );
};

HeroBillboard.displayName = "HeroBillboard";

export default HeroBillboard;