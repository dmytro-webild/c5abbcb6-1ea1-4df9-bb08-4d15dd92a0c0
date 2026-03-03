"use client";

import { memo, useCallback } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import MediaContent from "@/components/shared/MediaContent";
import QuantityButton from "@/components/shared/QuantityButton";
import { cls } from "@/lib/utils";

export interface CartItem {
    id: string;
    name: string;
    variants?: string[];
    price: string;
    quantity: number;
    imageSrc: string;
    imageAlt?: string;
}

interface ProductCartItemProps {
    item: CartItem;
    onQuantityChange?: (id: string, quantity: number) => void;
    onRemove?: (id: string) => void;
    className?: string;
}

const ProductCartItem = ({
    item,
    onQuantityChange,
    onRemove,
    className = "",
}: ProductCartItemProps) => {
    const handleIncrement = useCallback(() => {
        onQuantityChange?.(item.id, item.quantity + 1);
    }, [item.id, item.quantity, onQuantityChange]);

    const handleDecrement = useCallback(() => {
        if (item.quantity <= 1) return;
        onQuantityChange?.(item.id, item.quantity - 1);
    }, [item.id, item.quantity, onQuantityChange]);

    const handleRemove = useCallback(() => {
        onRemove?.(item.id);
    }, [item.id, onRemove]);

    return (
        <div className={cls("flex gap-6", className)}>
            <div className="relative w-1/2 h-auto aspect-square flex-shrink-0 rounded-theme-capped overflow-hidden">
                <MediaContent
                    imageSrc={item.imageSrc}
                    imageAlt={item.imageAlt || item.name}
                    imageClassName="w-full h-full object-cover rounded-none!"
                />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                        <h3 className="text-base font-medium text-foreground truncate">
                            {item.name}
                        </h3>
                        {item.variants && item.variants.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {item.variants.map((variant) => (
                                    <p key={variant} className="text-sm text-foreground/50">
                                        {variant}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-base font-medium text-foreground flex-shrink-0">
                        {item.price}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <QuantityButton
                        onClick={handleDecrement}
                        ariaLabel="Decrease quantity"
                        Icon={Minus}
                    />
                    <span className="text-sm font-medium text-foreground min-w-5 text-center">
                        {item.quantity}
                    </span>
                    <QuantityButton
                        onClick={handleIncrement}
                        ariaLabel="Increase quantity"
                        Icon={Plus}
                    />
                    <button
                        onClick={handleRemove}
                        className="secondary-button h-8 aspect-square rounded-theme flex items-center justify-center cursor-pointer ml-auto"
                        aria-label={`Remove ${item.name} from cart`}
                        type="button"
                    >
                        <Trash2 className="relative h-4/10 text-secondary-cta-text" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCartItem.displayName = "ProductCartItem";

export default memo(ProductCartItem);
