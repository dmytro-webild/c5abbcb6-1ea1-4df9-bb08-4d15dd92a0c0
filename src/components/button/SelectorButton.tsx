"use client";

import { useRef, useEffect, memo, ReactNode } from "react";
import { cls } from "@/lib/utils";

export interface SelectorOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  labelClassName?: string;
}

export interface SelectorButtonProps {
  options: SelectorOption[];
  activeValue: string;
  onValueChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
  labelClassName?: string;
}

const SelectorButton = memo<SelectorButtonProps>(({
  options,
  activeValue,
  onValueChange,
  className = "",
  buttonClassName = "",
  wrapperClassName = "",
  labelClassName = "",
}) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const hoverElement = hoverRef.current;

    if (!container || !hoverElement) return;

    const moveHoverBlock = (target: HTMLElement) => {
      if (!target) return;
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      hoverElement.style.width = `${targetRect.width}px`;
      hoverElement.style.transform = `translateX(${targetRect.left - containerRect.left}px)`;
    };

    const updatePosition = () => {
      const activeButton = container.querySelector(
        `[data-value="${activeValue}"]`
      ) as HTMLElement;
      if (activeButton) moveHoverBlock(activeButton);
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeValue]);

  return (
    <div className={cls("relative w-fit p-1 card rounded-theme-capped", wrapperClassName)}>
      <div
        ref={containerRef}
        className={cls("relative overflow-hidden cursor-pointer flex", className)}
      >
        {options.map((option) => (
          <button
            key={option.value}
            data-value={option.value}
            disabled={option.disabled}
            onClick={() => !option.disabled && onValueChange(option.value)}
            className={cls(
              "relative px-4 py-2 text-sm md:text-base rounded-theme transition-all duration-300 ease-in-out z-1 text-nowrap",
              option.disabled ? "opacity-50" : "cursor-pointer",
              activeValue === option.value ? "" : "bg-transparent",
              buttonClassName
            )}
          >
            {typeof option.label === "string" ? (
              <span
                className={cls(
                  "transition-colors duration-300 ease-in-out",
                  activeValue === option.value ? "text-primary-cta-text" : "text-foreground",
                  option.disabled ? "" : "cursor-pointer",
                  option.labelClassName || labelClassName
                )}
              >
                {option.label}
              </span>
            ) : (
              <div
                className={cls(
                  "flex items-center justify-center transition-opacity duration-300",
                  activeValue === option.value ? "opacity-100" : "opacity-50",
                  option.disabled ? "" : "cursor-pointer",
                  option.labelClassName || labelClassName
                )}
              >
                {option.label}
              </div>
            )}
          </button>
        ))}

        <div
          ref={hoverRef}
          className="absolute top-0 left-0 h-full rounded-theme overflow-hidden pointer-events-none z-0 transition-all duration-400 ease-out"
        >
          <div className="relative primary-button w-full h-full rounded-theme" />
        </div>
      </div>
    </div>
  );
});

SelectorButton.displayName = "SelectorButton";

export default SelectorButton;
