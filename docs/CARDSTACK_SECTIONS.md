# CardStack Section Pattern

This document covers the CardStack pattern used in Feature, Product, Pricing, Testimonial, Team, Blog, and Metrics section components.

## Required Type Imports

```tsx
// Centralized type definitions
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment } from "@/components/cardStack/types";
```

**Key Types:**
- `TextboxLayout` - Layout options for section headers ("default" | "split" | "split-actions" | "split-description" | "inline-image")
- `InvertedBackground` - Background inversion options ("noInvert" | "invertDefault")
- `TitleSegment` - Type for inline image segments ({ type: "text" | "image", content/src, alt? })
- `ButtonConfig` - Button configuration interface
- `GridVariant` - Grid layout variants
- `CardAnimationType` - Card animation types

## Overview

CardStack is an intelligent layout component that automatically switches between grid, carousel, and timeline layouts based on item count and configuration.

**Mode Selection (Automatic):**
- **1-4 items**: Grid mode (displays as bento grid)
- **5+ items**: Carousel mode (auto-scrolling or button-controlled)
- **3-6 items with timeline variant**: Timeline layout (or carousel if 7+)

## Grid Variants

There are 9 bento grid layouts plus uniform layouts:

### Uniform Layouts
- `uniform-all-items-equal` - All items same size (default)
- `uniform-2-items` - Two equal columns
- `uniform-3-items` - Three equal columns
- `uniform-4-items` - Four equal columns

### Bento Layouts (Asymmetric)
- `two-columns-alternating-heights` - Alternating tall/short columns
- `asymmetric-60-wide-40-narrow` - 60% wide left, 40% narrow right
- `three-columns-all-equal-width` - Three equal columns
- `four-items-2x2-equal-grid` - Perfect 2x2 grid
- `one-large-right-three-stacked-left` - Left: 3 items, Right: 1 large
- `items-top-row-full-width-bottom` - Top: full width, Bottom: items
- `full-width-top-items-bottom-row` - Full width top, items below
- `one-large-left-three-stacked-right` - Left: 1 large, Right: 3 items
- `timeline` - Zigzag timeline layout

## Height Control Pattern

### uniformGridCustomHeightClasses Prop

All CardStack-based components should accept this optional prop to control item heights in both grid and carousel modes.

```tsx
interface SectionCardProps {
  items: ItemType[];
  gridVariant: GridVariant;
  uniformGridCustomHeightClasses?: string;
  carouselMode?: "auto" | "buttons";
  // ... other props
}
```

### Default Values by Component Type

**Most components (Feature, Product, Pricing, Team, Metrics, Blog):**
```tsx
uniformGridCustomHeightClasses = "min-h-80 2xl:min-h-90"
```

**Testimonial components (need flexible heights):**
```tsx
uniformGridCustomHeightClasses = "min-h-none"
```

**Hero carousel components (no minimum):**
```tsx
uniformGridCustomHeightClasses = "min-h-0"
```

**Feature components (optimized for compact layout):**
```tsx
// Hardcoded in FeatureCardFour
uniformGridCustomHeightClasses = "min-h-0"
```

### Implementation Pattern

The prop flows: Section Component → CardStack → GridLayout/Carousel

```tsx
// In section component (e.g., ProductCardOne.tsx)
const ProductCardOne = ({
  products,
  gridVariant,
  uniformGridCustomHeightClasses = "min-h-80 2xl:min-h-90",
  // ... other props
}: ProductCardOneProps) => {
  return (
    <CardStack
      gridVariant={gridVariant}
      uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
      // ... other props
    >
      {products.map((product) => (
        <div className="card">...</div>
      ))}
    </CardStack>
  );
};
```

**Individual card elements must use `min-h-0`:**
```tsx
<div className={cls("card p-6 rounded-theme-capped h-full min-h-0")}>
  {/* Product content */}
</div>
```

This prevents height conflicts and ensures proper flex behavior.

## Carousel Modes

### carouselMode Prop

```tsx
carouselMode?: "auto" | "buttons"
```

- **`"auto"`** - Auto-scrolling carousel (uses AutoCarousel with embla-carousel-auto-scroll)
- **`"buttons"`** - Button-controlled carousel (uses ButtonCarousel with prev/next buttons)

**Default is typically `"buttons"`** for better accessibility and user control.

## TextBox Integration

CardStack components integrate with TextBox for section headers.

### TextBox Layout Options

```tsx
import type { TextboxLayout } from "@/providers/themeProvider/config/constants";

textboxLayout: TextboxLayout // "default" | "split" | "split-actions" | "split-description" | "inline-image"
```

**Layout Modes:**

