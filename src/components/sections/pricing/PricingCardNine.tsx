"use client";

import { Check } from "lucide-react";
import CardList from "@/components/cardStack/CardList";
import Button from "@/components/button/Button";
import MediaContent from "@/components/shared/MediaContent";
import Tag from "@/components/shared/Tag";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type PricingPlan = {
    id: string;
    title: string;
    price: string;
    period: string;
    features: string[];
    button: ButtonConfig;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

interface PricingCardNineProps {
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
    planImageWrapperClassName?: string;
    planImageClassName?: string;
    planTitleClassName?: string;
    planPriceClassName?: string;
    planButtonClassName?: string;
    planButtonTextClassName?: string;
    featuresListClassName?: string;
    featureItemClassName?: string;
    featureIconClassName?: string;
    featureTextClassName?: string;
}

const PricingCardNine = ({
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
    planImageWrapperClassName = "",
    planImageClassName = "",
    planTitleClassName = "",
    planPriceClassName = "",
    planButtonClassName = "",
    planButtonTextClassName = "",
    featuresListClassName = "",
    featureItemClassName = "",
    featureIconClassName = "",
    featureTextClassName = "",
}: PricingCardNineProps) => {
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
                        "relative z-1 w-full min-h-0 h-full flex flex-col md:flex-row items-stretch gap-6 md:gap-10 p-4 md:p-6",
                        cardContentClassName
                    )}
                >
                    <div className={cls("w-full md:w-1/2 min-w-0 aspect-square md:aspect-[4/3]", planImageWrapperClassName)}>
                        <MediaContent
                            imageSrc={plan.imageSrc}
                            videoSrc={plan.videoSrc}
                            imageAlt={plan.imageAlt || plan.title}
                            videoAriaLabel={plan.videoAriaLabel || plan.title}
                            imageClassName={cls("w-full h-full object-cover rounded-theme", planImageClassName)}
                        />
                    </div>

                    <div className="w-full md:w-1/2 min-w-0 flex flex-col justify-center gap-6 py-2">
                        <div className="flex flex-col gap-4">
                            <Tag
                                text={`${plan.price}${plan.period}`}
                                useInvertedBackground={useInvertedBackground}
                                className={planPriceClassName}
                            />

                            <h3 className={cls(
                                "text-4xl md:text-5xl font-medium mb-1 truncate",
                                shouldUseLightText ? "text-background" : "text-foreground",
                                planTitleClassName
                            )}>
                                {plan.title}
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

                        <Button
                            {...getButtonProps(
                                { ...plan.button, props: { ...plan.button.props, ...getButtonConfigProps() } },
                                0,
                                theme.defaultButtonVariant,
                                planButtonClassName,
                                planButtonTextClassName
                            )}
                        />
                    </div>
                </div>
            ))}
        </CardList>
    );
};

PricingCardNine.displayName = "PricingCardNine";

export default PricingCardNine;
