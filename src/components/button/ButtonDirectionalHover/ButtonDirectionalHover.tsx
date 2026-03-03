"use client";

import { useRef, memo } from "react";
import { useDirectionalHover } from "./useDirectionalHover";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";
import "./DirectionalButton.css";

export interface ButtonDirectionalHoverProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  bgClassName?: string;
  textClassName?: string;
  circleClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonDirectionalHover = ({
  text,
  onClick,
  href,
  className = "",
  bgClassName = "",
  textClassName = "",
  circleClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonDirectionalHoverProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  useDirectionalHover(buttonRef);

  return (
    <button
      ref={buttonRef}
      type={type}
      data-href={href}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "directional-button relative cursor-pointer flex items-center justify-center bg-transparent border-none leading-none no-underline h-9 px-6 min-w-0 w-fit max-w-full rounded-theme text-primary-cta-text",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <div
        className={cls(
          "directional-button-bg absolute! inset-0 rounded-theme primary-button",
          bgClassName
        )}
      ></div>
      <div className="directional-button-circle-wrap">
        <div
          className={cls(
            "directional-button-circle bg-accent",
            circleClassName
          )}
        ></div>
      </div>
      <span
        className={cls(
          "directional-button-text relative text-sm inline-block overflow-hidden truncate whitespace-nowrap",
          textClassName
        )}
      >
        {text}
      </span>
    </button>
  );
};

ButtonDirectionalHover.displayName = "ButtonDirectionalHover";

export default memo(ButtonDirectionalHover);
