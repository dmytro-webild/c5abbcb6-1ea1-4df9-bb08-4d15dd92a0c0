"use client";

import { memo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import QuantityButton from "@/components/shared/QuantityButton";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useProducts } from "@/hooks/useProducts";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import type { Product } from "@/lib/api/product";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, GridVariant, CardAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type ProductCardThreeGridVariant = Exclude<GridVariant, "timeline" | "items-top-row-full-width-bottom" | "full-width-top-items-bottom-row">;

type ProductCard = Product & {
    onQuantityChange?: (quantity: number) => void;
    initialQuantity?: number;
    priceButtonProps?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
};

interface ProductCardThreeProps {
    products?: ProductCard[];
    carouselMode?: "auto" | "buttons";
    gridVariant: ProductCardThreeGridVariant;
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
    quantityControlsClassName?: string;
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
    isFromApi: boolean;
    onBuyClick?: (productId: string, quantity: number) => void;
    cardClassName?: string;
    imageClassName?: string;
    cardNameClassName?: string;
    quantityControlsClassName?: string;
}

const ProductCardItem = memo(({
    product,
    shouldUseLightText,
    isFromApi,
    onBuyClick,
    cardClassName = "",
    imageClassName = "",
    cardNameClassName = "",
    quantityControlsClassName = "",
}: ProductCardItemProps) => {
    const theme = useTheme();
    const [quantity, setQuantity] = useState(product.initialQuantity || 1);

    const handleIncrement = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        product.onQuantityChange?.(newQuantity);
    }, [quantity, product]);

    const handleDecrement = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            product.onQuantityChange?.(newQuantity);
        }
    }, [quantity, product]);

    const handleClick = useCallback(() => {
        if (isFromApi && onBuyClick) {
            onBuyClick(product.id, quantity);
        } else {
            product.onProductClick?.();
        }
    }, [isFromApi, onBuyClick, product, quantity]);

    return (
        <article
            className={cls("card group relative h-full flex flex-col gap-4 cursor-pointer p-4 rounded-theme-capped", cardClassName)}
            onClick={handleClick}
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

            <div className="relative z-1 flex flex-col gap-3">
                <h3 className={cls("text-xl font-medium leading-[1.15] truncate", shouldUseLightText ? "text-background" : "text-foreground", cardNameClassName)}>
                    {product.name}
                </h3>

                <div className="flex items-center justify-between gap-4">
                    <div className={cls("flex items-center gap-2", quantityControlsClassName)}>
                        <QuantityButton
                            onClick={handleDecrement}
                            ariaLabel="Decrease quantity"
                            Icon={Minus}
                        />
                        <span className={cls("text-base font-medium min-w-[2ch] text-center leading-[1]", shouldUseLightText ? "text-background" : "text-foreground")}>
                            {quantity}
                        </span>
                        <QuantityButton
                            onClick={handleIncrement}
                            ariaLabel="Increase quantity"
                            Icon={Plus}
                        />
                    </div>

                    <Button
                        {...getButtonProps(
                            {
                                text: product.price,
                                props: product.priceButtonProps,
                            },
                            0,
                            theme.defaultButtonVariant
                        )}
                    />
                </div>
            </div>
        </article>
    );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardThree = ({
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
    quantityControlsClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: ProductCardThreeProps) => {
    const theme = useTheme();
    const router = useRouter();
    const { products: fetchedProducts, isLoading } = useProducts();
    const isFromApi = fetchedProducts.length > 0;
    const products = (isFromApi ? fetchedProducts : productsProp) as ProductCard[];
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
            useInvertedBackground={useInvertedBackground}
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
                    isFromApi={isFromApi}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    cardNameClassName={cardNameClassName}
                    quantityControlsClassName={quantityControlsClassName}
                />
            ))}
        </CardStack>
    );
};

ProductCardThree.displayName = "ProductCardThree";

export default ProductCardThree;
