"use client";

import { memo } from "react";
import Textbox from "@/components/Textbox";
import Button from "@/components/button/Button";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonClick } from "@/components/button/useButtonClick";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

type TitleSegment =
    | { type: "text"; content: string }
    | { type: "image"; src: string; alt?: string };

type HeroPersonalLinksBackgroundProps = Extract<
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

interface SocialLink {
    icon: LucideIcon;
    label: string;
    href: string;
}

interface LinkCard {
    icon?: LucideIcon;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    imageClassName?: string;
    title: string;
    description: string;
    button: ButtonConfig;
}

interface HeroPersonalLinksProps {
    background: HeroPersonalLinksBackgroundProps;
    title: string;
    titleSegments?: TitleSegment[];
    socialLinks?: SocialLink[];
    linkCards: LinkCard[];
    buttonAnimation?: ButtonAnimationType;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textboxClassName?: string;
    titleClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    socialLinksClassName?: string;
    socialLinkClassName?: string;
    linkCardsClassName?: string;
    linkCardClassName?: string;
    linkCardIconClassName?: string;
    linkCardTitleClassName?: string;
    linkCardDescriptionClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const SocialLinkButton = ({ social, className }: { social: SocialLink; className?: string }) => {
    const handleClick = useButtonClick(social.href);
    const Icon = social.icon;

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cls(
                "flex items-center gap-2 px-4 py-2 rounded-theme card text-sm text-foreground hover:opacity-80 transition-opacity duration-300 ease-out cursor-pointer",
                className
            )}
        >
            <Icon className="h-[1em] w-auto aspect-square" />
            <span>{social.label}</span>
        </button>
    );
};

const HeroPersonalLinks = ({
    background,
    title,
    titleSegments,
    socialLinks,
    linkCards,
    buttonAnimation = "none",
    ariaLabel = "Personal links section",
    className = "",
    containerClassName = "",
    textboxClassName = "",
    titleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    socialLinksClassName = "",
    socialLinkClassName = "",
    linkCardsClassName = "",
    linkCardClassName = "",
    linkCardIconClassName = "",
    linkCardTitleClassName = "",
    linkCardDescriptionClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: HeroPersonalLinksProps) => {
    const theme = useTheme();
    const { containerRef: buttonContainerRef } = useButtonAnimation({ animationType: buttonAnimation });

    return (
        <section
            aria-label={ariaLabel}
            className={cls("relative w-full min-h-screen flex items-center justify-center py-20", className)}
        >
            <HeroBackgrounds {...background} />
            <div className={cls("w-content-width md:w-35 mx-auto flex flex-col items-center gap-8 relative z-10", containerClassName)}>
                <Textbox
                    title={title}
                    titleSegments={titleSegments}
                    description=""
                    textboxLayout="inline-image"
                    center
                    className={textboxClassName}
                    titleClassName={titleClassName}
                    titleImageWrapperClassName={titleImageWrapperClassName}
                    titleImageClassName={titleImageClassName}
                />

                {socialLinks && socialLinks.length > 0 && (
                    <div className={cls("flex flex-wrap justify-center gap-3", socialLinksClassName)}>
                        {socialLinks.map((social, index) => (
                            <SocialLinkButton
                                key={index}
                                social={social}
                                className={socialLinkClassName}
                            />
                        ))}
                    </div>
                )}

                <div ref={buttonContainerRef} className={cls("w-full flex flex-col gap-4 mt-4", linkCardsClassName)}>
                    {linkCards.map((card, index) => (
                        <div
                            key={index}
                            className={cls("w-full card rounded-theme-capped p-5 flex items-center gap-5", linkCardClassName)}
                        >
                            <div className={cls("relative h-10 w-auto aspect-square card shadow rounded-theme flex items-center justify-center flex-shrink-0 overflow-hidden", linkCardIconClassName)}>
                                {card.videoSrc ? (
                                    <MediaContent
                                        videoSrc={card.videoSrc}
                                        videoAriaLabel={card.videoAriaLabel}
                                        imageClassName={cls("w-full h-full object-cover", card.imageClassName)}
                                    />
                                ) : card.imageSrc ? (
                                    <MediaContent
                                        imageSrc={card.imageSrc}
                                        imageAlt={card.imageAlt}
                                        imageClassName={cls("w-full h-full object-cover", card.imageClassName)}
                                    />
                                ) : card.icon ? (
                                    <card.icon className="h-4/10 w-4/10 text-foreground" strokeWidth={1.5} />
                                ) : null}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className={cls("font-medium text-foreground", linkCardTitleClassName)}>{card.title}</h3>
                                <p className={cls("text-sm text-foreground/60 truncate", linkCardDescriptionClassName)}>{card.description}</p>
                            </div>

                            <Button
                                {...getButtonProps(card.button, 0, theme.defaultButtonVariant, buttonClassName, buttonTextClassName)}
                                className={cls("flex-shrink-0", buttonClassName)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

HeroPersonalLinks.displayName = "HeroPersonalLinks";

export default memo(HeroPersonalLinks);
