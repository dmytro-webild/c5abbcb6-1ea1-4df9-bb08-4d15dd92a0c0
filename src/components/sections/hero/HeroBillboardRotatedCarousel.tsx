"use client";


import TextBox from "@/components/Textbox";
import AngledCarousel from "@/components/cardStack/layouts/carousels/AngledCarousel";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

type HeroBillboardRotatedCarouselBackgroundProps = Extract<
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

interface CarouselItem {
  id: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

interface HeroBillboardRotatedCarouselProps {
  title: string;
  description: string;
  background: HeroBillboardRotatedCarouselBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  carouselItems: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
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
  carouselClassName?: string;
}

const HeroBillboardRotatedCarousel = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  carouselItems,
  autoPlay = true,
  autoPlayInterval = 4000,
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
  carouselClassName = "",
}: HeroBillboardRotatedCarouselProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-fit md:min-h-svh flex items-center justify-center py-hero-page-padding", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-full flex flex-col gap-14 md:gap-15 relative z-10", containerClassName)}>
        <div className="w-content-width mx-auto" >
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

        <AngledCarousel
          items={carouselItems}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
          className={carouselClassName}
        />
      </div>
    </section>
  );
};

HeroBillboardRotatedCarousel.displayName = "HeroBillboardRotatedCarousel";

export default HeroBillboardRotatedCarousel;
