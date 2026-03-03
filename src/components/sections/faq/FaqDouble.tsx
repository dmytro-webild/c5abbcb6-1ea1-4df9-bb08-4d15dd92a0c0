"use client";

import { useState, useCallback } from "react";
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

interface FaqDoubleProps {
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
    columnClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
}

const FaqDouble = ({
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
    columnClassName = "",
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
}: FaqDoubleProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { containerRef: faqsContainerRef } = useButtonAnimation({ animationType: faqsAnimation });

    const handleToggle = useCallback((index: number) => {
        setActiveIndex((prevActiveIndex) =>
            prevActiveIndex === index ? null : index
        );
    }, []);

    const halfLength = Math.ceil(faqs.length / 2);
    const firstHalf = faqs.slice(0, halfLength);
    const secondHalf = faqs.slice(halfLength);

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

                <div ref={faqsContainerRef} className={cls("card p-4 rounded-theme-capped flex flex-col md:flex-row gap-4 overflow-hidden", faqsContainerClassName)}>
                    <div className={cls("relative z-1 flex-1 flex flex-col gap-4", columnClassName)}>
                        {firstHalf.map((faq, index) => (
                            <Accordion
                                key={faq.id}
                                index={index}
                                isActive={activeIndex === index}
                                onToggle={handleToggle}
                                title={faq.title}
                                content={faq.content}
                                animationType={animationType}
                                useInvertedBackground={useInvertedBackground}
                                className={accordionClassName}
                                titleClassName={accordionTitleClassName}
                                iconContainerClassName={accordionIconContainerClassName}
                                iconClassName={accordionIconClassName}
                                contentClassName={accordionContentClassName}
                            />
                        ))}
                    </div>
                    {secondHalf.length > 0 && (
                        <div className={cls("relative z-1 flex-1 flex flex-col gap-4", columnClassName)}>
                            {secondHalf.map((faq, index) => {
                                const actualIndex = index + halfLength;
                                return (
                                    <Accordion
                                        key={faq.id}
                                        index={actualIndex}
                                        isActive={activeIndex === actualIndex}
                                        onToggle={handleToggle}
                                        title={faq.title}
                                        content={faq.content}
                                        animationType={animationType}
                                        useInvertedBackground={useInvertedBackground}
                                        className={accordionClassName}
                                        titleClassName={accordionTitleClassName}
                                        iconContainerClassName={accordionIconContainerClassName}
                                        iconClassName={accordionIconClassName}
                                        contentClassName={accordionContentClassName}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

FaqDouble.displayName = "FaqDouble";

export default FaqDouble;
