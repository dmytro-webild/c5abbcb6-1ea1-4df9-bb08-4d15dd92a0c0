"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Plus } from "lucide-react";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";

interface AccordionProps {
  index: number;
  isActive?: boolean;
  onToggle?: (index: number) => void;
  title: string;
  content: string;
  animationType?: "smooth" | "instant";
  showCard?: boolean;
  useInvertedBackground?: boolean;
  className?: string;
  titleClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
}

const Accordion = ({
  index,
  isActive: controlledIsActive,
  onToggle,
  title,
  content,
  animationType = "smooth",
  showCard = true,
  useInvertedBackground,
  className = "",
  titleClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
  contentClassName = "",
}: AccordionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  const [internalIsActive, setInternalIsActive] = useState(false);

  const isActive = controlledIsActive !== undefined ? controlledIsActive : internalIsActive;

  const theme = useTheme();
  const shouldUseLightText = showCard
    ? shouldUseInvertedText(useInvertedBackground, theme.cardStyle)
    : useInvertedBackground;

  useEffect(() => {
    if (animationType === "smooth") {
      setHeight(isActive ? `${contentRef.current?.scrollHeight}px` : "0px");
    }
  }, [isActive, animationType]);

  const handleClick = useCallback(() => {
    if (controlledIsActive === undefined) {
      setInternalIsActive(!internalIsActive);
    }
    if (onToggle) {
      onToggle(index);
    }
  }, [controlledIsActive, internalIsActive, onToggle, index]);

  const headerContent = (
    <div className="flex flex-row items-center justify-between w-full">
      <h2
        className={cls(
          "text-base md:text-xl font-medium",
          shouldUseLightText ? "text-background" : "text-foreground",
          animationType === "instant" && "text-left",
          titleClassName
        )}
      >
        {title}
      </h2>
      <div
        className={cls(
          "h-8 aspect-square flex items-center justify-center rounded-theme primary-button transition-all duration-300",
          iconContainerClassName
        )}
      >
        <Plus
          className={cls(
            "w-4/10 aspect-square text-primary-cta-text",
            animationType === "smooth" ? "transition-transform duration-500" : "transition-transform duration-300",
            isActive && "rotate-45",
            iconClassName
          )}
        />
      </div>
    </div>
  );

  const contentElement = (
    <div
      className={cls(
        "text-base",
        shouldUseLightText ? "text-background" : "text-foreground",
        animationType === "smooth" && "pt-2",
        contentClassName
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  if (animationType === "instant") {
    return (
      <div className={cls(showCard && "card rounded-theme", className)}>
        <button
          className={cls("cursor-pointer flex flex-row items-center justify-between w-full transition-all duration-300 group", showCard && "p-4")}
          onClick={handleClick}
          aria-expanded={isActive}
        >
          {headerContent}
        </button>
        {isActive && <div className={cls(showCard && "px-4 pb-4")}>{contentElement}</div>}
      </div>
    );
  }

  return (
    <div
      className={cls(
        showCard ? "card p-4 rounded-theme-capped" : "",
        "cursor-pointer flex flex-col items-center justify-between transition-all duration-500  group",
        className
      )}
      onClick={handleClick}
      aria-expanded={isActive}
    >
      {headerContent}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-500 w-full flex flex-col"
      >
        {contentElement}
      </div>
    </div>
  );
};

Accordion.displayName = "Accordion";

export default memo(Accordion);
