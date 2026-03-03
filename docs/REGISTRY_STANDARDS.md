# Registry Documentation Standards

This document outlines how to document components in `registry.json` for AI website builders.

## Registry Structure

The registry is organized into two main sections:

```json
{
  "componentRegistry": {
    "button": [...],
    "text": [...],
    "navbar": [...],
    "layout": [...]
  },
  "sectionRegistry": {
    "hero": [...],
    "about": [...],
    "feature": [...],
    "testimonial": [...],
    "pricing": [...],
    "team": [...],
    "product": [...],
    "metrics": [...],
    "blog": [...],
    "footer": [...],
    "contact": [...],
    "faq": [...],
    "socialProof": [...]
  }
}
```

**componentRegistry** - Base/utility components (buttons, text, navbar, CardStack, etc.)
**sectionRegistry** - Section components (hero, about, feature, etc.)

## Component Entry Format

Every component entry must follow this structure:

```json
{
  "import": "import ComponentName from '@/components/category/ComponentName';",
  "name": "ComponentName",
  "path": "@/components/category/ComponentName",
  "description": "Brief one-line description of what the component is.",
  "details": "Longer description of when to use it, behavior, and constraints.",
  "constraints": {
    "textRules": {
      "text": {
        "required": true,
        "example": "Example text",
        "minChars": 2,
        "maxChars": 15
      }
    }
  },
  "propsSchema": {
    "text": "string",
    "onClick?": "() => void",
    "className?": "string",
    "disabled?": "boolean (default: false)",
    "ariaLabel?": "string",
    "type?": "'button' | 'submit' | 'reset' (default: 'button')"
  },
  "usage": "<ComponentName text=\"Example\" onClick={() => console.log('clicked')} />"
}
```

## Field Descriptions

### import
The exact import statement AI should use.

**Format:**
```json
"import": "import ComponentName from '@/components/category/ComponentName';"
```

**Examples:**
```json
"import": "import HeroBillboard from '@/components/sections/hero/HeroBillboard';"
"import": "import ButtonTextStagger from '@/components/button/text-stagger/ButtonTextStagger';"
"import": "import CardStack from '@/components/cardStack/CardStack';"
```

### name
Component name exactly as exported.

**Format:**
```json
"name": "ComponentName"
```

### path
File path without extension.

**Format:**
```json
"path": "@/components/category/ComponentName"
```

### description
One-line summary of what the component is. Focus on visual/behavioral characteristics.

**Format:** 1 sentence, under 100 characters

**Good Examples:**
```json
"description": "CTA button with character stagger animation on hover."
"description": "Full-width hero section with centered text and billboard layout."
"description": "Feature section with grid or carousel layout for feature cards."
```

**Bad Examples:**
```json
"description": "A really cool button component with lots of features and animations that can be used anywhere."  // Too verbose
"description": "Button"  // Too vague
```

### details
Longer description covering:
- When to use it
- Key behavior notes
- Important constraints

**Format:** 2-4 sentences

**Good Example:**
```json
"details": "Use for primary or secondary CTAs where subtle text motion adds emphasis. On hover, the label's characters animate in sequence (stagger). Includes background styling and supports all standard button props."
```

**Bad Example:**
```json
"details": "This is a button that you can click and it will do something when you click it. It has animations."  // Too obvious, not helpful
```

### constraints

Defines text length constraints for string props.

**Format:**
```json
"constraints": {
  "textRules": {
    "propName": {
      "required": true,
      "example": "Example value",
      "minChars": 2,
      "maxChars": 15
    }
  }
}
```

**Common Patterns:**

**Button text:**
```json
"constraints": {
  "textRules": {
    "text": {
      "required": true,
      "example": "Get Started",
      "minChars": 2,
      "maxChars": 15
    }
  }
}
```

**Section titles and descriptions:**
```json
"constraints": {
  "textRules": {
    "title": {
      "required": true,
      "example": "Welcome to Our Platform",
      "minChars": 5,
      "maxChars": 60
    },
    "description": {
      "required": true,
      "example": "Build amazing websites with our component library",
      "minChars": 10,
      "maxChars": 200
    }
  }
}
```

### propsSchema

Documents all component props with types and defaults.

**Format Rules:**

**Required props:**
```json
"propName": "type"
```

