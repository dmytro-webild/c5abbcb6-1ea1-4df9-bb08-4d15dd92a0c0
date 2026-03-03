"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/api/product";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type ProductCardOneGridVariant = Exclude<GridVariant, "timeline">;

type ProductCard = Product;

interface ProductCardOneProps {
    products?: ProductCard[];
    carouselMode?: "auto" | "buttons";
    gridVariant: ProductCardOneGridVariant;
    uniformGridCustomHeightClasses?: string;
    animationType: CardAnimationType;
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    cardClassName?: string;
    imageClassName?: string;
    textBoxTitleClassName?: string;
    textBoxTitleImageWrapperClassName?: string;
    textBoxTitleImageClassName?: string;
    textBoxDescriptionClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface ProductCardItemProps {
    product: ProductCard;
    shouldUseLightText: boolean;
    cardClassName?: string;
    imageClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
}

const ProductCardItem = memo(({
    product,
    shouldUseLightText,
    cardClassName = "",
    imageClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
}: ProductCardItemProps) => {
    return (
        <article
            className={cls("card group relative h-full flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={product.onProductClick}
            role="article"
            aria-label={`${product.name} - ${product.price}`}
        >
            <ProductImage
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || product.name}
                isFavorited={product.isFavorited}
                onFavoriteToggle={product.onFavorite}
                imageClassName={imageClassName}
            />

            <div className="relative z-1 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className={cls("text-base font-medium truncate leading-[1.3]", shouldUseLightText ? "text-background" : "text-foreground", cardNameClassName)}>
                        {product.name}
                    </h3>
                    <p className={cls("text-2xl font-medium leading-[1.3]", shouldUseLightText ? "text-background" : "text-foreground", cardPriceClassName)}>
                        {product.price}
                    </p>
                </div>

                <button
                    className="relative cursor-pointer primary-button h-10 w-auto aspect-square rounded-theme flex items-center justify-center flex-shrink-0"
                    aria-label={`View ${product.name} details`}
                    type="button"
                >
                    <ArrowUpRight className="h-4/10 text-primary-cta-text transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
                </button>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardOne = ({
    products: productsProp,
    carouselMode = "buttons",
    gridVariant,
    uniformGridCustomHeightClasses = "min-h-95 2xl:min-h-105",
    animationType,
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    textboxLayout,
    useInvertedBackground,
    ariaLabel = "Product section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    imageClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardOneProps) => {
    const theme = useTheme();
    const router = useRouter();
    const { products: fetchedProducts, isLoading } = useProducts();
    const isFromApi = fetchedProducts.length > 0;
    const products = isFromApi ? fetchedProducts : productsProp;
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const handleProductClick = useCallback((product: ProductCard) => {
        if (isFromApi) {
            router.push(`/shop/${product.id}`);
        } else {
            product.onProductClick?.();
        }
    }, [isFromApi, router]);

    if (isLoading && !productsProp) {
        return (
            <div className="w-content-width mx-auto py-20 text-center">
                <p className="text-foreground">Loading products...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <CardStack
            mode={carouselMode}
            gridVariant={gridVariant}
            uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
            animationType={animationType}

            title={title}
            titleSegments={titleSegments}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            textboxLayout={textboxLayout}
            useInvertedBackground={useInvertedBackground}
            className={className}
            containerClassName={containerClassName}
            gridClassName={gridClassName}
            carouselClassName={carouselClassName}
            controlsClassName={controlsClassName}
            textBoxClassName={textBoxClassName}
            titleClassName={textBoxTitleClassName}
            titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
            titleImageClassName={textBoxTitleImageClassName}
            descriptionClassName={textBoxDescriptionClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            ariaLabel={ariaLabel}
        >
            {products?.map((product, index) => (
                <ProductCardItem
                    key={`${product.id}-${index}`}
                    product={{ ...product, onProductClick: () => handleProductClick(product) }}
                    shouldUseLightText={shouldUseLightText}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    cardNameClassName={cardNameClassName}
                    cardPriceClassName={cardPriceClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardOne.displayName = "ProductCardOne";

export default ProductCardOne;
