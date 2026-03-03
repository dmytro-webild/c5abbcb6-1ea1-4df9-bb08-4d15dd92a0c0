import type { ContentWidthPreset } from "./types";

export const contentWidthMap: Record<ContentWidthPreset, { desktop: string; mobile: string }> = {
  small: {
    desktop: "clamp(40rem, 70vw, 100rem)",
    mobile: "80vw",
  },
  smallMedium: {
    desktop: "clamp(40rem, 72.5vw, 100rem)",
    mobile: "80vw",
  },
  compact: {
    desktop: "clamp(40rem, 75vw, 100rem)",
    mobile: "80vw",
  },
  mediumSmall: {
    desktop: "clamp(40rem, 77.5vw, 100rem)",
    mobile: "80vw",
  },
  medium: {
    desktop: "clamp(40rem, 80vw, 100rem)",
    mobile: "80vw",
  },
  mediumLarge: {
    desktop: "clamp(40rem, 82.5vw, 100rem)",
    mobile: "85vw",
  },
};

function calculateExpandedWidth(width: string): string {
  const clampMatch = width.match(/clamp\(([\d.]+)rem,\s*([\d.]+)vw,\s*([\d.]+)rem\)/);
  if (clampMatch) {
    const minRem = clampMatch[1];
    const vwValue = parseFloat(clampMatch[2]);
    const maxRem = clampMatch[3];

    const remainingVw = 100 - vwValue;
    const expandedVw = vwValue + (remainingVw / 2);

    const expandedMin = `calc(${minRem}rem - (${minRem}rem - 100vw) / 2)`;
    const expandedMax = `calc(${maxRem}rem + (100vw - ${maxRem}rem) / 2)`;

    return `clamp(${expandedMin}, ${expandedVw}vw, ${expandedMax})`;
  }

  const vwMatch = width.match(/([\d.]+)vw/);
  if (vwMatch) {
    const vwValue = parseFloat(vwMatch[1]);
    const remainingVw = 100 - vwValue;
    const expandedVw = vwValue + (remainingVw / 2);
    return `${expandedVw}vw`;
  }

  return width;
}

export const expandedContentWidthMap: Record<ContentWidthPreset, { desktop: string; mobile: string }> = {
  small: {
    desktop: calculateExpandedWidth(contentWidthMap.small.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.small.mobile),
  },
  smallMedium: {
    desktop: calculateExpandedWidth(contentWidthMap.smallMedium.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.smallMedium.mobile),
  },
  compact: {
    desktop: calculateExpandedWidth(contentWidthMap.compact.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.compact.mobile),
  },
  mediumSmall: {
    desktop: calculateExpandedWidth(contentWidthMap.mediumSmall.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.mediumSmall.mobile),
  },
  medium: {
    desktop: calculateExpandedWidth(contentWidthMap.medium.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.medium.mobile),
  },
  mediumLarge: {
    desktop: calculateExpandedWidth(contentWidthMap.mediumLarge.desktop),
    mobile: calculateExpandedWidth(contentWidthMap.mediumLarge.mobile),
  },
};
