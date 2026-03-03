"use client";

import { memo } from "react";
import AutoCarousel from "@/components/cardStack/layouts/carousels/AutoCarousel";
import TestimonialAuthor from "@/components/shared/TestimonialAuthor";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CardAnimationType, ButtonConfig, ButtonAnimationType, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    handle: string;
    testimonial: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
};

interface TestimonialCardSixProps {
    testimonials: Testimonial[];
    animationType: CardAnimationType;
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
    speed?: number;
    topMarqueeDirection?: "left" | "right";
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    carouselClassName?: string;
    bottomCarouselClassName?: string;
    cardClassName?: string;
    testimonialClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    handleClassName?: string;
    textBoxClassName?: string;
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    useInvertedBackground: boolean;
    cardClassName?: string;
    testimonialClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    handleClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    useInvertedBackground,
    cardClassName = "",
    testimonialClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    handleClassName = "",
}: TestimonialCardProps) => {
    const Icon = testimonial.icon || Quote;
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <div className={cls("relative h-full card rounded-theme-capped p-6 min-h-0 flex flex-col gap-10", cardClassName)}>
            <p className={cls("relative z-1 text-lg leading-tight line-clamp-2", shouldUseLightText ? "text-background" : "text-foreground", testimonialClassName)}>
                {testimonial.testimonial}
            </p>

            <TestimonialAuthor
                name={testimonial.name}
                subtitle={testimonial.handle}
                imageSrc={testimonial.imageSrc}
                imageAlt={testimonial.imageAlt}
                icon={Icon}
                useInvertedBackground={useInvertedBackground}
                imageWrapperClassName={imageWrapperClassName}
                imageClassName={imageClassName}
                iconClassName={iconClassName}
                nameClassName={nameClassName}
                subtitleClassName={handleClassName}
            />
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardSix = ({
    testimonials,
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
    speed = 40,
    topMarqueeDirection = "left",
    ariaLabel = "Testimonials section",
    className = "",
    containerClassName = "",
    carouselClassName = "",
    bottomCarouselClassName = "",
    cardClassName = "",
    testimonialClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    handleClassName = "",
    textBoxClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardSixProps) => {
    return (
        <AutoCarousel
            speed={speed}
            uniformGridCustomHeightClasses="min-h-none"
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
            showTextBox={true}
            dualMarquee={true}
            topMarqueeDirection={topMarqueeDirection}
            carouselClassName={carouselClassName}
            bottomCarouselClassName={bottomCarouselClassName}
            containerClassName={containerClassName}
            className={className}
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
            itemClassName="w-60! md:w-carousel-item-3! xl:w-carousel-item-4!"
        >
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    useInvertedBackground={useInvertedBackground}
                    cardClassName={cardClassName}
                    testimonialClassName={testimonialClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    iconClassName={iconClassName}
                    nameClassName={nameClassName}
                    handleClassName={handleClassName}
                />
            ))}
        </AutoCarousel>
    );
};

TestimonialCardSix.displayName = "TestimonialCardSix";

export default TestimonialCardSix;