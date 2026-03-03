"use client";

import { useCallback } from "react";
import MediaContent from "@/components/shared/MediaContent";
import FillWidthText, { hasDescenders } from "@/components/shared/FillWidthText/FillWidthText";
import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useCarouselFullscreen } from "./useCarouselFullscreen";
import type { ButtonConfig } from "@/types/button";

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";

interface CarouselSlide {
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
}

interface HeroCarouselLogoProps {
    logoText: string;
    description: string;
    buttons: ButtonConfig[];
    slides: CarouselSlide[];
    autoplayDelay?: number;
    showDimOverlay?: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentContainerClassName?: string;
    descriptionClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    logoContainerClassName?: string;
    logoClassName?: string;
    mediaWrapperClassName?: string;
    imageClassName?: string;
    blurClassName?: string;
    dimOverlayClassName?: string;
    progressBarClassName?: string;
}

const HeroCarouselLogo = ({
    logoText,
    description,
    buttons,
    slides,
    autoplayDelay = 3000,
    showDimOverlay = false,
    ariaLabel = "Hero section",
    className = "",
    containerClassName = "",
    contentContainerClassName = "",
    descriptionClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    logoContainerClassName = "",
    logoClassName = "",
    mediaWrapperClassName = "",
    imageClassName = "",
    blurClassName = "",
    dimOverlayClassName = "",
    progressBarClassName = "",
}: HeroCarouselLogoProps) => {
    const theme = useTheme();

    const { currentSlide, progressRefs, goToSlide } = useCarouselFullscreen({
        totalSlides: slides.length,
        autoplayDelay,
    });

    const setProgressRef = useCallback(
        (el: HTMLDivElement | null, index: number) => {
            progressRefs.current[index] = el;
        },
        [progressRefs]
    );

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative w-full h-svh overflow-hidden flex flex-col justify-end", className)}
        >
            <div className={cls("absolute inset-0 w-full h-full", mediaWrapperClassName)}>
                {showDimOverlay && (
                    <div className={cls("absolute top-0 left-0 w-full h-full bg-background/20 z-10 pointer-events-none select-none", dimOverlayClassName)} />
                )}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={cls(
                            "absolute inset-0 transition-opacity duration-600",
                            currentSlide === index ? "opacity-100" : "opacity-0"
                        )}
                        aria-hidden={currentSlide !== index}
                    >
                        <MediaContent
                            imageSrc={slide.imageSrc}
                            videoSrc={slide.videoSrc}
                            imageAlt={slide.imageAlt || ""}
                            videoAriaLabel={slide.videoAriaLabel || "Hero video"}
                            imageClassName={cls("w-full h-full object-cover !rounded-none", imageClassName)}
                        />
                    </div>
                ))}
            </div>

            <div
                className={cls(
                    "absolute z-10 backdrop-blur-xl opacity-100 w-full h-[50svh] md:h-[75svh] left-0 bottom-0 pointer-events-none select-none",
                    blurClassName
                )}
                style={{ maskImage: MASK_GRADIENT }}
                aria-hidden="true"
            />

            <div className={cls("relative z-20 w-content-width mx-auto h-fit flex items-end", containerClassName)}>
                <div className={cls("w-full flex flex-col", logoContainerClassName)}>
                    <div className={cls("w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-6", contentContainerClassName)}>
                        <div className="w-full md:w-1/2">
                            <TextAnimation
                                type={theme.defaultTextAnimation}
                                text={description}
                                variant="words-trigger"
                                className={cls("text-lg md:text-2xl text-background text-balance font-medium leading-[1.2] md:max-w-1/2", descriptionClassName)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                            <div className={cls("flex flex-wrap gap-4 max-md:justify-center", buttonContainerClassName)}>
                                {buttons.slice(0, 2).map((button, index) => (
                                    <Button key={index} {...getButtonProps(button, index, theme.defaultButtonVariant, cls("", buttonClassName), cls("text-base", buttonTextClassName))} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <FillWidthText className={cls("text-background", !hasDescenders(logoText) && "my-10", logoClassName)}>
                            {logoText}
                        </FillWidthText>
                    </div>
                    <div className="w-full flex gap-3 pb-12 pt-6">
                        {Array.from({ length: slides.length }, (_, index) => (
                            <button
                                key={index}
                                className={cls("relative cursor-pointer h-1 w-full rounded-theme overflow-hidden bg-white/10 backdrop-blur-sm", progressBarClassName)}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={currentSlide === index ? "true" : "false"}
                            >
                                <div
                                    ref={(el) => setProgressRef(el, index)}
                                    className="absolute inset-0 bg-white rounded-theme"
                                    style={{ transform: "translateX(-100%)" }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

HeroCarouselLogo.displayName = "HeroCarouselLogo";

export default HeroCarouselLogo;