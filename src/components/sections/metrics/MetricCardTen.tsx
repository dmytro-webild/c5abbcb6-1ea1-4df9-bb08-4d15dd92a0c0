"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";
import type { CTAButtonVariant } from "@/components/button/types";

type Metric = {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    value: string;
    buttons?: ButtonConfig[];
};

interface MetricCardTenProps {
    metrics: Metric[];
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
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    cardTitleClassName?: string;
    subtitleClassName?: string;
    categoryClassName?: string;
    valueClassName?: string;
    footerClassName?: string;
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

interface MetricCardItemProps {
    metric: Metric;
    shouldUseLightText: boolean;
    defaultButtonVariant: CTAButtonVariant;
    cardClassName?: string;
    cardTitleClassName?: string;
    subtitleClassName?: string;
    categoryClassName?: string;
    valueClassName?: string;
    footerClassName?: string;
    cardButtonClassName?: string;
    cardButtonTextClassName?: string;
}

const MetricCardItem = memo(({
    metric,
    shouldUseLightText,
    defaultButtonVariant,
    cardClassName = "",
    cardTitleClassName = "",
    subtitleClassName = "",
    categoryClassName = "",
    valueClassName = "",
    footerClassName = "",
    cardButtonClassName = "",
    cardButtonTextClassName = "",
}: MetricCardItemProps) => {
    return (
        <div className={cls("relative h-full card text-foreground rounded-theme-capped flex flex-col", cardClassName)}>
            <div className="flex flex-col gap-6 p-6 flex-1">
                <div className="flex flex-col gap-1">
                    <h3 className={cls(
                        "text-2xl md:text-3xl font-medium leading-tight truncate",
                        shouldUseLightText ? "text-background" : "text-foreground",
                        cardTitleClassName
                    )}>
                        {metric.title}
                    </h3>
                    <p className={cls(
                        "text-base md:text-lg",
                        shouldUseLightText ? "text-background/75" : "text-foreground/75",
                        subtitleClassName
                    )}>
                        {metric.subtitle}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="h-[var(--text-base)] w-auto aspect-square rounded-theme shrink-0 bg-accent" />
                        <span className={cls(
                            "text-base truncate",
                            shouldUseLightText ? "text-background" : "text-foreground",
                            categoryClassName
                        )}>
                            {metric.category}
                        </span>
                    </div>
                    <span className={cls(
                        "text-xl md:text-2xl font-medium",
                        shouldUseLightText ? "text-background" : "text-foreground",
                        valueClassName
                    )}>
                        {metric.value}
                    </span>
                </div>
            </div>

            {metric.buttons && metric.buttons.length > 0 && (
                <div className={cls("bg-background-accent/50 p-4 rounded-b-theme-capped", footerClassName)}>
                    <div className="flex flex-wrap gap-4 max-md:justify-center">
                        {metric.buttons.slice(0, 2).map((button, index) => (
                            <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, defaultButtonVariant, cardButtonClassName, cardButtonTextClassName)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

MetricCardItem.displayName = "MetricCardItem";

const MetricCardTen = ({
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
    cardTitleClassName = "",
    subtitleClassName = "",
    categoryClassName = "",
    valueClassName = "",
    footerClassName = "",
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
}: MetricCardTenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant="uniform-all-items-equal"
            carouselThreshold={4}
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
            carouselItemClassName="!w-carousel-item-3"
        >
            {metrics.map((metric, index) => (
                <MetricCardItem
                    key={`${metric.id}-${index}`}
                    metric={metric}
                    shouldUseLightText={shouldUseLightText}
                    defaultButtonVariant={theme.defaultButtonVariant}
                    cardClassName={cardClassName}
                    cardTitleClassName={cardTitleClassName}
                    subtitleClassName={subtitleClassName}
                    categoryClassName={categoryClassName}
                    valueClassName={valueClassName}
                    footerClassName={footerClassName}
                    cardButtonClassName={cardButtonClassName}
                    cardButtonTextClassName={cardButtonTextClassName}
                />
            ))}
        </CardStack>
    );
};

MetricCardTen.displayName = "MetricCardTen";

export default MetricCardTen;
