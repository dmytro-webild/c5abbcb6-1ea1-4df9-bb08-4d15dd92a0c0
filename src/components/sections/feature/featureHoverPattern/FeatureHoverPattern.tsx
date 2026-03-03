"use client";

import CardStack from "@/components/cardStack/CardStack";
import FeatureHoverPatternItem from "./FeatureHoverPatternItem";
import { shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type {
  ButtonConfig,
  CardAnimationType,
  TitleSegment,
  ButtonAnimationType,
} from "@/components/cardStack/types";
import type {
  TextboxLayout,
  InvertedBackground,
} from "@/providers/themeProvider/config/constants";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  button?: ButtonConfig;
}

interface FeatureHoverPatternProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
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
  iconContainerClassName?: string;
  iconClassName?: string;
  textBoxTitleClassName?: string;
  textBoxTitleImageWrapperClassName?: string;
  textBoxTitleImageClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  gradientClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  cardButtonClassName?: string;
  cardButtonTextClassName?: string;
}

const FeatureHoverPattern = ({
  features,
  carouselMode = "buttons",
  uniformGridCustomHeightClasses = "min-h-85 2xl:min-h-95",
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
  iconContainerClassName = "",
  iconClassName = "",
  textBoxTitleClassName = "",
  textBoxTitleImageWrapperClassName = "",
  textBoxTitleImageClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  gradientClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  cardButtonClassName = "",
  cardButtonTextClassName = "",
}: FeatureHoverPatternProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(
    useInvertedBackground,
    theme.cardStyle
  );

  return (
    <CardStack
      mode={carouselMode}
      gridVariant="uniform-all-items-equal"
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
        <FeatureHoverPatternItem
          key={`${feature.title}-${index}`}
          item={feature}
          index={index}
          className={cardClassName}
          iconContainerClassName={iconContainerClassName}
          iconClassName={iconClassName}
          titleClassName={cardTitleClassName}
          descriptionClassName={cardDescriptionClassName}
          gradientClassName={gradientClassName}
          shouldUseLightText={shouldUseLightText}
          buttonClassName={cardButtonClassName}
          buttonTextClassName={cardButtonTextClassName}
        />
      ))}
    </CardStack>
  );
};

FeatureHoverPattern.displayName = "FeatureHoverPattern";

export default FeatureHoverPattern;
