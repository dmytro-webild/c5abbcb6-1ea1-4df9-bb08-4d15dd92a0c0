"use client";

import { memo, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";
import ProductDetailVariantSelect from "@/components/ecommerce/productDetail/ProductDetailVariantSelect";
import type { ProductVariant } from "@/components/ecommerce/productDetail/ProductDetailCard";
import { cls } from "@/lib/utils";
import { useProducts } from "@/hooks/useProducts";
import ProductCatalogItem from "./ProductCatalogItem";
import type { CatalogProduct } from "./ProductCatalogItem";

interface ProductCatalogProps {
    layout: "page" | "section";
    products?: CatalogProduct[];
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filters?: ProductVariant[];
    emptyMessage?: string;
    className?: string;
    gridClassName?: string;
    cardClassName?: string;
    imageClassName?: string;
    searchClassName?: string;
    filterClassName?: string;
    toolbarClassName?: string;
}

const ProductCatalog = ({
    layout,
    products: productsProp,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search products...",
    filters,
    emptyMessage = "No products found",
    className = "",
    gridClassName = "",
    cardClassName = "",
    imageClassName = "",
    searchClassName = "",
    filterClassName = "",
    toolbarClassName = "",
}: ProductCatalogProps) => {
    const router = useRouter();
    const { products: fetchedProducts, isLoading } = useProducts();

    const handleProductClick = useCallback((productId: string) => {
        router.push(`/shop/${productId}`);
    }, [router]);

    const products: CatalogProduct[] = useMemo(() => {
        if (productsProp && productsProp.length > 0) {
            return productsProp;
        }

        if (fetchedProducts.length === 0) {
            return [];
        }

        return fetchedProducts.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc: product.imageSrc,
            imageAlt: product.imageAlt || product.name,
            rating: product.rating || 0,
            reviewCount: product.reviewCount,
            category: product.brand,
            onProductClick: () => handleProductClick(product.id),
        }));
    }, [productsProp, fetchedProducts, handleProductClick]);

    if (isLoading && (!productsProp || productsProp.length === 0)) {
        return (
            <section
                className={cls(
                    "relative w-content-width mx-auto",
                    layout === "page" ? "pt-hero-page-padding pb-20" : "py-20",
                    className
                )}
            >
                <p className="text-sm text-foreground/50 text-center py-20">
                    Loading products...
                </p>
            </section>
        );
    }

    return (
        <section
            className={cls(
                "relative w-content-width mx-auto",
                layout === "page" ? "pt-hero-page-padding pb-20" : "py-20",
                className
            )}
        >
            {(onSearchChange || (filters && filters.length > 0)) && (
                <div
                    className={cls(
                        "flex flex-col md:flex-row gap-4 md:items-end mb-6",
                        toolbarClassName
                    )}
                >
                    {onSearchChange && (
                        <Input
                            value={searchValue}
                            onChange={onSearchChange}
                            placeholder={searchPlaceholder}
                            ariaLabel={searchPlaceholder}
                            className={cls("flex-1 w-full h-9 text-sm", searchClassName)}
                        />
                    )}
                    {filters && filters.length > 0 && (
                        <div className="flex gap-4 items-end">
                            {filters.map((filter) => (
                                <ProductDetailVariantSelect
                                    key={filter.label}
                                    variant={filter}
                                    selectClassName={filterClassName}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {products.length === 0 ? (
                <p className="text-sm text-foreground/50 text-center py-20">
                    {emptyMessage}
                </p>
            ) : (
                <div
                    className={cls(
                        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                        gridClassName
                    )}
                >
                    {products.map((product) => (
                        <ProductCatalogItem
                            key={product.id}
                            product={product}
                            className={cardClassName}
                            imageClassName={imageClassName}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

ProductCatalog.displayName = "ProductCatalog";

export default memo(ProductCatalog);