**Optional props:**
```json
"propName?": "type"
```

**Optional props with defaults:**
```json
"propName?": "type (default: value)"
```

**Examples:**

**Simple types:**
```json
"text": "string",
"count": "number",
"enabled": "boolean"
```

**Functions:**
```json
"onClick?": "() => void",
"onChange?": "(value: string) => void",
"onSubmit?": "(data: FormData) => Promise<void>"
```

**Union types:**
```json
"type?": "'button' | 'submit' | 'reset' (default: 'button')",
"variant?": "'primary' | 'secondary' | 'ghost'",
"size?": "'sm' | 'md' | 'lg' (default: 'md')"
```

**Array types:**
```json
"items": "Array<{ title: string; description: string }>",
"buttons?": "ButtonConfig[]",
"features": "Feature[]"
```

**Complex types:**
```json
"gridVariant": "'uniform-all-items-equal' | 'two-columns-alternating-heights' | 'asymmetric-60-wide-40-narrow' | ...",
"icon?": "LucideIcon",
"image?": "string (URL or path)"
```

**With defaults:**
```json
"className?": "string",
"disabled?": "boolean (default: false)",
"carouselMode?": "'auto' | 'buttons' (default: 'buttons')",
"uniformGridCustomHeightClasses?": "string (default: 'min-h-80 2xl:min-h-90')"
```

### usage

Single-line example showing typical implementation.

**Format:** One line, realistic props, valid JSX

**Good Examples:**

**Button:**
```json
"usage": "<ButtonTextStagger text=\"Get Started\" onClick={() => console.log('clicked')} />"
```

**Section with minimal props:**
```json
"usage": "<HeroBillboard title=\"Welcome\" description=\"Start building today\" buttons={[{ text: 'Get Started', href: '/signup' }]} />"
```

**CardStack section:**
```json
"usage": "<FeatureCardOne features={featuresData} gridVariant=\"uniform-all-items-equal\" textboxLayout=\"default\" title=\"Features\" description=\"Our key features\" />"
```

**Bad Examples:**
```json
"usage": "<Component />"  // Missing required props
"usage": "<Component\n  prop1=\"value\"\n  prop2=\"value\"\n/>"  // Multi-line, hard to read
"usage": "Component({ text: 'Hi' })"  // Not JSX
```

## What to Include

### ✅ DO Include:

**Default values in propsSchema** - Critical for AI to generate correct code
```json
"disabled?": "boolean (default: false)",
"type?": "'button' | 'submit' | 'reset' (default: 'button')"
```

**Usage examples** - Helps AI understand context
```json
"usage": "<ButtonTextStagger text=\"Click me\" onClick={() => alert('Hi')} />"
```

**Text constraints** - Min/max character limits
```json
"constraints": {
  "textRules": {
    "text": {
      "required": true,
      "example": "Get Started",
      "minChars": 2,
      "maxChars": 15
    }
  }
}
```

**Accurate descriptions** - Ensure description matches actual behavior
```json
"description": "CTA button with character stagger animation on hover.",
"details": "Use for primary or secondary CTAs where subtle text motion adds emphasis."
```

**Use case guidance** - When to use this vs alternatives
```json
"details": "Use for hero sections with centered content and billboard layout. Best for landing pages and marketing sites."
```

## What NOT to Include

### ❌ DO NOT Include:

**Metadata field** - Unnecessary complexity
```json
// Don't do this:
"metadata": {
  "category": "button",
  "version": "1.0.0",
  "author": "..."
}
```

**Verbose descriptions** - Keep concise and obvious
```json
// Don't do this:
"description": "This is an amazing button component that you can use to create buttons with stagger animations that look really cool and modern and will make your website stand out from the competition."
```

**Dependencies** - AI builders can infer from imports
```json
// Don't do this:
"dependencies": ["lucide-react", "framer-motion"]
```

**Over-documentation** - If it's obvious from the name, skip it
```json
// Don't do this:
"details": "This is a button. You can click it. It accepts text to display on the button."
```

**Implementation details** - Focus on usage, not internals
```json
// Don't do this:
"details": "Uses GSAP ScrollTrigger with stagger: 0.1 and uses React.memo for performance and has displayName set to ButtonTextStagger."
```

## Complete Examples

