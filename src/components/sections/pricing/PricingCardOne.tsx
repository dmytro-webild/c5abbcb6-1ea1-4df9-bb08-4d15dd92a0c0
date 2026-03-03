"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import PricingBadge from "@/components/shared/PricingBadge";
import PricingFeatureList from "@/components/shared/PricingFeatureList";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type PricingPlan = {
    id: string;
    badge: string;
    badgeIcon?: LucideIcon;
    price: string;
    subtitle: string;
    features: string[];
};

interface PricingCardOneProps {
    plans: PricingPlan[];
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
    badgeClassName?: string;
    priceClassName?: string;
    subtitleClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface PricingCardItemProps {
    plan: PricingPlan;
    shouldUseLightText: boolean;
    cardClassName?: string;
    badgeClassName?: string;
    priceClassName?: string;
    subtitleClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
}

const PricingCardItem = memo(({
    plan,
    shouldUseLightText,
    cardClassName = "",
    badgeClassName = "",
    priceClassName = "",
    subtitleClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
}: PricingCardItemProps) => {
    return (
        <div className={cls("relative h-full card text-foreground rounded-theme-capped p-6 flex flex-col gap-6 md:gap-8", cardClassName)}>
            <PricingBadge
                badge={plan.badge}
                badgeIcon={plan.badgeIcon}
                className={badgeClassName}
            />

            <div className="relative z-1 flex flex-col gap-1">
                <div className={cls("text-5xl font-medium", shouldUseLightText ? "text-background" : "text-foreground", priceClassName)}>
                    {plan.price}
                </div>

                <p className={cls("text-base", shouldUseLightText ? "text-background" : "text-foreground", subtitleClassName)}>
                    {plan.subtitle}
                </p>
            </div>

            <div className="relative z-1 w-full h-px bg-foreground/20" />

            <PricingFeatureList
                features={plan.features}
                shouldUseLightText={shouldUseLightText}
                className={cls("mt-1", featuresClassName)}
                featureItemClassName={featureItemClassName}
            />
        </div>
    );
});

PricingCardItem.displayName = "PricingCardItem";

const PricingCardOne = ({
    plans,
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
    ariaLabel = "Pricing section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    badgeClassName = "",
    priceClassName = "",
    subtitleClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: PricingCardOneProps) => {
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
            {plans.map((plan, index) => (
                <PricingCardItem
                    key={`${plan.id}-${index}`}
                    plan={plan}
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    badgeClassName={badgeClassName}
                    priceClassName={priceClassName}
                    subtitleClassName={subtitleClassName}
                    featuresClassName={featuresClassName}
                    featureItemClassName={featureItemClassName}
                />
            ))}
        </CardStack>
    );
};

PricingCardOne.displayName = "PricingCardOne";

export default PricingCardOne;
