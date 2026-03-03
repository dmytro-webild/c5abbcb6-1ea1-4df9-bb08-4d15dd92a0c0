# Preview Page Standards

This document outlines how to create preview pages for components in `/app/components/`.

## Purpose

Preview pages allow developers and AI builders to:
- See components in isolation
- Test component behavior and styling
- Verify responsive design
- Experiment with different prop configurations
- Ensure smooth scrolling and theme integration

## File Structure

### Location Pattern

```
/app/components/
  ├── sections/
  │   ├── hero/
  │   │   ├── billboard/
  │   │   │   └── page.tsx          // Preview for HeroBillboard
  │   │   ├── split/
  │   │   │   └── page.tsx          // Preview for HeroSplit
  │   ├── feature/
  │   │   ├── card-one/
  │   │   │   └── page.tsx          // Preview for FeatureCardOne
  ├── buttons/
  │   ├── text-stagger/
  │   │   └── page.tsx              // Preview for ButtonTextStagger
  └── page.tsx                      // Main components index
```

**Pattern:** `/app/components/[category]/[component-name]/page.tsx`

**Component name formatting:**
- Use kebab-case for folder names
- `HeroBillboard` → `hero/billboard/`
- `FeatureCardOne` → `feature/card-one/`
- `ButtonTextStagger` → `buttons/text-stagger/`

## Preview Page Template

### Basic Template (Non-Section Components)

```tsx
"use client";

import React from "react";
import ReactLenis from "lenis/react";
import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import ComponentName from "@/components/category/ComponentName";

export default function ComponentPreviewPage() {
  return (
    <ThemeProvider
      defaultButtonVariant="text-stagger"
      defaultTextAnimation="entrance-slide"
      borderRadius="rounded"
      contentWidth="medium"
      sizing="medium"
      background="plain"
      cardStyle="glass-flat"
      primaryButtonStyle="gradient"
      secondaryButtonStyle="glass"
      headingFontWeight="medium"
    >
      <ReactLenis root>
        <ComponentName
          // Add realistic props here
          text="Example"
          onClick={() => console.log("clicked")}
        />
      </ReactLenis>
    </ThemeProvider>
  );
}
```

### Section Component Template

```tsx
"use client";

import React from "react";
import ReactLenis from "lenis/react";
import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import SectionName from "@/components/sections/category/SectionName";

export default function SectionPreviewPage() {
  return (
    <ThemeProvider
      defaultButtonVariant="icon-arrow"
      defaultTextAnimation="entrance-slide"
      borderRadius="pill"
      contentWidth="medium"
      sizing="medium"
      background="animatedGrid"
      cardStyle="glass-flat"
      primaryButtonStyle="gradient"
      secondaryButtonStyle="glass"
      headingFontWeight="medium"
    >
      <ReactLenis root>
        <SectionName
          title="Preview Section Title"
          description="This is a preview of the section component with example content."
          buttons={[
            { text: "Get Started", href: "#" },
            { text: "Learn More", onClick: () => console.log("Learn more") }
          ]}
          // Add section-specific props
        />
      </ReactLenis>
    </ThemeProvider>
  );
}
```

### CardStack Section Template

```tsx
"use client";

import React from "react";
import ReactLenis from "lenis/react";
import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import { Package, Zap, Shield, Sparkles } from "lucide-react";
import FeatureCardOne from "@/components/sections/feature/FeatureCardOne";

export default function FeatureCardOnePreviewPage() {
  const features = [
    {
      icon: Package,
      title: "Feature One",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      icon: Zap,
      title: "Feature Two",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
      icon: Shield,
      title: "Feature Three",
      description: "Ut enim ad minim veniam, quis nostrud exercitation."
    },
    {
      icon: Sparkles,
      title: "Feature Four",
      description: "Duis aute irure dolor in reprehenderit in voluptate."
    }
  ];

  return (
    <ThemeProvider
      defaultButtonVariant="icon-arrow"
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
      <ReactLenis root>
        <FeatureCardOne
          features={features}
          gridVariant="uniform-all-items-equal"
          textboxLayout="default"
          title="Our Features"
          description="Discover what makes us unique"
          tag="Features"
          tagIcon={Sparkles}
          buttons={[
            { text: "View All", href: "#" }
          ]}
        />
      </ReactLenis>
    </ThemeProvider>
  );
}
```

## Critical Requirements

### Wrapper Order

**MUST follow this order:**

```tsx
<ThemeProvider>
  <ReactLenis root>
    <Component />
  </ReactLenis>
</ThemeProvider>
```

**❌ WRONG:**
```tsx
<ReactLenis root>
  <ThemeProvider>
    <Component />
  </ThemeProvider>
</ReactLenis>
```

ReactLenis must be **inside** ThemeProvider, not outside.

### "use client" Directive

All preview pages must include `"use client"` at the top:

```tsx
"use client";

import React from "react";
// ...
```

This is required because:
- ReactLenis uses client-side hooks
- ThemeProvider uses React Context
- Components may use interactive features

### ReactLenis Root Prop

Always include the `root` prop:

```tsx
<ReactLenis root>
  {/* components */}
</ReactLenis>
```

This enables page-wide smooth scrolling.

## Theme Configuration

### Recommended Defaults

**For most previews:**
```tsx
<ThemeProvider
  defaultButtonVariant="icon-arrow"
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
```

