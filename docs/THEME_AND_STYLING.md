# Theme and Styling Standards

This document covers the centralized theme system, color theming, and styling patterns used throughout the component library.

## Theme Provider System

All sections and components use a centralized ThemeProvider to maintain consistent styling across the entire site.

### Location & Setup

**Import:**
```tsx
import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
```

**Usage:** Wrap the entire app/page (not individual sections) in a **single** ThemeProvider:

```tsx
export default function Page() {
  return (
    <ThemeProvider
      defaultButtonVariant="text-stagger"
      defaultTextAnimation="entrance-slide"
      borderRadius="rounded"
      contentWidth="medium"
      sizing="medium"
      background="animatedGrid"
      cardStyle="glass-flat"
      primaryButtonStyle="gradient"
      secondaryButtonStyle="glass"
      headingFontWeight="medium"
    >
      <HeroBillboard {...props} />
      <FeatureSection {...props} />
      <Footer {...props} />
    </ThemeProvider>
  );
}
```

### Theme Configuration Options

#### defaultButtonVariant
Controls the button style for ALL buttons in sections.

**Options:**
- `"text-stagger"` - Character stagger animation on hover (default)
- `"shift-hover"` - Text shifts on hover
- `"icon-arrow"` - Text + right arrow icon
- `"hover-magnetic"` - Cursor-tracking magnetic effect
- `"hover-bubble"` - Expanding circle on hover
- `"expand-hover"` - Width expansion on hover

#### defaultTextAnimation
Controls the text animation type for ALL text in sections.

**Options:**
- `"entrance-slide"` - Slide up from below (default)
- `"reveal-blur"` - Blur to clear reveal
- `"background-highlight"` - Background highlight effect

#### borderRadius
Controls border radius for buttons and cards.

**Options:**
- `"rounded"` - Standard rounded corners
- `"pill"` - Fully rounded (pill shape)
- `"sharp"` - No border radius

#### contentWidth
Controls the max width of section content.

**Options:**
- `"small"` - Narrow content width
- `"medium"` - Standard content width (default)
- `"large"` - Wide content width

Maps to `w-content-width` CSS class.

#### sizing
Controls spacing and size scale throughout components.

**Options:**
- `"small"` - Compact spacing
- `"medium"` - Standard spacing (default)
- `"large"` - Generous spacing

#### background
Default background pattern for the page.

**Options:**
- `"plain"` - Solid background color
- `"animatedGrid"` - Animated grid pattern
- `"aurora"` - Aurora gradient effect
- `"dotGrid"` - Dot grid pattern
- And more...

#### cardStyle
Visual style for all card components.

**Options:**
- `"glass-flat"` - Flat glass effect (default)
- `"glass-depth"` - Glass with depth/shadow
- `"glass-outline"` - Outlined glass
- `"solid-accent-light"` - Solid light accent
- `"outline"` - Simple outline
- `"elevated"` - Elevated shadow effect
- `"frosted"` - Frosted glass
- And more...

#### primaryButtonStyle
Style for primary buttons (first button in array).

**Options:**
- `"gradient"` - Gradient background
- `"solid"` - Solid color background
- `"glass"` - Glass effect
- `"outline"` - Outlined button

#### secondaryButtonStyle
Style for secondary buttons (second+ button in array).

**Options:**
- `"glass"` - Glass effect (default)
- `"outline"` - Outlined button
- `"solid"` - Solid color background
- `"gradient"` - Gradient background

#### headingFontWeight
Font weight for all headings.

**Options:**
- `"normal"` - Regular weight
- `"medium"` - Medium weight (default)
- `"semibold"` - Semi-bold weight
- `"bold"` - Bold weight

### Using Theme in Components

#### useTheme Hook

```tsx
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

const Component = () => {
  const theme = useTheme();

  // Access theme properties:
  // - theme.defaultButtonVariant
  // - theme.defaultTextAnimation
  // - theme.borderRadius
  // - theme.cardStyle
  // - theme.contentWidth
  // - theme.sizing
  // - theme.background
  // - theme.primaryButtonStyle
  // - theme.secondaryButtonStyle
  // - theme.headingFontWeight

  return <div>{/* component */}</div>;
};
```

#### TextBox Component Example

TextBox automatically applies theme defaults:

```tsx
const TextBox = ({ type, buttons, ...props }: TextBoxProps) => {
  const theme = useTheme();

  // Use default text animation from theme if not specified
  const animationType = type || theme.defaultTextAnimation;

  // Button variant comes from theme
  const variant = theme.defaultButtonVariant;

  // ...
};
```

