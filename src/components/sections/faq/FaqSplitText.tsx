"use client";

import { useState, useCallback } from "react";
import TextAnimation from "@/components/text/TextAnimation";
import Accordion from "@/components/Accordion";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { AnimationType } from "@/components/text/types";
import type { ButtonConfig, ButtonAnimationType } from "@/components/cardStack/types";

interface FaqItem {
    id: string;
    title: string;
    content: string;
}

interface FaqSplitTextProps {
    faqs: FaqItem[];
    sideTitle: string;
    sideDescription?: string;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    faqsAnimation: ButtonAnimationType;
    textPosition?: "left" | "right";
    useInvertedBackground: boolean;
    animationType?: "smooth" | "instant";
    showCard?: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    textContainerClassName?: string;
    sideTitleClassName?: string;
    sideDescriptionClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    faqsContainerClassName?: string;
    accordionClassName?: string;
    accordionTitleClassName?: string;
    accordionIconContainerClassName?: string;
    accordionIconClassName?: string;
    accordionContentClassName?: string;
    separatorClassName?: string;
}

const FaqSplitText = ({
    faqs,
    sideTitle,
    sideDescription,
    buttons,
    buttonAnimation = "none",
    faqsAnimation,
    textPosition = "left",
    useInvertedBackground,
    animationType = "smooth",
    showCard = true,
    ariaLabel = "FAQ section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    textContainerClassName = "",
    sideTitleClassName = "",
    sideDescriptionClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    faqsContainerClassName = "",
    accordionClassName = "",
    accordionTitleClassName = "",
    accordionIconContainerClassName = "",
    accordionIconClassName = "",
    accordionContentClassName = "",
    separatorClassName = "",
}: FaqSplitTextProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const theme = useTheme();
    const { containerRef: buttonContainerRef } = useButtonAnimation({ animationType: buttonAnimation });
    const { containerRef: faqsContainerRef } = useButtonAnimation({ animationType: faqsAnimation });

    const handleToggle = useCallback((index: number) => {
        setActiveIndex((prevActiveIndex) =>
            prevActiveIndex === index ? null : index
        );
    }, []);

    const textContent = (
        <div className={cls("w-full md:w-2/5 flex flex-col gap-3", textContainerClassName)}>
            <TextAnimation
                type={theme.defaultTextAnimation as AnimationType}
                text={sideTitle}
                variant="trigger"
                className={cls("text-6xl font-medium", useInvertedBackground && "text-background", sideTitleClassName)}
            />
            {sideDescription && (
                <TextAnimation
                    type={theme.defaultTextAnimation as AnimationType}
                    text={sideDescription}
                    variant="words-trigger"
                    className={cls("text-lg leading-[1.2]", useInvertedBackground && "text-background", sideDescriptionClassName)}
                />
            )}
            {buttons && buttons.length > 0 && (
                <div ref={buttonContainerRef} className={cls("flex flex-wrap gap-4 max-md:justify-center", buttonContainerClassName)}>
                    {buttons.slice(0, 2).map((button, index) => (
                        <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, buttonClassName, buttonTextClassName)} />
                    ))}
                </div>
            )}
        </div>
    );

    const faqsContent = (
        <div ref={faqsContainerRef} className={cls("w-full md:w-3/5 flex flex-col gap-4", faqsContainerClassName)}>
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
    );

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("flex flex-col md:flex-row gap-6 md:gap-10", contentClassName)}>
                    {textPosition === "left" && textContent}
                    {faqsContent}
                    {textPosition === "right" && textContent}
                </div>
            </div>
        </section>
    );
};

FaqSplitText.displayName = "FaqSplitText";

export default FaqSplitText;