### Button Component

```json
{
  "import": "import ButtonTextStagger from '@/components/button/text-stagger/ButtonTextStagger';",
  "name": "ButtonTextStagger",
  "path": "@/components/button/text-stagger/ButtonTextStagger",
  "description": "CTA button with character stagger animation on hover.",
  "details": "Use for primary or secondary CTAs where subtle text motion adds emphasis. On hover, the label's characters animate in sequence (stagger). Includes background styling.",
  "constraints": {
    "textRules": {
      "text": {
        "required": true,
        "example": "Get Started",
        "minChars": 2,
        "maxChars": 15
      }
    }
  },
  "propsSchema": {
    "text": "string",
    "onClick?": "() => void",
    "href?": "string",
    "className?": "string",
    "textClassName?": "string",
    "disabled?": "boolean (default: false)",
    "ariaLabel?": "string",
    "type?": "'button' | 'submit' | 'reset' (default: 'button')"
  },
  "usage": "<ButtonTextStagger text=\"Get Started\" onClick={() => console.log('clicked')} />"
}
```

### Section Component (CardStack-based)

```json
{
  "import": "import FeatureCardOne from '@/components/sections/feature/FeatureCardOne';",
  "name": "FeatureCardOne",
  "path": "@/components/sections/feature/FeatureCardOne",
  "description": "Feature section with grid or carousel layout for feature cards.",
  "details": "Displays feature cards in a responsive grid (1-4 items) or carousel (5+ items). Supports TextBox header with multiple layout options. Each card includes icon, title, and description.",
  "constraints": {
    "textRules": {
      "title": {
        "required": true,
        "example": "Our Features",
        "minChars": 5,
        "maxChars": 60
      },
      "description": {
        "required": true,
        "example": "Discover what makes us unique",
        "minChars": 10,
        "maxChars": 200
      }
    }
  },
  "propsSchema": {
    "features": "Array<{ icon: LucideIcon; title: string; description: string }>",
    "gridVariant": "'uniform-all-items-equal' | 'two-columns-alternating-heights' | 'asymmetric-60-wide-40-narrow' | ...",
    "title": "string",
    "description": "string",
    "tag?": "string",
    "tagIcon?": "LucideIcon",
    "buttons?": "ButtonConfig[]",
    "textboxLayout": "'default' | 'split' | 'split-actions' | 'split-description'",
    "carouselMode?": "'auto' | 'buttons' (default: 'buttons')",
    "uniformGridCustomHeightClasses?": "string (default: 'min-h-80 2xl:min-h-90')",
    "ariaLabel?": "string",
    "className?": "string"
  },
  "usage": "<FeatureCardOne features={featuresData} gridVariant=\"uniform-all-items-equal\" textboxLayout=\"default\" title=\"Features\" description=\"Our key features\" />"
}
```

## Registry Validation Checklist

When adding a new component to the registry:

### Required Fields
- [ ] `import` - Exact import statement
- [ ] `name` - Component name
- [ ] `path` - File path without extension
- [ ] `description` - One-line summary
- [ ] `details` - When to use, behavior, constraints
- [ ] `propsSchema` - All props documented
- [ ] `usage` - Single-line example

### Constraints (if applicable)
- [ ] Add `textRules` for text props
- [ ] Set `minChars` and `maxChars`
- [ ] Provide realistic `example` values
- [ ] Mark `required: true` for required props

### propsSchema Format
- [ ] Required props: `"prop": "type"`
- [ ] Optional props: `"prop?": "type"`
- [ ] Defaults: `"prop?": "type (default: value)"`
- [ ] All types match component implementation
- [ ] Union types use single quotes inside double quotes

### Quality Checks
- [ ] Description is concise (under 100 chars)
- [ ] Details provide use case guidance
- [ ] Usage example is valid JSX
- [ ] Usage example shows realistic props
- [ ] Default values documented in propsSchema
- [ ] No over-documentation or verbose descriptions
- [ ] No unnecessary metadata or dependencies

### Consistency Checks
- [ ] Component name matches file name
- [ ] Path matches actual file location
- [ ] Import statement is correct
- [ ] Props match actual component interface
- [ ] Defaults in registry match component defaults
- [ ] Naming follows conventions (title/description for sections, text for buttons)
