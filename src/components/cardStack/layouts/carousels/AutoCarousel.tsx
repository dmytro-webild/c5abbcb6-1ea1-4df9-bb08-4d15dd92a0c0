"use client";

import { memo, Children } from "react";
import Marquee from "react-fast-marquee";
import CardStackTextBox from "../../CardStackTextBox";
import { cls } from "@/lib/utils";
import { AutoCarouselProps } from "../../types";
import { useCardAnimation } from "../../hooks/useCardAnimation";

const AutoCarousel = ({
    children,
    uniformGridCustomHeightClasses,
    animationType,
    speed = 50,
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
    itemClassName = "",
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
    showTextBox = true,
    dualMarquee = false,
    topMarqueeDirection = "left",
    bottomCarouselClassName = "",
    marqueeGapClassName = "",
}: AutoCarouselProps) => {
    const childrenArray = Children.toArray(children);
    const heightClasses = uniformGridCustomHeightClasses || "min-h-80 2xl:min-h-90";
    const { itemRefs, bottomContentRef } = useCardAnimation({
        animationType,
        itemCount: childrenArray.length,
        isGrid: false
    });

    // Bottom marquee direction is opposite of top
    const bottomMarqueeDirection = topMarqueeDirection === "left" ? "right" : "left";

    // Reverse order for bottom marquee to avoid alignment with top
    const bottomChildren = dualMarquee ? [...childrenArray].reverse() : [];

    return (
        <section
            className={cls(
                "relative py-20 w-full",
                useInvertedBackground && "bg-foreground",
                className
            )}
            aria-label={ariaLabel}
            aria-live="off"
        >
            <div className={cls("w-full md:w-content-width mx-auto", containerClassName)}>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col gap-6">
                        {showTextBox && (title || titleSegments || description) && (
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
                        )}

                        <div
                            className={cls(
                                "w-full flex flex-col",
                                marqueeGapClassName || "gap-6"
                            )}
                        >
                            {/* Top/Single Marquee */}
                            <div className={cls("overflow-hidden w-full relative z-10 mask-padding-x", carouselClassName)}>
                                <Marquee gradient={false} speed={speed} direction={topMarqueeDirection}>
                                    {Children.map(childrenArray, (child, index) => (
                                        <div
                                            key={index}
                                            className={cls("flex-none w-carousel-item-3 xl:w-carousel-item-4 mb-1 mr-6", heightClasses, itemClassName)}
                                            ref={(el) => { itemRefs.current[index] = el; }}
                                        >
                                            {child}
                                        </div>
                                    ))}
                                </Marquee>
                            </div>

                            {/* Bottom Marquee (only if dualMarquee is true) - Reversed order, opposite direction */}
                            {dualMarquee && (
                                <div className={cls("overflow-hidden w-full relative z-10 mask-padding-x", bottomCarouselClassName || carouselClassName)}>
                                    <Marquee gradient={false} speed={speed} direction={bottomMarqueeDirection}>
                                        {Children.map(bottomChildren, (child, index) => (
                                            <div
                                                key={`bottom-${index}`}
                                                className={cls("flex-none w-carousel-item-3 xl:w-carousel-item-4 mb-1 mr-6", heightClasses, itemClassName)}
                                            >
                                                {child}
                                            </div>
                                        ))}
                                    </Marquee>
                                </div>
                            )}
                        </div>
                        {bottomContent && (
                            <div ref={bottomContentRef}>
                                {bottomContent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

AutoCarousel.displayName = "AutoCarousel";

export default memo(AutoCarousel);
