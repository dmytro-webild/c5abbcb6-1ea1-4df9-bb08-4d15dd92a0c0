import type { PrimaryButtonStyleVariant } from "../config/types";

export const primaryButtonStyleMap: Record<PrimaryButtonStyleVariant, string> = {
  gradient: `
    background: linear-gradient(to bottom, color-mix(in srgb, var(--color-primary-cta) 75%, transparent), var(--color-primary-cta));
    box-shadow: color-mix(in srgb, var(--color-background) 25%, transparent) 0px 1px 1px 0px inset, color-mix(in srgb, var(--color-primary-cta) 15%, transparent) 3px 3px 3px 0px;
  `,
  shadow: `
    background: var(--color-primary-cta);
    box-shadow: 2.10837px 3.16256px 9.48767px color-mix(in srgb, var(--color-primary-cta) 40%, transparent);
  `,
  flat: `
    background: var(--color-primary-cta);
    box-shadow: none;
  `,
  "radial-glow": `
    background:
      radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-background) 32.5%, transparent) 0%, transparent 45%),
      radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-background) 32.5%, transparent) 0%, transparent 45%),
      var(--color-primary-cta);
    box-shadow: 2.10837px 3.16256px 9.48767px color-mix(in srgb, var(--color-accent) 30%, transparent);
  `,
  "diagonal-gradient": `
    background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary-cta) 80%, transparent), var(--color-foreground));
    box-shadow: 2.10837px 3.16256px 9.48767px color-mix(in srgb, var(--color-accent) 30%, transparent);
  `,
  "double-inset": `
    background: var(--color-primary-cta);
    box-shadow: color-mix(in srgb, var(--color-background) 15%, transparent) 0px 4px 10px 0px inset, color-mix(in srgb, var(--color-background) 15%, transparent) 0px -4px 8px 0px inset;
  `,
  "primary-glow": `
    background: var(--color-primary-cta);
    box-shadow: color-mix(in srgb, var(--color-background) 20%, transparent) 0px 3px 1px 0px inset, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 0.839802px 0.503881px -0.3125px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 1.99048px 1.19429px -0.625px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 3.63084px 2.1785px -0.9375px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 6.03627px 3.62176px -1.25px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 9.74808px 5.84885px -1.5625px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 15.9566px 9.57398px -1.875px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 27.4762px 16.4857px -2.1875px, color-mix(in srgb, var(--color-primary-cta) 13%, transparent) 0px 50px 30px -2.5px;
  `,
  "inset-glow": `
    position: relative;
    background: linear-gradient(180deg, color-mix(in srgb, var(--color-primary-cta) 65%, var(--color-background)) -35%, var(--color-primary-cta) 65%);
    box-shadow: 0 10px 18px -7px color-mix(in srgb, var(--color-background) 50%, transparent), inset 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 15%, transparent);
  `,
  "soft-glow": `
    position: relative;
    background: radial-gradient(ellipse at 50% -20%, color-mix(in srgb, var(--color-primary-cta) 70%, var(--color-foreground)) 0%, var(--color-primary-cta) 70%);
    box-shadow: 0 8px 24px -6px color-mix(in srgb, var(--color-primary-cta) 35%, transparent), inset 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 20%, transparent);
  `,
  "glass-shimmer": `
    position: relative;
    background: linear-gradient(165deg, color-mix(in srgb, var(--color-primary-cta) 85%, var(--color-foreground)) 0%, var(--color-primary-cta) 40%, color-mix(in srgb, var(--color-primary-cta) 90%, var(--color-background)) 100%);
    box-shadow: inset 0 1px 1px 0 color-mix(in srgb, var(--color-foreground) 25%, transparent), inset 0 -1px 1px 0 color-mix(in srgb, var(--color-background) 15%, transparent), 0 4px 12px -2px color-mix(in srgb, var(--color-primary-cta) 25%, transparent);
  `,
  "neon-outline": `
    position: relative;
    background: var(--color-primary-cta);
    box-shadow: 0 0 5px color-mix(in srgb, var(--color-accent) 50%, transparent), 0 0 15px color-mix(in srgb, var(--color-accent) 30%, transparent), 0 0 30px color-mix(in srgb, var(--color-accent) 15%, transparent), inset 0 0 8px color-mix(in srgb, var(--color-accent) 10%, transparent);
  `,
  "lifted": `
    position: relative;
    background: linear-gradient(180deg, color-mix(in srgb, var(--color-primary-cta) 95%, var(--color-foreground)) 0%, var(--color-primary-cta) 50%, color-mix(in srgb, var(--color-primary-cta) 95%, var(--color-background)) 100%);
    box-shadow: inset 0 2px 3px 0 color-mix(in srgb, var(--color-foreground) 20%, transparent), inset 0 -2px 3px 0 color-mix(in srgb, var(--color-background) 25%, transparent), 0 2px 4px -1px color-mix(in srgb, var(--color-background) 40%, transparent);
  `,
  "depth-layers": `
    position: relative;
    background: var(--color-primary-cta);
    box-shadow: 0 1px 2px color-mix(in srgb, var(--color-primary-cta) 20%, transparent), 0 2px 4px color-mix(in srgb, var(--color-primary-cta) 20%, transparent), 0 4px 8px color-mix(in srgb, var(--color-primary-cta) 15%, transparent), 0 8px 16px color-mix(in srgb, var(--color-primary-cta) 10%, transparent), 0 16px 32px color-mix(in srgb, var(--color-primary-cta) 5%, transparent);
  `,
  "accent-edge": `
    position: relative;
    background: linear-gradient(180deg, var(--color-primary-cta) 0%, color-mix(in srgb, var(--color-primary-cta) 90%, var(--color-background)) 100%);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-accent) 60%, transparent), 0 4px 12px -2px color-mix(in srgb, var(--color-accent) 35%, transparent), inset 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 20%, transparent);
  `,
  "metallic": `
    position: relative;
    background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary-cta) 80%, var(--color-foreground)) 0%, var(--color-primary-cta) 25%, color-mix(in srgb, var(--color-primary-cta) 90%, var(--color-background)) 50%, var(--color-primary-cta) 75%, color-mix(in srgb, var(--color-primary-cta) 85%, var(--color-foreground)) 100%);
    box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--color-foreground) 30%, transparent), 0 3px 8px -2px color-mix(in srgb, var(--color-background) 50%, transparent);
  `,
};

export const getInsetGlowPseudo = (style: PrimaryButtonStyleVariant): string => {
  if (style !== "inset-glow") return '';

  return `
    .primary-button::before {
      content: "";
      position: absolute;
      pointer-events: none;
      inset: 0;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(
        0deg,
        color-mix(in srgb, var(--color-primary-cta) 20%, var(--color-background)) 0%,
        color-mix(in srgb, var(--color-primary-cta) 40%, var(--color-background)) 27%,
        color-mix(in srgb, var(--color-primary-cta) 60%, var(--color-foreground)) 62%,
        color-mix(in srgb, var(--color-primary-cta) 80%, var(--color-foreground)) 100%
      );
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      mask-composite: exclude;
    }
  `;
};
