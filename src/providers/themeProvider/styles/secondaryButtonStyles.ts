import type { SecondaryButtonStyleVariant } from "../config/types";

export const secondaryButtonStyleMap: Record<SecondaryButtonStyleVariant, string> = {
  glass: `
    backdrop-filter: blur(8px);
    background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-secondary-cta) 80%, transparent), var(--color-secondary-cta));
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid var(--color-secondary-cta);
  `,
  solid: `
    background: var(--color-secondary-cta);
    box-shadow: none;
  `,
  layered: `
    background:
      linear-gradient(color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, transparent 59.26%),
      linear-gradient(var(--color-secondary-cta), var(--color-secondary-cta)),
      linear-gradient(var(--color-secondary-cta), var(--color-secondary-cta)),
      linear-gradient(color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, transparent 59.26%),
      linear-gradient(color-mix(in srgb, var(--color-secondary-cta) 60%, transparent), color-mix(in srgb, var(--color-secondary-cta) 60%, transparent)),
      var(--color-secondary-cta);
    box-shadow:
      2.10837px 3.16256px 9.48767px color-mix(in srgb, var(--color-accent) 10%, transparent);
    border: 1px solid var(--color-secondary-cta);
  `,
  "radial-glow": `
    background:
      radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 40%),
      radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 40%),
      var(--color-secondary-cta);
    box-shadow: 2.10837px 3.16256px 9.48767px color-mix(in srgb, var(--color-accent) 10%, transparent);
  `,
};