**For button previews:**
```tsx
<ThemeProvider
  defaultButtonVariant="text-stagger"  // Match button being previewed
  defaultTextAnimation="entrance-slide"
  borderRadius="pill"
  contentWidth="medium"
  sizing="medium"
  background="plain"
  cardStyle="glass-flat"
  primaryButtonStyle="gradient"
  secondaryButtonStyle="glass"
  headingFontWeight="medium"
>
```

**For hero previews:**
```tsx
<ThemeProvider
  defaultButtonVariant="icon-arrow"
  defaultTextAnimation="entrance-slide"
  borderRadius="rounded"
  contentWidth="large"  // Wider for heroes
  sizing="large"        // Larger sizing for heroes
  background="aurora"   // Visual background
  cardStyle="glass-flat"
  primaryButtonStyle="gradient"
  secondaryButtonStyle="glass"
  headingFontWeight="semibold"  // Bolder for heroes
>
```

### When to Customize

Customize theme settings when:
- Testing different button variants
- Showcasing card styles
- Demonstrating responsive behavior
- Highlighting specific theme features

## Realistic Props

### Use Realistic Content

**✅ GOOD:**
```tsx
<HeroBillboard
  title="Build Amazing Websites Faster"
  description="Create stunning, responsive websites with our modern component library. Ship faster, iterate quicker."
  buttons={[
    { text: "Get Started", href: "/signup" },
    { text: "View Demo", onClick: () => window.open("/demo") }
  ]}
/>
```

**❌ BAD:**
```tsx
<HeroBillboard
  title="Test"
  description="Test description"
  buttons={[
    { text: "Click", href: "#" }
  ]}
/>
```

### Sample Data Patterns

**Features:**
```tsx
const features = [
  {
    icon: Package,
    title: "Fast Shipping",
    description: "Get your order delivered within 2-3 business days."
  },
  // ... more features
];
```

**Products:**
```tsx
const products = [
  {
    title: "Premium Headphones",
    description: "Wireless noise-cancelling headphones with 30-hour battery life.",
    price: "$299",
    image: "/images/headphones.jpg"
  },
  // ... more products
];
```

**Testimonials:**
```tsx
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "This component library transformed our development workflow. Highly recommend!",
    image: "/images/avatar-1.jpg",
    rating: 5
  },
  // ... more testimonials
];
```

## Multiple Sections Example

Preview pages can show multiple components together:

```tsx
"use client";

import React from "react";
import ReactLenis from "lenis/react";
import { ThemeProvider } from "@/providers/themeProvider/ThemeProvider";
import HeroBillboard from "@/components/sections/hero/HeroBillboard";
import FeatureCardOne from "@/components/sections/feature/FeatureCardOne";
import Footer from "@/components/sections/footer/FooterBase";

export default function FullPagePreview() {
  return (
    <ThemeProvider
      defaultButtonVariant="icon-arrow"
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
      <ReactLenis root>
        <HeroBillboard {...heroProps} />
        <FeatureCardOne {...featureProps} />
        <Footer {...footerProps} />
      </ReactLenis>
    </ThemeProvider>
  );
}
```

## Preview Page Checklist

### File Setup
- [ ] Create in correct location: `/app/components/[category]/[component-name]/page.tsx`
- [ ] Use kebab-case for folder names
- [ ] Add `"use client"` directive at top
- [ ] Export default function with descriptive name

### Wrapper Configuration
- [ ] Wrap in ThemeProvider (outer)
- [ ] Wrap in ReactLenis with `root` prop (inner)
- [ ] Correct order: ThemeProvider > ReactLenis > Component
- [ ] Import both wrappers

### Component Props
- [ ] Use realistic, representative content
- [ ] Include all required props
- [ ] Test with typical prop combinations
- [ ] Use proper TypeScript types (no `any`)

### Theme Settings
- [ ] Configure appropriate theme settings for component type
- [ ] Use sensible defaults that showcase the component well
- [ ] Test with different theme configurations if needed

### Quality Checks
- [ ] Component renders without errors
- [ ] Smooth scrolling works
- [ ] Responsive design functions correctly
- [ ] Animations trigger properly
- [ ] No console warnings or errors

## Common Patterns

### Background for Preview

If the component needs a background color to be visible:

```tsx
<ReactLenis root>
  <div className="min-h-screen bg-background">
    <Component {...props} />
  </div>
</ReactLenis>
```

### Centered Preview

For small components that need centering:

```tsx
<ReactLenis root>
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Component {...props} />
  </div>
</ReactLenis>
```

### Multiple Variants

Show multiple variants of the same component:

```tsx
<ReactLenis root>
  <div className="min-h-screen bg-background py-20 space-y-20">
    <ComponentName variant="primary" {...props} />
    <ComponentName variant="secondary" {...props} />
    <ComponentName variant="ghost" {...props} />
  </div>
</ReactLenis>
```

## Best Practices

### ✅ DO:

- Use realistic, production-quality content
- Test responsive behavior
- Include all ThemeProvider configuration
- Use ReactLenis for smooth scrolling
- Follow naming conventions (kebab-case folders)
- Include required props only (let optional props use defaults)
- Test with different theme settings

### ❌ DO NOT:

- Use placeholder text like "Lorem ipsum" (use realistic content)
- Skip ThemeProvider or ReactLenis
- Put ReactLenis outside ThemeProvider
- Use hardcoded colors that break theming
- Create overly complex multi-component demos (keep focused)
- Forget "use client" directive
- Use incorrect folder structure
