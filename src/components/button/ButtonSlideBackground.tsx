"use client";

import { memo } from "react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonSlideBackgroundProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonSlideBackground = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonSlideBackgroundProps) => {
  const handleClick = useButtonClick(href, onClick, scrollToSection);
  const cubicBezier = "cubic-bezier(0.4, 0, 0, 1)";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      data-href={href}
      aria-label={ariaLabel || text}
      className={cls(
        "group relative flex items-center justify-center h-9 min-w-0 w-fit max-w-full px-6 rounded-theme overflow-hidden cursor-pointer",
        "primary-button",
        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-full",
        "after:translate-y-[101%] after:rounded-t-[50%] hover:after:translate-y-0 hover:after:rounded-none",
        "after:transition-all after:duration-500",
        "after:bg-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        transform: "scaleX(1)",
        transition: `transform 0.5s ${cubicBezier}`,
      }}
    >
      <span
        className={cls(
          "inline-block text-sm overflow-hidden relative",
          "text-primary-cta-text",
          "after:content-[attr(data-text)] after:w-full after:h-full after:inline-block after:absolute",
          "after:left-1/2 after:bottom-0 after:z-[1] after:-translate-x-1/2 after:translate-y-full group-hover:after:translate-y-0",
          "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.2,0,0,1)]",
          "after:text-foreground",
          textClassName
        )}
        data-text={text}
      >
        {text}
      </span>
    </button>
  );
};

ButtonSlideBackground.displayName = "ButtonSlideBackground";

export default memo(ButtonSlideBackground);
