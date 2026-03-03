"use client";

import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import PricingFeatureList from "@/components/shared/PricingFeatureList";
import { useCardAnimation } from "@/components/cardStack/hooks/useCardAnimation";
import { Check, X } from "lucide-react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type ComparisonItem = {
    items: string[];
};

interface FeatureCardSixteenProps {
    negativeCard: ComparisonItem;
    positiveCard: ComparisonItem;
    animationType: CardAnimationTypeWith3D;
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    textboxLayout: TextboxLayout;
    useInvertedBackground: InvertedBackground;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxTitleClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    gridClassName?: string;
    cardClassName?: string;
    itemsListClassName?: string;
    itemClassName?: string;
    itemIconClassName?: string;
    itemTextClassName?: string;
}

const FeatureCardSixteen = ({
    negativeCard,
    positiveCard,
    animationType,
    title,
    titleSegments,
    description,
    textboxLayout,
    useInvertedBackground,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    ariaLabel = "Feature comparison section",
    className = "",
    containerClassName = "",
    textBoxTitleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    gridClassName = "",
    cardClassName = "",
    itemsListClassName = "",
    itemClassName = "",
    itemIconClassName = "",
    itemTextClassName = "",
}: FeatureCardSixteenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    const { itemRefs, containerRef, perspectiveRef } = useCardAnimation({
        animationType,
        itemCount: 2,
        isGrid: true,
        supports3DAnimation: true,
        gridVariant: "uniform-all-items-equal"
    });

    const cards = [
        { ...negativeCard, variant: "negative" as const },
        { ...positiveCard, variant: "positive" as const },
    ];

    return (
        <section
            ref={containerRef}
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
                <CardStackTextBox
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
                    textBoxClassName={textBoxClassName}
                    titleClassName={textBoxTitleClassName}
                    titleImageWrapperClassName={titleImageWrapperClassName}
                    titleImageClassName={titleImageClassName}
                    descriptionClassName={textBoxDescriptionClassName}
                    tagClassName={textBoxTagClassName}
                    buttonContainerClassName={textBoxButtonContainerClassName}
                    buttonClassName={textBoxButtonClassName}
                    buttonTextClassName={textBoxButtonTextClassName}
                />

                <div
                    ref={perspectiveRef}
                    className={cls(
                        "relative mx-auto w-full md:w-60 grid grid-cols-1 gap-6",
                        cards.length >= 2 ? "md:grid-cols-2" : "md:grid-cols-1",
                        gridClassName
                    )}
                >
                    {cards.map((card, index) => (
                        <div
                            key={card.variant}
                            ref={(el) => { itemRefs.current[index] = el; }}
                            className={cls(
                                "relative h-full card rounded-theme-capped p-6",
                                cardClassName
                            )}
                        >
                            <div className={cls("flex flex-col gap-6", card.variant === "negative" && "opacity-50")}>
                                <PricingFeatureList
                                    features={card.items}
                                    icon={card.variant === "positive" ? Check : X}
                                    shouldUseLightText={shouldUseLightText}
                                    className={itemsListClassName}
                                    featureItemClassName={itemClassName}
                                    featureIconWrapperClassName=""
                                    featureIconClassName={itemIconClassName}
                                    featureTextClassName={cls("truncate", itemTextClassName)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

FeatureCardSixteen.displayName = "FeatureCardSixteen";

export default FeatureCardSixteen;