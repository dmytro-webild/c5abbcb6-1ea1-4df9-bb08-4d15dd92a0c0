"use client";

import { memo } from "react";
import useMagneticEffect from "./useMagneticEffect";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonHoverMagneticProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  strengthFactor?: number;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonHoverMagnetic = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  strengthFactor = 20,
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonHoverMagneticProps) => {
  const magneticRef = useMagneticEffect(strengthFactor);
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      data-href={href}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "relative cursor-pointer h-9 min-w-0 w-fit max-w-full px-6 rounded-theme",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className={cls("text-sm block overflow-hidden truncate whitespace-nowrap", textClassName)}>{text}</span>
    </button>
  );
};

ButtonHoverMagnetic.displayName = "ButtonHoverMagnetic";

export default memo(ButtonHoverMagnetic);
