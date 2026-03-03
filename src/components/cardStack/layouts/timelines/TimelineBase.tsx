"use client";

import React, { Children, useCallback } from "react";
import { cls } from "@/lib/utils";
import CardStackTextBox from "../../CardStackTextBox";
import { useCardAnimation } from "../../hooks/useCardAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "../../types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type TimelineVariant = "timeline";

interface TimelineBaseProps {
  children: React.ReactNode;
  variant?: TimelineVariant;
  uniformGridCustomHeightClasses?: string;
  animationType: CardAnimationType;
  title?: string;
  titleSegments?: TitleSegment[];
  description?: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  textboxLayout?: TextboxLayout;
  useInvertedBackground?: InvertedBackground;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  titleImageWrapperClassName?: string;
  titleImageClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  ariaLabel?: string;
}

const TimelineBase = ({
  children,
  variant = "timeline",
  uniformGridCustomHeightClasses = "min-h-80 2xl:min-h-90",
  animationType,
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  textboxLayout = "default",
  useInvertedBackground,
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  titleImageWrapperClassName = "",
  titleImageClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  ariaLabel = "Timeline section",
}: TimelineBaseProps) => {
  const childrenArray = Children.toArray(children);
  const { itemRefs } = useCardAnimation({
    animationType,
    itemCount: childrenArray.length,
    isGrid: false
  });

  const getItemClasses = useCallback((index: number) => {
    // Timeline variant - scattered/organic pattern
    const alignmentClass =
      index % 2 === 0 ? "self-start ml-0" : "self-end mr-0";

    const marginClasses = cls(
      index % 4 === 0 && "md:ml-0",
      index % 4 === 1 && "md:mr-20",
      index % 4 === 2 && "md:ml-15",
      index % 4 === 3 && "md:mr-30"
    );

    return cls(alignmentClass, marginClasses);
  }, []);

  return (
    <section
      className={cls(
        "relative py-20 w-full",
        useInvertedBackground && "bg-foreground",
        className
      )}
      aria-label={ariaLabel}
    >
      <div
        className={cls("w-content-width mx-auto flex flex-col gap-6", containerClassName)}
      >
        {(title || titleSegments || description) && (
          <CardStackTextBox
            title={title}
            titleSegments={titleSegments}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            textboxLayout={textboxLayout}
            useInvertedBackground={useInvertedBackground}
            textBoxClassName={textBoxClassName}
            titleClassName={titleClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            descriptionClassName={descriptionClassName}
            tagClassName={tagClassName}
            buttonContainerClassName={buttonContainerClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
          />
        )}
        <div
          className={cls(
            "relative z-10 flex flex-col gap-6 md:gap-15"
          )}
        >
          {Children.map(childrenArray, (child, index) => (
            <div
              key={index}
              className={cls("w-65 md:w-25", uniformGridCustomHeightClasses, getItemClasses(index))}
              ref={(el) => { itemRefs.current[index] = el; }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TimelineBase.displayName = "TimelineBase";

export default React.memo(TimelineBase);
