import type { CardStyleVariant } from "../config/types";

export const cardStyleMap: Record<CardStyleVariant, string> = {
  "solid": `
    position: relative;
    background: var(--color-card);
  `,
  "outline": `
    position: relative;
    background: var(--color-card);
    border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  `,
  "gradient-mesh": `
    position: relative;
    background:
      radial-gradient(at 0% 0%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 100% 0%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0px, transparent 50%),
      radial-gradient(at 100% 100%, color-mix(in srgb, var(--color-accent) 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 100%, color-mix(in srgb, var(--color-accent) 12%, transparent) 0px, transparent 50%),
      var(--color-card);
  `,
  "gradient-radial": `
    position: relative;
    background: radial-gradient(circle at center, color-mix(in srgb, var(--color-card) 100%, var(--color-accent) 20%) 0%, var(--color-card) 90%);
  `,
  "inset": `
    position: relative;
    background: color-mix(in srgb, var(--color-card) 95%, var(--color-accent) 5%);
    box-shadow:
      inset 2px 2px 4px color-mix(in srgb, var(--color-foreground) 8%, transparent),
      inset -2px -2px 4px color-mix(in srgb, var(--color-background) 20%, transparent);
  `,
  "glass-elevated": `
    position: relative;
    backdrop-filter: blur(8px);
    background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-card) 80%, transparent), color-mix(in srgb, var(--color-card) 40%, transparent));
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid var(--color-card);
  `,
  "glass-depth": `
    position: relative;
    background: color-mix(in srgb, var(--color-card) 80%, transparent);
    backdrop-filter: blur(14px);
    box-shadow:
      inset 0 0 20px 0 color-mix(in srgb, var(--color-accent) 7.5%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-accent) 7.5%, transparent);
  `,
  "gradient-bordered": `
    position: relative;
    background: linear-gradient(180deg, color-mix(in srgb, var(--color-card) 100%, var(--color-accent) 5%) -35%, var(--color-card) 65%);
    box-shadow: 0px 0px 10px 4px color-mix(in srgb, var(--color-accent) 4%, transparent);
  `,
  "layered-gradient": `
    position: relative;
    background:
      linear-gradient(color-mix(in srgb, var(--color-accent) 6%, transparent) 0%, transparent 59.26%),
      linear-gradient(var(--color-card) 0%, var(--color-card) 100%),
      var(--color-card);
    box-shadow:
      20px 18px 7px color-mix(in srgb, var(--color-accent) 0%, transparent),
      2px 2px 2px color-mix(in srgb, var(--color-accent) 6.5%, transparent),
      1px 1px 2px color-mix(in srgb, var(--color-accent) 2%, transparent);
    border: 2px solid var(--color-secondary-cta);
  `,
  "soft-shadow": `
    position: relative;
    background: var(--color-card);
    box-shadow: color-mix(in srgb, var(--color-accent) 10%, transparent) 0px 0.706592px 0.706592px -0.666667px, color-mix(in srgb, var(--color-accent) 8%, transparent) 0px 1.80656px 1.80656px -1.33333px, color-mix(in srgb, var(--color-accent) 7%, transparent) 0px 3.62176px 3.62176px -2px, color-mix(in srgb, var(--color-accent) 7%, transparent) 0px 6.8656px 6.8656px -2.66667px, color-mix(in srgb, var(--color-accent) 5%, transparent) 0px 13.6468px 13.6468px -3.33333px, color-mix(in srgb, var(--color-accent) 2%, transparent) 0px 30px 30px -4px, var(--color-background) 0px 3px 1px 0px inset;
  `,
  "subtle-shadow": `
    position: relative;
    background: var(--color-card);
    box-shadow: color-mix(in srgb, var(--color-foreground) 5%, transparent) 0px 4px 32px 0px;
  `,
  "elevated-border": `
    position: relative;
    background: linear-gradient(180deg, color-mix(in srgb, var(--color-card) 100%, var(--color-foreground) 3%) 0%, var(--color-card) 100%);
    box-shadow: 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 8%, transparent), 0 4px 6px -1px color-mix(in srgb, var(--color-foreground) 5%, transparent), 0 10px 15px -3px color-mix(in srgb, var(--color-foreground) 4%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-foreground) 6%, transparent);
  `,
  "inner-glow": `
    position: relative;
    background: var(--color-card);
    box-shadow: inset 0 0 30px 0 color-mix(in srgb, var(--color-foreground) 4%, transparent), inset 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 8%, transparent), 0 4px 12px -4px color-mix(in srgb, var(--color-foreground) 8%, transparent);
  `,
  "spotlight": `
    position: relative;
    background:
      radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--color-accent) 20%, transparent) 0%, transparent 50%),
      var(--color-card);
    box-shadow: inset 1px 1px 0 0 color-mix(in srgb, var(--color-foreground) 10%, transparent), 0 4px 16px -4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  `,
};

export const getGradientBorderedPseudo = (cardStyle: CardStyleVariant): string => {
  if (cardStyle !== "gradient-bordered") return '';

  return `
    .card::before {
      content: "";
      position: absolute;
      pointer-events: none;
      inset: 0;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(
        160deg,
        color-mix(in srgb, var(--color-accent) 25%, transparent) 0%,
        color-mix(in srgb, var(--color-accent) 5%, transparent) 35%,
        color-mix(in srgb, var(--color-foreground) 5%, transparent) 75%,
        color-mix(in srgb, var(--color-background-accent) 15%, transparent) 100%
      );
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      mask-composite: exclude;
    }
  `;
};

