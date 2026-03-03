"use client";

import { useState } from "react";
import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import MediaContent from "@/components/shared/MediaContent";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import { getButtonProps } from "@/lib/buttonUtils";
import type { AnimationType } from "@/components/text/types";
import type { ButtonAnimationType } from "@/types/button";
import {sendContactEmail} from "@/utils/sendContactEmail";

export interface InputField {
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    className?: string;
}

export interface TextareaField {
    name: string;
    placeholder: string;
    rows?: number;
    required?: boolean;
    className?: string;
}

interface ContactSplitFormProps {
    title: string;
    description: string;
    inputs: InputField[];
    textarea?: TextareaField;
    useInvertedBackground: boolean;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    mediaPosition?: "left" | "right";
    mediaAnimation: ButtonAnimationType;
    buttonText?: string;
    onSubmit?: (data: Record<string, string>) => void;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    contentClassName?: string;
    formCardClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    mediaWrapperClassName?: string;
    mediaClassName?: string;
}

const ContactSplitForm = ({
    title,
    description,
    inputs,
    textarea,
    useInvertedBackground,
    imageSrc,
    videoSrc,
    imageAlt = "",
    videoAriaLabel = "Contact section video",
    mediaPosition = "right",
    mediaAnimation,
    buttonText = "Submit",
    onSubmit,
    ariaLabel = "Contact section",
    className = "",
    containerClassName = "",
    contentClassName = "",
    formCardClassName = "",
    titleClassName = "",
    descriptionClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    mediaWrapperClassName = "",
    mediaClassName = "",
}: ContactSplitFormProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

    // Validate minimum inputs requirement
    if (inputs.length < 2) {
        throw new Error("ContactSplitForm requires at least 2 inputs");
    }

    // Initialize form data dynamically
    const initialFormData: Record<string, string> = {};
    inputs.forEach(input => {
        initialFormData[input.name] = "";
    });
    if (textarea) {
        initialFormData[textarea.name] = "";
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendContactEmail({ formData });
            console.log("Email send successfully");
            setFormData(initialFormData);
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    };

    const getButtonConfigProps = () => {
        if (theme.defaultButtonVariant === "hover-bubble") {
            return { bgClassName: "w-full" };
        }
        if (theme.defaultButtonVariant === "icon-arrow") {
            return { className: "justify-between" };
        }
        return {};
    };

    const formContent = (
        <div className={cls("card rounded-theme-capped p-6 md:p-10 flex items-center justify-center", formCardClassName)}>
            <form onSubmit={handleSubmit} className="relative z-1 w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-0 text-center">
                    <TextAnimation
                        type={theme.defaultTextAnimation as AnimationType}
                        text={title}
                        variant="trigger"
                        className={cls("text-4xl font-medium leading-[1.175] text-balance", shouldUseLightText ? "text-background" : "text-foreground", titleClassName)}
                    />

                    <TextAnimation
                        type={theme.defaultTextAnimation as AnimationType}
                        text={description}
                        variant="words-trigger"
                        className={cls("text-base leading-[1.15] text-balance", shouldUseLightText ? "text-background" : "text-foreground", descriptionClassName)}
                    />
                </div>

                <div className="w-full flex flex-col gap-4">
                    {inputs.map((input) => (
                        <Input
                            key={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={formData[input.name] || ""}
                            onChange={(value) => setFormData({ ...formData, [input.name]: value })}
                            required={input.required}
                            ariaLabel={input.placeholder}
                            className={input.className}
                        />
                    ))}

                    {textarea && (
                        <Textarea
                            placeholder={textarea.placeholder}
                            value={formData[textarea.name] || ""}
                            onChange={(value) => setFormData({ ...formData, [textarea.name]: value })}
                            required={textarea.required}
                            rows={textarea.rows || 5}
                            ariaLabel={textarea.placeholder}
                            className={textarea.className}
                        />
                    )}

                    <Button
                        {...getButtonProps(
                            { text: buttonText, props: getButtonConfigProps() },
                            0,
                            theme.defaultButtonVariant,
                            cls("w-full", buttonClassName),
                            cls("text-base", buttonTextClassName)
                        )}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );

    const mediaContent = (
        <div ref={mediaContainerRef} className={cls("overflow-hidden rounded-theme-capped card md:relative md:h-full", mediaWrapperClassName)}>
            <MediaContent
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                imageAlt={imageAlt}
                videoAriaLabel={videoAriaLabel}
                imageClassName={cls("w-full md:absolute md:inset-0 md:h-full object-cover", mediaClassName)}
            />
        </div>
    );

    return (
        <section aria-label={ariaLabel} className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}>
            <div className={cls("w-content-width mx-auto", containerClassName)}>
                <div className={cls("grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr", contentClassName)}>
                    {mediaPosition === "left" && mediaContent}
                    {formContent}
                    {mediaPosition === "right" && mediaContent}
                </div>
            </div>
        </section>
    );
};

ContactSplitForm.displayName = "ContactSplitForm";

export default ContactSplitForm;
