"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/api/product";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type ProductCardTwoGridVariant = Exclude<GridVariant, "timeline" | "one-large-right-three-stacked-left" | "items-top-row-full-width-bottom" | "full-width-top-items-bottom-row" | "one-large-left-three-stacked-right">;

type ProductCard = Product & {
    brand: string;
    rating: number;
    reviewCount: string;
};

interface ProductCardTwoProps {
    products?: ProductCard[];
    carouselMode?: "auto" | "buttons";
    gridVariant: ProductCardTwoGridVariant;
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
    cardBrandClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    cardRatingClassName?: string;
    actionButtonClassName?: string;
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
    cardBrandClassName?: string;
    cardNameClassName?: string;
    cardPriceClassName?: string;
    cardRatingClassName?: string;
    actionButtonClassName?: string;
}

const ProductCardItem = memo(({
    product,
    shouldUseLightText,
    cardClassName = "",
    imageClassName = "",
    cardBrandClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    cardRatingClassName = "",
    actionButtonClassName = "",
}: ProductCardItemProps) => {
    return (
        <article
            className={cls("card group relative h-full flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={product.onProductClick}
            role="article"
            aria-label={`${product.brand} ${product.name} - ${product.price}`}
        >
            <ProductImage
                imageSrc={product.imageSrc}
                imageAlt={product.imageAlt || `${product.brand} ${product.name}`}
                isFavorited={product.isFavorited}
                onFavoriteToggle={product.onFavorite}
                showActionButton={true}
                actionButtonAriaLabel={`View ${product.name} details`}
                imageClassName={imageClassName}
                actionButtonClassName={actionButtonClassName}
            />

            <div className="relative z-1 flex-1 min-w-0 flex flex-col gap-2">
                <p className={cls("text-sm leading-[1]", shouldUseLightText ? "text-background" : "text-foreground", cardBrandClassName)}>
                    {product.brand}
                </p>
                <div className="flex flex-col gap-1" >
                    <h3 className={cls("text-xl font-medium truncate leading-[1.15]", shouldUseLightText ? "text-background" : "text-foreground", cardNameClassName)}>
                        {product.name}
                    </h3>
                    <div className={cls("flex items-center gap-2", cardRatingClassName)}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cls(
                                        "h-4 w-auto",
                                        i < Math.floor(product.rating)
                                            ? "text-accent fill-accent"
                                            : "text-accent opacity-20"
                                    )}
                                    strokeWidth={1.5}
                                />
                            ))}
                        </div>
                        <span className={cls("text-sm leading-[1.3]", shouldUseLightText ? "text-background" : "text-foreground")}>
                            ({product.reviewCount})
                        </span>
                    </div>
                </div>
                <p className={cls("text-2xl font-medium leading-[1.3]", shouldUseLightText ? "text-background" : "text-foreground", cardPriceClassName)}>
                    {product.price}
                </p>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardTwo = ({
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
    cardBrandClassName = "",
    cardNameClassName = "",
    cardPriceClassName = "",
    cardRatingClassName = "",
    actionButtonClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardTwoProps) => {
    const theme = useTheme();
    const router = useRouter();
    const { products: fetchedProducts, isLoading } = useProducts();
    const isFromApi = fetchedProducts.length > 0;
    const products = (fetchedProducts.length > 0 ? fetchedProducts : productsProp) as ProductCard[];
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const handleProductClick = useCallback((product: ProductCard) => {
        if (isFromApi) {
            router.push(`/shop/${product.id}`);
        } else {
            product.onProductClick?.();
        }
    }, [isFromApi, router]);

    const customGridRows = (gridVariant === "bento-grid" || gridVariant === "bento-grid-inverted")
        ? "md:grid-rows-[22rem_22rem] 2xl:grid-rows-[26rem_26rem]"
        : undefined;

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
            useInvertedBackground={useInvertedBackground}
            mode={carouselMode}
            gridVariant={gridVariant}
            uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
            gridRowsClassName={customGridRows}
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
                    cardBrandClassName={cardBrandClassName}
                    cardNameClassName={cardNameClassName}
                    cardPriceClassName={cardPriceClassName}
                    cardRatingClassName={cardRatingClassName}
                    actionButtonClassName={actionButtonClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardTwo.displayName = "ProductCardTwo";

export default ProductCardTwo;
