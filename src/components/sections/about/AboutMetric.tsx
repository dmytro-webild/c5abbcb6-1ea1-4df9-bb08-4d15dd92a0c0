"use client";

import TextAnimation from "@/components/text/TextAnimation";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonAnimationType } from "@/types/button";

interface Metric {
    icon: LucideIcon;
    label: string;
    value: string;
}

interface AboutMetricProps {
    title: string;
    metrics: Metric[];
    metricsAnimation: ButtonAnimationType;
    useInvertedBackground: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    titleClassName?: string;
    metricsContainerClassName?: string;
    metricCardClassName?: string;
    metricIconClassName?: string;
    metricLabelClassName?: string;
    metricValueClassName?: string;
}

const AboutMetric = ({
    title,
    metrics,
    metricsAnimation,
    useInvertedBackground,
    ariaLabel = "About metrics section",
    className = "",
    containerClassName = "",
    titleClassName = "",
    metricsContainerClassName = "",
    metricCardClassName = "",
    metricIconClassName = "",
    metricLabelClassName = "",
    metricValueClassName = "",
}: AboutMetricProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    const { containerRef: metricsContainerRef } = useButtonAnimation({ animationType: metricsAnimation });

    const gridColsMap = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
    };
    const gridCols = gridColsMap[metrics.length as keyof typeof gridColsMap] || "md:grid-cols-4";

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
                <TextAnimation
                    type={theme.defaultTextAnimation}
                    text={title}
                    variant="words-trigger"
                    className={cls("text-2xl md:text-5xl font-medium leading-[1.175]", useInvertedBackground && "text-background", titleClassName)}
                />

                <div ref={metricsContainerRef} className={cls("grid grid-cols-1 gap-6", gridCols, metricsContainerClassName)}>
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <div
                                key={index}
                                className={cls(
                                    "h-fit card rounded-theme-capped px-6 py-8 md:py-10 flex flex-col items-center justify-center gap-3",
                                    metricCardClassName
                                )}
                            >
                                <div className="relative z-1 w-full flex items-center justify-center gap-2">
                                    <div className={cls("h-8 primary-button aspect-square rounded-theme flex items-center justify-center", metricIconClassName)}>
                                        <Icon className="h-4/10 text-primary-cta-text" strokeWidth={1.5} />
                                    </div>
                                    <h3 className={cls("text-xl truncate", shouldUseLightText && "text-background", metricLabelClassName)}>
                                        {metric.label}
                                    </h3>
                                </div>
                                <div className="relative z-1 w-full flex items-center justify-center">
                                    <h4 className={cls("text-6xl font-medium truncate", shouldUseLightText && "text-background", metricValueClassName)}>
                                        {metric.value}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

AboutMetric.displayName = "AboutMetric";

export default AboutMetric;