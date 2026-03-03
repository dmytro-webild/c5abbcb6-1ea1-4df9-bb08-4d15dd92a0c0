"use client";

import React, { useEffect, useRef, memo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardStackTextBox from "../../CardStackTextBox";
import { useCardAnimation } from "../../hooks/useCardAnimation";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, CardAnimationType, TitleSegment } from "../../types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProcessFlowItem {
  id: string;
  content: React.ReactNode;
  media: React.ReactNode;
  reverse: boolean;
}

interface TimelineProcessFlowProps {
  items: TimelineProcessFlowItem[];
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  textboxLayout: TextboxLayout;
  animationType: CardAnimationType;
  useInvertedBackground?: InvertedBackground;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  textBoxTitleClassName?: string;
  textBoxDescriptionClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  itemClassName?: string;
  mediaWrapperClassName?: string;
  numberClassName?: string;
  contentWrapperClassName?: string;
  gapClassName?: string;
  titleImageWrapperClassName?: string;
  titleImageClassName?: string;
}

const TimelineProcessFlow = ({
  items,
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  textboxLayout,
  animationType,
  useInvertedBackground,
  ariaLabel = "Timeline process flow section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  textBoxTitleClassName = "",
  textBoxDescriptionClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  itemClassName = "",
  mediaWrapperClassName = "",
  numberClassName = "",
  contentWrapperClassName = "",
  gapClassName = "",
  titleImageWrapperClassName = "",
  titleImageClassName = "",
}: TimelineProcessFlowProps) => {
  const processLineRef = useRef<HTMLDivElement>(null);
  const { itemRefs } = useCardAnimation({ animationType, itemCount: items.length, useIndividualTriggers: true });
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!processLineRef.current) return;

    gsap.fromTo(
      processLineRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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
      <div className={cls("w-full flex flex-col gap-6", containerClassName)}>
        <div className="relative w-content-width mx-auto">
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
            titleClassName={textBoxTitleClassName}
            descriptionClassName={textBoxDescriptionClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
          />
        </div>
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 right-[var(--width-10)] md:right-auto md:left-1/2 md:-translate-x-1/2 w-px h-full z-10 overflow-hidden md:py-6" >
            <div className="relative timeline-line h-full bg-foreground overflow-hidden">
              <div className="w-full h-full bg-accent" ref={processLineRef} />
            </div>
          </div>
          <ol className={cls("relative w-content-width mx-auto flex flex-col gap-10 md:gap-20 md:p-6", isMdScreen && "card", "md:rounded-theme-capped", gapClassName)}>
            {items.map((item, index) => (
              <li
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={cls(
                  "relative z-10 w-full flex flex-col gap-6 md:gap-0 md:flex-row justify-between",
                  item.reverse && "flex-col md:flex-row-reverse",
                  itemClassName
                )}
              >
                <div
                  className={cls("relative w-70 md:w-30", mediaWrapperClassName)}
                >
                  {item.media}
                </div>
                <div
                  className={cls(
                    "absolute! top-1/2 right-[calc(var(--height-8)/-2)] md:right-auto md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 h-8 aspect-square rounded-theme flex items-center justify-center z-10 primary-button",
                    numberClassName
                  )}
                >
                  <p className="text-sm text-primary-cta-text">{item.id}</p>
                </div>
                <div className={cls("relative w-70 md:w-30", contentWrapperClassName)}>
                  {item.content}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

TimelineProcessFlow.displayName = "TimelineProcessFlow";

export default memo(TimelineProcessFlow);
