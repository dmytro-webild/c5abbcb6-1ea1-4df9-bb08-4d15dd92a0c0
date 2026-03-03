"use client";

import { cls } from "@/lib/utils";

interface HamburgerButtonProps {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  activeBarClassName?: string;
  inactiveBarClassName?: string;
  ariaControls?: string;
  styled?: boolean;
}

const HamburgerButton = ({
  isActive,
  onClick,
  className = "",
  activeBarClassName = "bg-background",
  inactiveBarClassName = "bg-foreground",
  ariaControls = "navigation-menu",
  styled = false,
}: HamburgerButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        "pointer-events-auto cursor-pointer border-none flex justify-center items-center h-9 w-[var(--height-9)] aspect-square relative",
        styled ? "primary-button rounded-theme" : "bg-transparent",
        className
      )}
      aria-label={isActive ? "Close menu" : "Open menu"}
      aria-expanded={isActive}
      aria-controls={ariaControls}
    >
      <span
        aria-hidden="true"
        className={cls(
          "transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)] w-[40%] h-0.25 absolute",
          isActive
            ? `${styled ? "bg-primary-cta-text" : activeBarClassName} translate-y-0 rotate-45`
            : `${styled ? "bg-primary-cta-text" : inactiveBarClassName} -translate-y-1 hover:translate-y-1`
        )}
      />
      <span
        aria-hidden="true"
        className={cls(
          "transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)] w-[40%] h-0.25 absolute",
          isActive
            ? `${styled ? "bg-primary-cta-text" : activeBarClassName} translate-y-0 -rotate-45`
            : `${styled ? "bg-primary-cta-text" : inactiveBarClassName} translate-y-1 hover:-translate-y-1`
        )}
      />
    </button>
  );
};

HamburgerButton.displayName = "HamburgerButton";

export default HamburgerButton;
