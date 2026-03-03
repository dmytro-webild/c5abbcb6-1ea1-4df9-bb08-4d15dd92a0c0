"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type MetricCardTwoGridVariant = Extract<GridVariant, "uniform-all-items-equal" | "bento-grid" | "bento-grid-inverted">;

type Metric = {
    id: string;
    value: string;
    description: string;
};

interface MetricCardTwoProps {
    metrics: Metric[];
    carouselMode?: "auto" | "buttons";
    gridVariant: MetricCardTwoGridVariant;
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
    metricDescriptionClassName?: string;
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
    metricDescriptionClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    shouldUseLightText,
    cardClassName = "",
    valueClassName = "",
    metricDescriptionClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("relative h-full card text-foreground rounded-theme-capped p-6 flex flex-col justify-between", cardClassName)}>
            <h3 className={cls("relative z-1 text-9xl md:text-7xl font-medium truncate", shouldUseLightText ? "text-background" : "text-foreground", valueClassName)}>
                {metric.value}
            </h3>
            <p className={cls("relative z-1 text-xl", shouldUseLightText ? "text-background" : "text-foreground", metricDescriptionClassName)}>
                {metric.description}
            </p>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardTwo = ({
    metrics,
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
    ariaLabel = "Metrics section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    valueClassName = "",
    metricDescriptionClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardTwoProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const customUniformHeight = gridVariant === "uniform-all-items-equal"
        ? "min-h-70 2xl:min-h-80"
        : uniformGridCustomHeightClasses;

    const customGridRows = (gridVariant === "bento-grid" || gridVariant === "bento-grid-inverted")
        ? "md:grid-rows-[14rem_14rem] 2xl:grid-rows-[17rem_17rem]"
        : undefined;

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant={gridVariant}
            uniformGridCustomHeightClasses={customUniformHeight}
            gridRowsClassName={customGridRows}
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
            carouselThreshold={4}
            carouselItemClassName="w-carousel-item-3!"
        >
            {metrics.map((metric, index) => (
                <MetricCardItem
                    key={`${metric.id}-${index}`}
                    metric={metric}
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    valueClassName={valueClassName}
                    metricDescriptionClassName={metricDescriptionClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardTwo.displayName = "MetricCardTwo";

export default MetricCardTwo;
