"use client";

import TextAnimation from "@/components/text/TextAnimation";
import Tag from "@/components/shared/Tag";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { ButtonAnimationType } from "@/components/cardStack/types";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type MetricItem = {
    id: string;
    value: string;
    description: string;
};

interface MetricCardFourteenProps {
    title: string;
    tag: string;
    tagAnimation?: ButtonAnimationType;
    metricsAnimation: ButtonAnimationType;
    metrics: MetricItem[];
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    titleClassName?: string;
    tagClassName?: string;
    metricsContainerClassName?: string;
    metricClassName?: string;
    valueClassName?: string;
    descriptionClassName?: string;
}

const MetricCardFourteen = ({
    title,
    tag,
    tagAnimation = "none",
    metricsAnimation,
    metrics,
    useInvertedBackground,
    ariaLabel = "Metrics section",
    className = "",
    containerClassName = "",
    titleClassName = "",
    tagClassName = "",
    metricsContainerClassName = "",
    metricClassName = "",
    valueClassName = "",
    descriptionClassName = "",
}: MetricCardFourteenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    const { containerRef: tagContainerRef } = useButtonAnimation({ animationType: tagAnimation });
    const { containerRef: metricsContainerRef } = useButtonAnimation({ animationType: metricsAnimation });

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto flex flex-col gap-10", containerClassName)}>
                <TextAnimation
                    type={theme.defaultTextAnimation}
                    text={title}
                    variant="words-trigger"
                    className={cls(
                        "text-3xl md:text-5xl font-medium leading-tight",
                        useInvertedBackground && "text-background",
                        titleClassName
                    )}
                />

                <div className="relative w-full h-px bg-accent/20" />

                <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-8">
                    <div ref={tagContainerRef} className="w-fit md:w-15">
                        <Tag
                            text={tag}
                            useInvertedBackground={useInvertedBackground}
                            className={cls("min-w-0 max-w-full text-xl px-6", tagClassName)}
                            textClassName="truncate"
                        />
                    </div>

                    <div
                        ref={metricsContainerRef}
                        className={cls(
                            "w-full grid gap-4 flex-1",
                            metrics.length === 1 && "grid-cols-1",
                            metrics.length >= 2 && "grid-cols-2",
                            metricsContainerClassName
                        )}
                    >
                        {metrics.map((metric) => (
                            <div
                                key={metric.id}
                                className={cls(
                                    "card rounded-theme-capped p-6 md:p-8 flex flex-col justify-between aspect-video",
                                    metricClassName
                                )}
                            >
                                <p className={cls(
                                    "text-6xl md:text-8xl font-medium",
                                    shouldUseLightText ? "text-background" : "text-foreground",
                                    valueClassName
                                )}>
                                    {metric.value}
                                </p>
                                <div className="flex flex-col gap-4">
                                    <div className="w-full h-px bg-accent/20" />
                                    <p className={cls(
                                        "text-base md:text-lg leading-tight text-balance",
                                        shouldUseLightText ? "text-background" : "text-foreground",
                                        descriptionClassName
                                    )}>
                                        {metric.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

MetricCardFourteen.displayName = "MetricCardFourteen";

export default MetricCardFourteen;
