"use client";

import { memo } from "react";
import { Star } from "lucide-react";
import ProductImage from "@/components/shared/ProductImage";
import { cls } from "@/lib/utils";

export interface CatalogProduct {
    id: string;
    category?: string;
    name: string;
    price: string;
    rating: number;
    reviewCount?: string;
    imageSrc: string;
    imageAlt?: string;
    onProductClick?: () => void;
    onFavorite?: () => void;
    isFavorited?: boolean;
}

interface ProductCatalogItemProps {
    product: CatalogProduct;
    className?: string;
    imageClassName?: string;
    categoryClassName?: string;
    nameClassName?: string;
    priceClassName?: string;
    ratingClassName?: string;
}

const ProductCatalogItem = ({
    product,
    className = "",
    imageClassName = "",
    categoryClassName = "",
    nameClassName = "",
    priceClassName = "",
    ratingClassName = "",
}: ProductCatalogItemProps) => {
    return (
        <article
            className={cls(
                "card group relative h-full flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped",
                className
            )}
            onClick={product.onProductClick}
            role="article"
            aria-label={`${product.category ? `${product.category} ` : ""}${product.name} - ${product.price}`}
        >
            <ProductImage
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || `${product.category} ${product.name}`}
                isFavorited={product.isFavorited}
                onFavoriteToggle={product.onFavorite}
                showActionButton={true}
                className="h-70 2xl:h-80"
                actionButtonAriaLabel={`View ${product.name} details`}
                onActionClick={product.onProductClick}
                imageClassName={imageClassName}
            />

            <div className="relative z-1 flex-1 min-w-0 flex flex-col gap-2">
                {product.category && (
                    <p className={cls("text-sm leading-tight text-foreground", categoryClassName)}>
                        {product.category}
                    </p>
                )}
                <div className="flex flex-col gap-1">
                    <h3
                        className={cls(
                            "text-xl font-medium truncate leading-tight text-foreground",
                            nameClassName
                        )}
                    >
                        {product.name}
                    </h3>
                    <div className={cls("flex items-center gap-2", ratingClassName)}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cls(
                                        "h-(--text-xl) w-auto",
                                        i < Math.floor(product.rating)
                                            ? "text-accent fill-accent"
                                            : "text-accent opacity-20"
                                    )}
                                    strokeWidth={1.5}
                                />
                            ))}
                        </div>
                        {product.reviewCount && (
                            <span className="text-sm leading-tight text-foreground">
                                ({product.reviewCount})
                            </span>
                        )}
                    </div>
                </div>
                <p
                    className={cls(
                        "text-2xl font-medium leading-tight text-foreground",
                        priceClassName
                    )}
                >
                    {product.price}
                </p>
            </div>
        </article>
    );
};

ProductCatalogItem.displayName = "ProductCatalogItem";

export default memo(ProductCatalogItem);
