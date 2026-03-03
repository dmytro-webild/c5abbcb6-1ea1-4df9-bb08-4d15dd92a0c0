"use client";

import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { cls } from "@/lib/utils";

interface OverlayArrowButtonProps {
    ariaLabel?: string;
    className?: string;
}

const OverlayArrowButton = memo(({
    ariaLabel = "View details",
    className = "",
}: OverlayArrowButtonProps) => {
    return (
        <div
            className={cls(
                "!absolute z-1 top-4 right-4 cursor-pointer card h-8 w-auto aspect-square rounded-theme flex items-center justify-center flex-shrink-0",
                className
            )}
            aria-label={ariaLabel}
        >
            <ArrowUpRight className="relative z-1 h-4/10 text-foreground transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
        </div>
    );
});

OverlayArrowButton.displayName = "OverlayArrowButton";

export default OverlayArrowButton;
