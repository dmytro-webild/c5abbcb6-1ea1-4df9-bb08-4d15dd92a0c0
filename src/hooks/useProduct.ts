"use client";

import { useEffect, useState } from "react";
import { Product, fetchProduct } from "@/lib/api/product";

export function useProduct(productId: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadProduct() {
            if (!productId) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const data = await fetchProduct(productId);
                if (isMounted) {
                    setProduct(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error("Failed to fetch product"));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadProduct();

        return () => {
            isMounted = false;
        };
    }, [productId]);

    return { product, isLoading, error };
}
