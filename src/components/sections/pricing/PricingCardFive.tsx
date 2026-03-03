"use client";

import { Check } from "lucide-react";
import CardList from "@/components/cardStack/CardList";
import Tag from "@/components/shared/Tag";
import Button from "@/components/button/Button";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type PricingPlan = {
    id: string;
    tag: string;
    tagIcon?: LucideIcon;
    price: string;
    period: string;
    description: string;
    button: ButtonConfig;
    featuresTitle: string;
    features: string[];
};

interface PricingCardFiveProps {
    plans: PricingPlan[];
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
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    cardContentClassName?: string;
    planTagClassName?: string;
    planPriceClassName?: string;
    planPeriodClassName?: string;
    planDescriptionClassName?: string;
    planButtonClassName?: string;
    planButtonTextClassName?: string;
    featuresTitleClassName?: string;
    featuresListClassName?: string;
    featureItemClassName?: string;
    featureIconClassName?: string;
    featureTextClassName?: string;
}

const PricingCardFive = ({
    plans,
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
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    cardContentClassName = "",
    planTagClassName = "",
    planPriceClassName = "",
    planPeriodClassName = "",
    planDescriptionClassName = "",
    planButtonClassName = "",
    planButtonTextClassName = "",
    featuresTitleClassName = "",
    featuresListClassName = "",
    featureItemClassName = "",
    featureIconClassName = "",
    featureTextClassName = "",
}: PricingCardFiveProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

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
        <CardList
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
            className={className}
            containerClassName={containerClassName}
            cardClassName={cardClassName}
            titleClassName={textBoxTitleClassName}
            descriptionClassName={textBoxDescriptionClassName}
            textBoxClassName={textBoxClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            ariaLabel={ariaLabel}
        >
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className={cls(
                        "relative z-1 w-full min-h-0 h-full flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-15 p-6 md:p-15",
                        cardContentClassName
                    )}
                >
                    <div className="w-full md:w-1/2 min-w-0 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-4">
                            <Tag
                                text={plan.tag}
                                icon={plan.tagIcon}
                                className={planTagClassName}
                            />
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className={cls(
                                    "text-5xl md:text-6xl font-medium",
                                    shouldUseLightText ? "text-background" : "text-foreground",
                                    planPriceClassName
                                )}>
                                    {plan.price}
                                </span>
                                <span className={cls(
                                    "text-xl",
                                    shouldUseLightText ? "text-background" : "text-foreground",
                                    planPeriodClassName
                                )}>
                                    {plan.period}
                                </span>
                            </div>
                            <p className={cls(
                                "text-2xl leading-tight text-balance",
                                shouldUseLightText ? "text-background" : "text-foreground",
                                planDescriptionClassName
                            )}>
                                {plan.description}
                            </p>
                        </div>
                        <Button
                            {...getButtonProps(
                                { ...plan.button, props: { ...plan.button.props, ...getButtonConfigProps() } },
                                0,
                                theme.defaultButtonVariant,
                                cls("w-full h-12", planButtonClassName),
                                planButtonTextClassName
                            )}
                        />
                    </div>

                    <div className="relative z-1 w-full h-px bg-foreground/20 md:hidden" />

                    <div className="w-full md:w-1/2 min-w-0 flex flex-col gap-4">
                        <h3 className={cls(
                            "text-xl",
                            shouldUseLightText ? "text-background" : "text-foreground",
                            featuresTitleClassName
                        )}>
                            {plan.featuresTitle}
                        </h3>
                        <ul className={cls("flex flex-col gap-3", featuresListClassName)}>
                            {plan.features.map((feature, index) => (
                                <li key={index} className={cls("flex items-start gap-3", featureItemClassName)}>
                                    <div className={cls("flex-shrink-0 h-6 w-auto aspect-square rounded-theme primary-button flex items-center justify-center", featureIconClassName)}>
                                        <Check className="h-4/10 w-4/10 text-primary-cta-text" strokeWidth={2.5} />
                                    </div>
                                    <span className={cls(
                                        "text-sm leading-[1.4]",
                                        shouldUseLightText ? "text-background/80" : "text-foreground/80",
                                        featureTextClassName
                                    )}>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </CardList>
    );
};

PricingCardFive.displayName = "PricingCardFive";

export default PricingCardFive;
