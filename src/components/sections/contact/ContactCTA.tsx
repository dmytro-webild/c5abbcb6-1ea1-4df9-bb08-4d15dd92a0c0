"use client";

import TextBox from "@/components/Textbox";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type ContactCTABackgroundProps = Extract<
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

interface ContactCTAProps {
    tag: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    title: string;
    description: string;
    buttons: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    background: ContactCTABackgroundProps;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    textBoxClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    tagClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const ContactCTA = ({
    tag,
    tagIcon,
    tagAnimation,
    title,
    description,
    buttons,
    buttonAnimation,
    background,
    useInvertedBackground,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: ContactCTAProps) => {
    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
        >
            <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
                <div className={cls("relative w-full card rounded-theme-capped py-20 px-10 flex items-center justify-center", contentClassName)}>
                    <div className="relative z-10 w-full md:w-3/4 mx-auto flex flex-col items-center justify-center">
                        <TextBox
                            tag={tag}
                            tagIcon={tagIcon}
                            tagAnimation={tagAnimation}
                            title={title}
                            description={description}
                            buttons={buttons}
                            buttonAnimation={buttonAnimation}
                            className={cls("flex flex-col gap-3 md:gap-1", textBoxClassName)}
                            titleClassName={cls("text-4xl md:text-5xl font-medium text-balance", titleClassName)}
                            descriptionClassName={cls("text-base md:text-lg leading-[1.2]", descriptionClassName)}
                            tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
                            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-3", buttonContainerClassName)}
                            buttonClassName={buttonClassName}
                            buttonTextClassName={buttonTextClassName}
                            center={true}
                        />
                    </div>
                    <div className="absolute inset-0 w-full h-full z-0 rounded-theme-capped overflow-hidden">
                        <HeroBackgrounds {...background} />
                    </div>
                </div>
            </div>
        </section>
    );
};

ContactCTA.displayName = "ContactCTA";

export default ContactCTA;
