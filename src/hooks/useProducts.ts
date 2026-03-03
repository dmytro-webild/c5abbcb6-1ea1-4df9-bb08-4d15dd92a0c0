"use client";

import { useEffect, useState } from "react";
import { Product, fetchProducts } from "@/lib/api/product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProducts() {
            try {
                const data = await fetchProducts();
                if (isMounted) {
                    setProducts(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error("Failed to fetch products"));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return { products, isLoading, error };
}
