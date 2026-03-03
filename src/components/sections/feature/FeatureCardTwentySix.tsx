"use client";

import { memo } from "react";
import ArrowCarousel from "@/components/cardStack/layouts/carousels/ArrowCarousel";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import { useButtonClick } from "@/components/button/useButtonClick";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type FeatureItem = {
    title: string;
    description: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    buttonIcon: LucideIcon;
    buttonHref?: string;
    buttonOnClick?: () => void;
};

interface FeatureCardTwentySixProps {
    features: FeatureItem[];
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
    cardDescriptionClassName?: string;
    cardButtonClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface FeatureCardProps {
    feature: FeatureItem;
    cardClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    buttonClassName?: string;
}

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";

const FeatureCard = memo(({
    feature,
    cardClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    buttonClassName = "",
}: FeatureCardProps) => {
    const Icon = feature.buttonIcon;
    const handleClick = useButtonClick(feature.buttonHref, feature.buttonOnClick);

    return (
        <div className={cls("relative h-90 md:h-100 2xl:h-110 rounded-theme-capped overflow-hidden", cardClassName)}>
            <MediaContent
                imageSrc={feature.imageSrc}
                videoSrc={feature.videoSrc}
                imageAlt={feature.imageAlt}
                videoAriaLabel={feature.videoAriaLabel}
                imageClassName="!absolute inset-0 w-full h-full object-cover !rounded-none"
            />
            <div
                className="absolute z-1 backdrop-blur-xl opacity-100 w-full h-1/3 left-0 bottom-0"
                style={{ maskImage: MASK_GRADIENT }}
                aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/60 to-transparent z-1" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end md:items-center justify-between gap-4 z-2">
                <div className="flex flex-col gap-0 min-w-0">
                    <h3 className={cls("text-2xl md:text-3xl font-medium leading-tight text-background", titleClassName)}>
                        {feature.title}
                    </h3>
                    <p className={cls("text-sm md:text-base leading-tight text-background/75", descriptionClassName)}>
                        {feature.description}
                    </p>
                </div>
                <button
                    onClick={handleClick}
                    className={cls("shrink-0 primary-button h-8 w-auto aspect-square rounded-theme flex items-center justify-center cursor-pointer", buttonClassName)}
                    aria-label={feature.buttonHref ? `Navigate to ${feature.buttonHref}` : "Action button"}
                >
                    <Icon className="w-4/10 h-4/10 text-primary-cta-text" />
                </button>
            </div>
        </div>
    );
});

FeatureCard.displayName = "FeatureCard";

const FeatureCardTwentySix = ({
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
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    cardButtonClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: FeatureCardTwentySixProps) => {
    return (
        <ArrowCarousel
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
            {features.map((feature, index) => (
                <FeatureCard
                    key={`${feature.title}-${index}`}
                    feature={feature}
                    cardClassName={cardClassName}
                    titleClassName={cardTitleClassName}
                    descriptionClassName={cardDescriptionClassName}
                    buttonClassName={cardButtonClassName}
                />
            ))}
        </ArrowCarousel>
    );
};

FeatureCardTwentySix.displayName = "FeatureCardTwentySix";

export default FeatureCardTwentySix;
