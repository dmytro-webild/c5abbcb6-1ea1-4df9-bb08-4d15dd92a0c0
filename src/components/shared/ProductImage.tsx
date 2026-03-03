"use client";

import { memo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FavoriteButton from "@/components/shared/FavoriteButton";
import { cls } from "@/lib/utils";

interface ProductImageProps {
    imageSrc: string;
    imageAlt: string;
    isFavorited?: boolean;
    onFavoriteToggle?: () => void;
    showActionButton?: boolean;
    actionButtonAriaLabel?: string;
    onActionClick?: () => void;
    className?: string;
    imageClassName?: string;
    actionButtonClassName?: string;
}

const ProductImage = memo(({
    imageSrc,
    imageAlt,
    isFavorited = false,
    onFavoriteToggle,
    showActionButton = false,
    actionButtonAriaLabel = "View details",
    onActionClick,
    className = "",
    imageClassName = "",
    actionButtonClassName = "",
}: ProductImageProps) => {
    return (
        <div className={cls("relative w-full h-full rounded-theme-capped overflow-hidden card", className)}>
            <div className="relative z-1 w-full h-full overflow-hidden rounded-theme-capped">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className={cls("w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105", imageClassName)}
                    unoptimized={imageSrc.startsWith('http') || imageSrc.startsWith('//')}
                    aria-hidden={imageAlt === ""}
                />
            </div>

            <FavoriteButton
                initialFavorited={isFavorited}
                onToggle={onFavoriteToggle}
            />

            {showActionButton && (
                <button
                    className={cls("absolute! z-2 top-3 right-3 cursor-pointer card backdrop-blur-lg h-8 w-auto aspect-square rounded-theme flex items-center justify-center", actionButtonClassName)}
                    aria-label={actionButtonAriaLabel}
                    type="button"
                    onClick={onActionClick}
                >
                    <ArrowUpRight className="h-4/10 text-foreground transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
                </button>
            )}
        </div>
    );
});

ProductImage.displayName = "ProductImage";

export default ProductImage;
