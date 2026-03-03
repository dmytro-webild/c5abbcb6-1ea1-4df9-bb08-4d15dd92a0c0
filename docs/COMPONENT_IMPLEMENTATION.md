# Component Implementation Standards

This document outlines the core implementation patterns for creating components in this library, optimized for AI website builders.

## Component Structure Template

Every component should follow this structure:

```tsx
"use client";

import React from "react";
import { cls } from "@/lib/utils";

interface ComponentProps {
  // Required props first
  text: string;
  // Optional props with explicit types
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const Component = ({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: ComponentProps) => {
  return (
    <element
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls("base-classes", "disabled-states", className)}
    >
      {text}
    </element>
  );
};

Component.displayName = "Component";

export default React.memo(Component);
```

**Key Requirements:**
- `"use client"` directive when needed (interactive components, hooks)
- Named exports with `displayName` for debugging
- Wrap in `React.memo()` for performance optimization
- Use `cls()` utility for class composition (never plain string concatenation)

## Prop Structure & Defaults

### Required Props
Core content props should be **required** with no default values:
- Section components: `title`, `description`
- Button components: `text`
- Media components: `imageSrc` or `videoSrc` (when applicable)

### Optional Props with Defaults

**Standard className defaults:**
```tsx
className = "",
textClassName = "",
iconClassName = "",
containerClassName = "",
```

Empty string defaults prevent undefined checks and are standard practice.

**Common optional props:**
```tsx
disabled = false,
type = "button",
ariaLabel,  // No default, falls back to sensible value in component
```

**Component-specific props:**
Document defaults clearly in both code and registry:
```tsx
strengthFactor = 20,
carouselMode = "buttons",
uniformGridCustomHeightClasses = "min-h-80 2xl:min-h-90",
```

## Naming Conventions

### Section Components (Hero, About, Feature, etc.)

**✅ CORRECT:**
```tsx
interface HeroProps {
  title: string;           // Primary heading
  description: string;     // Supporting text
  buttons?: ButtonConfig[];
}
```

**❌ WRONG:**
```tsx
interface HeroProps {
  heading: string;         // Should be "title"
  subtitle: string;        // Should be "description"
  text: string;            // Ambiguous
}
```

### Button Components

**✅ CORRECT:**
```tsx
interface ButtonProps {
  text: string;            // Button label
  onClick?: () => void;
}
```

**❌ WRONG:**
```tsx
interface ButtonProps {
  title: string;           // Should be "text"
  label: string;           // Should be "text"
}
```

### Button Config (for sections)

```tsx
interface ButtonConfig {
  text: string;            // Button label (not "title" or "label")
  href?: string;
  onClick?: () => void;
  props?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
  // NO variant property - controlled by ThemeProvider
}
```

**Consistency is critical:**
- All hero sections must use the same prop names
- All about sections must use the same prop names
- Registry documentation must match component prop names exactly

## Component Customizability

Provide className props for **all major elements** to allow full styling control:

```tsx
interface SectionProps {
  title: string;
  description: string;
  // Main wrapper
  className?: string;
  // Inner container
  containerClassName?: string;
  // Content areas
  textClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
}

const Section = ({
  title,
  description,
  className = "",
  containerClassName = "",
  textClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
}: SectionProps) => {
  return (
    <section className={cls("base-section-styles", className)}>
      <div className={cls("base-container-styles", containerClassName)}>
        <div className={cls("base-text-styles", textClassName)}>
          {/* content */}
        </div>
        <div className={cls("base-media-wrapper-styles", mediaWrapperClassName)}>
          <img className={cls("base-image-styles", imageClassName)} />
        </div>
      </div>
    </section>
  );
};
```

**Naming convention:**
- `className` - Main wrapper element
- `containerClassName` - Inner container
- `[element]ClassName` - Specific elements (e.g., `textClassName`, `imageClassName`)

## Component Composition & Base Styles

When composing higher-level components from base components, **set sensible base styles** while accepting className overrides:

```tsx
interface HeroProps {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  textBoxClassName?: string;
}

const Hero = ({
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
  textBoxClassName = "",
}: HeroProps) => {
  return (
    <section>
      <TextBox
        title={title}
        description={description}
        // Set base styles, allow overrides
        className={cls("flex flex-col gap-3 md:gap-1", textBoxClassName)}
        titleClassName={cls("text-6xl font-medium", titleClassName)}
        descriptionClassName={cls("text-lg leading-[1.2]", descriptionClassName)}
        center={true}
      />
    </section>
  );
};
```

**Key principles:**
- Base styles come first in `cls()`, overrides second
- This ensures good defaults while maintaining full customizability
- AI builders can use components without styling knowledge, but advanced users can override
- Use `cls()` utility for proper class merging (prevents Tailwind conflicts)

## Type Safety

