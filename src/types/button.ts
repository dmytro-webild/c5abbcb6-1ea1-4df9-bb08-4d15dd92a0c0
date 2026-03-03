import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";

export type ButtonAnimationType = "none" | "opacity" | "slide-up" | "blur-reveal";

export interface ButtonConfig {
    text: string;
    onClick?: () => void;
    href?: string;
    scrollToSection?: boolean;
    props?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
}
