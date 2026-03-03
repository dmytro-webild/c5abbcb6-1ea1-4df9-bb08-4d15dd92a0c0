import { cls } from "./utils";
import { hasBgClassName } from "@/components/button/types";
import type { CTAButtonVariant, ButtonPropsForVariant } from "@/components/button/types";
import type { ButtonConfig } from "@/types/button";

export const getButtonProps = (
  button: ButtonConfig,
  index: number,
  variant: CTAButtonVariant,
  buttonClassName?: string,
  buttonTextClassName?: string
): ButtonPropsForVariant<CTAButtonVariant> => {
  const isPrimary = index === 0;
  const buttonBgClass = isPrimary ? "primary-button" : "secondary-button";
  const buttonTextClass = isPrimary ? "text-primary-cta-text" : "text-secondary-cta-text";

  // Base props shared by all variants
  const baseProps = {
    text: button.text,
    variant,
    href: button.href,
    onClick: button.onClick,
  };

  // directional-hover variant (needs circleClassName handling)
  if (variant === "directional-hover") {
    const circleClass = isPrimary ? "bg-foreground" : "bg-foreground/5";
    const { bgClassName, textClassName, circleClassName } = (button.props || {}) as { bgClassName?: string; textClassName?: string; circleClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonTextClass, buttonClassName, button.props?.className),
      bgClassName: cls(buttonBgClass, bgClassName),
      textClassName: cls(buttonTextClassName, textClassName),
      circleClassName: cls(circleClass, circleClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // Variants with bgClassName (text-stagger, shift-hover, bounce-effect)
  if (hasBgClassName(variant)) {
    const { bgClassName, textClassName } = (button.props || {}) as { bgClassName?: string; textClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonTextClass, buttonClassName, button.props?.className),
      bgClassName: cls(buttonBgClass, bgClassName),
      textClassName: cls(buttonTextClassName, textClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // icon-arrow variant
  if (variant === "icon-arrow") {
    const iconBgClass = isPrimary ? "secondary-button text-secondary-cta-text" : "primary-button text-primary-cta-text";
    const { textClassName, iconClassName } = (button.props || {}) as { textClassName?: string; iconClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonBgClass, buttonTextClass, buttonClassName, button.props?.className),
      textClassName: cls(buttonTextClassName, textClassName),
      iconClassName: cls(iconBgClass, iconClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // expand-hover variant
  if (variant === "expand-hover") {
    const iconBgClass = isPrimary ? "secondary-button" : "primary-button";
    const iconTextClass = isPrimary ? "text-secondary-cta-text" : "text-primary-cta-text";
    const hoverTextClass = isPrimary ? "md:group-hover:text-secondary-cta-text" : "md:group-hover:text-primary-cta-text";
    const { textClassName, iconClassName, iconBgClassName } = (button.props || {}) as { textClassName?: string; iconClassName?: string; iconBgClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonBgClass, buttonTextClass, buttonClassName, button.props?.className),
      textClassName: cls(hoverTextClass, buttonTextClassName, textClassName),
      iconClassName: cls(iconTextClass, iconClassName),
      iconBgClassName: cls(iconBgClass, iconBgClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // hover-bubble variant
  if (variant === "hover-bubble") {
    const iconBgClass = isPrimary ? "secondary-button text-secondary-cta-text" : "primary-button text-primary-cta-text";
    const baseTextClass = isPrimary ? "text-primary-cta-text" : "text-secondary-cta-text";
    const { bgClassName, textClassName, iconClassName } = (button.props || {}) as { bgClassName?: string; textClassName?: string; iconClassName?: string };
    return {
      ...button.props,
      ...baseProps,
      className: cls(buttonClassName, button.props?.className),
      bgClassName: cls(buttonBgClass, bgClassName),
      textClassName: cls(baseTextClass, buttonTextClassName, textClassName),
      iconClassName: cls(iconBgClass, iconClassName),
    } as ButtonPropsForVariant<CTAButtonVariant>;
  }

  // hover-magnetic variant (default fallback)
  return {
    ...button.props,
    ...baseProps,
    className: cls(buttonBgClass, buttonTextClass, buttonClassName, button.props?.className),
    textClassName: cls(buttonTextClassName, buttonTextClass),
  } as ButtonPropsForVariant<CTAButtonVariant>;
};