### Use Explicit Prop Interfaces
```tsx
// ✅ CORRECT - Clear and explicit
interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

// ❌ WRONG - Over-complicated
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  // ... harder for AI to understand
}
```

### Use Discriminated Unions for Variants
```tsx
type MediaProps =
  | {
      imageSrc: string;
      imageAlt?: string;
      videoSrc?: never;
    }
  | {
      videoSrc: string;
      videoAriaLabel?: string;
      imageSrc?: never;
    };
```

### Export Reusable Types
```tsx
export type ButtonConfig = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export type GridVariant =
  | "uniform-all-items-equal"
  | "two-columns-alternating-heights"
  | "asymmetric-60-wide-40-narrow"
  // ... etc
```

## Responsive Design

### Mobile-First Approach

**Default styles apply to mobile devices:**
```tsx
// ✅ CORRECT - Mobile until md breakpoint (768px)
<div className="flex-col md:flex-row">
  <img className="w-full h-auto md:h-8 md:w-auto" />
</div>

// ❌ WRONG - Using lg: breakpoint
<div className="flex-col lg:flex-row">
  <img className="w-full h-auto lg:h-8 lg:w-auto" />
</div>
```

**Breakpoint Rules:**
- **Mobile styles**: No prefix (default)
- **Desktop styles**: `md:` prefix only (768px breakpoint)
- **Never use**: `lg:`, `xl:`, `2xl:` breakpoints for layout changes

**Exceptions:** Only use larger breakpoints for minor tweaks:
```tsx
// Acceptable for minor adjustments
className="min-h-80 2xl:min-h-90"
```

## Content Width Pattern

All section content must follow this structure:

```tsx
<section aria-label={ariaLabel || "Section name"} className="w-full py-20">
  <div className="w-content-width mx-auto">
    {/* content */}
  </div>
</section>
```

**Rules:**
- Section: `w-full py-20` (full width with vertical padding)
- Inner div: `w-content-width mx-auto` (centered content with max width)
- `w-content-width` is controlled by ThemeProvider (small/medium/large)

**Exceptions:**
- Heroes and footers do NOT use `py-20` (they have custom spacing)
- Full-bleed sections may skip inner wrapper

## Vertical Spacing

**Standard sections:**
```tsx
className="w-full py-20"
```

**Exceptions (NO py-20):**
- Hero sections (custom spacing)
- Footer sections (custom spacing)
- Full-bleed sections with background colors

## Text Constraints

For button text and short labels:
```tsx
{
  "text": {
    "required": true,
    "example": "Get Started",
    "minChars": 2,
    "maxChars": 15
  }
}
```

**Button text rules:**
- Minimum: 2 characters
- Maximum: 15 characters
- Single-line only (no multiline support)

## Section Structure Pattern

```tsx
<section
  aria-label={ariaLabel || "Default section label"}
  className={cls(
    "relative py-20 w-full",
    useInvertedBackground === "invertDefault" && "bg-foreground",
    className
  )}
>
  <div className="w-content-width mx-auto">
    <TextBox
      title={title}
      description={description}
      tag={tag}
      tagIcon={tagIcon}
      buttons={buttons}
      textboxLayout={textboxLayout}
      useInvertedBackground={useInvertedBackground}
      // ... className overrides
    />

    {/* Section-specific content */}
  </div>
</section>
```

**Key Pattern Notes:**
- `useInvertedBackground` is a required prop: `"noInvert" | "invertDefault"`
- `"invertDefault"` creates a full-width inverted section with `bg-foreground`
- `"noInvert"` is the standard section with no background
- Always use explicit string equality checks (not truthy/falsy)
- Text colors should check for `"invertDefault"` mode

## Implementation Checklist

### Core Requirements
- [ ] Add `"use client"` directive if needed (hooks, interactivity)
- [ ] Use explicit prop interfaces (no over-complicated types)
- [ ] Set appropriate defaults for optional props
- [ ] Add `displayName` for debugging
- [ ] Wrap in `React.memo()` for performance
- [ ] Use semantic HTML tags (`<section>`, `<button>`, etc.)

### Customizability
- [ ] Provide className props for all major elements
- [ ] Use `cls()` utility for class composition
- [ ] Set base styles with override capability
- [ ] Follow naming convention (className, containerClassName, [element]ClassName)

### Responsive Design
- [ ] Mobile-first styles (no prefix)
- [ ] Desktop styles with `md:` prefix only
- [ ] Avoid `lg:`, `xl:`, `2xl:` for layout changes
- [ ] Use `w-content-width mx-auto` pattern

### Naming Conventions
- [ ] Section components: Use `title` and `description`
- [ ] Button components: Use `text`
- [ ] Button configs: Use `text` (not variant - controlled by theme)
- [ ] Consistent naming across similar component types

### Structure
- [ ] Required props first in interface
- [ ] Optional props with defaults after
- [ ] Empty string defaults for className props
- [ ] Document default values clearly
