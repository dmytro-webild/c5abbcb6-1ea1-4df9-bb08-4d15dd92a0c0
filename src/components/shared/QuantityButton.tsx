"use client";

import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface QuantityButtonProps {
    onClick: (e: React.MouseEvent) => void;
    ariaLabel: string;
    Icon: LucideIcon;
}

const QuantityButton = memo(({ onClick, ariaLabel, Icon }: QuantityButtonProps) => (
    <button
        onClick={onClick}
        className="secondary-button h-8 aspect-square rounded-theme flex items-center justify-center cursor-pointer"
        aria-label={ariaLabel}
        type="button"
    >
        <Icon className="relative h-4/10 text-secondary-cta-text" strokeWidth={1.5} />
    </button>
));

QuantityButton.displayName = "QuantityButton";

export default QuantityButton;
