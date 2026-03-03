"use client";

import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { CardAnimationTypeWith3D, TitleSegment, ButtonConfig, ButtonAnimationType } from "@/components/cardStack/types";

import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

interface MediaItem {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  mediaItems: [MediaItem, MediaItem];
};

interface FeatureCardTwentyFiveProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  uniformGridCustomHeightClasses?: string;
  animationType: CardAnimationTypeWith3D;
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  textboxLayout: TextboxLayout;
  useInvertedBackground: InvertedBackground;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  mediaClassName?: string;
  textBoxTitleClassName?: string;
  textBoxTitleImageWrapperClassName?: string;
  textBoxTitleImageClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  cardIconClassName?: string;
  cardIconWrapperClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureCardTwentyFive = ({
  features,
  carouselMode = "buttons",
  uniformGridCustomHeightClasses,
  animationType,
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  textboxLayout,
  useInvertedBackground,
  ariaLabel = "Feature section",
  className = "",
  containerClassName = "",
  cardClassName = "",
  mediaClassName = "",
  textBoxTitleClassName = "",
  textBoxTitleImageWrapperClassName = "",
  textBoxTitleImageClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  cardIconClassName = "",
  cardIconWrapperClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureCardTwentyFiveProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  return (
    <CardStack
      mode={carouselMode}
      gridVariant="two-items-per-row"
      uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
      animationType={animationType}
      supports3DAnimation={true}

      title={title}
      titleSegments={titleSegments}
      description={description}
      tag={tag}
      tagIcon={tagIcon}
      tagAnimation={tagAnimation}
      buttons={buttons}
      buttonAnimation={buttonAnimation}
      textboxLayout={textboxLayout}
      useInvertedBackground={useInvertedBackground}
      className={className}
      containerClassName={containerClassName}
      gridClassName={gridClassName}
      carouselClassName={carouselClassName}
      controlsClassName={controlsClassName}
      textBoxClassName={textBoxClassName}
      titleClassName={textBoxTitleClassName}
      titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
      titleImageClassName={textBoxTitleImageClassName}
      descriptionClassName={textBoxDescriptionClassName}
      tagClassName={textBoxTagClassName}
      buttonContainerClassName={textBoxButtonContainerClassName}
      buttonClassName={textBoxButtonClassName}
      buttonTextClassName={textBoxButtonTextClassName}
      ariaLabel={ariaLabel}
    >
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div
            key={`${feature.title}-${index}`}
            className={cls("card flex flex-col gap-5 p-5 rounded-theme-capped min-h-0 h-full", cardClassName)}
          >
            <div className="relative z-1 flex flex-col gap-1">
              <div className={cls("h-15 w-[3.75rem] mb-1 aspect-square rounded-theme primary-button flex items-center justify-center", cardIconWrapperClassName)}>
                <IconComponent className={cls("h-4/10 w-4/10 text-primary-cta-text", cardIconClassName)} strokeWidth={1.5} />
              </div>
              <h3 className={cls("text-2xl font-medium leading-tight", shouldUseLightText && "text-background", cardTitleClassName)}>
                {feature.title}
              </h3>
              <p className={cls("text-base leading-tight", shouldUseLightText ? "text-background" : "text-foreground", cardDescriptionClassName)}>
                {feature.description}
              </p>
            </div>
            <div className="mt-auto flex-1 min-h-0 grid grid-cols-2 gap-5 overflow-hidden">
              {feature.mediaItems.map((item, mediaIndex) => (
                <div key={mediaIndex} className="overflow-hidden rounded-theme-capped">
                  <MediaContent
                    imageSrc={item.imageSrc}
                    videoSrc={item.videoSrc}
                    imageAlt={item.imageAlt || "Feature image"}
                    videoAriaLabel={item.videoAriaLabel || "Feature video"}
                    imageClassName={cls("relative z-1 h-full w-full object-cover", mediaClassName)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </CardStack>
  );
};

FeatureCardTwentyFive.displayName = "FeatureCardTwentyFive";

export default FeatureCardTwentyFive;
