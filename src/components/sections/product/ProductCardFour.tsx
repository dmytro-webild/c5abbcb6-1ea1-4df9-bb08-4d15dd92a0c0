"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import CardStack from "@/components/cardStack/CardStack";
import ProductImage from "@/components/shared/ProductImage";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/api/product";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type ProductCardFourGridVariant = Exclude<GridVariant, "timeline" | "items-top-row-full-width-bottom" | "full-width-top-items-bottom-row">;

type ProductCard = Product & {
  variant: string;
};

interface ProductCardFourProps {
  products?: ProductCard[];
  carouselMode?: "auto" | "buttons";
  gridVariant: ProductCardFourGridVariant;
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
  cardVariantClassName?: string;
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
  cardNameClassName?: string;
  cardPriceClassName?: string;
  cardVariantClassName?: string;
  actionButtonClassName?: string;
}

const ProductCardItem = memo(({
  product,
  shouldUseLightText,
  cardClassName = "",
  imageClassName = "",
  cardNameClassName = "",
  cardPriceClassName = "",
  cardVariantClassName = "",
  actionButtonClassName = "",
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
        showActionButton={true}
        actionButtonAriaLabel={`View ${product.name} details`}
        imageClassName={imageClassName}
        actionButtonClassName={actionButtonClassName}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0 flex-1 min-w-0">
            <h3 className={cls("text-base font-medium leading-[1.3]", shouldUseLightText ? "text-background" : "text-foreground", cardNameClassName)}>
              {product.name}
            </h3>
            <p className={cls("text-sm leading-[1.3]", shouldUseLightText ? "text-background/60" : "text-foreground/60", cardVariantClassName)}>
              {product.variant}
            </p>
          </div>
          <p className={cls("text-base font-medium leading-[1.3] flex-shrink-0", shouldUseLightText ? "text-background" : "text-foreground", cardPriceClassName)}>
            {product.price}
          </p>
        </div>
      </div>
    </article>
  );
});

ProductCardItem.displayName = "ProductCardItem";

const ProductCardFour = ({
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
  cardVariantClassName = "",
  actionButtonClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: ProductCardFourProps) => {
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
          cardVariantClassName={cardVariantClassName}
          actionButtonClassName={actionButtonClassName}
        />
      ))}
    </CardStack>
  );
};

ProductCardFour.displayName = "ProductCardFour";

export default ProductCardFour;
