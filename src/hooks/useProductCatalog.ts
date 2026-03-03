"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "./useProducts";
import type { Product } from "@/lib/api/product";
import type { CatalogProduct } from "@/components/ecommerce/productCatalog/ProductCatalogItem";
import type { ProductVariant } from "@/components/ecommerce/productDetail/ProductDetailCard";

export type SortOption = "Newest" | "Price: Low-High" | "Price: High-Low";

interface UseProductCatalogOptions {
    basePath?: string;
}

export function useProductCatalog(options: UseProductCatalogOptions = {}) {
    const { basePath = "/shop" } = options;
    const router = useRouter();
    const { products: fetchedProducts, isLoading } = useProducts();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState<SortOption>("Newest");

    const handleProductClick = useCallback((productId: string) => {
        router.push(`${basePath}/${productId}`);
    }, [router, basePath]);

    const catalogProducts: CatalogProduct[] = useMemo(() => {
        if (fetchedProducts.length === 0) return [];

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
    }, [fetchedProducts, handleProductClick]);

    const categories = useMemo(() => {
        const categorySet = new Set<string>();
        catalogProducts.forEach((product) => {
            if (product.category) {
                categorySet.add(product.category);
            }
        });
        return Array.from(categorySet).sort();
    }, [catalogProducts]);

    const filteredProducts = useMemo(() => {
        let result = catalogProducts;

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.category?.toLowerCase().includes(q) ?? false)
            );
        }

        if (category !== "All") {
            result = result.filter((p) => p.category === category);
        }

        if (sort === "Price: Low-High") {
            result = [...result].sort(
                (a, b) =>
                    parseFloat(a.price.replace("$", "").replace(",", "")) -
                    parseFloat(b.price.replace("$", "").replace(",", ""))
            );
        } else if (sort === "Price: High-Low") {
            result = [...result].sort(
                (a, b) =>
                    parseFloat(b.price.replace("$", "").replace(",", "")) -
                    parseFloat(a.price.replace("$", "").replace(",", ""))
            );
        }

        return result;
    }, [catalogProducts, search, category, sort]);

    const filters: ProductVariant[] = useMemo(() => [
        {
            label: "Category",
            options: ["All", ...categories],
            selected: category,
            onChange: setCategory,
        },
        {
            label: "Sort",
            options: ["Newest", "Price: Low-High", "Price: High-Low"] as SortOption[],
            selected: sort,
            onChange: (value) => setSort(value as SortOption),
        },
    ], [categories, category, sort]);

    return {
        products: filteredProducts,
        isLoading,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        filters,
        categories,
    };
}
