import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

export type { ButtonConfig, ButtonAnimationType, TextboxLayout, InvertedBackground };

export type TitleSegment =
    | { type: "text"; content: string }
    | { type: "image"; src: string; alt?: string };

export interface TimelineCardStackItem {
    id: number;
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
}

export type GridVariant =
    | "uniform-all-items-equal"
    | "bento-grid"
    | "bento-grid-inverted"
    | "two-columns-alternating-heights"
    | "asymmetric-60-wide-40-narrow"
    | "three-columns-all-equal-width"
    | "four-items-2x2-equal-grid"
    | "one-large-right-three-stacked-left"
    | "items-top-row-full-width-bottom"
    | "full-width-top-items-bottom-row"
    | "one-large-left-three-stacked-right"
    | "two-items-per-row"
    | "timeline";

export type CardAnimationType =
    | "none"
    | "opacity"
    | "slide-up"
    | "scale-rotate"
    | "blur-reveal";

export type CardAnimationTypeWith3D = CardAnimationType | "depth-3d";

export interface TextBoxProps {
    title?: string;
    titleSegments?: TitleSegment[];
    description?: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground?: InvertedBackground;
    textBoxClassName?: string;
    titleClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    descriptionClassName?: string;
    tagClassName?: string;
    buttonContainerClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
}

export interface CardStackProps extends TextBoxProps {
    children: React.ReactNode;
    mode?: "auto" | "buttons";
    gridVariant?: GridVariant;
    uniformGridCustomHeightClasses?: string;
    gridRowsClassName?: string;
    itemHeightClassesOverride?: string[];
    animationType: CardAnimationType | CardAnimationTypeWith3D;
    supports3DAnimation?: boolean;
    carouselThreshold?: number;
    bottomContent?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    carouselItemClassName?: string;
    controlsClassName?: string;
    ariaLabel?: string;
}

export interface GridLayoutProps extends TextBoxProps {
    children: React.ReactNode;
    itemCount: number;
    gridVariant?: GridVariant;
    uniformGridCustomHeightClasses?: string;
    gridRowsClassName?: string;
    itemHeightClassesOverride?: string[];
    animationType: CardAnimationType | CardAnimationTypeWith3D;
    supports3DAnimation?: boolean;
    bottomContent?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    gridClassName?: string;
    ariaLabel: string;
}

export interface AutoCarouselProps extends TextBoxProps {
    children: React.ReactNode;
    uniformGridCustomHeightClasses?: string;
    animationType: CardAnimationType;
    speed?: number;
    bottomContent?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    carouselClassName?: string;
    itemClassName?: string;
    ariaLabel: string;
    showTextBox?: boolean;
    dualMarquee?: boolean;
    topMarqueeDirection?: "left" | "right";
    bottomMarqueeDirection?: "left" | "right";
    bottomCarouselClassName?: string;
    marqueeGapClassName?: string;
}

export interface ButtonCarouselProps extends TextBoxProps {
    children: React.ReactNode;
    uniformGridCustomHeightClasses?: string;
    animationType: CardAnimationType;
    bottomContent?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    carouselClassName?: string;
    carouselItemClassName?: string;
    controlsClassName?: string;
    ariaLabel: string;
}

export interface FullWidthCarouselProps extends TextBoxProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    carouselClassName?: string;
    dotsClassName?: string;
    ariaLabel: string;
}

export interface ArrowCarouselProps extends TextBoxProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    ariaLabel: string;
}
