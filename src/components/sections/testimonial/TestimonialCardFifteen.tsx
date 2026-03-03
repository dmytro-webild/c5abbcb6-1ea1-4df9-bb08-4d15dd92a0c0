"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import TextAnimation from "@/components/text/TextAnimation";
import AvatarGroup from "@/components/shared/AvatarGroup";
import type { Avatar } from "@/components/shared/AvatarGroup";
import { cls } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { ButtonAnimationType } from "@/components/cardStack/types";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

interface TestimonialCardFifteenProps {
    testimonial: string;
    rating: number;
    author: string;
    avatars: Avatar[];
    ratingAnimation: ButtonAnimationType;
    avatarsAnimation: ButtonAnimationType;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    ratingClassName?: string;
    starClassName?: string;
    testimonialClassName?: string;
    avatarGroupClassName?: string;
    avatarClassName?: string;
    avatarImageClassName?: string;
}

const TestimonialCardFifteen = ({
    testimonial,
    rating,
    author,
    avatars,
    ratingAnimation,
    avatarsAnimation,
    useInvertedBackground,
    ariaLabel = "Testimonial section",
    className = "",
    containerClassName = "",
    ratingClassName = "",
    starClassName = "",
    testimonialClassName = "",
    avatarGroupClassName = "",
    avatarClassName = "",
    avatarImageClassName = "",
}: TestimonialCardFifteenProps) => {
    const theme = useTheme();
    const { containerRef: ratingContainerRef } = useButtonAnimation({ animationType: ratingAnimation });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto flex flex-col items-center gap-6", containerClassName)}>
                <div ref={ratingContainerRef} className={cls("relative z-1 flex gap-1 -mb-1", ratingClassName)}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={cls(
                                "h-6 w-auto text-accent",
                                index < rating ? "fill-accent" : "fill-transparent",
                                starClassName
                            )}
                            strokeWidth={1.5}
                        />
                    ))}
                </div>

                <TextAnimation
                    type={theme.defaultTextAnimation}
                    text={testimonial}
                    variant="words-trigger"
                    as="p"
                    className={cls(
                        "text-3xl md:text-5xl font-medium text-balance text-center leading-tight",
                        useInvertedBackground && "text-background",
                        testimonialClassName
                    )}
                />

                <p className={cls(
                    "text-xl text-center mb-1",
                    useInvertedBackground && "text-background"
                )}>
                    {author}
                </p>

                <AvatarGroup
                    avatars={avatars}
                    maxVisible={isMobile ? 3 : 6}
                    animationType={avatarsAnimation}
                    className={cls("justify-center", avatarGroupClassName)}
                    avatarClassName={avatarClassName}
                    avatarImageClassName={cls("h-[var(--width-17_5)] md:h-[var(--width-5)]", avatarImageClassName)}
                    avatarOverlapClassName="-ml-8"
                />
            </div>
        </section>
    );
};

TestimonialCardFifteen.displayName = "TestimonialCardFifteen";

export default TestimonialCardFifteen;
