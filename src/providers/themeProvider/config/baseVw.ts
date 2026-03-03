import type { SizingPreset } from "./types";

export const baseVwMap: Record<SizingPreset, { desktop: string; mobile: string }> = {
  medium: {
    desktop: "clamp(0.5rem, 0.8vw, 1rem)",
    mobile: "3vw",
  },
  mediumLarge: {
    desktop: "clamp(0.5rem, 0.84vw, 1rem)",
    mobile: "3.15vw",
  },
  largeSmall: {
    desktop: "clamp(0.5rem, 0.88vw, 1rem)",
    mobile: "3.30vw",
  },
  large: {
    desktop: "clamp(0.5rem, 0.92vw, 1rem)",
    mobile: "3.45vw",
  },
  mediumSizeLargeTitles: {
    desktop: "clamp(0.5rem, 0.8vw, 1rem)",
    mobile: "3vw",
  },
  largeSizeMediumTitles: {
    desktop: "clamp(0.5rem, 0.92vw, 1rem)",
    mobile: "3.45vw",
  },
  mediumLargeSizeLargeTitles: {
    desktop: "clamp(0.5rem, 0.84vw, 1rem)",
    mobile: "3.15vw",
  },
  largeSmallSizeLargeTitles: {
    desktop: "clamp(0.5rem, 0.88vw, 1rem)",
    mobile: "3.30vw",
  },
  mediumLargeSizeMediumTitles: {
    desktop: "clamp(0.5rem, 0.84vw, 1rem)",
    mobile: "3.15vw",
  },
  largeSmallSizeMediumTitles: {
    desktop: "clamp(0.5rem, 0.88vw, 1rem)",
    mobile: "3.30vw",
  },
};
