"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import { Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationTypeWith3D, TitleSegment, TextboxLayout, InvertedBackground } from "@/components/cardStack/types";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    company: string;
    rating: number;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

type KpiItem = {
    value: string;
    label: string;
};

interface TestimonialCardSixteenProps {
    testimonials: Testimonial[];
    kpiItems: [KpiItem, KpiItem, KpiItem];
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
    imageClassName?: string;
    overlayClassName?: string;
    ratingClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    companyClassName?: string;
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
    cardClassName?: string;
    imageClassName?: string;
    overlayClassName?: string;
    ratingClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    companyClassName?: string;
}

const TestimonialCard = memo(({
    testimonial,
    cardClassName = "",
    imageClassName = "",
    overlayClassName = "",
    ratingClassName = "",
    nameClassName = "",
    roleClassName = "",
    companyClassName = "",
}: TestimonialCardProps) => {
    return (
        <div className={cls("relative h-full w-full max-w-full aspect-[8/10] rounded-theme-capped overflow-hidden group", cardClassName)}>
            <MediaContent
                imageSrc={testimonial.imageSrc}
                videoSrc={testimonial.videoSrc}
                imageAlt={testimonial.imageAlt || testimonial.name}
                videoAriaLabel={testimonial.videoAriaLabel || testimonial.name}
                imageClassName={cls("relative z-1 w-full h-full object-cover!", imageClassName)}
            />

            <div className={cls("!absolute z-1 bottom-6 left-6 right-6 card backdrop-blur-xs p-6 flex flex-col gap-3 rounded-theme-capped", overlayClassName)}>
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

                <h3 className={cls("relative z-1 text-2xl font-medium text-foreground leading-[1.1] mt-1", nameClassName)}>
                    {testimonial.name}
                </h3>

                <div className="relative z-1 flex flex-col gap-1">
                    <p className={cls("text-base text-foreground leading-[1.1]", roleClassName)}>
                        {testimonial.role}
                    </p>
                    <p className={cls("text-base text-foreground leading-[1.1]", companyClassName)}>
                        {testimonial.company}
                    </p>
                </div>
            </div>
        </div>
    );
});

TestimonialCard.displayName = "TestimonialCard";

const TestimonialCardSixteen = ({
    testimonials,
    kpiItems,
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
    imageClassName = "",
    overlayClassName = "",
    ratingClassName = "",
    nameClassName = "",
    roleClassName = "",
    companyClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TestimonialCardSixteenProps) => {
    const kpiSection = (
        <div className="card rounded-theme-capped p-8 md:py-16 flex flex-col md:flex-row items-center justify-between">
            {kpiItems.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center w-full md:flex-1">
                    <div className="flex flex-col items-center text-center flex-1 py-4 md:py-0 gap-1">
                        <h3 className="text-5xl font-medium text-foreground">{item.value}</h3>
                        <p className="text-base text-foreground">{item.label}</p>
                    </div>
                    {index < 2 && (
                        <div className="w-full h-px md:h-[calc(var(--text-5xl)+var(--text-base))] md:w-px bg-foreground" />
                    )}
                </div>
            ))}
        </div>
    );

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
            bottomContent={kpiSection}
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
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    overlayClassName={overlayClassName}
                    ratingClassName={ratingClassName}
                    nameClassName={nameClassName}
                    roleClassName={roleClassName}
                    companyClassName={companyClassName}
                />
            ))}
        </CardStack>
    );
};

TestimonialCardSixteen.displayName = "TestimonialCardSixteen";

export default TestimonialCardSixteen;
