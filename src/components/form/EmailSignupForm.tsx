"use client";

import { memo, useState } from "react";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

interface EmailSignupFormProps {
    inputPlaceholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void;
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

const EmailSignupForm = memo(({
    inputPlaceholder = "Enter your email",
    buttonText = "Sign Up",
    onSubmit,
    className = "",
    inputClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
}: EmailSignupFormProps) => {
    const theme = useTheme();
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(email);
            setEmail("");
        }
    };

    const getButtonConfigProps = () => {
        if (theme.defaultButtonVariant === "hover-bubble") {
            return { bgClassName: "w-full md:w-auto" };
        }
        if (theme.defaultButtonVariant === "icon-arrow") {
            return { className: "justify-between md:justify-center" };
        }
        return {};
    };

    return (
        <form onSubmit={handleSubmit} className={cls("relative z-1 flex flex-col md:flex-row gap-3 md:gap-1 w-full card rounded-theme-capped md:rounded-theme p-1", className)}>
            <input
                type="email"
                placeholder={inputPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cls(
                    "flex-1 px-4 text-base text-center md:text-left text-foreground placeholder:text-foreground/75 focus:outline-none focus:border-none truncate",
                    inputClassName
                )}
                aria-label="Email address"
            />
            <Button
                {...getButtonProps(
                    { text: buttonText, props: getButtonConfigProps() },
                    0,
                    theme.defaultButtonVariant,
                    cls("w-full md:w-auto", buttonClassName),
                    buttonTextClassName
                )}
                type="submit"
            />
        </form>
    );
});

EmailSignupForm.displayName = "EmailSignupForm";

export default EmailSignupForm;
