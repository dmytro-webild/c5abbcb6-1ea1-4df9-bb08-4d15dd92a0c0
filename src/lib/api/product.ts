export type Product = {
    id: string;
    name: string;
    price: string;
    imageSrc: string;
    imageAlt?: string;
    images?: string[];
    brand?: string;
    variant?: string;
    rating?: number;
    reviewCount?: string;
    description?: string;
    priceId?: string;
    metadata?: {
        [key: string]: string | number | undefined;
    };
    onFavorite?: () => void;
    onProductClick?: () => void;
    isFavorited?: boolean;
};

export const defaultProducts: Product[] = [
    {
        id: "1",
        name: "Classic White Sneakers",
        price: "$129",
        brand: "Nike",
        variant: "White / Size 42",
        rating: 4.5,
        reviewCount: "128",
        imageSrc: "/placeholders/placeholder3.avif",
        imageAlt: "Classic white sneakers",
    },
    {
        id: "2",
        name: "Leather Crossbody Bag",
        price: "$89",
        brand: "Coach",
        variant: "Brown / Medium",
        rating: 4.8,
        reviewCount: "256",
        imageSrc: "/placeholders/placeholder4.webp",
        imageAlt: "Brown leather crossbody bag",
    },
    {
        id: "3",
        name: "Wireless Headphones",
        price: "$199",
        brand: "Sony",
        variant: "Black",
        rating: 4.7,
        reviewCount: "512",
        imageSrc: "/placeholders/placeholder3.avif",
        imageAlt: "Black wireless headphones",
    },
    {
        id: "4",
        name: "Minimalist Watch",
        price: "$249",
        brand: "Fossil",
        variant: "Silver / 40mm",
        rating: 4.6,
        reviewCount: "89",
        imageSrc: "/placeholders/placeholder4.webp",
        imageAlt: "Silver minimalist watch",
    },
];

function formatPrice(amount: number, currency: string): string {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return formatter.format(amount / 100);
}

export async function fetchProducts(): Promise<Product[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

    if (!apiUrl || !projectId) {
        return [];
    }

    try {
        const url = `${apiUrl}/stripe/project/products?projectId=${projectId}&expandDefaultPrice=true`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return [];
        }

        const resp = await response.json();
        const data = resp.data.data || resp.data;

        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        return data.map((product: any) => {
            const metadata: Record<string, string | number | undefined> = {};
            if (product.metadata && typeof product.metadata === 'object') {
                Object.keys(product.metadata).forEach(key => {
                    const value = product.metadata[key];
                    if (value !== null && value !== undefined) {
                        const numValue = parseFloat(value);
                        metadata[key] = isNaN(numValue) ? value : numValue;
                    }
                });
            }

            const imageSrc = product.images?.[0] || product.imageSrc || "/placeholders/placeholder3.avif";
            const imageAlt = product.imageAlt || product.name || "";
            const images = product.images && Array.isArray(product.images) && product.images.length > 0
                ? product.images
                : [imageSrc];

            return {
                id: product.id || String(Math.random()),
                name: product.name || "Untitled Product",
                description: product.description || "",
                price: product.default_price?.unit_amount
                    ? formatPrice(product.default_price.unit_amount, product.default_price.currency || "usd")
                    : product.price || "$0",
                priceId: product.default_price?.id || product.priceId,
                imageSrc,
                imageAlt,
                images,
                brand: product.metadata?.brand || product.brand || "",
                variant: product.metadata?.variant || product.variant || "",
                rating: product.metadata?.rating ? parseFloat(product.metadata.rating) : undefined,
                reviewCount: product.metadata?.reviewCount || undefined,
                metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
            };
        });
    } catch (error) {
        return [];
    }
}

export async function fetchProduct(productId: string): Promise<Product | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

    if (!apiUrl || !projectId) {
        return null;
    }

    try {
        const url = `${apiUrl}/stripe/project/products/${productId}?projectId=${projectId}&expandDefaultPrice=true`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;
        }

        const resp = await response.json();
        const product = resp.data?.data || resp.data || resp;

        if (!product || typeof product !== 'object') {
            return null;
        }

        const metadata: Record<string, string | number | undefined> = {};
        if (product.metadata && typeof product.metadata === 'object') {
            Object.keys(product.metadata).forEach(key => {
                const value = product.metadata[key];
                if (value !== null && value !== undefined && value !== '') {
                    const numValue = parseFloat(String(value));
                    metadata[key] = isNaN(numValue) ? String(value) : numValue;
                }
            });
        }

        let priceValue = product.price;
        if (!priceValue && product.default_price?.unit_amount) {
            priceValue = formatPrice(product.default_price.unit_amount, product.default_price.currency || "usd");
        }
        if (!priceValue) {
            priceValue = "$0";
        }

        const imageSrc = product.images?.[0] || product.imageSrc || "/placeholders/placeholder3.avif";
        const imageAlt = product.imageAlt || product.name || "";
        const images = product.images && Array.isArray(product.images) && product.images.length > 0
            ? product.images
            : [imageSrc];

        return {
            id: product.id || String(Math.random()),
            name: product.name || "Untitled Product",
            description: product.description || "",
            price: priceValue,
            priceId: product.default_price?.id || product.priceId,
            imageSrc,
            imageAlt,
            images,
            brand: product.metadata?.brand || product.brand || "",
            variant: product.metadata?.variant || product.variant || "",
            rating: product.metadata?.rating ? parseFloat(String(product.metadata.rating)) : undefined,
            reviewCount: product.metadata?.reviewCount || undefined,
            metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
        };
    } catch (error) {
        return null;
    }
}