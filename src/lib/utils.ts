import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardStyleVariant } from "@/providers/themeProvider/config/types";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function cls(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if text should use inverted color based on cardStyle
export function shouldUseInvertedText(useInvertedBackground: boolean | undefined, cardStyle: CardStyleVariant): boolean {
  if (!useInvertedBackground) return false;

  const lightCardStyles: CardStyleVariant[] = [];

  return lightCardStyles.includes(cardStyle);
}
