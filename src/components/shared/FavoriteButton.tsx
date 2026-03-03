"use client";

import { memo, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { cls } from "@/lib/utils";

interface FavoriteButtonProps {
    initialFavorited?: boolean;
    onToggle?: () => void;
    className?: string;
}

const FavoriteButton = memo(({
    initialFavorited = false,
    onToggle,
    className = "",
}: FavoriteButtonProps) => {
    const [isFavorited, setIsFavorited] = useState(initialFavorited);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorited(prev => !prev);
        onToggle?.();
    }, [onToggle]);

    return (
        <button
            onClick={handleClick}
            className={cls(
                "absolute cursor-pointer top-4 right-4 card h-8 w-auto aspect-square rounded-theme flex items-center justify-center z-10",
                className
            )}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            type="button"
        >
            <div className="relative z-1 w-full h-full flex items-center justify-center">
                <Heart
                    className={cls(
                        "h-4/10 text-foreground transition-all duration-300",
                        isFavorited ? "opacity-0 blur-xs" : "opacity-100 blur-0"
                    )}
                    fill="none"
                    strokeWidth={1.5}
                />
                <Heart
                    className={cls(
                        "h-4/10 text-accent absolute transition-all duration-300",
                        isFavorited ? "opacity-100 blur-0" : "opacity-0 blur-xs"
                    )}
                    fill="currentColor"
                    strokeWidth={0}
                />
            </div>
        </button>
    );
});

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;
