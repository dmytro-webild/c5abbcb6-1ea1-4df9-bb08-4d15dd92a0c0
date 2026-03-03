"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type Metric = {
    id: string;
    icon: LucideIcon;
    title: string;
    value: string;
};

interface MetricCardThreeProps {
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
    iconContainerClassName?: string;
    iconClassName?: string;
    metricTitleClassName?: string;
    valueClassName?: string;
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
    iconContainerClassName?: string;
    iconClassName?: string;
    metricTitleClassName?: string;
    valueClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    shouldUseLightText,
    cardClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
    metricTitleClassName = "",
    valueClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("relative h-full card text-foreground rounded-theme-capped p-6 flex flex-col items-center justify-center gap-3", cardClassName)}>
            <div className="relative z-1 w-full flex items-center justify-center gap-2">
                <div className={cls("h-8 primary-button aspect-square rounded-theme flex items-center justify-center", iconContainerClassName)}>
                    <metric.icon className={cls("h-4/10 text-primary-cta-text", iconClassName)} strokeWidth={1.5} />
                </div>
                <h3 className={cls("text-xl truncate", shouldUseLightText ? "text-background" : "text-foreground", metricTitleClassName)}>
                    {metric.title}
                </h3>
            </div>
            <div className="relative z-1 w-full flex items-center justify-center">
                <h4 className={cls("text-7xl font-medium truncate", shouldUseLightText ? "text-background" : "text-foreground", valueClassName)}>
                    {metric.value}
                </h4>
            </div>
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardThree = ({
    metrics,
    carouselMode = "buttons",
    uniformGridCustomHeightClasses = "min-h-70 2xl:min-h-80",
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
    iconContainerClassName = "",
    iconClassName = "",
    metricTitleClassName = "",
    valueClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: MetricCardThreeProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant="uniform-all-items-equal"
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
                    iconContainerClassName={iconContainerClassName}
                    iconClassName={iconClassName}
                    metricTitleClassName={metricTitleClassName}
                    valueClassName={valueClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardThree.displayName = "MetricCardThree";

export default MetricCardThree;