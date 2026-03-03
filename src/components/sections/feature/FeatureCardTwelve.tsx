"use client";

import { Fragment } from "react";
import CardList from "@/components/cardStack/CardList";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

interface FeatureCard {
  id: string;
  label: string;
  title: string;
  items: string[];
  buttons?: ButtonConfig[];
}

interface FeatureCardTwelveProps {
  features: FeatureCard[];
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
  textBoxDescriptionClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  titleImageWrapperClassName?: string;
  titleImageClassName?: string;
  cardContentClassName?: string;
  labelClassName?: string;
  cardTitleClassName?: string;
  itemsContainerClassName?: string;
  itemTextClassName?: string;
  cardButtonClassName?: string;
  cardButtonTextClassName?: string;
}

const FeatureCardTwelve = ({
  features,
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
  textBoxDescriptionClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  titleImageWrapperClassName = "",
  titleImageClassName = "",
  cardContentClassName = "",
  labelClassName = "",
  cardTitleClassName = "",
  itemsContainerClassName = "",
  itemTextClassName = "",
  cardButtonClassName = "",
  cardButtonTextClassName = "",
}: FeatureCardTwelveProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  return (
    <CardList
      title={title}
      titleSegments={titleSegments}
      description={description}
      tag={tag}
      tagIcon={tagIcon}
      tagAnimation={tagAnimation}
      buttons={buttons}
      buttonAnimation={buttonAnimation}
      textboxLayout={textboxLayout}
      animationType={animationType}
      useInvertedBackground={useInvertedBackground}
      className={className}
      containerClassName={containerClassName}
      cardClassName={cardClassName}
      titleClassName={textBoxTitleClassName}
      descriptionClassName={textBoxDescriptionClassName}
      textBoxClassName={textBoxClassName}
      tagClassName={textBoxTagClassName}
      buttonContainerClassName={textBoxButtonContainerClassName}
      buttonClassName={textBoxButtonClassName}
      buttonTextClassName={textBoxButtonTextClassName}
      titleImageWrapperClassName={titleImageWrapperClassName}
      titleImageClassName={titleImageClassName}
      ariaLabel={ariaLabel}
    >
      {features.map((feature) => (
        <div
          key={feature.id}
          className={cls(
            "relative z-1 w-full min-h-0 h-full flex flex-col md:flex-row gap-6 p-6 md:p-15",
            cardContentClassName
          )}
        >
          <div className="relative z-1 w-full md:w-1/2 flex md:justify-start">
            <h2 className={cls(
              "text-5xl md:text-6xl font-medium leading-[1.1]",
              shouldUseLightText && "text-background",
              labelClassName
            )}>
              {feature.label}
            </h2>
          </div>

          <div className="relative z-1 w-full h-px bg-foreground/20 md:hidden" />

          <div className="relative z-1 w-full md:w-1/2 flex flex-col gap-4">
            <h3 className={cls(
              "text-xl md:text-3xl font-medium leading-tight",
              shouldUseLightText ? "text-background" : "text-foreground",
              cardTitleClassName
            )}>
              {feature.title}
            </h3>

            <div className={cls("flex flex-wrap items-center gap-2", itemsContainerClassName)}>
              {feature.items.map((item, index) => (
                <Fragment key={index}>
                  <span className={cls(
                    "text-base",
                    shouldUseLightText ? "text-background" : "text-foreground",
                    itemTextClassName
                  )}>
                    {item}
                  </span>
                  {index < feature.items.length - 1 && (
                    <span className="text-base text-accent">•</span>
                  )}
                </Fragment>
              ))}
            </div>

            {feature.buttons && feature.buttons.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4 max-md:justify-center">
                {feature.buttons.slice(0, 2).map((button, index) => (
                  <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, cardButtonClassName, cardButtonTextClassName)} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </CardList>
  );
};

FeatureCardTwelve.displayName = "FeatureCardTwelve";

export default FeatureCardTwelve;
