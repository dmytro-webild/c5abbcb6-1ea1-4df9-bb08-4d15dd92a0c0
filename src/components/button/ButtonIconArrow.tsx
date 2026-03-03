"use client";

import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonIconArrowProps {
    text: string;
    onClick?: () => void;
    href?: string;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    disabled?: boolean;
    ariaLabel?: string;
    type?: "button" | "submit" | "reset";
    scrollToSection?: boolean;
}

const ButtonIconArrow = ({
    text,
    onClick,
    href,
    className = "",
    textClassName = "",
    iconClassName = "",
    disabled = false,
    ariaLabel,
    type = "button",
    scrollToSection,
}: ButtonIconArrowProps) => {
    const handleClick = useButtonClick(href, onClick, scrollToSection);

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            data-href={href}
            aria-label={ariaLabel || text}
            className={cls(
                "relative group cursor-pointer h-9 min-w-0 w-fit max-w-full primary-button rounded-theme px-6 text-sm text-primary-cta-text flex items-center gap-3",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            <span className={cls(
                "block overflow-hidden truncate whitespace-nowrap md:transition-transform md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:[transform:translateX(calc(var(--height-9)/4))]",
                textClassName
            )}>
                {text}
            </span>
            <div className={cls(
                "h-5 w-[var(--height-5)] aspect-square rounded-theme flex items-center justify-center md:transition-transform md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:scale-[0.2] md:group-hover:rotate-90",
                iconClassName || "secondary-button text-secondary-cta-text"
            )}>
                <ArrowRight className="h-1/2 w-1/2 md:transition-opacity md:duration-[600ms] md:[transition-timing-function:cubic-bezier(.25,.8,.25,1)] md:group-hover:opacity-0" />
            </div>
        </button>
    );
};

ButtonIconArrow.displayName = "ButtonIconArrow";

export default memo(ButtonIconArrow);