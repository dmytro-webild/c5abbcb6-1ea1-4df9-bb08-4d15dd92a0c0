"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

interface SocialProofOneProps {
    names: string[];
    logos?: string[];
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
    speed?: number;
    showCard?: boolean;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxTitleClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    contentClassName?: string;
    logoItemClassName?: string;
    logoCardClassName?: string;
    logoImageClassName?: string;
    logoTextClassName?: string;
}

const SocialProofOne = ({
    names,
    logos,
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
    speed = 40,
    showCard = true,
    ariaLabel = "Social proof section",
    className = "",
    containerClassName = "",
    textBoxTitleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    contentClassName = "",
    logoItemClassName = "",
    logoCardClassName = "",
    logoImageClassName = "",
    logoTextClassName = "",
}: SocialProofOneProps) => {
    const useImages = logos && logos.length > 0;
    const items = useImages ? logos : names;
    const repeatedItems = [...items, ...items, ...items];

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
                {(title || description) && (
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
                        titleClassName={textBoxTitleClassName}
                        titleImageWrapperClassName={titleImageWrapperClassName}
                        titleImageClassName={titleImageClassName}
                        descriptionClassName={textBoxDescriptionClassName}
                        tagClassName={textBoxTagClassName}
                        buttonContainerClassName={textBoxButtonContainerClassName}
                        buttonClassName={textBoxButtonClassName}
                        buttonTextClassName={textBoxButtonTextClassName}
                    />
                )}

                <div className={cls("mask-padding-x", contentClassName)}>
                    <Marquee gradient={false} speed={speed}>
                        {repeatedItems.map((item, i) => (
                            <div className={cls(showCard ? "mx-4" : "mx-8", logoItemClassName)} key={i}>
                                <div className={cls(showCard ? "card px-4 py-3 mb-1 rounded-theme" : "", logoCardClassName)}>
                                    {useImages ? (
                                        <Image
                                            width={500}
                                            height={500}
                                            src={item}
                                            alt={`Partner ${i + 1}`}
                                            className={cls("relative z-1", showCard ? "h-7 w-auto" : "h-8 w-auto", logoImageClassName)}
                                            unoptimized={item.startsWith('http') || item.startsWith('//')}
                                        />
                                    ) : (
                                        <span className={cls("relative z-1 text-2xl text-foreground/75 font-semibold whitespace-nowrap", logoTextClassName)}>
                                            {item}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

SocialProofOne.displayName = "SocialProofOne";

export default SocialProofOne;
