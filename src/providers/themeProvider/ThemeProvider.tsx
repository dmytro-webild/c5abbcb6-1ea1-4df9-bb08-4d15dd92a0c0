"use client";

import { createContext, useContext } from "react";
import type { ThemeConfig, ThemeProviderProps } from "./config/types";
import { borderRadiusMap, borderRadiusCappedMap, contentWidthMap, expandedContentWidthMap, baseVwMap, textSizingMap, backgroundComponents, headingFontWeightMap } from "./config/constants";
import { cardStyleMap, getGradientBorderedPseudo } from "./styles/cardStyles";
import { primaryButtonStyleMap, getInsetGlowPseudo } from "./styles/primaryButtonStyles";
import { secondaryButtonStyleMap } from "./styles/secondaryButtonStyles";

const ThemeContext = createContext<ThemeConfig | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. Wrap your sections in <ThemeProvider> at the app/page level."
    );
  }
  return context;
};

export const ThemeProvider = ({
  children,
  defaultButtonVariant,
  defaultTextAnimation,
  borderRadius,
  contentWidth,
  sizing,
  background,
  cardStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  headingFontWeight,
}: ThemeProviderProps) => {
  const themeConfig: ThemeConfig = {
    defaultButtonVariant,
    defaultTextAnimation,
    borderRadius,
    contentWidth,
    sizing,
    background,
    cardStyle,
    primaryButtonStyle,
    secondaryButtonStyle,
    headingFontWeight,
  };

  const borderRadiusValue = borderRadiusMap[borderRadius];
  const borderRadiusCappedValue = borderRadiusCappedMap[borderRadius];
  const contentWidthValues = contentWidthMap[contentWidth];
  const expandedContentWidthValues = expandedContentWidthMap[contentWidth];
  const baseVwValues = baseVwMap[sizing];
  const textSizingValues = textSizingMap[sizing];
  const BackgroundComponent = backgroundComponents[background];
  const headingFontWeightValue = headingFontWeightMap[headingFontWeight];

  const cardStyles = cardStyleMap[cardStyle];
  const primaryButtonStyles = primaryButtonStyleMap[primaryButtonStyle];
  const secondaryButtonStyles = secondaryButtonStyleMap[secondaryButtonStyle];

  const gradientBorderedPseudo = getGradientBorderedPseudo(cardStyle);
  const insetGlowPseudo = getInsetGlowPseudo(primaryButtonStyle);

  const styleString = `
    :root {
      --theme-border-radius: ${borderRadiusValue};
      --theme-border-radius-capped: ${borderRadiusCappedValue};
      --width-content-width: ${contentWidthValues.desktop};
      --width-content-width-expanded: ${expandedContentWidthValues.desktop};
      --vw: ${baseVwValues.desktop};
      --heading-font-weight: ${headingFontWeightValue};
      --text-2xs: ${textSizingValues.desktop.text2xs};
      --text-xs: ${textSizingValues.desktop.textXs};
      --text-sm: ${textSizingValues.desktop.textSm};
      --text-base: ${textSizingValues.desktop.textBase};
      --text-lg: ${textSizingValues.desktop.textLg};
      --text-xl: ${textSizingValues.desktop.textXl};
      --text-2xl: ${textSizingValues.desktop.text2xl};
      --text-3xl: ${textSizingValues.desktop.text3xl};
      --text-4xl: ${textSizingValues.desktop.text4xl};
      --text-5xl: ${textSizingValues.desktop.text5xl};
      --text-6xl: ${textSizingValues.desktop.text6xl};
      --text-7xl: ${textSizingValues.desktop.text7xl};
      --text-8xl: ${textSizingValues.desktop.text8xl};
      --text-9xl: ${textSizingValues.desktop.text9xl};
    }
    @media (max-width: 768px) {
      :root {
        --width-content-width: ${contentWidthValues.mobile};
        --width-content-width-expanded: ${expandedContentWidthValues.mobile};
        --vw: ${baseVwValues.mobile};
        --text-2xs: ${textSizingValues.mobile.text2xs};
        --text-xs: ${textSizingValues.mobile.textXs};
        --text-sm: ${textSizingValues.mobile.textSm};
        --text-base: ${textSizingValues.mobile.textBase};
        --text-lg: ${textSizingValues.mobile.textLg};
        --text-xl: ${textSizingValues.mobile.textXl};
        --text-2xl: ${textSizingValues.mobile.text2xl};
        --text-3xl: ${textSizingValues.mobile.text3xl};
        --text-4xl: ${textSizingValues.mobile.text4xl};
        --text-5xl: ${textSizingValues.mobile.text5xl};
        --text-6xl: ${textSizingValues.mobile.text6xl};
        --text-7xl: ${textSizingValues.mobile.text7xl};
        --text-8xl: ${textSizingValues.mobile.text8xl};
        --text-9xl: ${textSizingValues.mobile.text9xl};
      }
    }
    .card {
      ${cardStyles}
    }
    ${gradientBorderedPseudo}
    .primary-button {
      ${primaryButtonStyles}
    }
    ${insetGlowPseudo}
    .secondary-button {
      ${secondaryButtonStyles}
    }
  `;

  return (
    <ThemeContext.Provider value={themeConfig}>
      <style>{styleString}</style>
      {BackgroundComponent && <BackgroundComponent />}
      {children}
    </ThemeContext.Provider>
  );
};
