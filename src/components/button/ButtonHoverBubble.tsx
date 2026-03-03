"use client";

import { memo } from "react";
import { ArrowDownRight } from "lucide-react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonHoverBubbleProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  bgClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonHoverBubble = ({
  text,
  onClick,
  href,
  className = "",
  bgClassName = "",
  textClassName = "",
  iconClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonHoverBubbleProps) => {
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      data-href={href}
      className={cls(
        "relative group flex justify-center items-center min-w-0 w-fit max-w-full rounded-theme cursor-pointer pointer-events-auto outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <div
        className={cls(
          "flex justify-center items-center h-9 aspect-square rounded-theme relative",
          "scale-0 md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.625,0.05,0,1)] md:origin-left md:group-hover:scale-100",
          iconClassName
        )}
      >
        <ArrowDownRight strokeWidth={1.5} className="h-[35%] w-auto aspect-square object-contain md:transition-transform md:duration-700 md:group-hover:rotate-[-45deg]" />
      </div>
      <div
        className={cls(
          "flex justify-center items-center h-9 px-4 min-w-0 w-fit max-w-full rounded-theme relative",
          "-translate-x-[var(--height-9)] md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.625,0.05,0,1)] md:group-hover:translate-x-0",
          bgClassName
        )}
      >
        <span className={cls("text-sm block overflow-hidden truncate whitespace-nowrap", textClassName)}>{text}</span>
      </div>
      <div
        className={cls(
          "flex justify-center items-center h-9 aspect-square rounded-theme absolute right-0 z-20",
          "scale-100 md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.625,0.05,0,1)] md:origin-right md:group-hover:scale-0",
          iconClassName
        )}
      >
        <ArrowDownRight strokeWidth={1.5} className="h-[35%] w-auto aspect-square object-contain md:transition-transform md:duration-700 md:group-hover:rotate-[-45deg]" />
      </div>
    </button>
  );
};

ButtonHoverBubble.displayName = "ButtonHoverBubble";

export default memo(ButtonHoverBubble);
