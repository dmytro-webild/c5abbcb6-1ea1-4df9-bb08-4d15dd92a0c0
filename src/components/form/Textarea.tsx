"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

interface TextareaProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    required?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    className?: string;
}

const Textarea = ({
    placeholder = "",
    value,
    onChange,
    rows = 5,
    required = false,
    disabled = false,
    ariaLabel,
    className = "",
}: TextareaProps) => {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            required={required}
            disabled={disabled}
            aria-label={ariaLabel || placeholder}
            className={cls(
                "relative z-1 px-4 py-3 secondary-button rounded-theme-capped text-base text-secondary-cta-text placeholder:text-secondary-cta-text/75 focus:outline-none resize-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        />
    );
};

Textarea.displayName = "Textarea";

export default memo(Textarea);