### Important Rules

❌ **DO NOT:**
- Specify button `variant` in section button configs (controlled by ThemeProvider)
- Wrap individual sections in ThemeProvider (use ONE provider per site/page)
- Override theme defaults unless explicitly required by component design

✅ **DO:**
- Wrap the entire app/page in a single ThemeProvider
- Let all sections inherit theme defaults automatically
- Use `useTheme()` hook to access theme configuration
- Document when components don't follow theme defaults (with clear reason)

## Color & Theming

### CSS Custom Properties

**Always use CSS custom properties for colors** to ensure theme consistency:

```tsx
// ✅ CORRECT - Uses theme variables
<div className="bg-background text-foreground">
  <button className="bg-foreground text-background">Click me</button>
</div>

// ❌ WRONG - Hardcoded colors break theming
<div className="bg-white text-black">
  <button className="bg-black text-white">Click me</button>
</div>
```

### Standard Color Variables

**Background & Text:**
- `bg-background` - Main background color
- `text-foreground` - Main text color
- `bg-foreground` - Inverse background (for buttons, accents)
- `text-background` - Inverse text (for text on dark backgrounds)

**Cards & Surfaces:**
- `card` - Card/surface background with border (theme-aware)
- Maps to different styles based on `theme.cardStyle`

**Buttons:**
- `primary-button` - Primary button styling (index 0)
- `secondary-button` - Secondary button styling (index 1+)

**Opacity Modifiers:**
```tsx
text-foreground/75    // 75% opacity
text-background/50    // 50% opacity
bg-foreground/10      // 10% opacity
```

### When to Use Theme Colors

✅ **Always prefer theme variables:**
- Backgrounds, text, borders, shadows
- Ensures proper dark mode support
- Allows theme customization
- Maintains visual consistency

❌ **Only use hardcoded colors:**
- Very specific one-off cases with clear justification
- Decorative elements that shouldn't change with theme
- Must be documented in component comments

## Inverted Background Pattern

Section components support three modes for background styling, allowing flexible visual contrast and card-style layouts.

### Three Background Modes

**`"noInvert"`** - Standard background (default page background color)
- No background color applied to section
- Text uses standard `text-foreground` color
- Full-width section

**`"invertDefault"`** - Full-width inverted background
- Section gets `bg-foreground` background
- Text uses `text-background` color for contrast
- Full-width section with inverted colors

### Implementation Pattern

```tsx
import { cls } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

interface SectionProps {
  title: string;
  description: string;
  useInvertedBackground: "noInvert" | "invertDefault"; // Required
  // ... other props
}

const Section = ({
  title,
  description,
  useInvertedBackground,
  className = "",
  // ... other props
}: SectionProps) => {
  const theme = useTheme();

  return (
    <section
      className={cls(
        "relative py-20 w-full",
        useInvertedBackground === "invertDefault" && "bg-foreground",
        className
      )}
    >
      <div className="w-content-width mx-auto">
        <h1 className={cls(
          "text-6xl font-medium",
          useInvertedBackground === "invertDefault" && "text-background",
          titleClassName
        )}>
          {title}
        </h1>
        <p className={cls(
          "text-lg",
          useInvertedBackground === "invertDefault"
            ? "text-background/75"
            : "text-foreground/75",
          descriptionClassName
        )}>
          {description}
        </p>
      </div>
    </section>
  );
};
```

### Key Points

1. **Required Prop**: `useInvertedBackground` should be a required string union type (no `?`), forcing explicit choice
2. **Two Modes**: `"noInvert"`, `"invertDefault"`
3. **Section Width**: Always `w-full`
4. **Background Color**:
   - `"invertDefault"` → `bg-foreground`
   - `"noInvert"` → no background
5. **Text Colors**: Apply `text-background` or `text-background/75` for `"invertDefault"` mode
6. **Relative Positioning**: Section needs `relative` class for proper z-index stacking
7. **Conditional Logic**: Use explicit string equality checks (not truthy/falsy)

### Section className Pattern

**Standard pattern for all sections:**

```tsx
<section
  className={cls(
    "relative py-20 w-full",
    useInvertedBackground === "invertDefault" && "bg-foreground",
    className
  )}
>
```

### Text Color Pattern

**For text elements:**

```tsx
// Single check for invert mode:
useInvertedBackground === "invertDefault" && "text-background"

// Ternary for opacity variants:
useInvertedBackground === "invertDefault"
  ? "text-background/75"
  : "text-foreground/75"
```

### For Components with Cards (Advanced)

