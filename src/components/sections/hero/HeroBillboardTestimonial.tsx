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

type HeroBillboardTestimonialBackgroundProps = Extract<
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

interface HeroBillboardTestimonialProps {
  title: string;
  description: string;
  background: HeroBillboardTestimonialBackgroundProps;
  testimonials: Testimonial[];
  testimonialRotationInterval?: number;
  useInvertedBackground?: boolean;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  avatars?: Avatar[];
  avatarText?: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  mediaAnimation?: ButtonAnimationType;
  marqueeItems?: MarqueeItem[];
  marqueeSpeed?: number;
  showMarqueeCard?: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  avatarGroupClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
  testimonialCardClassName?: string;
  testimonialContentClassName?: string;
  testimonialTextClassName?: string;
  testimonialRatingClassName?: string;
  testimonialAuthorClassName?: string;
  testimonialAuthorImageClassName?: string;
  testimonialAuthorNameClassName?: string;
  testimonialAuthorHandleClassName?: string;
  marqueeClassName?: string;
  marqueeItemClassName?: string;
  marqueeCardClassName?: string;
  marqueeImageClassName?: string;
  marqueeTextClassName?: string;
  marqueeIconClassName?: string;
}

const HeroBillboardTestimonial = ({
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
  avatarText,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  mediaAnimation = "none",
  marqueeItems,
  marqueeSpeed = 30,
  showMarqueeCard = true,
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  avatarGroupClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
  testimonialCardClassName = "",
  testimonialContentClassName = "",
  testimonialTextClassName = "",
  testimonialRatingClassName = "",
  testimonialAuthorClassName = "",
  testimonialAuthorImageClassName = "",
  testimonialAuthorNameClassName = "",
  testimonialAuthorHandleClassName = "",
  marqueeClassName = "",
  marqueeItemClassName = "",
  marqueeCardClassName = "",
  marqueeImageClassName = "",
  marqueeTextClassName = "",
  marqueeIconClassName = "",
}: HeroBillboardTestimonialProps) => {
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

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full py-hero-page-padding", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto flex flex-col gap-14 md:gap-15 relative z-10", containerClassName)}>
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
          avatarsAbove={true}
          className={cls("flex flex-col gap-3 md:gap-3", textBoxClassName)}
          titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-base md:text-lg leading-tight", descriptionClassName)}
          tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1", tagClassName)}
          avatarGroupClassName={avatarGroupClassName}
          buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
          buttonClassName={buttonClassName}
          buttonTextClassName={buttonTextClassName}
          center={true}
        />
        <div className="flex flex-col gap-6">
          <div ref={mediaContainerRef} className={cls("relative w-full overflow-hidden rounded-theme-capped card p-4", mediaWrapperClassName)}>
            <MediaContent
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              imageAlt={imageAlt}
              videoAriaLabel={videoAriaLabel}
              imageClassName={cls("z-1 aspect-square md:aspect-video", imageClassName)}
            />

            {currentTestimonial && (
              <div className={cls(
                "absolute! bottom-[calc(var(--spacing-4)+var(--spacing-4))] left-[calc(var(--spacing-4)+var(--spacing-4))] max-md:right-[calc(var(--spacing-4)+var(--spacing-4))] max-w-full md:max-w-3/10 2xl:max-w-25/100 card rounded-theme-capped p-6 flex flex-col justify-between gap-5",
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
          {marqueeItems && marqueeItems.length > 0 && (
            <LogoMarquee
              items={marqueeItems}
              speed={marqueeSpeed}
              showCard={showMarqueeCard}
              className={cls("w-content-width mx-auto z-10", marqueeClassName)}
              itemClassName={marqueeItemClassName}
              cardClassName={marqueeCardClassName}
              imageClassName={marqueeImageClassName}
              textClassName={marqueeTextClassName}
              iconClassName={marqueeIconClassName}
            />
          )}
        </div>
      </div>
    </section>
  );
};

HeroBillboardTestimonial.displayName = "HeroBillboardTestimonial";

export default HeroBillboardTestimonial;
