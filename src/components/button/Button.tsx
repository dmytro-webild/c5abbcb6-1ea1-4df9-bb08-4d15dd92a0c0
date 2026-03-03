"use client";

import { memo } from "react";
import ButtonHoverMagnetic from "./ButtonHoverMagnetic/ButtonHoverMagnetic";
import ButtonIconArrow from "./ButtonIconArrow";
import ButtonShiftHover from "./ButtonShiftHover/ButtonShiftHover";
import ButtonTextStagger from "./ButtonTextStagger/ButtonTextStagger";
import ButtonTextUnderline from "./ButtonTextUnderline";
import ButtonHoverBubble from "./ButtonHoverBubble";
import ButtonExpandHover from "./ButtonExpandHover";
import ButtonElasticEffect from "./ButtonElasticEffect/ButtonElasticEffect";
import ButtonBounceEffect from "./ButtonBounceEffect/ButtonBounceEffect";
import ButtonDirectionalHover from "./ButtonDirectionalHover/ButtonDirectionalHover";
import ButtonTextShift from "./ButtonTextShift/ButtonTextShift";
import type { ButtonVariantProps } from "./types";

export type { ButtonVariant, ButtonVariantProps, ButtonPropsForVariant } from "./types";

const buttonComponents = {
  "hover-magnetic": ButtonHoverMagnetic,
  "hover-bubble": ButtonHoverBubble,
  "expand-hover": ButtonExpandHover,
  "elastic-effect": ButtonElasticEffect,
  "bounce-effect": ButtonBounceEffect,
  "icon-arrow": ButtonIconArrow,
  "shift-hover": ButtonShiftHover,
  "text-stagger": ButtonTextStagger,
  "text-shift": ButtonTextShift,
  "text-underline": ButtonTextUnderline,
  "directional-hover": ButtonDirectionalHover,
} as const;

const Button = (props: ButtonVariantProps) => {
  const { variant = "hover-magnetic", ...restProps } = props;
  const ButtonComponent = buttonComponents[variant];
  return <ButtonComponent {...restProps} />;
};

Button.displayName = "Button";

export default memo(Button);