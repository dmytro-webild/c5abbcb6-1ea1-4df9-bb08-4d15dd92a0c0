"use client";

import { memo, Children, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import CardStackTextBox from "../../CardStackTextBox";
import { cls } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowCarouselProps } from "../../types";

const ArrowCarousel = ({
    children,
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    textboxLayout = "default",
    useInvertedBackground,
    className = "",
    containerClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel = "Carousel section",
}: ArrowCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const childrenArray = Children.toArray(children);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("select", onSelect).on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect).off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section
            className={cls(
                "relative py-20 w-full",
                useInvertedBackground && "bg-foreground",
                className
            )}
            aria-label={ariaLabel}
        >
            <div className={cls("w-full mx-auto flex flex-col gap-6", containerClassName)}>
                <div className="w-content-width mx-auto">
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
                        titleClassName={titleClassName}
                        titleImageWrapperClassName={titleImageWrapperClassName}
                        titleImageClassName={titleImageClassName}
                        descriptionClassName={descriptionClassName}
                        tagClassName={tagClassName}
                        buttonContainerClassName={buttonContainerClassName}
                        buttonClassName={buttonClassName}
                        buttonTextClassName={buttonTextClassName}
                    />
                </div>

                <div className="relative w-full">
                    <div
                        className={cls(
                            "overflow-hidden w-full relative z-10 mask-fade-x",
                            carouselClassName
                        )}
                        ref={emblaRef}
                    >
                        <div className="flex w-full">
                            {childrenArray.map((child, index) => (
                                <div
                                    key={index}
                                    className="flex-none w-60 md:w-40 mr-6"
                                >
                                    <div className={cls(
                                        "transition-all duration-500 ease-out",
                                        selectedIndex === index ? "opacity-100 scale-100" : "opacity-70 scale-90"
                                    )}>
                                        {child}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cls("absolute inset-y-0 w-content-width mx-auto left-0 right-0 flex items-center justify-between pointer-events-none z-10", controlsClassName)}>
                        <button
                            onClick={scrollPrev}
                            className="pointer-events-auto primary-button h-8 w-auto aspect-square rounded-theme flex items-center justify-center cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-4/10 h-4/10 text-primary-cta-text" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="pointer-events-auto primary-button h-8 w-auto aspect-square rounded-theme flex items-center justify-center cursor-pointer"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-4/10 h-4/10 text-primary-cta-text" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

ArrowCarousel.displayName = "ArrowCarousel";

export default memo(ArrowCarousel);
