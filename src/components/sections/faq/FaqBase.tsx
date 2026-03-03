"use client";

import { useState } from "react";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import Accordion from "@/components/Accordion";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

interface FaqItem {
    id: string;
    title: string;
    content: string;
}

interface FaqBaseProps {
    faqs: FaqItem[];
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    faqsAnimation: ButtonAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground: InvertedBackground;
    animationType?: "smooth" | "instant";
    showCard?: boolean;
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
    faqsContainerClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
    separatorClassName?: string;
}

const FaqBase = ({
    faqs,
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    faqsAnimation,
    textboxLayout,
    useInvertedBackground,
    animationType = "smooth",
    showCard = true,
    ariaLabel = "FAQ section",
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
    faqsContainerClassName = "",
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
    separatorClassName = "",
}: FaqBaseProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { containerRef: faqsContainerRef } = useButtonAnimation({ animationType: faqsAnimation });

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
                {(title || description) && (
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
                )}

                <div ref={faqsContainerRef} className={cls("flex flex-col gap-4", faqsContainerClassName)}>
                    {faqs.map((faq, index) => (
                        <div key={faq.id}>
                            <Accordion
                                index={index}
                                isActive={activeIndex === index}
                                onToggle={handleToggle}
                                title={faq.title}
                                content={faq.content}
                                animationType={animationType}
                                showCard={showCard}
                                useInvertedBackground={useInvertedBackground}
                                className={accordionClassName}
                                titleClassName={accordionTitleClassName}
                                iconContainerClassName={accordionIconContainerClassName}
                                iconClassName={accordionIconClassName}
                                contentClassName={accordionContentClassName}
                            />
                            {!showCard && index < faqs.length - 1 && (
                                <div className={cls("w-full border-b border-foreground/10 mt-4", separatorClassName)} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

FaqBase.displayName = "FaqBase";

export default FaqBase;
