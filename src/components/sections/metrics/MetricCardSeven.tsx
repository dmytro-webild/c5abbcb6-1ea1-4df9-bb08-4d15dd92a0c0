"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import PricingFeatureList from "@/components/shared/PricingFeatureList";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type Metric = {
    id: string;
    value: string;
    title: string;
    items: string[];
};

interface MetricCardSevenProps {
    metrics: Metric[];
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
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    valueClassName?: string;
    metricTitleClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface MetricCardItemProps {
    metric: Metric;
    shouldUseLightText: boolean;
    cardClassName?: string;
    valueClassName?: string;
    metricTitleClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    shouldUseLightText,
    cardClassName = "",
    valueClassName = "",
    metricTitleClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("relative h-full card text-foreground rounded-theme-capped p-6 flex flex-col justify-between gap-4", cardClassName)}>
            <div className="flex flex-col gap-0" >
                <h3 className={cls("relative z-1 text-9xl md:text-8xl font-medium truncate", shouldUseLightText ? "text-background" : "text-foreground", valueClassName)}>
                    {metric.value}
                </h3>
                <p className={cls("relative z-1 text-2xl md:text-xl truncate", shouldUseLightText ? "text-background" : "text-foreground", metricTitleClassName)}>
                    {metric.title}
                </p>
            </div>
            <div className="pt-4 border-t border-t-accent" >
                {metric.items.length > 0 && (
                    <PricingFeatureList
                        features={metric.items}
                        shouldUseLightText={shouldUseLightText}
                        className={cls("mt-1", featuresClassName)}
                        featureItemClassName={featureItemClassName}
                    />
                )}
            </div>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardSeven = ({
    metrics,
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
    ariaLabel = "Metrics section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    valueClassName = "",
    metricTitleClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardSevenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const customUniformHeight = uniformGridCustomHeightClasses || "min-h-70 2xl:min-h-80";

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant="uniform-all-items-equal"
            uniformGridCustomHeightClasses={customUniformHeight}
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
            {metrics.map((metric, index) => (
                <MetricCardItem
                    key={`${metric.id}-${index}`}
                    metric={metric}
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    valueClassName={valueClassName}
                    metricTitleClassName={metricTitleClassName}
                    featuresClassName={featuresClassName}
                    featureItemClassName={featureItemClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardSeven.displayName = "MetricCardSeven";

export default MetricCardSeven;
