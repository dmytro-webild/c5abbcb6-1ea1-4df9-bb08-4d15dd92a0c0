"use client";

import { memo } from "react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonTextUnderlineProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonTextUnderline = ({
  text,
  onClick,
  href,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonTextUnderlineProps) => {
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      data-href={href}
      aria-label={ariaLabel || text}
      className={cls(
        "relative text-sm inline-block bg-transparent border-none p-0 cursor-pointer",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px]",
        "after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-300",
        "hover:after:scale-x-100 hover:after:origin-left",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:after:scale-x-0",
        className
      )}
    >
      {text}
    </button>
  );
};

ButtonTextUnderline.displayName = "ButtonTextUnderline";

export default memo(ButtonTextUnderline);
