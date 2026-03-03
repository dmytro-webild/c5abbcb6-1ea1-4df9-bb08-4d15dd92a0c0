"use client";

import { memo, useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/components/button/Button";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { getButtonProps } from "@/lib/buttonUtils";
import { cls } from "@/lib/utils";
import type { ButtonConfig } from "@/types/button";
import AnimationContainer from "@/components/sections/AnimationContainer";
import ProductCartItem from "./ProductCartItem";
import type { CartItem } from "./ProductCartItem";

interface ProductCartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onQuantityChange?: (id: string, quantity: number) => void;
    onRemove?: (id: string) => void;
    total: string;
    buttons: ButtonConfig[];
    title?: string;
    totalLabel?: string;
    emptyMessage?: string;
    className?: string;
    panelClassName?: string;
    itemClassName?: string;
    buttonClassName?: string;
}

const ProductCart = ({
    isOpen,
    onClose,
    items,
    onQuantityChange,
    onRemove,
    total,
    buttons,
    title = "Cart",
    totalLabel = "Total",
    emptyMessage = "Your cart is empty",
    className = "",
    panelClassName = "",
    itemClassName = "",
    buttonClassName = "",
}: ProductCartProps) => {
    const theme = useTheme();

    const getButtonConfigProps = () => {
        if (theme.defaultButtonVariant === "hover-bubble") {
            return { bgClassName: "w-full" };
        }
        if (theme.defaultButtonVariant === "icon-arrow") {
            return { className: "justify-between" };
        }
        return {};
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div
            className={cls(
                "fixed inset-0 z-[1001] pointer-events-none",
                className
            )}
        >
            <div
                className={cls(
                    "absolute inset-0 bg-foreground/50 transition-opacity duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]",
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={cls(
                    "absolute right-0 top-0 h-screen overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]",
                    isOpen
                        ? "w-full md:w-30 pointer-events-auto"
                        : "w-0 pointer-events-none"
                )}
            >
                <aside
                    className={cls(
                        "w-full md:w-30 h-full card flex flex-col p-6",
                        panelClassName
                    )}
                    role="dialog"
                    aria-label={title}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-medium text-foreground whitespace-nowrap">
                            {title} ({items.length})
                        </h2>
                        <button
                            onClick={onClose}
                            className="secondary-button h-8 aspect-square rounded-theme flex items-center justify-center cursor-pointer flex-shrink-0"
                            aria-label="Close cart"
                            type="button"
                        >
                            <X className="relative h-4/10 text-secondary-cta-text" strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className="w-full h-px bg-background-accent mt-6" />

                    <div className="flex-1 min-h-0 h-full overflow-y-auto mask-fade-y" data-lenis-prevent>
                        <AnimationContainer
                            key={items.map((i) => i.id).join("-")}
                            className="w-full h-full"
                            animationType="fade"
                        >
                            {items.length === 0 ? (
                                <div className="h-full flex items-center justify-center" >
                                    <p className="text-sm text-foreground/50 text-center py-10 whitespace-nowrap">
                                        {emptyMessage}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6 py-6">
                                    {items.map((item) => (
                                        <ProductCartItem
                                            key={item.id}
                                            item={item}
                                            onQuantityChange={onQuantityChange}
                                            onRemove={onRemove}
                                            className={itemClassName}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimationContainer>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="w-full h-px bg-background-accent" />
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-foreground whitespace-nowrap">
                                {totalLabel}
                            </span>
                            <span className="text-base font-medium text-foreground whitespace-nowrap">
                                {total}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {buttons.slice(0, 2).map((button, index) => (
                                <Button
                                    key={`${button.text}-${index}`}
                                    {...getButtonProps(
                                        { ...button, props: { ...button.props, ...getButtonConfigProps() } },
                                        index,
                                        theme.defaultButtonVariant,
                                        cls("w-full", buttonClassName)
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

ProductCart.displayName = "ProductCart";

export default memo(ProductCart);
