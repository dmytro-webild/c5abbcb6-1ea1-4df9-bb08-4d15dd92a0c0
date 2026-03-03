"use client";

import { memo } from "react";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import MediaContent from "@/components/shared/MediaContent";
import { useCardAnimation } from "@/components/cardStack/hooks/useCardAnimation";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type MediaProps =
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
    };

type Metric = MediaProps & {
    id: string;
    value: string;
    title: string;
    description: string;
};

interface MetricCardElevenProps {
    metrics: Metric[];
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
    textBoxClassName?: string;
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    gridClassName?: string;
    cardClassName?: string;
    valueClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    mediaCardClassName?: string;
    mediaClassName?: string;
}

interface MetricTextCardProps {
    metric: Metric;
    shouldUseLightText: boolean;
    cardClassName?: string;
    valueClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
}

interface MetricMediaCardProps {
    metric: Metric;
    mediaCardClassName?: string;
    mediaClassName?: string;
}

const MetricTextCard = memo(({
    metric,
    shouldUseLightText,
    cardClassName = "",
    valueClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
}: MetricTextCardProps) => {
    return (
        <div className={cls(
            "relative w-full min-w-0 max-w-full h-full card text-foreground rounded-theme-capped flex flex-col justify-between p-6 md:p-8",
            cardClassName
        )}>
            <h3 className={cls(
                "text-5xl md:text-6xl font-medium leading-tight truncate",
                shouldUseLightText ? "text-background" : "text-foreground",
                valueClassName
            )}>
                {metric.value}
            </h3>

            <div className="w-full min-w-0 flex flex-col gap-2 mt-auto">
                <p className={cls(
                    "text-xl md:text-2xl font-medium leading-tight truncate",
                    shouldUseLightText ? "text-background" : "text-foreground",
                    cardTitleClassName
                )}>
                    {metric.title}
                </p>
                <div className="w-full h-px bg-accent" />
                <p className={cls(
                    "text-base truncate leading-tight",
                    shouldUseLightText ? "text-background/75" : "text-foreground/75",
                    cardDescriptionClassName
                )}>
                    {metric.description}
                </p>
            </div>
        </div>
    );
});

MetricTextCard.displayName = "MetricTextCard";

const MetricMediaCard = memo(({
    metric,
    mediaCardClassName = "",
    mediaClassName = "",
}: MetricMediaCardProps) => {
    return (
        <div className={cls(
            "relative h-full rounded-theme-capped overflow-hidden",
            mediaCardClassName
        )}>
            <MediaContent
                imageSrc={metric.imageSrc}
                videoSrc={metric.videoSrc}
                imageAlt={metric.imageAlt}
                videoAriaLabel={metric.videoAriaLabel}
                imageClassName={cls("w-full h-full object-cover", mediaClassName)}
            />
        </div>
    );
});

MetricMediaCard.displayName = "MetricMediaCard";

const MetricCardEleven = ({
    metrics,
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
    textBoxClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    gridClassName = "",
    cardClassName = "",
    valueClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    mediaCardClassName = "",
    mediaClassName = "",
}: MetricCardElevenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    // Inner grid for each metric item (text + media side by side)
    const innerGridCols = "grid-cols-2";

    const { itemRefs } = useCardAnimation({ animationType, itemCount: metrics.length });

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <CardStackTextBox
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
                    textBoxClassName={textBoxClassName}
                    titleClassName={textBoxTitleClassName}
                    titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
                    titleImageClassName={textBoxTitleImageClassName}
                    descriptionClassName={textBoxDescriptionClassName}
                    tagClassName={textBoxTagClassName}
                    buttonContainerClassName={textBoxButtonContainerClassName}
                    buttonClassName={textBoxButtonClassName}
                    buttonTextClassName={textBoxButtonTextClassName}
                />

                <div className={cls(
                    "grid gap-4 mt-8 md:mt-12",
                    metrics.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
                    gridClassName
                )}>
                    {metrics.map((metric, index) => {
                        const isLastItem = index === metrics.length - 1;
                        const isOddTotal = metrics.length % 2 !== 0;
                        const isSingleItem = metrics.length === 1;
                        const shouldSpanFull = isSingleItem || (isLastItem && isOddTotal);
                        // On mobile, even items (2nd, 4th, 6th - index 1, 3, 5) have media first
                        const isEvenItem = (index + 1) % 2 === 0;

                        return (
                            <div
                                key={`${metric.id}-${index}`}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                className={cls(
                                    "grid gap-4",
                                    innerGridCols,
                                    shouldSpanFull && "md:col-span-2"
                                )}
                            >
                                <MetricTextCard
                                    metric={metric}
                                    shouldUseLightText={shouldUseLightText}
                                    cardClassName={cls(
                                        shouldSpanFull ? "aspect-square md:aspect-video" : "aspect-square",
                                        isEvenItem && "order-2 md:order-1",
                                        cardClassName
                                    )}
                                    valueClassName={valueClassName}
                                    cardTitleClassName={cardTitleClassName}
                                    cardDescriptionClassName={cardDescriptionClassName}
                                />
                                <MetricMediaCard
                                    metric={metric}
                                    mediaCardClassName={cls(
                                        shouldSpanFull ? "aspect-square md:aspect-video" : "aspect-square",
                                        isEvenItem && "order-1 md:order-2",
                                        mediaCardClassName
                                    )}
                                    mediaClassName={mediaClassName}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

MetricCardEleven.displayName = "MetricCardEleven";

export default MetricCardEleven;