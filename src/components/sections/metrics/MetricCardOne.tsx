"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type MetricCardOneGridVariant = Extract<GridVariant, "uniform-all-items-equal" | "bento-grid" | "bento-grid-inverted">;

type Metric = {
    id: string;
    value: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

interface MetricCardOneProps {
    metrics: Metric[];
    carouselMode?: "auto" | "buttons";
    gridVariant: MetricCardOneGridVariant;
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
    titleClassName?: string;
    descriptionClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
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
    titleClassName?: string;
    descriptionClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    shouldUseLightText,
    cardClassName = "",
    valueClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("relative w-full min-w-0 h-full card text-foreground rounded-theme-capped p-6 flex flex-col items-center justify-center gap-0", cardClassName)}>
            <h2
                className={cls("relative z-1 w-full text-9xl font-foreground font-medium leading-[1.1] truncate text-center", valueClassName)}
                style={{
                    backgroundImage: shouldUseLightText
                        ? `linear-gradient(to bottom, var(--color-background) 0%, var(--color-background) 20%, transparent 72%, transparent 80%, transparent 100%)`
                        : `linear-gradient(to bottom, var(--color-foreground) 0%, var(--color-foreground) 20%, transparent 72%, transparent 80%, transparent 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                }}
            >
                {metric.value}
            </h2>
            <p className={cls("relative w-full z-1 mt-[calc(var(--text-4xl)*-0.75)] md:mt-[calc(var(--text-4xl)*-1.15)] text-4xl font-medium text-center truncate", shouldUseLightText ? "text-background" : "text-foreground", titleClassName)}>
                {metric.title}
            </p>
            <p className={cls("relative line-clamp-2 z-1 max-w-9/10 md:max-w-7/10 text-base text-center leading-[1.1] mt-2", shouldUseLightText ? "text-background" : "text-foreground", descriptionClassName)}>
                {metric.description}
            </p>
            <div className={cls("absolute! z-1 left-6 bottom-6 h-10 aspect-square primary-button rounded-theme flex items-center justify-center", iconContainerClassName)}>
                <metric.icon className={cls("h-4/10 text-primary-cta-text", iconClassName)} />
            </div>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardOne = ({
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
    titleClassName = "",
    descriptionClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardOneProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const customUniformHeight = gridVariant === "uniform-all-items-equal"
        ? "min-h-70 2xl:min-h-80"
        : uniformGridCustomHeightClasses;

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant={gridVariant}
            uniformGridCustomHeightClasses={customUniformHeight}
            animationType={animationType}
            supports3DAnimation={true}
            carouselThreshold={4}
            carouselItemClassName="w-carousel-item-3!"

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
                    titleClassName={titleClassName}
                    descriptionClassName={descriptionClassName}
                    iconContainerClassName={iconContainerClassName}
                    iconClassName={iconClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardOne.displayName = "MetricCardOne";

export default MetricCardOne;
