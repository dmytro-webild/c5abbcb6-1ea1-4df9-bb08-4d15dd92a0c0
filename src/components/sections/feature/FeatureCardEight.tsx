"use client";

import TimelineHorizontalCardStack from "@/components/cardStack/layouts/timelines/TimelineHorizontalCardStack";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
    id: number;
    title: string;
    description: string;
    imageAlt?: string;
    videoAriaLabel?: string;
} & (
        | { imageSrc: string; videoSrc?: never }
        | { videoSrc: string; imageSrc?: never }
    );

interface FeatureCardEightProps {
    features: FeatureCard[];
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
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    cardClassName?: string;
    progressBarClassName?: string;
    cardContentClassName?: string;
    stepNumberClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    mediaContainerClassName?: string;
    mediaClassName?: string;
}

const FeatureCardEight = ({
    features,
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
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    cardClassName = "",
    progressBarClassName = "",
    cardContentClassName = "",
    stepNumberClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    mediaContainerClassName = "",
    mediaClassName = "",
}: FeatureCardEightProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const mediaItems = features.map((feature) => ({
        imageSrc: feature.imageSrc,
        videoSrc: feature.videoSrc,
        imageAlt: feature.imageAlt || feature.title,
        videoAriaLabel: feature.videoAriaLabel || feature.title,
    }));

    return (
        <TimelineHorizontalCardStack
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
            mediaItems={mediaItems}
            className={className}
            containerClassName={containerClassName}
            titleClassName={textBoxTitleClassName}
            descriptionClassName={textBoxDescriptionClassName}
            textBoxClassName={textBoxClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            cardClassName={cardClassName}
            progressBarClassName={progressBarClassName}
            mediaContainerClassName={mediaContainerClassName}
            mediaClassName={mediaClassName}
            ariaLabel={ariaLabel}
        >
            {features.map((feature) => (
                <div
                    key={feature.id}
                    className={cls("relative z-1 w-full min-h-0 h-fit flex flex-col gap-3", cardContentClassName)}
                >
                    <div
                        className={cls(
                            "h-8 w-[var(--height-8)] primary-button text-primary-cta-text rounded-theme flex items-center justify-center",
                            stepNumberClassName
                        )}
                    >
                        <p className="text-sm truncate">
                            {feature.id}
                        </p>
                    </div>
                    <h2 className={cls("mt-1 text-3xl font-medium leading-[1.15] text-balance", shouldUseLightText && "text-background", cardTitleClassName)}>
                        {feature.title}
                    </h2>
                    <p className={cls("text-base leading-[1.15] text-balance", shouldUseLightText ? "text-background" : "text-foreground", cardDescriptionClassName)}>
                        {feature.description}
                    </p>
                </div>
            ))}
        </TimelineHorizontalCardStack>
    );
};

FeatureCardEight.displayName = "FeatureCardEight";

export default FeatureCardEight;