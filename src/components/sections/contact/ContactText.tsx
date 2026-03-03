"use client";

import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig } from "@/types/button";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type AnimationType = "entrance-slide" | "reveal-blur" | "background-highlight";

type ContactTextBackgroundProps = Extract<
    HeroBackgroundVariantProps,
    | { variant: "plain" }
    | { variant: "animated-grid" }
    | { variant: "canvas-reveal" }
    | { variant: "cell-wave" }
    | { variant: "downward-rays-animated" }
    | { variant: "downward-rays-animated-grid" }
    | { variant: "downward-rays-static" }
    | { variant: "downward-rays-static-grid" }
    | { variant: "gradient-bars" }
    | { variant: "radial-gradient" }
    | { variant: "rotated-rays-animated" }
    | { variant: "rotated-rays-animated-grid" }
    | { variant: "rotated-rays-static" }
    | { variant: "rotated-rays-static-grid" }
    | { variant: "sparkles-gradient" }
>;

interface ContactTextProps {
    text: string;
    animationType?: AnimationType;
    buttons?: ButtonConfig[];
    background: ContactTextBackgroundProps;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    textClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const ContactText = ({
    text,
    animationType = "entrance-slide",
    buttons,
    background,
    useInvertedBackground,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    textClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: ContactTextProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
                <div className={cls("relative w-full card rounded-theme-capped py-20 px-10 flex items-center justify-center", contentClassName)}>
                    <div className="relative z-10 w-full md:w-3/4 mx-auto flex flex-col items-center justify-center gap-8">
                        <TextAnimation
                            type={animationType}
                            text={text}
                            variant="words-trigger"
                            as="h2"
                            className={cls(
                                "text-4xl md:text-5xl font-medium text-center leading-[1.15]",
                                shouldUseLightText && "text-background",
                                textClassName
                            )}
                        />

                        {buttons && buttons.length > 0 && (
                            <div className={cls("flex flex-wrap gap-4 max-md:justify-center", buttonContainerClassName)}>
                                {buttons.slice(0, 2).map((button, index) => (
                                    <Button
                                        key={index}
                                        {...getButtonProps(
                                            button,
                                            index,
                                            theme.defaultButtonVariant,
                                            cls("", buttonClassName),
                                            cls("text-base", buttonTextClassName)
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 w-full h-full z-0 rounded-theme-capped overflow-hidden">
                        <HeroBackgrounds {...background} />
                    </div>
                </div>
            </div>
        </section>
    );
};

ContactText.displayName = "ContactText";

export default ContactText;
