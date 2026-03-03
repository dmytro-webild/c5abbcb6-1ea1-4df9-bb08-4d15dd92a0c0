"use client";

import { memo, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardStackTextBox from "../../CardStackTextBox";
import { cls } from "@/lib/utils";
import { ButtonCarouselProps } from "../../types";
import { usePrevNextButtons } from "../../hooks/usePrevNextButtons";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useCardAnimation } from "../../hooks/useCardAnimation";

const ButtonCarousel = ({
    children,
    uniformGridCustomHeightClasses,
    animationType,
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
    bottomContent,
    className = "",
    containerClassName = "",
    carouselClassName = "",
    carouselItemClassName = "",
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
    ariaLabel,
}: ButtonCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const scrollProgress = useScrollProgress(emblaApi);

    const childrenArray = Children.toArray(children);
    const heightClasses = uniformGridCustomHeightClasses || "min-h-80 2xl:min-h-90";
    const { itemRefs, bottomContentRef } = useCardAnimation({
        animationType,
        itemCount: childrenArray.length,
        isGrid: false
    });

    return (
        <section
            className={cls(
                "relative px-[var(--width-0)] py-20 w-full",
                useInvertedBackground && "bg-foreground",
                className
            )}
            aria-label={ariaLabel}
        >
            <div className={cls("w-full mx-auto", containerClassName)}>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col gap-6">
                        {(title || titleSegments || description) && (
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
                        )}
                        <div
                            className={cls(
                                "w-full flex flex-col gap-6"
                            )}
                        >
                            <div
                                className={cls(
                                    "overflow-hidden w-full relative z-10 flex cursor-grab",
                                    carouselClassName
                                )}
                                ref={emblaRef}
                            >
                                <div className="flex gap-6 w-full">
                                    <div className="flex-shrink-0 w-carousel-padding" />
                                    {Children.map(childrenArray, (child, index) => (
                                        <div
                                            key={index}
                                            className={cls("flex-none select-none w-carousel-item-3 xl:w-carousel-item-4 mb-6", heightClasses, carouselItemClassName)}
                                            ref={(el) => { itemRefs.current[index] = el; }}
                                        >
                                            {child}
                                        </div>
                                    ))}
                                    <div className="flex-shrink-0 w-carousel-padding" />
                                </div>
                            </div>

                            <div className={cls("w-full flex", controlsClassName)}>
                                <div className="flex-shrink-0 w-carousel-padding-controls" />
                                <div className="flex justify-between items-center w-full">
                                    <div
                                        className="rounded-theme card relative h-2 w-50 overflow-hidden"
                                        role="progressbar"
                                        aria-label="Carousel progress"
                                        aria-valuenow={Math.round(scrollProgress)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="bg-foreground primary-button absolute! w-full top-0 bottom-0 -left-full rounded-theme"
                                            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={onPrevButtonClick}
                                            disabled={prevBtnDisabled}
                                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            aria-label="Previous slide"
                                        >
                                            <ChevronLeft className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                                        </button>
                                        <button
                                            onClick={onNextButtonClick}
                                            disabled={nextBtnDisabled}
                                            className="secondary-button h-8 aspect-square flex items-center justify-center rounded-theme cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            aria-label="Next slide"
                                        >
                                            <ChevronRight className="h-[40%] w-auto aspect-square text-secondary-cta-text" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-carousel-padding-controls" />
                            </div>
                        </div>
                        {bottomContent && (
                            <div ref={bottomContentRef} className="w-content-width mx-auto">
                                {bottomContent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

ButtonCarousel.displayName = "ButtonCarousel";

export default memo(ButtonCarousel);
