"use client";

import { useRef, memo } from "react";
import { useCharAnimation } from "../useCharAnimation";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";
import "./ShiftButton.css";

interface ButtonShiftHoverProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  bgClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonShiftHover = ({
  text,
  onClick,
  href,
  className = "",
  bgClassName = "",
  textClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonShiftHoverProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  useCharAnimation(buttonRef, text);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      data-href={href}
      aria-label={ariaLabel || text}
      className={cls(
        "shift-button group relative cursor-pointer flex gap-2 items-center justify-center bg-transparent border-none leading-none no-underline h-9 px-5 pr-4 min-w-0 w-fit max-w-full rounded-theme text-primary-cta-text text-sm",
        "disabled:cursor-not-allowed disabled:opacity-50",
        textClassName,
        className
      )}
    >
      <div
        className={cls(
          "shift-button-bg absolute! inset-0 rounded-theme transition-transform duration-[600ms] primary-button",
          bgClassName
        )}
      ></div>
      <span
        data-button-animate-chars=""
        className="shift-button-text relative inline-block overflow-hidden truncate whitespace-nowrap"
      >
        {text}
      </span>
      <div className="relative h-[1em] w-auto aspect-square rounded-theme border border-current scale-65 transition-all duration-300 md:group-hover:bg-current md:group-hover:scale-40" />
    </button>
  );
};

ButtonShiftHover.displayName = "ButtonShiftHover";

export default memo(ButtonShiftHover);
