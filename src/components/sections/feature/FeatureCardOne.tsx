"use client";

import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";

import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
  title: string;
  description: string;
  button?: ButtonConfig;
} & (
    | {
      imageSrc: string;
      imageAlt?: string;
      videoSrc?: never;
      videoAriaLabel?: never;
    }
    | {
      videoSrc: string;
      videoAriaLabel?: string;
      imageSrc?: never;
      imageAlt?: never;
    }
  );

interface FeatureCardOneProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  gridVariant: GridVariant;
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
  cardButtonClassName?: string;
  cardButtonTextClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureCardOne = ({
  features,
  carouselMode = "buttons",
  gridVariant,
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
  cardButtonClassName = "",
  cardButtonTextClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureCardOneProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  const getButtonConfigProps = () => {
    if (theme.defaultButtonVariant === "hover-bubble") {
      return { bgClassName: "w-full" };
    }
    if (theme.defaultButtonVariant === "icon-arrow") {
      return { className: "justify-between" };
    }
    return {};
  };

  return (
    <CardStack
      mode={carouselMode}
      gridVariant={gridVariant}
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
      {features.map((feature, index) => (
        <div
          key={`${feature.title}-${index}`}
          className={cls("card flex flex-col gap-4 p-4 rounded-theme-capped min-h-0 h-full", cardClassName)}
        >
          <MediaContent
            imageSrc={feature.imageSrc}
            videoSrc={feature.videoSrc}
            imageAlt={feature.imageAlt || "Feature image"}
            videoAriaLabel={feature.videoAriaLabel || "Feature video"}
            imageClassName={cls("relative z-1 min-h-0 h-full", mediaClassName)}
          />
          <div className="relative z-1 flex flex-col gap-1">
            <h3 className={cls("text-2xl font-medium leading-tight", shouldUseLightText && "text-background", cardTitleClassName)}>
              {feature.title}
            </h3>
            <p className={cls("text-sm leading-tight", shouldUseLightText ? "text-background" : "text-foreground", cardDescriptionClassName)}>
              {feature.description}
            </p>
          </div>
          {feature.button && (
            <Button
              {...getButtonProps(
                { ...feature.button, props: { ...feature.button.props, ...getButtonConfigProps() } },
                0,
                theme.defaultButtonVariant,
                cls("w-full", cardButtonClassName),
                cardButtonTextClassName
              )}
            />
          )}
        </div>
      ))}
    </CardStack>
  );
};

FeatureCardOne.displayName = "FeatureCardOne";

export default FeatureCardOne;