When a section contains cards with light backgrounds, use the `shouldUseInvertedText` utility:

```tsx
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

const SectionWithCards = ({
  useInvertedBackground,
  // ... other props
}: SectionProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(
    useInvertedBackground,
    theme.cardStyle
  );

  return (
    <section
      className={cls(
        "relative py-20 w-full",
        useInvertedBackground === "invertDefault" && "bg-foreground",
        className
      )}
    >
      {/* For elements inside cards or with card backgrounds */}
      <h3 className={cls(
        "text-xl",
        shouldUseLightText && "text-background",
        bulletTitleClassName
      )}>
        {point.title}
      </h3>
    </section>
  );
};
```

**What it does:**
The `shouldUseInvertedText` utility checks if:
- `useInvertedBackground` is `"invertDefault"` AND
- Current `cardStyle` is a "light" style (e.g., `glass-elevated`, `outline`, etc.)

This ensures text inside cards remains readable regardless of theme configuration.

### Width Classes Explained

**`w-content-width`** - Content container width
- Controlled by `theme.contentWidth` (small/medium/large)
- Used for inner content wrapper in all sections

## Content Width Pattern

All section content must use the `w-content-width` class:

```tsx
<section className="w-full py-20">
  <div className="w-content-width mx-auto">
    {/* content */}
  </div>
</section>
```

**What it does:**
- Controlled by `theme.contentWidth` (small/medium/large)
- Automatically adjusts max-width based on theme setting
- Centers content with `mx-auto`

## Section Spacing

**Standard sections:**
```tsx
className="w-full py-20"
```

Vertical padding of `py-20` (5rem = 80px) on top and bottom.

**Exceptions (NO py-20):**
- Hero sections (custom spacing based on design)
- Footer sections (custom spacing)
- Full-bleed sections with background colors/images

## Card Styling Pattern

Use the `card` class for all card components:

```tsx
<div className={cls("card p-6 rounded-theme-capped h-full min-h-0", cardClassName)}>
  {/* card content */}
</div>
```

**Classes explained:**
- `card` - Theme-aware background/border (maps to `theme.cardStyle`)
- `p-6` - Standard padding (1.5rem = 24px)
- `rounded-theme-capped` - Border radius from theme (respects `theme.borderRadius`)
- `h-full` - Fill parent height (for grid layouts)
- `min-h-0` - Prevent height conflicts (important for flex layouts)

## Border Radius Pattern

**For cards:**
```tsx
className="rounded-theme-capped"
```

**For buttons:**
```tsx
className="rounded-theme"
```

Both respect `theme.borderRadius` setting (rounded/pill/sharp).

## Button Styling Classes

**Primary button (first in array):**
```tsx
className="primary-button"
```

**Secondary button (second+ in array):**
```tsx
className="secondary-button"
```

These classes are theme-aware and map to:
- `theme.primaryButtonStyle` (gradient/solid/glass/outline)
- `theme.secondaryButtonStyle` (glass/outline/solid/gradient)

## Styling Checklist

### Color Usage
- [ ] Use `bg-background` and `text-foreground` for main colors
- [ ] Use `bg-foreground` and `text-background` for inverted sections
- [ ] Use `card` class for card backgrounds
- [ ] Use `primary-button` and `secondary-button` for buttons
- [ ] Avoid hardcoded colors (white, black, gray-X) unless justified

### Theme Integration
- [ ] Wrap app/page in single ThemeProvider
- [ ] Use `useTheme()` hook when needed
- [ ] Don't specify button variants in ButtonConfig
- [ ] Let TextBox inherit default text animation
- [ ] Use `w-content-width mx-auto` for content

### Inverted Background (if applicable)
- [ ] Accept `useInvertedBackground` as required string union: `"noInvert" | "invertDefault"`
- [ ] Add `relative` class to section
- [ ] Implement two-mode section className pattern (invertDefault with bg-foreground, noInvert standard)
- [ ] Apply `text-background` to text for `"invertDefault"` mode (not `"noInvert"`)
- [ ] Use explicit string equality checks (not truthy/falsy)
- [ ] Use `shouldUseInvertedText` for card content if needed

### Card Styling
- [ ] Use `card` class for theme-aware background
- [ ] Use `rounded-theme-capped` for border radius
- [ ] Include `min-h-0` for flex compatibility
- [ ] Provide `cardClassName` override prop

### Spacing
- [ ] Use `py-20` on sections (except hero/footer)
- [ ] Use `w-content-width mx-auto` wrapper
- [ ] Follow theme spacing guidelines
