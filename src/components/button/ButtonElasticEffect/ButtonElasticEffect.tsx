"use client";

import { memo } from "react";
import useElasticEffect from "./useElasticEffect";
import { useButtonClick } from "../useButtonClick";
import { cls } from "@/lib/utils";

interface ButtonElasticEffectProps {
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

const ButtonElasticEffect = ({
  text,
  onClick,
  href,
  className = "",
  textClassName = "",
  disabled = false,
  ariaLabel,
  type = "button",
  scrollToSection,
}: ButtonElasticEffectProps) => {
  const elasticRef = useElasticEffect<HTMLButtonElement>();
  const handleClick = useButtonClick(href, onClick, scrollToSection);

  return (
    <button
      ref={elasticRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      data-href={href}
      aria-label={ariaLabel || text}
      className={cls(
        "relative cursor-pointer h-9 min-w-0 w-fit max-w-full px-6 primary-button rounded-theme text-primary-cta-text",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className={cls("text-sm block overflow-hidden truncate whitespace-nowrap", textClassName)}>{text}</span>
    </button>
  );
};

ButtonElasticEffect.displayName = "ButtonElasticEffect";

export default memo(ButtonElasticEffect);
