"use client";

import React, { memo, useMemo } from "react";
import TimelineProcessFlow from "@/components/cardStack/layouts/timelines/TimelineProcessFlow";
import MediaContent from "@/components/shared/MediaContent";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureMedia = {
    imageAlt?: string;
    videoAriaLabel?: string;
} & (
        | { imageSrc: string; videoSrc?: never }
        | { videoSrc: string; imageSrc?: never }
    );

interface FeatureListItem {
    icon: LucideIcon;
    text: string;
}

interface FeatureCard {
    id: string;
    title: string;
    description: string;
    media: FeatureMedia;
    items: FeatureListItem[];
    reverse: boolean;
}

interface FeatureCardTenProps {
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
    animationType: CardAnimationType;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    itemClassName?: string;
    mediaWrapperClassName?: string;
    mediaCardClassName?: string;
    numberClassName?: string;
    contentWrapperClassName?: string;
    featureTitleClassName?: string;
    featureDescriptionClassName?: string;
    listItemClassName?: string;
    iconContainerClassName?: string;
    iconClassName?: string;
    gapClassName?: string;
}

interface FeatureMediaProps {
    media: FeatureMedia;
    title: string;
    mediaCardClassName: string;
}

const FeatureMedia = ({
    media,
    title,
    mediaCardClassName,
}: FeatureMediaProps) => (
    <div className={cls("card rounded-theme-capped p-4 aspect-square md:aspect-[16/10]", mediaCardClassName)}>
        <MediaContent
            imageSrc={media.imageSrc}
            videoSrc={media.videoSrc}
            imageAlt={media.imageAlt || title}
            videoAriaLabel={media.videoAriaLabel || `${title} video`}
            imageClassName="relative z-1 w-full h-full object-cover rounded-theme-capped"
        />
    </div>
);

interface FeatureContentProps {
    feature: FeatureCard;
    useInvertedBackground: InvertedBackground;
    shouldUseLightText: boolean;
    featureTitleClassName: string;
    featureDescriptionClassName: string;
    listItemClassName: string;
    iconContainerClassName: string;
    iconClassName: string;
}

const FeatureContent = ({
    feature,
    useInvertedBackground,
    shouldUseLightText,
    featureTitleClassName,
    featureDescriptionClassName,
    listItemClassName,
    iconContainerClassName,
    iconClassName,
}: FeatureContentProps) => (
    <div className="flex flex-col gap-3" >
        <h3 className={cls("text-xl md:text-4xl font-medium leading-[1.15]", useInvertedBackground && "text-background", featureTitleClassName)}>
            {feature.title}
        </h3>
        <p className={cls("text-base leading-[1.2]", useInvertedBackground ? "text-background/75" : "text-foreground/75", featureDescriptionClassName)}>
            {feature.description}
        </p>
        <ul className="flex flex-col m-0 mt-1 p-0 list-none gap-3">
            {feature.items.map((listItem, listIndex) => {
                const Icon = listItem.icon;
                return (
                    <li key={listIndex} className="flex items-center gap-3">
                        <div
                            className={cls(
                                "shrink-0 h-9 aspect-square flex items-center justify-center rounded bg-background card",
                                iconContainerClassName
                            )}
                        >
                            <Icon
                                className={cls("h-4/10 w-4/10", shouldUseLightText ? "text-background" : "text-foreground", iconClassName)}
                                strokeWidth={1.25}
                            />
                        </div>
                        <p className={cls("text-base", useInvertedBackground ? "text-background/75" : "text-foreground/75", listItemClassName)}>
                            {listItem.text}
                        </p>
                    </li>
                );
            })}
        </ul>
    </div>
);

const FeatureCardTen = ({
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
    animationType,
    useInvertedBackground,
    ariaLabel = "Feature section",
    className = "",
    containerClassName = "",
    textBoxClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    itemClassName = "",
    mediaWrapperClassName = "",
    mediaCardClassName = "",
    numberClassName = "",
    contentWrapperClassName = "",
    featureTitleClassName = "",
    featureDescriptionClassName = "",
    listItemClassName = "",
    iconContainerClassName = "",
    iconClassName = "",
    gapClassName = "",
}: FeatureCardTenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const timelineItems = useMemo(
        () =>
            features.map((feature) => ({
                id: feature.id,
                reverse: feature.reverse,
                media: (
                    <FeatureMedia
                        media={feature.media}
                        title={feature.title}
                        mediaCardClassName={mediaCardClassName}
                    />
                ),
                content: (
                    <FeatureContent
                        feature={feature}
                        useInvertedBackground={useInvertedBackground}
                        shouldUseLightText={shouldUseLightText}
                        featureTitleClassName={featureTitleClassName}
                        featureDescriptionClassName={featureDescriptionClassName}
                        listItemClassName={listItemClassName}
                        iconContainerClassName={iconContainerClassName}
                        iconClassName={iconClassName}
                    />
                ),
            })),
        [
            features,
            useInvertedBackground,
            shouldUseLightText,
            mediaCardClassName,
            featureTitleClassName,
            featureDescriptionClassName,
            listItemClassName,
            iconContainerClassName,
            iconClassName,
        ]
    );

    return (
        <TimelineProcessFlow
            items={timelineItems}
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
            ariaLabel={ariaLabel}
            className={className}
            containerClassName={containerClassName}
            textBoxClassName={textBoxClassName}
            textBoxTitleClassName={textBoxTitleClassName}
            textBoxDescriptionClassName={textBoxDescriptionClassName}
            textBoxTagClassName={textBoxTagClassName}
            textBoxButtonContainerClassName={textBoxButtonContainerClassName}
            textBoxButtonClassName={textBoxButtonClassName}
            textBoxButtonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            itemClassName={itemClassName}
            mediaWrapperClassName={mediaWrapperClassName}
            numberClassName={numberClassName}
            contentWrapperClassName={contentWrapperClassName}
            gapClassName={gapClassName}
        />
    );
};

FeatureCardTen.displayName = "FeatureCardTen";

export default memo(FeatureCardTen);