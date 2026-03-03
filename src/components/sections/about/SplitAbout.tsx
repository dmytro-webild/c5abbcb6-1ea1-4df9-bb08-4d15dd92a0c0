"use client";

import { Fragment } from "react";
import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import MediaContent from "@/components/shared/MediaContent";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig } from "@/types/button";
import type { TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

interface BulletPoint {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface SplitAboutProps {
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  bulletPoints: BulletPoint[];
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  ariaLabel?: string;
  imagePosition?: "left" | "right";
  mediaAnimation: ButtonAnimationType;
  textboxLayout: TextboxLayout;
  useInvertedBackground: InvertedBackground;
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
  contentClassName?: string;
  bulletPointClassName?: string;
  bulletTitleClassName?: string;
  bulletDescriptionClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
}

const SplitAbout = ({
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  bulletPoints,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "About section video",
  ariaLabel = "About section",
  imagePosition = "right",
  mediaAnimation,
  textboxLayout,
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
  contentClassName = "",
  bulletPointClassName = "",
  bulletTitleClassName = "",
  bulletDescriptionClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
}: SplitAboutProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
  const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });
  const { containerRef: bulletPointsContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

  const mediaContent = (
    <div className={cls("w-full md:w-6/10 2xl:w-7/10 overflow-hidden rounded-theme-capped card md:relative p-4", mediaWrapperClassName)}>
      <div ref={mediaContainerRef} className="md:relative w-full md:h-full">
        <MediaContent
          imageSrc={imageSrc}
          videoSrc={videoSrc}
          imageAlt={imageAlt}
          videoAriaLabel={videoAriaLabel}
          imageClassName={cls("z-1 w-full h-auto object-cover rounded-theme-capped md:absolute md:inset-0 md:h-full", imageClassName)}
        />
      </div>
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
    >
      <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
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

        <div className={cls("flex flex-col md:flex-row gap-6 md:items-stretch")}>
          {imagePosition === "left" && mediaContent}

          <div ref={bulletPointsContainerRef} className={cls("w-full md:w-4/10 2xl:w-3/10 rounded-theme-capped card p-6 flex flex-col gap-6 justify-center", contentClassName)}>
            {bulletPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Fragment key={index}>
                  <div className={cls("relative z-1 flex flex-col gap-2", bulletPointClassName)}>
                    {Icon && (
                      <div className="h-10 w-fit aspect-square rounded-theme primary-button flex items-center justify-center flex-shrink-0 mb-1">
                        <Icon className="h-[40%] w-[40%] text-primary-cta-text" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="flex flex-col gap-0">
                      <h3 className={cls("text-xl font-medium", shouldUseLightText && "text-background", bulletTitleClassName)}>
                        {point.title}
                      </h3>
                      <p className={cls("text-base leading-[1.4]", shouldUseLightText ? "text-background" : "text-foreground", bulletDescriptionClassName)}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                  {index < bulletPoints.length - 1 && (
                    <div className="relative z-1 w-full border-b border-accent/40" />
                  )}
                </Fragment>
              );
            })}
          </div>

          {imagePosition === "right" && mediaContent}
        </div>
      </div>
    </section>
  );
};

SplitAbout.displayName = "SplitAbout";

export default SplitAbout;
