"use client";

import { useState, useEffect } from "react";
import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import LogoMarquee, { type MarqueeItem } from "@/components/shared/LogoMarquee";
import TestimonialAuthor from "@/components/shared/TestimonialAuthor";
import AnimationContainer from "@/components/sections/AnimationContainer";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "@/components/shared/AvatarGroup";

type Testimonial = {
  name: string;
  handle: string;
  testimonial: string;
  rating: number;
  imageSrc?: string;
  imageAlt?: string;
};

type HeroSplitTestimonialBackgroundProps = Extract<
  HeroBackgroundVariantProps,
  | { variant: "plain" }
  | { variant: "animated-grid" }
  | { variant: "canvas-reveal" }
  | { variant: "cell-wave" }
  | { variant: "downward-rays-animated" }
  | { variant: "downward-rays-animated-grid" }
  | { variant: "downward-rays-static" }
  | { variant: "downward-rays-static-grid" }
  | { variant: "glowing-orb" }
  | { variant: "gradient-bars" }
  | { variant: "radial-gradient" }
  | { variant: "rotated-rays-animated" }
  | { variant: "rotated-rays-animated-grid" }
  | { variant: "rotated-rays-static" }
  | { variant: "rotated-rays-static-grid" }
  | { variant: "sparkles-gradient" }
>;

interface HeroSplitTestimonialProps {
  title: string;
  description: string;
  background: HeroSplitTestimonialBackgroundProps;
  testimonials: Testimonial[];
  testimonialRotationInterval?: number;
  useInvertedBackground?: boolean;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  avatars?: Avatar[];
  mediaAnimation: ButtonAnimationType;
  avatarText?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  ariaLabel?: string;
  imagePosition?: "left" | "right";
  fixedMediaHeight?: boolean;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
  avatarGroupClassName?: string;
  testimonialCardClassName?: string;
  testimonialContentClassName?: string;
  testimonialTextClassName?: string;
  testimonialRatingClassName?: string;
  testimonialAuthorClassName?: string;
  testimonialAuthorImageClassName?: string;
  testimonialAuthorNameClassName?: string;
  testimonialAuthorHandleClassName?: string;
  marqueeItems?: MarqueeItem[];
  marqueeSpeed?: number;
  showMarqueeCard?: boolean;
  marqueeClassName?: string;
  marqueeItemClassName?: string;
  marqueeCardClassName?: string;
  marqueeImageClassName?: string;
  marqueeTextClassName?: string;
  marqueeIconClassName?: string;
}

