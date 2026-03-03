"use client";

import { memo } from "react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { LucideIcon } from "lucide-react";

interface TagProps {
    text: string;
    icon?: LucideIcon;
    useInvertedBackground?: boolean;
    className?: string;
    textClassName?: string;
}

const Tag = memo(({
    text,
    icon: Icon,
    useInvertedBackground,
    className = "",
    textClassName = "",
}: TagProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <div className={cls(
            "relative z-1 px-3 py-1 text-sm rounded-theme card inline-flex items-center gap-2 w-fit",
            className
        )}>
            {Icon && <Icon className={cls("relative z-1 h-[1em] w-auto", shouldUseLightText ? "text-background" : "text-foreground")} />}
            <span className={cls(shouldUseLightText ? "text-background" : "text-foreground", textClassName)}>{text}</span>
        </div>
    );
});

Tag.displayName = "Tag";

export default Tag;
