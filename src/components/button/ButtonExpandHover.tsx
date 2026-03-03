"use client";

import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useButtonClick } from "./useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonExpandHoverProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  iconBgClassName?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  scrollToSection?: boolean;
}

const ButtonExpandHover = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  iconClassName = "",
  iconBgClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonExpandHoverProps) => {
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      data-href={href}
      aria-label={ariaLabel || text}
      className={cls(
        "group relative cursor-pointer h-fit min-w-0 w-fit max-w-full rounded-theme text-sm text-background pointer-events-auto outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <div
        className="relative h-9 w-full px-5"
        style={{ paddingRight: "calc(2.25rem + 0.75rem)" }}
      >
        <div className="h-9 flex items-center" >
          <span
            className={cls(
              "relative z-10 block overflow-hidden truncate whitespace-nowrap md:transition-colors md:duration-[900ms] md:[transition-timing-function:cubic-bezier(.77,0,.18,1)]",
              textClassName
            )}
          >
            {text}
          </span>
        </div>
        <div className="absolute overflow-hidden top-[2px] bottom-[2px] left-[2px] right-[2px] rounded-theme flex justify-end">
          <div
            className={cls(
              "relative z-10 h-full w-auto aspect-square flex items-center justify-center",
              iconClassName
            )}
          >
            <ArrowUpRight
              className="h-1/2 w-auto aspect-square"
              strokeWidth={1}
            />
          </div>
          <div
            className={cls(
              "absolute z-0 h-full w-full rounded-theme",
              "md:transition-transform md:duration-[900ms] md:[transition-timing-function:cubic-bezier(.77,0,.18,1)]",
              "-translate-x-[calc(-100%+2.25rem-4px)] md:group-hover:translate-x-0",
              iconBgClassName
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

ButtonExpandHover.displayName = "ButtonExpandHover";

export default memo(ButtonExpandHover);
