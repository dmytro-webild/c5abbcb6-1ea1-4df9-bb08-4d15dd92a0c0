"use client";

import React, { Children, useCallback } from "react";
import { cls } from "@/lib/utils";
import CardStackTextBox from "../../CardStackTextBox";
import { useTimelineHorizontal, type MediaItem } from "../../hooks/useTimelineHorizontal";
import MediaContent from "@/components/shared/MediaContent";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment, TextboxLayout, InvertedBackground } from "../../types";

interface TimelineHorizontalCardStackProps {
  children: React.ReactNode;
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  textboxLayout: TextboxLayout;
  useInvertedBackground?: InvertedBackground;
  mediaItems?: MediaItem[];
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
  cardClassName?: string;
  progressBarClassName?: string;
  mediaContainerClassName?: string;
  mediaClassName?: string;
  ariaLabel?: string;
}

const TimelineHorizontalCardStack = ({
  children,
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  textboxLayout,
  useInvertedBackground,
  mediaItems,
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
  cardClassName = "",
  progressBarClassName = "",
  mediaContainerClassName = "",
  mediaClassName = "",
  ariaLabel = "Timeline section",
}: TimelineHorizontalCardStackProps) => {
  const childrenArray = Children.toArray(children);
  const itemCount = childrenArray.length;

  const { activeIndex, progressRefs, handleItemClick, imageOpacity, currentMediaSrc } = useTimelineHorizontal({
    itemCount,
    mediaItems,
  });

  const getGridColumns = useCallback(() => {
    if (itemCount === 2) return "md:grid-cols-2";
    if (itemCount === 3) return "md:grid-cols-3";
    return "md:grid-cols-4";
  }, [itemCount]);

  const getItemOpacity = useCallback(
    (index: number) => {
      return index <= activeIndex ? "opacity-100" : "opacity-50";
    },
    [activeIndex]
  );

  return (
    <section
      className={cls(
        "relative py-20 w-full",
        useInvertedBackground && "bg-foreground",
        className
      )}
      aria-label={ariaLabel}
    >
      <div className={cls("w-content-width mx-auto flex flex-col gap-6", containerClassName)}>
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
        {mediaItems && mediaItems.length > 0 && (
          <div className={cls("relative card rounded-theme-capped overflow-hidden aspect-square md:aspect-[17/9]", mediaContainerClassName)}>
            <div
              className="absolute inset-6 z-1 transition-opacity duration-300 overflow-hidden"
              style={{ opacity: imageOpacity }}
            >
              <MediaContent
                imageSrc={currentMediaSrc.imageSrc}
                videoSrc={currentMediaSrc.videoSrc}
                imageAlt={mediaItems[activeIndex]?.imageAlt}
                videoAriaLabel={mediaItems[activeIndex]?.videoAriaLabel}
                imageClassName={cls("w-full h-full object-cover", mediaClassName)}
              />
            </div>
          </div>
        )}
        <div className={cls("relative grid grid-cols-1 gap-6 md:gap-6", getGridColumns())}>
          {Children.map(childrenArray, (child, index) => (
            <div
              key={index}
              className={cls(
                "card rounded-theme-capped p-6 flex flex-col justify-between gap-6 transition-all duration-300",
                index === activeIndex ? "cursor-default" : "cursor-pointer hover:shadow-lg",
                getItemOpacity(index),
                cardClassName
              )}
              onClick={() => handleItemClick(index)}
            >
              {child}
              <div className="relative w-full h-px overflow-hidden">
                <div className="absolute z-0 w-full h-full bg-foreground/20" />
                <div
                  ref={(el) => {
                    if (el !== null) {
                      progressRefs.current[index] = el;
                    }
                  }}
                  className={cls("absolute z-10 h-full w-full bg-foreground origin-left", progressBarClassName)}
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TimelineHorizontalCardStack.displayName = "TimelineHorizontalCardStack";

export default React.memo(TimelineHorizontalCardStack);