1. **`"default"`** - Title and description stacked vertically, centered or left-aligned
   ```
   [Tag]
   Title
   Description
   [Buttons]
   ```

2. **`"split"`** - Title and description on left (60%), buttons on right (40%)
   ```
   [Tag]
   Title | Description    |  [Buttons]
   ```

3. **`"split-actions"`** - Title and description on left, buttons on right (no description on right)
   ```
   [Tag]
   Title                   |  [Buttons]
   Description             |
   ```

4. **`"split-description"`** - Title on left, description on right, buttons below
   ```
   [Tag]
   Title                   |  Description
   [Buttons]
   ```

5. **`"inline-image"`** - Centered heading with inline images between text segments, buttons below
   ```
   Text [Image] Text [Image] Text
   [Buttons]
   ```

   **Special props for inline-image layout:**
   ```tsx
   import type { TitleSegment } from "@/components/cardStack/types";

   titleSegments?: TitleSegment[] // Array of text and image segments
   titleImageWrapperClassName?: string // Styling for image wrapper
   titleImageClassName?: string // Styling for the image itself
   ```

   **Example usage:**
   ```tsx
   <FeatureCardOne
     titleSegments={[
       { type: "text", content: "Discover" },
       { type: "image", src: "/icon.png", alt: "Icon" },
       { type: "text", content: "powerful features" }
     ]}
     textboxLayout="inline-image"
     // ... other props
   />
   ```

   **Inline Image Behavior:**
   - Images are styled with `primary-button` background
   - Automatic rotation alternation: 1st: -rotate-12, 2nd: rotate-12, etc.
   - Square aspect ratio (1.1em height)
   - Proper spacing with mx-1 margins
   - Supports both local paths and external URLs

### TextBox Props in CardStack

```tsx
<CardStack
  title="Our Products"
  titleSegments={[
    { type: "text", content: "Our" },
    { type: "image", src: "/icon.png", alt: "Product Icon" },
    { type: "text", content: "Products" }
  ]} // Optional: use titleSegments for inline-image layout
  description="Discover our latest offerings"
  tag="Products"
  tagIcon={Package}
  buttons={[
    { text: "View All", href: "/products" }
  ]}
  textboxLayout="split" // or "inline-image" with titleSegments
  useInvertedBackground="noInvert" // "noInvert" | "invertDefault"
  // TextBox className overrides
  textBoxClassName=""
  titleClassName=""
  titleImageWrapperClassName="" // For inline-image layout
  titleImageClassName="" // For inline-image layout
  descriptionClassName=""
  tagClassName=""
  buttonContainerClassName=""
  buttonClassName=""
  buttonTextClassName=""
  // ... other props
>
```

## Button System

### ButtonConfig Interface

```tsx
interface ButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  props?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
  // NO variant property - controlled by ThemeProvider
}
```

### Button Rendering Logic

Buttons are rendered with automatic primary/secondary styling:

- **Index 0**: Primary button (`primary-button` class)
- **Index 1+**: Secondary button (`secondary-button` class)

**Maximum 2 buttons** per section (enforced in TextBox component).

```tsx
const buttons: ButtonConfig[] = [
  { text: "Get Started", href: "/signup" },     // Primary
  { text: "Learn More", onClick: () => {} }      // Secondary
];
```

The `variant` is determined by ThemeProvider's `defaultButtonVariant` setting.

## Complete CardStack Section Example

