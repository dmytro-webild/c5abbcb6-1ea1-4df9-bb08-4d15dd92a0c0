"use client";

import React, { useEffect, useRef, memo, Children } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStackTextBox from "../../CardStackTextBox";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment } from "../../types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

gsap.registerPlugin(ScrollTrigger);

interface TimelineCardStackProps {
    children: React.ReactNode;
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground?: InvertedBackground;
    className?: string;
    containerClassName?: string;
    textBoxClassName?: string;
    titleClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    descriptionClassName?: string;
    tagClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    ariaLabel?: string;
}

const TimelineCardStack = ({
    children,
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
    className = "",
    containerClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel = "Timeline section",
}: TimelineCardStackProps) => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const childrenArray = Children.toArray(children);

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemRefs.current.forEach((ref, position) => {
                if (!ref) return;

                const isLast = position === itemRefs.current.length - 1;

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: ref,
                        start: "center center",
                        end: "+=100%",
                        scrub: true,
                    },
                });

                timeline.set(ref, { willChange: "opacity" }).to(ref, {
                    ease: "none",
                    opacity: isLast ? 1 : 0,
                });
            });
        });

        return () => {
            ctx.revert();
        };
    }, [childrenArray.length]);

    return (
        <section
            className={cls(
                "relative overflow-visible h-fit py-20 w-full",
                useInvertedBackground && "bg-foreground",
                className
            )}
            aria-label={ariaLabel}
        >
            <div className={cls("w-content-width mx-auto flex flex-col gap-6", containerClassName)}>
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
                <div className="w-full flex flex-col gap-[var(--width-25)] md:gap-[6.25vh]">
                    {Children.map(childrenArray, (child, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            className="!sticky w-full card backdrop-blur-xs rounded-theme-capped h-[140vw] md:h-[75vh] top-[25vw] md:top-[12.5vh]"
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

TimelineCardStack.displayName = "TimelineCardStack";

export default memo(TimelineCardStack);
