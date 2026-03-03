"use client";


import MediaContent from "@/components/shared/MediaContent";
import TextBox from "@/components/Textbox";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

interface MediaAboutProps {
    title: string;
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    useInvertedBackground: boolean;
    ariaLabel?: string;
    className?: string;
    textBoxClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    tagClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
}

const MediaAbout = ({
    title,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    imageSrc,
    videoSrc,
    imageAlt,
    videoAriaLabel,
    useInvertedBackground,
    ariaLabel = "About section",
    className = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
}: MediaAboutProps) => {

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("relative w-content-width mx-auto rounded-theme-capped overflow-hidden flex items-center justify-center py-8 md:py-12", mediaWrapperClassName)}>
                <div className="absolute inset-0">
                    <MediaContent
                        imageSrc={imageSrc}
                        videoSrc={videoSrc}
                        imageAlt={imageAlt}
                        videoAriaLabel={videoAriaLabel}
                        imageClassName={cls("w-full h-full object-cover", mediaClassName)}
                    />
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-xs pointer-events-none select-none" />
                </div>
                <div className="relative z-10 w-content-width min-h-100 md:min-h-120 px-5 py-10 md:w-45 mx-auto flex items-center justify-center">
                    <TextBox
                        title={title}
                        description={description}
                        tag={tag}
                        tagIcon={tagIcon}
                        tagAnimation={tagAnimation}
                        buttons={buttons}
                        buttonAnimation={buttonAnimation}
                        className={cls("flex flex-col gap-3 md:gap-1", textBoxClassName)}
                        titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
                        descriptionClassName={cls("text-base md:text-lg leading-[1.2]", descriptionClassName)}
                        tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
                        buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-3", buttonContainerClassName)}
                        buttonClassName={buttonClassName}
                        buttonTextClassName={buttonTextClassName}
                        center={true}
                    />
                </div>
            </div>
        </section>
    );
};

MediaAbout.displayName = "MediaAbout";

export default MediaAbout;
