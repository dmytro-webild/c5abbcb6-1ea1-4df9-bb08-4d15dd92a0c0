"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import TestimonialAuthor from "@/components/shared/TestimonialAuthor";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { Quote, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationTypeWith3D, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    handle: string;
    testimonial: string;
    rating: number;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
};

interface TestimonialCardThirteenProps {
    testimonials: Testimonial[];
    showRating: boolean;
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
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    handleClassName?: string;
    testimonialClassName?: string;
    ratingClassName?: string;
    contentWrapperClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    showRating: boolean;
    useInvertedBackground: boolean;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    handleClassName?: string;
    testimonialClassName?: string;
    ratingClassName?: string;
    contentWrapperClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    showRating,
    useInvertedBackground,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    handleClassName = "",
    testimonialClassName = "",
    ratingClassName = "",
    contentWrapperClassName = "",
}: TestimonialCardProps) => {
    const Icon = testimonial.icon || Quote;
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <div className={cls("relative h-full card rounded-theme-capped p-6 flex flex-col justify-between", showRating ? "gap-5" : "gap-16", cardClassName)}>
            <div className={cls("flex flex-col gap-5 items-start", contentWrapperClassName)}>
                {showRating ? (
                    <div className={cls("relative z-1 flex gap-1", ratingClassName)}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className={cls(
                                    "h-5 w-auto text-accent",
                                    index < testimonial.rating ? "fill-accent" : "fill-transparent"
                                )}
                                strokeWidth={1.5}
                            />
                        ))}
                    </div>
                ) : (
                    <Quote className="h-6 w-auto text-accent fill-accent" strokeWidth={1.5} />
                )}

                <p className={cls("relative z-1 text-lg leading-[1.2]", shouldUseLightText ? "text-background" : "text-foreground", testimonialClassName)}>
                    {testimonial.testimonial}
                </p>
            </div>

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

const TestimonialCardThirteen = ({
    testimonials,
    showRating,
    carouselMode = "buttons",
    uniformGridCustomHeightClasses = "min-h-none",
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
    ariaLabel = "Testimonials section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    handleClassName = "",
    testimonialClassName = "",
    ratingClassName = "",
    contentWrapperClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardThirteenProps) => {
    return (
        <CardStack
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
            useInvertedBackground={useInvertedBackground}
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
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    showRating={showRating}
                    useInvertedBackground={useInvertedBackground}
                    cardClassName={cardClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    iconClassName={iconClassName}
                    nameClassName={nameClassName}
                    handleClassName={handleClassName}
                    testimonialClassName={testimonialClassName}
                    ratingClassName={ratingClassName}
                    contentWrapperClassName={contentWrapperClassName}
                />
            ))}
        </CardStack>
    );
};

TestimonialCardThirteen.displayName = "TestimonialCardThirteen";

export default TestimonialCardThirteen;
