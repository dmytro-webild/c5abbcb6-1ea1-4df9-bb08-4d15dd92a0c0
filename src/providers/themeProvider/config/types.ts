import type { CTAButtonVariant } from "@/components/button/types";
import type { AnimationType } from "@/components/text/types";

export type BorderRadiusPreset = "rounded" | "soft" | "pill";
export type ContentWidthPreset = "small" | "smallMedium" | "compact" | "mediumSmall" | "medium" | "mediumLarge";
export type SizingPreset = "medium" | "mediumLarge" | "largeSmall" | "large" | "mediumSizeLargeTitles" | "mediumLargeSizeLargeTitles" | "largeSmallSizeLargeTitles" | "largeSizeMediumTitles" | "mediumLargeSizeMediumTitles" | "largeSmallSizeMediumTitles";
export type HeadingFontWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
export type BackgroundType =
  | "none"
  | "circleGradient"
  | "aurora"
  | "floatingGradient"
  | "noise"
  | "noiseDiagonalGradient"
  | "fluid"
  | "blurBottom"
  | "grid";

export type CardStyleVariant = "solid" | "outline" | "gradient-mesh" | "gradient-radial" | "inset" | "glass-elevated" | "glass-depth" | "gradient-bordered" | "layered-gradient" | "soft-shadow" | "subtle-shadow" | "elevated-border" | "inner-glow" | "spotlight";
export type PrimaryButtonStyleVariant = "gradient" | "shadow" | "flat" | "radial-glow" | "diagonal-gradient" | "double-inset" | "primary-glow" | "inset-glow" | "soft-glow" | "glass-shimmer" | "neon-outline" | "lifted" | "depth-layers" | "accent-edge" | "metallic";
export type SecondaryButtonStyleVariant = "glass" | "solid" | "layered" | "radial-glow";

export interface ThemeConfig {
  defaultButtonVariant: CTAButtonVariant;
  defaultTextAnimation: AnimationType;
  borderRadius: BorderRadiusPreset;
  contentWidth: ContentWidthPreset;
  sizing: SizingPreset;
  background: BackgroundType;
  cardStyle: CardStyleVariant;
  primaryButtonStyle: PrimaryButtonStyleVariant;
  secondaryButtonStyle: SecondaryButtonStyleVariant;
  headingFontWeight: HeadingFontWeight;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultButtonVariant: CTAButtonVariant;
  defaultTextAnimation: AnimationType;
  borderRadius: BorderRadiusPreset;
  contentWidth: ContentWidthPreset;
  sizing: SizingPreset;
  background: BackgroundType;
  cardStyle: CardStyleVariant;
  primaryButtonStyle: PrimaryButtonStyleVariant;
  secondaryButtonStyle: SecondaryButtonStyleVariant;
  headingFontWeight: HeadingFontWeight;
}
