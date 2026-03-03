"use client";

import { memo } from "react";
import { ArrowRight } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import Tag from "@/components/shared/Tag";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureItem = {
    id: string;
    title: string;
    tags: string[];
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    onFeatureClick?: () => void;
};

interface FeatureCardTwentyThreeProps {
    features: FeatureItem[];
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
    itemClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
    cardClassName?: string;
    cardTitleClassName?: string;
    tagsContainerClassName?: string;
    tagClassName?: string;
    arrowClassName?: string;
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface FeatureCardItemProps {
    feature: FeatureItem;
    shouldUseLightText: boolean;
    useInvertedBackground: InvertedBackground;
    itemClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
    cardClassName?: string;
    cardTitleClassName?: string;
    tagsContainerClassName?: string;
    tagClassName?: string;
    arrowClassName?: string;
}

const FeatureCardItem = memo(({
    feature,
    shouldUseLightText,
    useInvertedBackground,
    itemClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
    cardClassName = "",
    cardTitleClassName = "",
    tagsContainerClassName = "",
    tagClassName = "",
    arrowClassName = "",
}: FeatureCardItemProps) => {
    return (
        <article
            className={cls("relative h-full flex flex-col gap-6 cursor-pointer group", itemClassName)}
            onClick={feature.onFeatureClick}
            role="article"
            aria-label={feature.title}
        >
            <div className={cls("relative w-full aspect-square overflow-hidden rounded-theme-capped", mediaWrapperClassName)}>
                <MediaContent
                    imageSrc={feature.imageSrc}
                    videoSrc={feature.videoSrc}
                    imageAlt={feature.imageAlt || feature.title}
                    videoAriaLabel={feature.videoAriaLabel || feature.title}
                    imageClassName={cls("w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105", mediaClassName)}
                />
            </div>

            <div className={cls("relative z-1 card rounded-theme-capped p-5 flex-1 flex flex-col justify-between gap-4", cardClassName)}>
                <h3 className={cls(
                    "text-xl md:text-2xl font-medium leading-tight",
                    shouldUseLightText ? "text-background" : "text-foreground",
                    cardTitleClassName
                )}>
                    {feature.title}
                </h3>

                <div className="flex items-center justify-between gap-4">
                    <div className={cls("flex items-center gap-2 flex-wrap", tagsContainerClassName)}>
                        {feature.tags.map((tag, index) => (
                            <Tag
                                key={index}
                                text={tag}
                                useInvertedBackground={useInvertedBackground}
                                className={tagClassName}
                            />
                        ))}
                    </div>
                    <ArrowRight
                        className={cls(
                            "h-[var(--text-base)] w-auto shrink-0 transition-transform duration-300 group-hover:-rotate-45",
                            shouldUseLightText ? "text-background" : "text-foreground",
                            arrowClassName
                        )}
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </article>
    );
});

FeatureCardItem.displayName = "FeatureCardItem";

const FeatureCardTwentyThree = ({
    features,
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
    ariaLabel = "Features section",
    className = "",
    containerClassName = "",
    itemClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
    cardClassName = "",
    cardTitleClassName = "",
    tagsContainerClassName = "",
    tagClassName = "",
    arrowClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: FeatureCardTwentyThreeProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    return (
        <CardStack
            mode={carouselMode}
            gridVariant="uniform-all-items-equal"
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
            useInvertedBackground={useInvertedBackground}
            ariaLabel={ariaLabel}
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
        >
            {features.map((feature) => (
                <FeatureCardItem
                    key={feature.id}
                    feature={feature}
                    shouldUseLightText={shouldUseLightText}
                    useInvertedBackground={useInvertedBackground}
                    itemClassName={itemClassName}
                    mediaWrapperClassName={mediaWrapperClassName}
                    mediaClassName={mediaClassName}
                    cardClassName={cardClassName}
                    cardTitleClassName={cardTitleClassName}
                    tagsContainerClassName={tagsContainerClassName}
                    tagClassName={tagClassName}
                    arrowClassName={arrowClassName}
                />
            ))}
        </CardStack>
    );
};

FeatureCardTwentyThree.displayName = "FeatureCardTwentyThree";

export default FeatureCardTwentyThree;
