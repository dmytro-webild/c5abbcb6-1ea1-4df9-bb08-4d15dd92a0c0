/**
 * Detects if the current background color is light or dark
 * Used for AnimatedAuroraBackground to determine if colors should be inverted
 *
 * @returns true for light backgrounds (hex starting with 8-f), false for dark backgrounds (hex starting with 0-7)
 */
export const detectLightBackground = (): boolean => {
  if (typeof window === 'undefined') return true;

  const computedBg = getComputedStyle(document.documentElement)
    .getPropertyValue('--background')
    .trim();

  // If it starts with #0-7, it's likely dark
  if (computedBg.startsWith('#')) {
    const firstChar = computedBg.charAt(1).toLowerCase();
    return firstChar >= '8'; // 8-f is light, 0-7 is dark
  }

  return true; // Default to light
};
