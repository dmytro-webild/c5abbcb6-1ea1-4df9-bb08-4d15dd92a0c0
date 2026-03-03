"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import PricingFeatureList from "@/components/shared/PricingFeatureList";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type PricingPlan = {
    id: string;
    badge?: string;
    badgeIcon?: LucideIcon;
    price: string;
    name: string;
    buttons: ButtonConfig[];
    features: string[];
};

interface PricingCardThreeProps {
    plans: PricingPlan[];
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
    badgeClassName?: string;
    priceClassName?: string;
    nameClassName?: string;
    planButtonContainerClassName?: string;
    planButtonClassName?: string;
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
    nameClassName?: string;
    planButtonContainerClassName?: string;
    planButtonClassName?: string;
    featuresClassName?: string;
    featureItemClassName?: string;
}

const PricingCardItem = memo(({
    plan,
    shouldUseLightText,
    cardClassName = "",
    badgeClassName = "",
    priceClassName = "",
    nameClassName = "",
    planButtonContainerClassName = "",
    planButtonClassName = "",
    featuresClassName = "",
    featureItemClassName = "",
}: PricingCardItemProps) => {
    const theme = useTheme();

    const getButtonConfigProps = () => {
        if (theme.defaultButtonVariant === "hover-bubble") {
            return { bgClassName: "w-full" };
        }
        if (theme.defaultButtonVariant === "icon-arrow") {
            return { className: "justify-between" };
        }
        return {};
    };

    return (
        <div className="relative h-full flex flex-col">
            <div className={cls("px-4 py-3 primary-button rounded-t-theme-capped rounded-b-none text-base text-primary-cta-text whitespace-nowrap z-10 flex items-center justify-center gap-2", plan.badge ? "visible" : "invisible", badgeClassName)}>
                {plan.badgeIcon && <plan.badgeIcon className="inline h-[1em] w-auto" />}
                {plan.badge || "placeholder"}
            </div>
            <div className={cls("relative min-h-0 h-full card text-foreground p-6 flex flex-col justify-between items-center gap-6 md:gap-8", plan.badge ? "rounded-t-none rounded-b-theme-capped" : "rounded-theme-capped", cardClassName)}>
                <div className="flex flex-col items-center gap-6 md:gap-8" >
                    <div className="relative z-1 flex flex-col gap-2 text-center">
                        <div className={cls("text-5xl font-medium", shouldUseLightText ? "text-background" : "text-foreground", priceClassName)}>
                            {plan.price}
                        </div>

                        <h3 className={cls("text-xl font-medium leading-[1.1]", shouldUseLightText ? "text-background" : "text-foreground", nameClassName)}>
                            {plan.name}
                        </h3>
                    </div>

                    <div className="relative z-1 w-full h-px bg-foreground/10" />

                    <PricingFeatureList
                        features={plan.features}
                        shouldUseLightText={shouldUseLightText}
                        className={featuresClassName}
                        featureItemClassName={featureItemClassName}
                    />
                </div>

                {plan.buttons && plan.buttons.length > 0 && (
                    <div className={cls("relative z-1 w-full flex flex-col gap-3", planButtonContainerClassName)}>
                        {plan.buttons.slice(0, 2).map((button, index) => (
                            <Button
                                key={`${button.text}-${index}`}
                                {...getButtonProps(
                                    { ...button, props: { ...button.props, ...getButtonConfigProps() } },
                                    index,
                                    theme.defaultButtonVariant,
                                    cls("w-full", planButtonClassName)
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

PricingCardItem.displayName = "PricingCardItem";

const PricingCardThree = ({
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
    nameClassName = "",
    planButtonContainerClassName = "",
    planButtonClassName = "",
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
}: PricingCardThreeProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <CardStack
            useInvertedBackground={useInvertedBackground}
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
                    nameClassName={nameClassName}
                    planButtonContainerClassName={planButtonContainerClassName}
                    planButtonClassName={planButtonClassName}
                    featuresClassName={featuresClassName}
                    featureItemClassName={featureItemClassName}
                />
            ))}
        </CardStack>
    );
};

PricingCardThree.displayName = "PricingCardThree";

export default PricingCardThree;
