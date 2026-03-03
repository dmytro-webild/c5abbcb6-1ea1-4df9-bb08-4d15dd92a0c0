export type ButtonVariant =
  | "hover-magnetic"
  | "hover-bubble"
  | "expand-hover"
  | "elastic-effect"
  | "bounce-effect"
  | "icon-arrow"
  | "shift-hover"
  | "text-stagger"
  | "text-shift"
  | "text-underline"
  | "directional-hover";

export type CTAButtonVariant = Exclude<ButtonVariant, "text-underline">;

export type ButtonWithBgClassName = "text-stagger" | "text-shift" | "shift-hover" | "bounce-effect" | "directional-hover";

export const hasBgClassName = (variant?: string): variant is ButtonWithBgClassName => {
  return variant === "text-stagger" || variant === "text-shift" || variant === "shift-hover" || variant === "bounce-effect" || variant === "directional-hover";
};

export type BaseButtonProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  scrollToSection?: boolean;
  type?: "button" | "submit" | "reset";
};

export type ButtonVariantProps =
  | ({
      variant?: "hover-magnetic";
      textClassName?: string;
      strengthFactor?: number;
    } & BaseButtonProps)
  | ({
      variant: "hover-bubble";
      bgClassName?: string;
      textClassName?: string;
      iconClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "expand-hover";
      textClassName?: string;
      iconClassName?: string;
      iconBgClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "elastic-effect";
      textClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "bounce-effect";
      bgClassName?: string;
      textClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "icon-arrow";
      textClassName?: string;
      iconClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "shift-hover";
      bgClassName?: string;
      textClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "text-stagger";
      bgClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "text-shift";
      bgClassName?: string;
      textClassName?: string;
    } & BaseButtonProps)
  | ({
      variant: "text-underline";
      disabled?: boolean;
    } & BaseButtonProps)
  | ({
      variant: "directional-hover";
      bgClassName?: string;
      textClassName?: string;
      circleClassName?: string;
    } & BaseButtonProps);

export type ButtonPropsForVariant<V extends ButtonVariant> = Extract<
  ButtonVariantProps,
  { variant?: V }
>;