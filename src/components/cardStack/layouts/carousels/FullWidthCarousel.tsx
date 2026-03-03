"use client";

import { memo, Children, cloneElement, isValidElement, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import CardStackTextBox from "../../CardStackTextBox";
import { cls } from "@/lib/utils";
import { FullWidthCarouselProps } from "../../types";

const FullWidthCarousel = ({
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
    dotsClassName = "",
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
}: FullWidthCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const childrenArray = Children.toArray(children);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("select", onSelect).on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect).off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (!emblaApi) return;

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(autoplay);
    }, [emblaApi]);

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

                <div className="w-full">
                    <div
                        className={cls(
                            "overflow-hidden w-full relative z-10",
                            carouselClassName
                        )}
                        ref={emblaRef}
                    >
                        <div className="flex w-full">
                            {Children.map(childrenArray, (child, index) => (
                                <div
                                    key={index}
                                    className="flex-none w-70 mr-6"
                                >
                                    {isValidElement(child)
                                        ? cloneElement(child, { isActive: selectedIndex === index } as Record<string, unknown>)
                                        : child}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cls("flex items-center justify-center gap-2", dotsClassName)}>
                    {childrenArray.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={cls(
                                "relative cursor-pointer h-2 rounded-theme bg-accent transition-all duration-300",
                                selectedIndex === index
                                    ? "w-8 opacity-100"
                                    : "w-2 opacity-20"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={selectedIndex === index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

FullWidthCarousel.displayName = "FullWidthCarousel";

export default memo(FullWidthCarousel);
