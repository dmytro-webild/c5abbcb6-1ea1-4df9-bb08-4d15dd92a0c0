"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

type HeroBillboardScrollBackgroundProps = Extract<
  HeroBackgroundVariantProps,
  | { variant: "plain" }
  | { variant: "animated-grid" }
  | { variant: "canvas-reveal" }
  | { variant: "cell-wave" }
  | { variant: "downward-rays-animated" }
  | { variant: "downward-rays-animated-grid" }
  | { variant: "downward-rays-static" }
  | { variant: "downward-rays-static-grid" }
  | { variant: "gradient-bars" }
  | { variant: "radial-gradient" }
  | { variant: "rotated-rays-animated" }
  | { variant: "rotated-rays-animated-grid" }
  | { variant: "rotated-rays-static" }
  | { variant: "rotated-rays-static-grid" }
  | { variant: "sparkles-gradient" }
>;

interface HeroBillboardScrollProps {
  title: string;
  description: string;
  background: HeroBillboardScrollBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  cardWrapperClassName?: string;
  cardInnerClassName?: string;
  imageClassName?: string;
}

const HeroBillboardScroll = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  cardWrapperClassName = "",
  cardInnerClassName = "",
  imageClassName = "",
}: HeroBillboardScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      aria-label={ariaLabel}
      ref={containerRef}
      className={cls("relative h-fit flex items-center justify-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div
        className={cls("py-hero-page-padding w-full relative z-10", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div className="w-content-width mx-auto">
          <TextBox
            title={title}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            className={cls("flex flex-col gap-3 md:gap-3", textBoxClassName)}
            titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
            descriptionClassName={cls("text-base md:text-lg leading-tight", descriptionClassName)}
            tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1", tagClassName)}
            buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
            center={true}
          />
        </div>

        <div
          className={cls("relative w-content-width h-[50svh] mt-8 mx-auto md:hidden", cardWrapperClassName)}
          style={{
            transform: "rotateX(20deg)",
          }}
        >
          <div className={cls("h-full w-full overflow-hidden rounded-theme-capped card p-4", cardInnerClassName)}>
            <MediaContent
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              imageAlt={imageAlt}
              videoAriaLabel={videoAriaLabel}
              imageClassName={cls("z-1 h-full w-full object-cover object-left-top aspect-square md:aspect-video", imageClassName)}
            />
          </div>
        </div>

        <motion.div
          style={{
            rotateX: rotate,
            scale,
          }}
          className={cls("hidden md:block relative w-content-width mt-8 h-[75svh] mx-auto", cardWrapperClassName)}
        >
          <div className={cls("h-full w-full overflow-hidden rounded-theme-capped card p-4", cardInnerClassName)}>
            <MediaContent
              imageSrc={imageSrc}
              videoSrc={videoSrc}
              imageAlt={imageAlt}
              videoAriaLabel={videoAriaLabel}
              imageClassName={cls("z-1 h-full w-full object-cover object-left-top", imageClassName)}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

HeroBillboardScroll.displayName = "HeroBillboardScroll";

export default HeroBillboardScroll;