```tsx
"use client";

import React, { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import { cls } from "@/lib/utils";
import type { GridVariant, ButtonConfig } from "@/components/cardStack/types";
import type { LucideIcon } from "lucide-react";

type Product = {
  title: string;
  description: string;
  price: string;
  image: string;
};

interface ProductCardOneProps {
  products: Product[];
  carouselMode?: "auto" | "buttons";
  gridVariant: GridVariant;
  uniformGridCustomHeightClasses?: string;
  title: string;
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  buttons?: ButtonConfig[];
  textboxLayout: "default" | "split" | "split-actions" | "split-description";
  ariaLabel?: string;
  // Main wrapper
  className?: string;
  // CardStack customization
  cardStackClassName?: string;
  // TextBox customization
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonsWrapperClassName?: string;
  // Card customization
  cardClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  cardPriceClassName?: string;
  cardImageClassName?: string;
}

const ProductCardOne = ({
  products,
  carouselMode = "buttons",
  gridVariant,
  uniformGridCustomHeightClasses = "min-h-80 2xl:min-h-90",
  title,
  description,
  tag,
  tagIcon,
  buttons,
  textboxLayout,
  ariaLabel = "Product section",
  className = "",
  cardStackClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonsWrapperClassName = "",
  cardClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  cardPriceClassName = "",
  cardImageClassName = "",
}: ProductCardOneProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className={cls("w-full py-20", className)}
    >
      <div className="w-content-width mx-auto">
        <CardStack
          mode={carouselMode}
          gridVariant={gridVariant}
          uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
          title={title}
          description={description}
          tag={tag}
          tagIcon={tagIcon}
          buttons={buttons}
          textboxLayout={textboxLayout}
          className={cardStackClassName}
          textBoxClassName={textBoxClassName}
          titleClassName={titleClassName}
          descriptionClassName={descriptionClassName}
          tagClassName={tagClassName}
          buttonsWrapperClassName={buttonsWrapperClassName}
        >
          {products.map((product, index) => (
            <div
              key={`${product.title}-${index}`}
              className={cls(
                "card p-6 rounded-theme-capped h-full min-h-0 flex flex-col",
                cardClassName
              )}
            >
              <img
                src={product.image}
                alt={product.title}
                className={cls("w-full h-48 object-cover mb-4", cardImageClassName)}
              />
              <h3 className={cls("text-xl font-semibold mb-2", cardTitleClassName)}>
                {product.title}
              </h3>
              <p className={cls("text-foreground/75 flex-1", cardDescriptionClassName)}>
                {product.description}
              </p>
              <p className={cls("text-2xl font-bold mt-4", cardPriceClassName)}>
                {product.price}
              </p>
            </div>
          ))}
        </CardStack>
      </div>
    </section>
  );
};

ProductCardOne.displayName = "ProductCardOne";

export default memo(ProductCardOne);
```

## Animation Types

CardStack supports GSAP-powered scroll-triggered animations:

```tsx
animationType?: "none" | "opacity" | "slide-up" | "scale-rotate" | "blur-reveal"
```

**Animation Descriptions:**
- **`none`** - No animation
- **`opacity`** - Fade in
- **`slide-up`** - Slide up from below with stagger
- **`scale-rotate`** - Scale + rotate entrance with stagger
- **`blur-reveal`** - Blur to clear reveal with stagger

Each animation uses GSAP ScrollTrigger with staggered effect on children.

## Best Practices

### ✅ DO:

- Accept `uniformGridCustomHeightClasses` as optional prop with sensible default
- Use `min-h-0` on individual card elements for proper flex behavior
- Pass through all CardStack customization props (className overrides)
- Use appropriate default height for your component type
- Document the default value in registry propsSchema
- Provide className props for all card sub-elements
- Use `card` class for consistent card styling (theme-aware)
- Use `rounded-theme-capped` for card border radius
- Set `carouselMode` default to `"buttons"` for accessibility

### ❌ DO NOT:

- Hardcode height classes in CardStack (let it be controlled via prop)
- Remove the `uniformGridCustomHeightClasses` prop without specific reason
- Use different height classes for grid vs carousel (they should match)
- Forget to apply `min-h-0` on card wrapper divs
- Specify button `variant` in ButtonConfig (controlled by ThemeProvider)
- Create more than 2 buttons per section
- Use `lg:` or `xl:` breakpoints for layout changes

## CardStack Component Checklist

When creating a new CardStack-based section component:

### Props & Configuration
- [ ] Accept `uniformGridCustomHeightClasses` prop with appropriate default
- [ ] Accept `carouselMode` prop (default: `"buttons"`)
- [ ] Accept `gridVariant` as required prop (or hardcode if single variant)
- [ ] Accept `textboxLayout` for TextBox configuration
- [ ] Accept `animationType` for scroll animations (optional)

### CardStack Integration
- [ ] Pass `uniformGridCustomHeightClasses` to CardStack
- [ ] Pass all TextBox props (title, description, tag, tagIcon, buttons)
- [ ] Pass all TextBox className overrides
- [ ] Pass cardStackClassName for CardStack wrapper customization

### Card Implementation
- [ ] Apply `min-h-0` to individual card wrapper divs
- [ ] Use `card` class for card background/border styling
- [ ] Use `rounded-theme-capped` for border radius
- [ ] Provide className override props for all card sub-elements
- [ ] Use `h-full` on cards for consistent heights within grid

### Button System
- [ ] Use ButtonConfig type for buttons array
- [ ] Do NOT specify variant in ButtonConfig
- [ ] Maximum 2 buttons
- [ ] Let ThemeProvider control button variant

### Section Structure
- [ ] Use semantic `<section>` tag with aria-label
- [ ] Use `w-full py-20` on section
- [ ] Use `w-content-width mx-auto` wrapper
- [ ] Provide section className override

### Documentation
- [ ] Document `uniformGridCustomHeightClasses` default in registry
- [ ] Document all grid variants supported
- [ ] Document carousel mode options
- [ ] Include usage example with typical props
