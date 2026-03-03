"use client";

import ContactForm from "@/components/form/ContactForm";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import { LucideIcon } from "lucide-react";
import { sendContactEmail } from "@/utils/sendContactEmail";
import type { ButtonAnimationType } from "@/types/button";

type ContactSplitBackgroundProps = Extract<
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

interface ContactSplitProps {
    title: string;
    description: string;
    tag: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    background: ContactSplitBackgroundProps;
    useInvertedBackground: boolean;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    mediaPosition?: "left" | "right";
    mediaAnimation: ButtonAnimationType;
    inputPlaceholder?: string;
    buttonText?: string;
    termsText?: string;
    onSubmit?: (email: string) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    contactFormClassName?: string;
    tagClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    formWrapperClassName?: string;
    formClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    termsClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
}

const ContactSplit = ({
    title,
    description,
    tag,
    tagIcon,
    tagAnimation,
    background,
    useInvertedBackground,
    imageSrc,
    videoSrc,
    imageAlt = "",
    videoAriaLabel = "Contact section video",
    mediaPosition = "right",
    mediaAnimation,
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    termsText = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    contactFormClassName = "",
    tagClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    formWrapperClassName = "",
    formClassName = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    termsClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
}: ContactSplitProps) => {
    const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

    const handleSubmit = async (email: string) => {
        try {
            await sendContactEmail({ email });
            console.log("Email send successfully");
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    };

    const contactContent = (
        <div className="relative card rounded-theme-capped p-6 py-15 md:py-6 flex items-center justify-center">
            <ContactForm
                tag={tag}
                tagIcon={tagIcon}
                tagAnimation={tagAnimation}
                title={title}
                description={description}
                useInvertedBackground={useInvertedBackground}
                inputPlaceholder={inputPlaceholder}
                buttonText={buttonText}
                termsText={termsText}
                onSubmit={handleSubmit}
                centered={true}
                className={cls("w-full", contactFormClassName)}
                tagClassName={tagClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                formWrapperClassName={cls("w-full md:w-8/10 2xl:w-7/10", formWrapperClassName)}
                formClassName={formClassName}
                inputClassName={inputClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                termsClassName={termsClassName}
            />
            <div className="absolute inset w-full h-full z-0 rounded-theme-capped overflow-hidden" >
                <HeroBackgrounds {...background} />
            </div>
        </div>
    );

    const mediaContent = (
        <div ref={mediaContainerRef} className={cls("overflow-hidden rounded-theme-capped card h-130", mediaWrapperClassName)}>
            <MediaContent
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                imageAlt={imageAlt}
                videoAriaLabel={videoAriaLabel}
                imageClassName={cls("relative z-1 w-full h-full object-cover", mediaClassName)}
            />
        </div>
    );

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
                <div className={cls("grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr", contentClassName)}>
                    {mediaPosition === "left" && mediaContent}
                    {contactContent}
                    {mediaPosition === "right" && mediaContent}
                </div>
            </div>
        </section>
    );
};

ContactSplit.displayName = "ContactSplit";

export default ContactSplit;
