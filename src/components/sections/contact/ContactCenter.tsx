"use client";

import ContactForm from "@/components/form/ContactForm";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { sendContactEmail } from "@/utils/sendContactEmail";
import type { ButtonAnimationType } from "@/types/button";

type ContactCenterBackgroundProps = Extract<
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

interface ContactCenterProps {
    title: string;
    description: string;
    tag: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    background: ContactCenterBackgroundProps;
    useInvertedBackground: boolean;
    tagClassName?: string;
    inputPlaceholder?: string;
    buttonText?: string;
    termsText?: string;
    onSubmit?: (email: string) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    formWrapperClassName?: string;
    formClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    termsClassName?: string;
}

const ContactCenter = ({
    title,
    description,
    tag,
    tagIcon,
    tagAnimation,
    background,
    useInvertedBackground,
    tagClassName = "",
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    termsText = "By clicking Sign Up you're confirming that you agree with our Terms and Conditions.",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    formWrapperClassName = "",
    formClassName = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    termsClassName = "",
}: ContactCenterProps) => {

    const handleSubmit = async (email: string) => {
        try {
            await sendContactEmail({ email });
            console.log("Email send successfully");
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    };

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
                <div className={cls("relative w-full card p-6 md:p-0 py-20 md:py-20 rounded-theme-capped flex items-center justify-center", contentClassName)}>
                    <div className="relative z-10 w-full md:w-1/2">
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
                            tagClassName={tagClassName}
                            titleClassName={titleClassName}
                            descriptionClassName={descriptionClassName}
                            formWrapperClassName={cls("md:w-8/10 2xl:w-6/10", formWrapperClassName)}
                            formClassName={formClassName}
                            inputClassName={inputClassName}
                            buttonClassName={buttonClassName}
                            buttonTextClassName={buttonTextClassName}
                            termsClassName={termsClassName}
                        />
                    </div>
                    <div className="absolute inset w-full h-full z-0 rounded-theme-capped overflow-hidden" >
                        <HeroBackgrounds {...background} />
                    </div>
                </div>
            </div>
        </section>
    );
};

ContactCenter.displayName = "ContactCenter";

export default ContactCenter;
