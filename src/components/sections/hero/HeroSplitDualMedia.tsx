"use client";

import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import { Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

type HeroSplitDualMediaBackgroundProps = Extract<
    HeroBackgroundVariantProps,
    | { variant: "plain" }
    | { variant: "animated-grid" }
    | { variant: "canvas-reveal" }
    | { variant: "cell-wave" }
    | { variant: "downward-rays-animated" }
    | { variant: "downward-rays-animated-grid" }
    | { variant: "downward-rays-static" }
    | { variant: "downward-rays-static-grid" }
    | { variant: "glowing-orb" }
    | { variant: "gradient-bars" }
    | { variant: "radial-gradient" }
    | { variant: "rotated-rays-animated" }
    | { variant: "rotated-rays-animated-grid" }
    | { variant: "rotated-rays-static" }
    | { variant: "rotated-rays-static-grid" }
    | { variant: "sparkles-gradient" }
>;

interface MediaItem {
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
}

interface HeroSplitDualMediaProps {
    title: string;
    description: string;
    background: HeroSplitDualMediaBackgroundProps;
    tag: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    mediaItems: [MediaItem, MediaItem];
    mediaAnimation: ButtonAnimationType;
    rating: number;
    ratingText: string;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    tagClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    mediaWrapperClassName?: string;
    mediaItemClassName?: string;
    imageClassName?: string;
    ratingClassName?: string;
    ratingTextClassName?: string;
}

const HeroSplitDualMedia = ({
    title,
    description,
    background,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    mediaItems,
    mediaAnimation,
    rating,
    ratingText,
    ariaLabel = "Hero section",
    className = "",
    containerClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    mediaWrapperClassName = "",
    mediaItemClassName = "",
    imageClassName = "",
    ratingClassName = "",
    ratingTextClassName = "",
}: HeroSplitDualMediaProps) => {
    const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

    const mediaContent = (
        <div ref={mediaContainerRef} className={cls("w-full md:w-1/2 grid grid-cols-2 gap-4", mediaWrapperClassName)}>
            {mediaItems.map((item, index) => (
                <div
                    key={index}
                    className={cls(
                        "w-full h-100 md:h-[55vh] overflow-hidden rounded-theme-capped card p-3",
                        mediaItemClassName
                    )}
                >
                    <MediaContent
                        imageSrc={item.imageSrc}
                        videoSrc={item.videoSrc}
                        imageAlt={item.imageAlt}
                        videoAriaLabel={item.videoAriaLabel}
                        imageClassName={cls("h-full w-full object-cover", imageClassName)}
                    />
                </div>
            ))}
        </div>
    );

    const ratingElement = (
        <div className={cls("w-full min-w-0 md:w-75/100 flex flex-col gap-6 mt-8", ratingClassName)}>
            <div className="w-full h-px bg-background-accent" />
            <div className="w-full min-w-0 flex items-center justify-center md:justify-start gap-3 text-base md:text-xl">
                <div className="flex items-center gap-1">
                    {Array.from({ length: rating }).map((_, index) => (
                        <Star
                            key={index}
                            className="h-[1em] w-auto aspect-square text-primary-cta fill-primary-cta"
                        />
                    ))}
                </div>
                <div className="h-[1em] w-px bg-background-accent" />
                <p className={cls("text-foreground truncate", ratingTextClassName)}>{ratingText}</p>
            </div>
        </div>
    );

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative w-full h-fit py-hero-page-padding md:py-0 md:h-svh flex items-center", className)}
        >
            <HeroBackgrounds {...background} />
            <div className={cls("w-content-width mx-auto flex flex-col md:flex-row gap-13 md:gap-15 items-center relative z-10", containerClassName)}>
                <div className="w-full md:w-1/2">
                    <TextBox
                        title={title}
                        description={description}
                        tag={tag}
                        tagIcon={tagIcon}
                        tagAnimation={tagAnimation}
                        buttons={buttons}
                        buttonAnimation={buttonAnimation}
                        className={cls("flex flex-col gap-3 md:gap-4 md:hidden", textBoxClassName)}
                        titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
                        descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-[1.2] text-center md:text-left", descriptionClassName)}
                        tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
                        buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
                        buttonClassName={buttonClassName}
                        buttonTextClassName={cls("text-base", buttonTextClassName)}
                        center={true}
                    />
                    <TextBox
                        title={title}
                        description={description}
                        tag={tag}
                        tagIcon={tagIcon}
                        tagAnimation={tagAnimation}
                        buttons={buttons}
                        buttonAnimation={buttonAnimation}
                        className={cls("hidden md:flex flex-col gap-3 md:gap-4", textBoxClassName)}
                        titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
                        descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-[1.2] text-center md:text-left", descriptionClassName)}
                        tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
                        buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
                        buttonClassName={buttonClassName}
                        buttonTextClassName={cls("text-base", buttonTextClassName)}
                        center={false}
                    />
                    {ratingElement}
                </div>

                {mediaContent}
            </div>
        </section>
    );
};

HeroSplitDualMedia.displayName = "HeroSplitDualMedia";

export default HeroSplitDualMedia;
