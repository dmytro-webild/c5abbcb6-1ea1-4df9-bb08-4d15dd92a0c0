"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
};

interface FeatureCardTwentySevenItemProps {
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const FeatureCardTwentySevenItem = ({
  title,
  description,
  imageSrc,
  videoSrc,
  imageAlt = "",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: FeatureCardTwentySevenItemProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cls(
        "relative w-full h-full min-h-0 group [perspective:3000px] cursor-pointer",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cls(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div className="relative w-full h-full card rounded-theme-capped p-6 gap-6 flex flex-col [backface-visibility:hidden]">
          <div className="flex justify-between items-start">
            <h3 className={cls("text-2xl font-medium leading-tight", titleClassName)}>
              {title}
            </h3>
            <div className="h-[calc(var(--text-2xl)*1.25)] w-[calc(var(--text-2xl)*1.25)] aspect-square rounded-theme primary-button flex items-center justify-center shrink-0">
              <Plus className="h-1/2 w-1/2 text-primary-cta-text" />
            </div>
          </div>
          <div className="w-full aspect-square md:aspect-[10/11] flex items-center justify-center rounded-theme-capped overflow-hidden">
            <MediaContent
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              imageAlt={imageAlt}
              imageClassName="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute! inset-0 w-full h-full card rounded-theme-capped p-6 gap-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex justify-between items-start">
            <h3 className={cls("text-2xl font-medium leading-tight", titleClassName)}>
              {title}
            </h3>
            <div className="h-[calc(var(--text-2xl)*1.25)] w-[calc(var(--text-2xl)*1.25)] aspect-square rounded-theme primary-button flex items-center justify-center shrink-0">
              <Plus className="h-1/2 w-1/2 rotate-45 text-primary-cta-text" />
            </div>
          </div>
          <div className="w-full">
            <p className={cls("text-lg text-foreground/75 leading-tight", descriptionClassName)}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardTwentySevenProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  gridVariant: GridVariant;
  uniformGridCustomHeightClasses?: string;
  animationType: CardAnimationType;
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
  textBoxTitleClassName?: string;
  textBoxTitleImageWrapperClassName?: string;
  textBoxTitleImageClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureCardTwentySeven = ({
  features,
  carouselMode = "buttons",
  gridVariant,
  uniformGridCustomHeightClasses = "min-h-none",
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
  textBoxTitleClassName = "",
  textBoxTitleImageWrapperClassName = "",
  textBoxTitleImageClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureCardTwentySevenProps) => {
  return (
    <CardStack
      mode={carouselMode}
      gridVariant={gridVariant}
      uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
      animationType={animationType}
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
      {features.map((feature, index) => (
        <FeatureCardTwentySevenItem
          key={`${feature.id}-${index}`}
          title={feature.title}
          description={feature.description}
          imageSrc={feature.imageSrc}
          videoSrc={feature.videoSrc}
          imageAlt={feature.imageAlt}
          className={cardClassName}
          titleClassName={cardTitleClassName}
          descriptionClassName={cardDescriptionClassName}
        />
      ))}
    </CardStack>
  );
};

FeatureCardTwentySeven.displayName = "FeatureCardTwentySeven";

export default FeatureCardTwentySeven;
