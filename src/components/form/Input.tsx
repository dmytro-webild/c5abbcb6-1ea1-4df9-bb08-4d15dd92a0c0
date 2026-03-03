"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

interface InputProps {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
}

const Input = ({
    type = "text",
    placeholder = "",
    value,
    onChange,
    required = false,
    disabled = false,
    ariaLabel,
    className = "",
}: InputProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            aria-label={ariaLabel || placeholder}
            className={cls(
                "relative z-1 px-4 py-3 secondary-button rounded-theme text-base text-secondary-cta-text placeholder:text-secondary-cta-text/75 focus:outline-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        />
    );
};

Input.displayName = "Input";

export default memo(Input);
