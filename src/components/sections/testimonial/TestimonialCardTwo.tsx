"use client";

import { memo } from "react";
import Image from "next/image";
import CardStack from "@/components/cardStack/CardStack";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationTypeWith3D, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    testimonial: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
};

interface TestimonialCardTwoProps {
    testimonials: Testimonial[];
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
    roleClassName?: string;
    testimonialClassName?: string;
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
    shouldUseLightText: boolean;
    cardClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    testimonialClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    shouldUseLightText,
    cardClassName = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    roleClassName = "",
    testimonialClassName = "",
}: TestimonialCardProps) => {
    const Icon = testimonial.icon || Quote;

    return (
        <div className={cls("relative h-full card rounded-theme-capped p-6 flex flex-col gap-6", cardClassName)}>
            <div className={cls("relative z-1 h-30 w-fit aspect-square rounded-theme flex items-center justify-center primary-button overflow-hidden", imageWrapperClassName)}>
                {testimonial.imageSrc ? (
                    <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.imageAlt || testimonial.name}
                        width={800}
                        height={800}
                        className={cls("absolute inset-0 h-full w-full object-cover", imageClassName)}
                        unoptimized={testimonial.imageSrc.startsWith('http') || testimonial.imageSrc.startsWith('//')}
                        aria-hidden={testimonial.imageAlt === ""}
                    />
                ) : (
                    <Icon className={cls("h-1/2 w-1/2 text-primary-cta-text", iconClassName)} strokeWidth={1} />
                )}
            </div>

            <div className="relative z-1 flex flex-col gap-1 mt-1">
                <h3 className={cls("text-2xl font-medium leading-[1.1]", shouldUseLightText ? "text-background" : "text-foreground", nameClassName)}>
                    {testimonial.name}
                </h3>
                <p className={cls("text-base leading-[1.1]", shouldUseLightText ? "text-background" : "text-foreground", roleClassName)}>
                    {testimonial.role}
                </p>
            </div>

            <p className={cls("relative z-1 text-lg leading-[1.25]", shouldUseLightText ? "text-background" : "text-foreground", testimonialClassName)}>
                {testimonial.testimonial}
            </p>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardTwo = ({
    testimonials,
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
    roleClassName = "",
    testimonialClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardTwoProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
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
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    imageWrapperClassName={imageWrapperClassName}
                    imageClassName={imageClassName}
                    iconClassName={iconClassName}
                    nameClassName={nameClassName}
                    roleClassName={roleClassName}
                    testimonialClassName={testimonialClassName}
                />
            ))}
        </CardStack>
    );
};

TestimonialCardTwo.displayName = "TestimonialCardTwo";

export default TestimonialCardTwo;
