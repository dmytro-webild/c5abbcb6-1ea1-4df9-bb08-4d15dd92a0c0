"use client";

import { memo } from "react";
import Image from "next/image";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";

interface TestimonialAuthorProps {
    name: string;
    subtitle: string;
    imageSrc?: string;
    imageAlt?: string;
    icon?: LucideIcon;
    useInvertedBackground?: boolean;
    className?: string;
    imageWrapperClassName?: string;
    imageClassName?: string;
    iconClassName?: string;
    nameClassName?: string;
    subtitleClassName?: string;
}

const TestimonialAuthor = memo(({
    name,
    subtitle,
    imageSrc,
    imageAlt,
    icon: Icon,
    useInvertedBackground,
    className = "",
    imageWrapperClassName = "",
    imageClassName = "",
    iconClassName = "",
    nameClassName = "",
    subtitleClassName = "",
}: TestimonialAuthorProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <div className={cls("relative z-1 flex items-center gap-4", className)}>
            <div className={cls("relative shrink-0 h-11 w-fit aspect-square rounded-theme flex items-center justify-center primary-button overflow-hidden", imageWrapperClassName)}>
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={imageAlt || name}
                        width={800}
                        height={800}
                        className={cls("absolute inset-0 w-full h-full object-cover", imageClassName)}
                        unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('//')}
                        aria-hidden={imageAlt === ""}
                    />
                ) : (
                    <Icon className={cls("h-1/2 w-1/2 text-primary-cta-text", iconClassName)} strokeWidth={1} />
                )}
            </div>

            <div className="w-full min-w-0 flex flex-col gap-0">
                <h3 className={cls("text-2xl font-medium leading-[1.15] truncate", shouldUseLightText ? "text-background" : "text-foreground", nameClassName)}>
                    {name}
                </h3>
                <p className={cls("text-sm leading-[1.15]", shouldUseLightText ? "text-background" : "text-foreground", subtitleClassName)}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
});

TestimonialAuthor.displayName = "TestimonialAuthor";

export default TestimonialAuthor;
