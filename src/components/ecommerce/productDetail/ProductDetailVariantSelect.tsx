"use client";

import { memo } from "react";
import { ChevronDown } from "lucide-react";
import { cls } from "@/lib/utils";
import type { ProductVariant } from "./ProductDetailCard";

interface ProductDetailVariantSelectProps {
    variant: ProductVariant;
    selectClassName?: string;
    labelClassName?: string;
}

const ProductDetailVariantSelect = ({
    variant,
    selectClassName = "",
    labelClassName = "",
}: ProductDetailVariantSelectProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                className={cls(
                    "text-sm font-medium text-foreground",
                    labelClassName
                )}
            >
                {variant.label}:
            </label>
            <div className="relative secondary-button rounded-theme h-9">
                <select
                    value={variant.selected}
                    onChange={(e) => variant.onChange(e.target.value)}
                    aria-label={variant.label}
                    className={cls(
                        "relative z-1 w-full h-full px-4 text-sm text-foreground focus:outline-none appearance-none cursor-pointer",
                        selectClassName
                    )}
                >
                    {variant.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-(--text-sm) w-auto text-foreground pointer-events-none" />
            </div>
        </div>
    );
};

ProductDetailVariantSelect.displayName = "ProductDetailVariantSelect";

export default memo(ProductDetailVariantSelect);
