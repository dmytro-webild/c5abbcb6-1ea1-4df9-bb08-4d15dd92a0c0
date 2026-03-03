# Accessibility Standards

This document outlines accessibility (a11y) requirements for all components in the library, ensuring compatibility with screen readers and assistive technologies.

## Interactive Components

For buttons, links, and other interactive elements.

### Required Props

```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  // Accessibility props
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}
```

### Implementation Pattern

```tsx
const Button = ({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "base-button-styles",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {text}
    </button>
  );
};
```

### Key Points

**ariaLabel:**
- Optional prop with sensible fallback
- Falls back to `text` content for buttons
- Provides context for screen readers

**type:**
- Default: `"button"`
- Options: `"button" | "submit" | "reset"`
- Prevents accidental form submission

**disabled:**
- Default: `false`
- Includes visual disabled states:
  - `disabled:cursor-not-allowed` - Shows not-allowed cursor
  - `disabled:opacity-50` - Reduces opacity for visual feedback

## Media Components

### Images

**Required Props:**
```tsx
interface ImageProps {
  imageSrc: string;
  imageAlt?: string;  // Empty string for decorative images
  className?: string;
}
```

**Implementation:**
```tsx
const ImageComponent = ({
  imageSrc,
  imageAlt = "",
  className = "",
}: ImageProps) => {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      aria-hidden={imageAlt === ""}
      className={className}
    />
  );
};
```

**Key Points:**
- `imageAlt` - Alt text for images
  - Provide descriptive alt text for meaningful images
  - Use empty string (`""`) for decorative images
- `aria-hidden={true}` - When alt is empty, mark as decorative
- Screen readers will skip decorative images

### Videos

**Required Props:**
```tsx
interface VideoProps {
  videoSrc: string;
  videoAriaLabel?: string;
  className?: string;
}
```

**Implementation:**
```tsx
const VideoComponent = ({
  videoSrc,
  videoAriaLabel = "Video content",
  className = "",
}: VideoProps) => {
  return (
    <video
      src={videoSrc}
      aria-label={videoAriaLabel}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
};
```

**Key Points:**
- `videoAriaLabel` - Descriptive label for video element
- Default: Sensible fallback like "Video content" or "Hero video"
- Always include for screen reader context

### Media Content Pattern

For components supporting both images and videos:

```tsx
interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoAriaLabel?: string;
}

const Hero = ({
  imageSrc,
  imageAlt = "",
  videoSrc,
  videoAriaLabel = "Hero video",
}: HeroProps) => {
  return (
    <>
      {videoSrc ? (
        <video
          src={videoSrc}
          aria-label={videoAriaLabel}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            aria-hidden={imageAlt === ""}
          />
        )
      )}
    </>
  );
};
```

## Section Components

### Semantic HTML

Use semantic HTML elements for proper document structure:

```tsx
<section>      // For sections of content
<header>       // For page/section headers
<nav>          // For navigation
<footer>       // For page/section footers
<article>      // For self-contained content
<aside>        // For tangentially related content
<main>         // For main content area
```

### Section Pattern

```tsx
interface SectionProps {
  title: string;
  description: string;
  ariaLabel?: string;
  className?: string;
}

const Section = ({
  title,
  description,
  ariaLabel = "Section name",
  className = "",
}: SectionProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className={cls("w-full py-20", className)}
    >
      <div className="w-content-width mx-auto">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};
```

### Sensible Default aria-labels

Each section type should have a descriptive default:

```tsx
// Hero section
ariaLabel = "Hero section"

// About section
ariaLabel = "About section"

// Feature section
ariaLabel = "Features section"

// Testimonial section
ariaLabel = "Testimonials section"

// Footer
ariaLabel = "Footer"

// Navigation
ariaLabel = "Navigation"
```

### Heading Hierarchy

Maintain proper heading levels:

```tsx
<h1>          // Page title (once per page)
  <h2>        // Section titles
    <h3>      // Subsection titles
      <h4>    // Card/component titles
```

**Example:**
```tsx
<section aria-label="Features section">
  <h2>Our Features</h2>           {/* Section title */}
  <div>
    <h3>Feature One</h3>          {/* Feature title */}
    <p>Description...</p>
  </div>
</section>
```

