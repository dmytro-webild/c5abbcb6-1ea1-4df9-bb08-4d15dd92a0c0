"use client";

import { useRef, memo } from "react";
import { useCharAnimation } from "../useCharAnimation";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";
import "./StaggerButton.css";

export interface ButtonTextStaggerProps {
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

const ButtonTextStagger = ({
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
}: ButtonTextStaggerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  useCharAnimation(buttonRef, text, "[data-button-animate-chars]", 0.01);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      data-href={href}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "stagger-button relative cursor-pointer flex items-center justify-center bg-transparent border-none leading-none no-underline h-9 px-6 min-w-0 w-fit max-w-full rounded-theme text-primary-cta-text",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <div
        className={cls(
          "stagger-button-bg absolute! inset-0 rounded-theme transition-transform duration-[600ms] primary-button",
          bgClassName
        )}
      ></div>
      <span
        data-button-animate-chars=""
        className={cls(
          "stagger-button-text relative text-sm inline-block overflow-hidden truncate whitespace-nowrap",
          textClassName
        )}
      >
        {text}
      </span>
    </button>
  );
};

ButtonTextStagger.displayName = "ButtonTextStagger";

export default memo(ButtonTextStagger);
