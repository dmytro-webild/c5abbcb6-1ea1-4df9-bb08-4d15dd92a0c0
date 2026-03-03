import type { HeadingFontWeight } from "./types";

/**
 * Shared component layout and styling type definitions
 */
export type TextboxLayout = "default" | "split" | "split-actions" | "split-description" | "inline-image";
export type InvertedBackground = boolean;

export const headingFontWeightMap: Record<HeadingFontWeight, string> = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};
