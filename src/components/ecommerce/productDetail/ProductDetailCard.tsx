"use client";

import { memo } from "react";
import { Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls } from "@/lib/utils";
import type { ButtonConfig } from "@/types/button";
import ProductDetailGallery from "./ProductDetailGallery";
import ProductDetailVariantSelect from "./ProductDetailVariantSelect";

export interface ProductVariant {
    label: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}

interface ProductDetailCardProps {
    layout: "page" | "section";
    name: string;
    price: string;
    salePrice?: string;
    showRating?: boolean;
    rating?: number;
    ratingIcon?: LucideIcon;
    description?: string;
    images: { src: string; alt: string }[];
    variants?: ProductVariant[];
    quantity?: ProductVariant;
    buttons: ButtonConfig[];
    ribbon?: string;
    inventoryStatus?: string;
    inventoryQuantity?: number;
    sku?: string;
    className?: string;
    imageContainerClassName?: string;
    infoContainerClassName?: string;
    nameClassName?: string;
    priceClassName?: string;
    descriptionClassName?: string;
    variantSelectClassName?: string;
    variantLabelClassName?: string;
    buttonClassName?: string;
}

const ProductDetailCard = ({
                               layout,
                               name,
                               price,
                               salePrice,
                               showRating = true,
                               rating = 0,
                               ratingIcon: RatingIcon = Star,
                               description,
                               images,
                               variants,
                               quantity,
                               buttons,
                               ribbon,
                               inventoryStatus,
                               inventoryQuantity,
                               sku,
                               className = "",
                               imageContainerClassName = "",
                               infoContainerClassName = "",
                               nameClassName = "",
                               priceClassName = "",
                               descriptionClassName = "",
                               variantSelectClassName = "",
                               variantLabelClassName = "",
                               buttonClassName = "",
                           }: ProductDetailCardProps) => {
    const theme = useTheme();

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
        <article
            className={cls(
                "relative w-content-width mx-auto",
                layout === "page" ? "pt-hero-page-padding pb-20" : "py-20",
                className
            )}
        >
            <div className="flex flex-col md:flex-row gap-6">
                <ProductDetailGallery
                    images={images}
                    className={cls("md:w-1/2", imageContainerClassName)}
                />

                <div
                    className={cls(
                        "w-full md:w-1/2 p-6 card rounded-theme-capped flex flex-col gap-6",
                        infoContainerClassName
                    )}
                >
                    <div className="flex items-start justify-between gap-4">
                        <h2
                            className={cls(
                                "text-2xl md:text-3xl font-medium text-foreground leading-tight flex-1",
                                nameClassName
                            )}
                        >
                            {name}
                        </h2>
                        {ribbon && (
                            <span className="px-3 py-1 text-sm font-medium rounded-theme bg-accent text-background whitespace-nowrap">
                                {ribbon}
                            </span>
                        )}
                    </div>
                    <div className="w-full h-px bg-background-accent" />
                    <div className="w-full flex items-center justify-between gap-6">
                        <div className="flex flex-col gap-1">
                            {salePrice ? (
                                <>
                                    <p
                                        className={cls(
                                            "text-xl md:text-2xl font-medium text-foreground/50 line-through leading-tight",
                                            priceClassName
                                        )}
                                    >
                                        {price}
                                    </p>
                                    <p
                                        className={cls(
                                            "text-xl md:text-2xl font-medium text-accent leading-tight",
                                            priceClassName
                                        )}
                                    >
                                        {salePrice}
                                    </p>
                                </>
                            ) : (
                                <p
                                    className={cls(
                                        "text-xl md:text-2xl font-medium text-foreground leading-tight",
                                        priceClassName
                                    )}
                                >
                                    {price}
                                </p>
                            )}
                        </div>
                        {showRating && (
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <RatingIcon
                                        key={i}
                                        className={cls(
                                            "h-(--text-xl) md:h-(--text-2xl) w-auto",
                                            i < Math.floor(rating)
                                                ? "text-accent fill-accent"
                                                : "text-accent opacity-20"
                                        )}
                                        strokeWidth={1.5}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {(inventoryStatus || inventoryQuantity !== undefined || sku) && (
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                            {inventoryStatus && (
                                <span className={cls(
                                    "px-2 py-1 rounded-theme",
                                    inventoryStatus === "in-stock" ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                                )}>
                                    {inventoryStatus === "in-stock" ? "In Stock" : inventoryStatus}
                                </span>
                            )}
                            {inventoryQuantity !== undefined && (
                                <span>
                                    {inventoryQuantity} available
                                </span>
                            )}
                            {sku && (
                                <span>
                                    SKU: {sku}
                                </span>
                            )}
                        </div>
                    )}
                    {description && (
                        <p
                            className={cls(
                                "text-sm md:text-base text-foreground/75 leading-tight",
                                descriptionClassName
                            )}
                        >
                            {description}
                        </p>
                    )}
                    {variants && variants.length > 0 && (
                        <div className="flex flex-wrap gap-6">
                            {variants.map((variant, index) => (
                                <div
                                    key={variant.label}
                                    className={cls(
                                        "min-w-0",
                                        variants.length === 1 || (variants.length % 2 !== 0 && index === variants.length - 1)
                                            ? "w-full"
                                            : "flex-1"
                                    )}
                                >
                                    <ProductDetailVariantSelect
                                        variant={variant}
                                        selectClassName={variantSelectClassName}
                                        labelClassName={variantLabelClassName}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {quantity && (
                        <ProductDetailVariantSelect
                            variant={quantity}
                            selectClassName={variantSelectClassName}
                            labelClassName={variantLabelClassName}
                        />
                    )}

                    <div className="flex flex-col gap-3 mt-auto pt-6">
                        {buttons.slice(0, 2).map((button, index) => (
                            <Button
                                key={`${button.text}-${index}`}
                                {...getButtonProps(
                                    { ...button, props: { ...button.props, ...getButtonConfigProps() } },
                                    index,
                                    theme.defaultButtonVariant,
                                    cls("w-full", buttonClassName)
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
};

ProductDetailCard.displayName = "ProductDetailCard";

export default memo(ProductDetailCard);