## Form Components

### Input Fields

```tsx
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const Input = ({
  label,
  id,
  type = "text",
  required = false,
  ariaLabel,
  ariaDescribedBy,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span aria-label="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};
```

**Key Points:**
- Always associate `<label>` with input using `htmlFor` and `id`
- Mark required fields visually and semantically
- Use `aria-describedby` for error messages or hints

### Form Validation

```tsx
const [error, setError] = useState("");

<input
  aria-invalid={!!error}
  aria-describedby={error ? "error-message" : undefined}
/>
{error && (
  <p id="error-message" role="alert">
    {error}
  </p>
)}
```

## Focus Management

### Focus Indicators

Never remove focus outlines without providing alternatives:

```tsx
// ❌ WRONG
className="outline-none"

// ✅ CORRECT - Custom focus indicator
className="focus:outline-none focus:ring-2 focus:ring-foreground/50"
```

### Focus Trap (for modals/dialogs)

When implementing modals or dialogs, ensure:
- Focus moves to modal when opened
- Tab/Shift+Tab cycles through modal elements only
- Focus returns to trigger element when closed
- Escape key closes modal

## Keyboard Navigation

### Interactive Elements

All interactive elements must be keyboard accessible:

```tsx
// Buttons and links work by default
<button onClick={handleClick}>Click me</button>
<a href="/page">Link</a>

// Custom interactive elements need tabIndex and keyboard handlers
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom button
</div>
```

### Skip Links

For navigation-heavy pages, provide skip links:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

## Screen Reader Only Content

Use the `sr-only` class for content that should only be read by screen readers:

```tsx
<span className="sr-only">Additional context for screen readers</span>
```

Tailwind's `sr-only` class:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## ARIA Roles

Use ARIA roles when semantic HTML isn't sufficient:

```tsx
// Navigation
<nav role="navigation" aria-label="Main navigation">

// Button (for non-button elements)
<div role="button" tabIndex={0}>

// Alert/Status messages
<div role="alert">Error message</div>
<div role="status">Loading...</div>

// Presentation (decorative)
<div role="presentation">

// Dialog/Modal
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
```

## Loading States

Provide feedback for loading states:

```tsx
const [isLoading, setIsLoading] = useState(false);

<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <span className="sr-only">Loading...</span>
      <Spinner aria-hidden="true" />
    </>
  ) : (
    "Submit"
  )}
</button>
```

## Accessibility Checklist

### Interactive Components
- [ ] Add `ariaLabel` prop (optional with sensible fallback)
- [ ] Add `type` prop for buttons (default: `"button"`)
- [ ] Add `disabled` prop with visual states
- [ ] Include disabled state styling (`disabled:cursor-not-allowed disabled:opacity-50`)
- [ ] Ensure keyboard accessibility (Enter/Space for custom elements)
- [ ] Provide custom focus indicators if removing default outline

### Media Components
- [ ] Images: Add `imageAlt` prop
- [ ] Images: Use `aria-hidden={true}` when alt is empty (decorative)
- [ ] Videos: Add `videoAriaLabel` prop with sensible default
- [ ] Provide meaningful default labels

### Section Components
- [ ] Use semantic HTML (`<section>`, `<header>`, `<nav>`, `<footer>`)
- [ ] Add `ariaLabel` prop with sensible default
- [ ] Follow proper heading hierarchy (h1 → h2 → h3)
- [ ] Use `w-full py-20` for section spacing (except hero/footer)
- [ ] Use `w-content-width mx-auto` for content wrapper

### Form Components
- [ ] Associate labels with inputs using `htmlFor` and `id`
- [ ] Mark required fields semantically
- [ ] Use `aria-invalid` for validation errors
- [ ] Use `aria-describedby` for error messages/hints
- [ ] Provide `role="alert"` for error messages

### General
- [ ] Test with keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Ensure sufficient color contrast (WCAG AA minimum)
- [ ] Provide focus indicators for all interactive elements
- [ ] Use semantic HTML before ARIA roles
- [ ] Include screen reader only text when needed (`sr-only`)
