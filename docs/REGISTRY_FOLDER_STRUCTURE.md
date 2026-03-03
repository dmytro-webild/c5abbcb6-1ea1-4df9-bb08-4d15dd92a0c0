# Registry Folder Structure

This document explains the new folder-based registry structure in `/registry/` and how to work with it.

## Folder Overview

```
registry/
├── index.json           # Quick lookup index for all components
├── intents.json         # Intent-based component grouping
├── components/          # Full component documentation
│   ├── HeroBillboard.json
│   ├── FeatureCardOne.json
│   └── ...
└── schemas/             # Simplified prop schemas
    ├── HeroBillboard.schema.json
    ├── FeatureCardOne.schema.json
    └── ...
```

## File Purposes

### index.json

**Quick lookup index** for component discovery and selection.

**Use case:** AI builders use this to find the right component for a given intent.

```json
{
  "HeroBillboard": {
    "category": "hero",
    "intent": "hero with media",
    "bestFor": ["landing pages", "feature showcases", "capability displays"],
    "avoidWhen": ["multiple items"],
    "requires": ["buttons?[]"],
    "import": "@/components/sections/hero/HeroBillboard"
  }
}
```

**Fields:**
- `category` - Component category (hero, feature, pricing, team, etc.)
- `intent` - Primary use case
- `bestFor` - Ideal scenarios for this component
- `avoidWhen` - When NOT to use this component
- `requires` - Required prop arrays (use `?[]` for optional)
- `import` - Import path for the component

---

### intents.json

**Intent-based grouping** for semantic component discovery.

**Use case:** AI builders use this to find all components that match a specific intent.

```json
{
  "hero with media": [
    "HeroBillboard",
    "HeroBillboardCarousel",
    "HeroSplit",
    "HeroOverlay"
  ],
  "feature showcase": [
    "FeatureCardOne",
    "FeatureCardThree",
    "FeatureBento"
  ],
  "testimonials": [
    "TestimonialCardOne",
    "TestimonialCardTwo"
  ]
}
```

**Common intents:**
- `hero with media` - Hero sections with images/videos
- `feature showcase` - Feature display sections
- `testimonials` - Customer testimonial sections
- `sequential process` - Step-by-step or timeline sections
- `metrics display` - Statistics and KPI sections
- `contact form` - Contact and CTA sections
- `pricing plans` - Pricing tier sections

---

### components/*.json

**Full component documentation** with constraints, examples, and rules.

**Use case:** AI builders use this for detailed implementation guidance.

```json
{
  "name": "HeroBillboard",
  "description": "Full-width hero section with centered text content...",
  "constraints": {
    "textRules": {
      "title": {
        "required": true,
        "example": "Welcome to Our Platform",
        "minChars": 2,
        "maxChars": 36
      }
    },
    "mediaRules": {...},
    "buttonRules": {...}
  },
  "propsSchema": {
    "title": "string",
    "description": "string",
    "tag?": "string",
    "tagAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
    "buttons?": "Array<{text: string, onClick?: () => void, href?: string}>",
    "buttonAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
    "mediaAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'"
  },
  "usageExample": "<HeroBillboard title=\"...\" ... />",
  "do": ["Use for landing pages", "Use for feature showcases"],
  "dont": ["Do not use multiple items"],
  "editRules": {
    "textOnly": true,
    "layoutLocked": true,
    "styleLocked": true
  }
}
```

**Sections:**
- `name` - Component name
- `description` - Brief component description
- `constraints` - Text length limits, media rules, button rules
- `propsSchema` - All props with types and defaults
- `usageExample` - Complete usage example with ThemeProvider
- `do` - Recommended use cases
- `dont` - Anti-patterns to avoid
- `editRules` - What can/cannot be customized

---

### schemas/*.schema.json

**Simplified prop schemas** for quick reference.

**Use case:** AI builders use this for prop validation and code generation.

```json
{
  "name": "HeroBillboard",
  "propsSchema": {
    "title": "string",
    "description": "string",
    "background": "{ variant: 'plain' | 'animated-grid' | ... } (required)",
    "tag?": "string",
    "tagIcon?": "LucideIcon",
    "tagAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
    "buttons?": "Array<{text: string, onClick?: () => void, href?: string}>",
    "buttonAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
    "mediaAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
    "className?": "string",
    "containerClassName?": "string",
    "titleClassName?": "string"
  }
}
```

**Note:** Schema files include ALL className props while component files may omit them for brevity.

---

## When to Update Each File

### Adding a New Component

1. Add entry to `index.json` with category, intent, bestFor, avoidWhen, requires, import
2. Add component name to appropriate intent(s) in `intents.json`
3. Create `components/ComponentName.json` with full documentation
4. Create `schemas/ComponentName.schema.json` with prop schema

### Adding a New Prop

1. Update `components/ComponentName.json` propsSchema
2. Update `schemas/ComponentName.schema.json` propsSchema
3. If prop affects usage, update `usageExample` in component file

### Modifying Constraints

1. Only update `components/ComponentName.json` constraints section

### Changing Component Intent/Category

1. Update `index.json` entry
2. Move component name between arrays in `intents.json`

---

## Common Prop Patterns

### Animation Props

All animation props follow the same pattern:

```json
"tagAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
"buttonAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'",
"mediaAnimation?": "'none' | 'opacity' | 'slide-up' | 'blur-reveal'"
```

### Background Props

Hero sections use background variant:

```json
"background": "{ variant: 'plain' | 'animated-grid' | 'canvas-reveal' | 'cell-wave' | 'downward-rays-animated' | ... } (required)"
```

### Button Config

Standard button array structure:

```json
"buttons?": "Array<{text: string, onClick?: () => void, href?: string}>"
```

### ClassName Props

Always include standard className props in schema files:

```json
"className?": "string",
"containerClassName?": "string",
"textBoxClassName?": "string",
"titleClassName?": "string",
"descriptionClassName?": "string",
"tagClassName?": "string",
"buttonContainerClassName?": "string",
"buttonClassName?": "string",
"buttonTextClassName?": "string",
"mediaWrapperClassName?": "string",
"imageClassName?": "string"
```

---

## Validation Checklist

When updating registry files:

### index.json
- [ ] Category matches component type
- [ ] Intent matches primary use case
- [ ] bestFor list is comprehensive
- [ ] avoidWhen captures real limitations
- [ ] requires uses `?[]` for optional arrays
- [ ] import path is correct

### intents.json
- [ ] Component is listed under correct intent(s)
- [ ] No duplicate entries
- [ ] Intent names are consistent

### components/*.json
- [ ] name matches filename
- [ ] description is concise
- [ ] constraints have realistic examples
- [ ] propsSchema matches component interface
- [ ] usageExample is valid JSX
- [ ] do/dont provide useful guidance
- [ ] editRules are accurate

### schemas/*.schema.json
- [ ] name matches filename
- [ ] propsSchema matches component file
- [ ] All className props included
- [ ] Optional props use `?` suffix
- [ ] Defaults noted with `(default: value)`

---

## Quick Reference: File Relationships

```
Component: HeroBillboard

registry/
├── index.json
│   └── "HeroBillboard": { category, intent, bestFor, ... }
│
├── intents.json
│   └── "hero with media": ["HeroBillboard", ...]
│
├── components/HeroBillboard.json
│   └── Full documentation with constraints, examples, rules
│
└── schemas/HeroBillboard.schema.json
    └── Simplified propsSchema for code generation
```
