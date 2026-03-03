"use client";

import React, { memo, useState } from "react";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

interface FormField {
    name: string;
    type?: string;
    placeholder?: string;
    ariaLabel?: string;
    required?: boolean;
}

interface WaitlistFormProps {
    fields?: FormField[];
    buttonText?: string;
    onSubmit?: (data: Record<string, string>) => void;
    className?: string;
    inputsContainerClassName?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const WaitlistForm = ({
    fields = [
        { name: "email", type: "email", placeholder: "Your email", ariaLabel: "Email address", required: true },
        { name: "username", type: "text", placeholder: "Telegram username", ariaLabel: "Username", required: true }
    ],
    buttonText = "Join waitlist",
    onSubmit,
    className = "",
    inputsContainerClassName = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: WaitlistFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
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

    return (
        <form onSubmit={handleSubmit} className={cls("relative z-1 flex flex-col gap-3 w-full", className)}>
            <div className={cls("flex flex-col md:flex-row gap-3", inputsContainerClassName)}>
                {fields.map((field) => (
                    <Input
                        key={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder || ""}
                        value={formData[field.name] || ""}
                        onChange={(value) => handleInputChange(field.name, value)}
                        required={field.required !== false}
                        ariaLabel={field.ariaLabel || field.placeholder}
                        className={cls("w-full", inputClassName)}
                    />
                ))}
            </div>
            <Button
                {...getButtonProps(
                    { text: buttonText, props: getButtonConfigProps() },
                    0,
                    theme.defaultButtonVariant,
                    cls("w-full", buttonClassName),
                    buttonTextClassName
                )}
            />
        </form>
    );
};

WaitlistForm.displayName = "WaitlistForm";

export default memo(WaitlistForm);
