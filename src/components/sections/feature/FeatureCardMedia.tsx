"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import Tag from "@/components/shared/Tag";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
    id: string;
    title: string;
    description: string;
    tag: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    buttons?: ButtonConfig[];
    onCardClick?: () => void;
};

interface FeatureCardMediaProps {
    features: FeatureCard[];
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
    tagClassName?: string;
    contentClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    cardButtonContainerClassName?: string;
    cardButtonClassName?: string;
    cardButtonTextClassName?: string;
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
    feature: FeatureCard;
    shouldUseLightText: boolean;
    useInvertedBackground: InvertedBackground;
    itemClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
    tagClassName?: string;
    contentClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    cardButtonContainerClassName?: string;
    cardButtonClassName?: string;
    cardButtonTextClassName?: string;
}

const FeatureCardItem = memo(({
    feature,
    shouldUseLightText,
    useInvertedBackground,
    itemClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
    tagClassName = "",
    contentClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    cardButtonContainerClassName = "",
    cardButtonClassName = "",
    cardButtonTextClassName = "",
}: FeatureCardItemProps) => {
    const theme = useTheme();

    return (
        <article
            className={cls("relative h-full flex flex-col gap-6 cursor-pointer group", itemClassName)}
            onClick={feature.onCardClick}
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
                <div className="absolute top-4 right-4">
                    <Tag
                        text={feature.tag}
                        useInvertedBackground={useInvertedBackground}
                        className={tagClassName}
                    />
                </div>
            </div>

            <div className={cls("relative z-1 card rounded-theme-capped p-6 flex flex-col gap-2 flex-1", contentClassName)}>
                <h3 className={cls(
                    "text-xl md:text-2xl font-medium leading-tight",
                    shouldUseLightText ? "text-background" : "text-foreground",
                    cardTitleClassName
                )}>
                    {feature.title}
                </h3>

                <p className={cls(
                    "text-base leading-tight",
                    shouldUseLightText ? "text-background/75" : "text-foreground/75",
                    cardDescriptionClassName
                )}>
                    {feature.description}
                </p>

                {feature.buttons && feature.buttons.length > 0 && (
                    <div className={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", cardButtonContainerClassName)}>
                        {feature.buttons.slice(0, 2).map((button, index) => (
                            <Button
                                key={`${button.text}-${index}`}
                                {...getButtonProps(button, index, theme.defaultButtonVariant, cardButtonClassName, cardButtonTextClassName)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
});

FeatureCardItem.displayName = "FeatureCardItem";

const FeatureCardMedia = ({
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
    tagClassName = "",
    contentClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    cardButtonContainerClassName = "",
    cardButtonClassName = "",
    cardButtonTextClassName = "",
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
}: FeatureCardMediaProps) => {
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
                    tagClassName={tagClassName}
                    contentClassName={contentClassName}
                    cardTitleClassName={cardTitleClassName}
                    cardDescriptionClassName={cardDescriptionClassName}
                    cardButtonContainerClassName={cardButtonContainerClassName}
                    cardButtonClassName={cardButtonClassName}
                    cardButtonTextClassName={cardButtonTextClassName}
                />
            ))}
        </CardStack>
    );
};

FeatureCardMedia.displayName = "FeatureCardMedia";

export default FeatureCardMedia;
