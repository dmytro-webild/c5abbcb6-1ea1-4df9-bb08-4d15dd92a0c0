# Component Library Documentation

This directory contains focused documentation for building components in this AI-optimized component library.

## Documentation Files

### 📋 [COMPONENT_IMPLEMENTATION.md](./COMPONENT_IMPLEMENTATION.md)
**Core component implementation patterns**

Load when: Creating or modifying component code

Covers:
- Component structure template
- Prop structure & defaults
- Naming conventions
- Component customizability
- Type safety
- Responsive design
- Content width pattern
- Implementation checklist

---

### 🎴 [CARDSTACK_SECTIONS.md](./CARDSTACK_SECTIONS.md)
**CardStack-based section components**

Load when: Creating Feature, Product, Pricing, Testimonial, Team, Blog, or Metrics sections

Covers:
- CardStack pattern overview
- Grid variants (10+ layouts)
- Height control (`uniformGridCustomHeightClasses`)
- Carousel modes
- TextBox integration
- Button system
- Animation types
- Complete examples & checklist

---

### 🎨 [THEME_AND_STYLING.md](./THEME_AND_STYLING.md)
**Theme system and styling patterns**

Load when: Setting up themes, working with colors, or styling components

Covers:
- Theme Provider configuration
- Color theming (CSS variables)
- Inverted background pattern
- Content width pattern
- Card styling
- Border radius patterns
- Button styling classes
- Styling checklist

---

### ♿ [ACCESSIBILITY.md](./ACCESSIBILITY.md)
**Accessibility (a11y) standards**

Load when: Adding interactive elements, media, or sections

Covers:
- Interactive components (buttons, links)
- Media components (images, videos)
- Section components (semantic HTML)
- Form components
- Focus management
- Keyboard navigation
- ARIA roles
- Accessibility checklist

---

### 📚 [REGISTRY_STANDARDS.md](./REGISTRY_STANDARDS.md)
**Registry documentation rules**

Load when: Adding or updating component entries in `registry.json`

Covers:
- Registry structure
- Component entry format
- Field descriptions
- propsSchema rules
- Constraints format
- Usage examples
- What to include/exclude
- Validation checklist

---

### 📁 [REGISTRY_FOLDER_STRUCTURE.md](./REGISTRY_FOLDER_STRUCTURE.md)
**New folder-based registry structure**

Load when: Working with files in `/registry/` folder

Covers:
- Folder overview (index.json, intents.json, components/, schemas/)
- File purposes and use cases
- When to update each file
- Common prop patterns (animations, backgrounds, buttons)
- Validation checklist for each file type
- File relationships and quick reference

---

### 📄 [PREVIEW_PAGE_STANDARDS.md](./PREVIEW_PAGE_STANDARDS.md)
**Preview page setup and patterns**

Load when: Creating preview pages in `/app/components/`

Covers:
- File structure & location
- Preview page templates
- Wrapper order (ThemeProvider > ReactLenis)
- Theme configuration
- Realistic props
- Multiple sections example
- Preview page checklist

---

## Quick Reference

### When creating a new component:
1. Load `COMPONENT_IMPLEMENTATION.md` for structure
2. Load `ACCESSIBILITY.md` for a11y requirements
3. Load `THEME_AND_STYLING.md` for styling patterns
4. Load `CARDSTACK_SECTIONS.md` if using CardStack

### When updating the registry:
1. Load `REGISTRY_FOLDER_STRUCTURE.md` for the new folder structure
2. Load `REGISTRY_STANDARDS.md` for documentation rules

### When creating a preview page:
1. Load `PREVIEW_PAGE_STANDARDS.md` only

### When modifying themes:
1. Load `THEME_AND_STYLING.md` only

---

## Documentation Principles

These docs are optimized for:
- **AI builders** (Lovable, V0, Claude Code)
- **Focused context** (load only what you need)
- **Quick reference** (checklists and examples)
- **Consistency** (standardized patterns across all components)

Each file is:
- **Single-purpose** - covers one concern thoroughly
- **Self-contained** - minimal cross-references
- **Example-driven** - shows good/bad patterns
- **Checklist-equipped** - actionable validation steps

---

## Legacy Documentation

The original `COMPONENT_STANDARDS.md` file has been split into these focused documents. Refer to these new files for all component development.