const HeroSplitTestimonial = ({
  title,
  description,
  background,
  testimonials,
  testimonialRotationInterval = 5000,
  useInvertedBackground = false,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  avatars,
  mediaAnimation,
  avatarText,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  ariaLabel = "Hero section",
  imagePosition = "right",
  fixedMediaHeight = true,
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
  avatarGroupClassName = "",
  testimonialCardClassName = "",
  testimonialContentClassName = "",
  testimonialTextClassName = "",
  testimonialRatingClassName = "",
  testimonialAuthorClassName = "",
  testimonialAuthorImageClassName = "",
  testimonialAuthorNameClassName = "",
  testimonialAuthorHandleClassName = "",
  marqueeItems,
  marqueeSpeed = 30,
  showMarqueeCard = true,
  marqueeClassName = "",
  marqueeItemClassName = "",
  marqueeCardClassName = "",
  marqueeImageClassName = "",
  marqueeTextClassName = "",
  marqueeIconClassName = "",
}: HeroSplitTestimonialProps) => {
  const theme = useTheme();
  const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (!testimonialRotationInterval || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setAnimationKey((prev) => prev + 1);
    }, testimonialRotationInterval);

    return () => clearInterval(interval);
  }, [testimonialRotationInterval, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  const mediaContent = (
    <div ref={mediaContainerRef} className={cls(
      "relative w-full h-fit md:w-1/2 overflow-hidden rounded-theme-capped card p-4 md:max-h-[75svh]",
      fixedMediaHeight && "h-100 md:h-[65vh]",
      mediaWrapperClassName
    )}>
      <MediaContent
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        imageAlt={imageAlt}
        videoAriaLabel={videoAriaLabel}
        imageClassName={cls("h-full min-h-0", imageClassName)}
      />

      {currentTestimonial && (
        <div className={cls(
          "absolute! bottom-[calc(var(--spacing-4)+var(--spacing-4))] right-[calc(var(--spacing-4)+var(--spacing-4))] max-md:left-[calc(var(--spacing-4)+var(--spacing-4))] max-w-full md:max-w-5/10 card rounded-theme-capped p-6 flex flex-col justify-between gap-5",
          testimonialCardClassName
        )}>
          <AnimationContainer key={animationKey} className="flex flex-col gap-5">
            <div className={cls("flex flex-col gap-5 items-start", testimonialContentClassName)}>
              <div className={cls("relative z-1 flex gap-1", testimonialRatingClassName)}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cls(
                      "h-5 w-auto text-accent",
                      index < currentTestimonial.rating ? "fill-accent" : "fill-transparent"
                    )}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className={cls("relative z-1 text-lg leading-[1.2]", shouldUseLightText ? "text-background" : "text-foreground", testimonialTextClassName)}>
                {currentTestimonial.testimonial}
              </p>
            </div>

            <TestimonialAuthor
              name={currentTestimonial.name}
              subtitle={currentTestimonial.handle}
              imageSrc={currentTestimonial.imageSrc}
              imageAlt={currentTestimonial.imageAlt}
              useInvertedBackground={useInvertedBackground}
              className={testimonialAuthorClassName}
              imageClassName={testimonialAuthorImageClassName}
              nameClassName={testimonialAuthorNameClassName}
              subtitleClassName={testimonialAuthorHandleClassName}
            />
          </AnimationContainer>
        </div>
      )}
    </div>
  );

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-fit py-hero-page-padding md:py-0 md:h-svh flex items-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto flex flex-col md:flex-row gap-13 md:gap-15 items-center relative z-10", containerClassName)}>
        {imagePosition === "left" && mediaContent}

        <div className={cls("w-full md:w-1/2")}>
          {/* Mobile */}
          <TextBox
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            avatars={avatars}
            avatarText={avatarText}
            avatarGroupClassName={cls("!mt-5", avatarGroupClassName)}
            className={cls("flex flex-col gap-3 md:hidden", textBoxClassName)}
            titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
            descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-[1.2] text-center md:text-left", descriptionClassName)}
            tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
            buttonClassName={cls("", buttonClassName)}
            buttonTextClassName={cls("text-base", buttonTextClassName)}
            center={true}
          />
          {/* Desktop */}
          <TextBox
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            avatars={avatars}
            avatarText={avatarText}
            avatarGroupClassName={cls("", avatarGroupClassName)}
            className={cls("hidden md:flex flex-col gap-3 md:gap-4", textBoxClassName)}
            titleClassName={cls("text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance", titleClassName)}
            descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-tight text-center md:text-left", descriptionClassName)}
            tagClassName={cls("w-fit px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-3", tagClassName)}
            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
            buttonClassName={cls("", buttonClassName)}
            buttonTextClassName={cls("text-base", buttonTextClassName)}
            center={false}
          />
        </div>

        {imagePosition === "right" && mediaContent}
      </div>

      {marqueeItems && marqueeItems.length > 0 && (
        <LogoMarquee
          items={marqueeItems}
          speed={marqueeSpeed}
          showCard={showMarqueeCard}
          className={cls("absolute bottom-6 left-1/2 -translate-x-1/2 w-content-width z-10", marqueeClassName)}
          itemClassName={marqueeItemClassName}
          cardClassName={marqueeCardClassName}
          imageClassName={marqueeImageClassName}
          textClassName={marqueeTextClassName}
          iconClassName={marqueeIconClassName}
        />
      )}
    </section>
  );
};

HeroSplitTestimonial.displayName = "HeroSplitTestimonial";

export default HeroSplitTestimonial;
