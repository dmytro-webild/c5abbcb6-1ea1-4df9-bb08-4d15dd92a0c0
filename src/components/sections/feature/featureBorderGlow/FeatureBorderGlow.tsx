"use client";

import CardStack from "@/components/cardStack/CardStack";
import FeatureBorderGlowItem from "./FeatureBorderGlowItem";
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
}

interface FeatureBorderGlowProps {
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
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureBorderGlow = ({
  features,
  carouselMode = "buttons",
  uniformGridCustomHeightClasses = "min-h-75 2xl:min-h-85",
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
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureBorderGlowProps) => {
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
        <FeatureBorderGlowItem
          key={`${feature.title}-${index}`}
          item={feature}
          index={index}
          className={cardClassName}
          iconContainerClassName={iconContainerClassName}
          iconClassName={iconClassName}
          titleClassName={cardTitleClassName}
          descriptionClassName={cardDescriptionClassName}
          shouldUseLightText={shouldUseLightText}
        />
      ))}
    </CardStack>
  );
};

FeatureBorderGlow.displayName = "FeatureBorderGlow";

export default FeatureBorderGlow;
