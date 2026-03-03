"use client";

import { memo } from "react";


import FullWidthCarousel from "@/components/cardStack/layouts/carousels/FullWidthCarousel";
import MediaContent from "@/components/shared/MediaContent";
import Tag from "@/components/shared/Tag";
import TestimonialAuthor from "@/components/shared/TestimonialAuthor";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    date: string;
    title: string;
    quote: string;
    tag: string;
    avatarSrc: string;
    avatarAlt?: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

interface TestimonialCardFiveProps {
    testimonials: Testimonial[];
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
    cardTagClassName?: string;
    cardTitleClassName?: string;
    cardQuoteClassName?: string;
    cardAuthorClassName?: string;
    cardAvatarWrapperClassName?: string;
    cardAvatarClassName?: string;
    cardNameClassName?: string;
    cardDateClassName?: string;
    cardImageClassName?: string;
    carouselClassName?: string;
    dotsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    useInvertedBackground: boolean;
    cardClassName?: string;
    tagClassName?: string;
    titleClassName?: string;
    quoteClassName?: string;
    authorClassName?: string;
    avatarWrapperClassName?: string;
    avatarClassName?: string;
    nameClassName?: string;
    dateClassName?: string;
    imageClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    useInvertedBackground,
    cardClassName = "",
    tagClassName = "",
    titleClassName = "",
    quoteClassName = "",
    authorClassName = "",
    avatarWrapperClassName = "",
    avatarClassName = "",
    nameClassName = "",
    dateClassName = "",
    imageClassName = "",
}: TestimonialCardProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <div className={cls("card h-full rounded-theme-capped overflow-hidden flex flex-col-reverse md:grid md:grid-cols-2 gap-0", cardClassName)}>
            <div className="relative z-1 p-6 md:p-10 flex flex-col gap-10 justify-between flex-1 md:flex-auto">
                <div className="flex flex-col gap-4 md:gap-6">
                    <Tag
                        text={testimonial.tag}
                        useInvertedBackground={useInvertedBackground}
                        className={tagClassName}
                    />

                    <div className="flex flex-col gap-4 overflow-hidden">
                        <h3 className={cls("text-4xl font-medium leading-tight line-clamp-3", shouldUseLightText ? "text-background" : "text-foreground", titleClassName)}>
                            {testimonial.title}
                        </h3>
                        <blockquote className={cls("text-base md:text-lg leading-tight line-clamp-10", shouldUseLightText ? "text-background/75" : "text-foreground/75", quoteClassName)}>
                            {testimonial.quote}
                        </blockquote>
                    </div>
                </div>

                <TestimonialAuthor
                    name={testimonial.name}
                    subtitle={testimonial.date}
                    imageSrc={testimonial.avatarSrc}
                    imageAlt={testimonial.avatarAlt}
                    useInvertedBackground={useInvertedBackground}
                    className={authorClassName}
                    imageWrapperClassName={avatarWrapperClassName}
                    imageClassName={avatarClassName}
                    nameClassName={nameClassName}
                    subtitleClassName={dateClassName}
                />
            </div>

            <div className="relative z-1 min-h-0 aspect-square">
                <MediaContent
                    imageSrc={testimonial.imageSrc}
                    videoSrc={testimonial.videoSrc}
                    imageAlt={testimonial.imageAlt}
                    videoAriaLabel={testimonial.videoAriaLabel}
                    imageClassName={cls("!absolute inset-0 w-full h-full object-cover !rounded-none", imageClassName)}
                />
            </div>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardFive = ({
    testimonials,
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
    ariaLabel = "Testimonials section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    cardTagClassName = "",
    cardTitleClassName = "",
    cardQuoteClassName = "",
    cardAuthorClassName = "",
    cardAvatarWrapperClassName = "",
    cardAvatarClassName = "",
    cardNameClassName = "",
    cardDateClassName = "",
    cardImageClassName = "",
    carouselClassName = "",
    dotsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardFiveProps) => {
    return (
        <FullWidthCarousel
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
            className={className}
            containerClassName={containerClassName}
            carouselClassName={carouselClassName}
            dotsClassName={dotsClassName}
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
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    useInvertedBackground={useInvertedBackground}
                    cardClassName={cardClassName}
                    tagClassName={cardTagClassName}
                    titleClassName={cardTitleClassName}
                    quoteClassName={cardQuoteClassName}
                    authorClassName={cardAuthorClassName}
                    avatarWrapperClassName={cardAvatarWrapperClassName}
                    avatarClassName={cardAvatarClassName}
                    nameClassName={cardNameClassName}
                    dateClassName={cardDateClassName}
                    imageClassName={cardImageClassName}
                />
            ))}
        </FullWidthCarousel>
    );
};

TestimonialCardFive.displayName = "TestimonialCardFive";

export default TestimonialCardFive;
