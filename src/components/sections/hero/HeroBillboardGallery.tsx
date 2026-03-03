"use client";

import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import AutoCarousel from "@/components/cardStack/layouts/carousels/AutoCarousel";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

export interface MediaItem {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

type HeroBillboardGalleryBackgroundProps = Extract<
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

interface HeroBillboardGalleryProps {
  title: string;
  description: string;
  background: HeroBillboardGalleryBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  mediaItems: MediaItem[];
  mediaAnimation: ButtonAnimationType;
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
  mediaWrapperClassName?: string;
  imageClassName?: string;
}

const HeroBillboardGallery = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  mediaItems,
  mediaAnimation,
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
  mediaWrapperClassName = "",
  imageClassName = "",
}: HeroBillboardGalleryProps) => {
  const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });

  const renderCarouselItem = (item: MediaItem, index: number) => (
    <div
      key={index}
      className="w-full aspect-[4/5] overflow-hidden rounded-theme-capped card p-2 shadow-lg"
    >
      <MediaContent
        imageSrc={item.imageSrc}
        videoSrc={item.videoSrc}
        imageAlt={item.imageAlt || ""}
        videoAriaLabel={item.videoAriaLabel || "Gallery media"}
        imageClassName="h-full object-cover"
      />
    </div>
  );

  const itemCount = mediaItems?.length || 0;
  const desktopWidthClass = itemCount === 3 ? "md:w-[24%]" : itemCount === 4 ? "md:w-[24%]" : "md:w-[23%]";

  return (
    <section
      aria-label={ariaLabel}
      className={cls(
        "relative w-full py-hero-page-padding md:h-svh md:py-0",
        className
      )}
    >
      <HeroBackgrounds {...background} />
      <div className={cls(
        "mx-auto flex flex-col gap-14 relative z-10",
        "w-full md:w-content-width md:h-full md:items-center md:justify-center",
        containerClassName
      )}>
        <TextBox
          title={title}
          description={description}
          tag={tag}
          tagIcon={tagIcon}
          tagAnimation={tagAnimation}
          buttons={buttons}
          buttonAnimation={buttonAnimation}
          className={cls(
            "flex flex-col gap-3 md:gap-3 w-content-width mx-auto",
            textBoxClassName
          )}
          titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-base md:text-lg leading-tight", descriptionClassName)}
          tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1", tagClassName)}
          buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
          buttonClassName={buttonClassName}
          buttonTextClassName={buttonTextClassName}
          center={true}
        />

        <div className={cls("w-full", mediaWrapperClassName)}>
          <div className="block md:hidden -mx-[var(--content-padding)]">
            <AutoCarousel
              title=""
              description=""
              textboxLayout="default"
              animationType="none"
              className="py-0"
              carouselClassName="py-0"
              containerClassName="!w-full"
              itemClassName="!w-55"
              ariaLabel="Hero gallery carousel"
              showTextBox={false}
            >
              {mediaItems?.slice(0, 5).map(renderCarouselItem)}
            </AutoCarousel>
          </div>

          <div ref={mediaContainerRef} className="hidden md:flex justify-center items-center pt-2">
            <div className="relative flex items-center justify-center w-full">
              {mediaItems?.slice(0, 5).map((item, index) => {
                const rotations = ["-rotate-6", "rotate-6", "-rotate-6", "rotate-6", "-rotate-6"];
                const zIndexes = ["z-10", "z-20", "z-30", "z-40", "z-50"];
                const translates = ["-translate-y-5", "translate-y-5", "-translate-y-5", "translate-y-5", "-translate-y-5"];
                const marginClass = index > 0 ? "-ml-12 md:-ml-15" : "";

                return (
                  <div
                    key={index}
                    className={cls(
                      "relative aspect-[4/5] overflow-hidden rounded-theme-capped card p-2 shadow-lg transition-transform duration-500 ease-out hover:scale-110",
                      desktopWidthClass,
                      rotations[index],
                      zIndexes[index],
                      translates[index],
                      marginClass
                    )}
                  >
                    <MediaContent
                      imageSrc={item.imageSrc}
                      videoSrc={item.videoSrc}
                      imageAlt={item.imageAlt || ""}
                      videoAriaLabel={item.videoAriaLabel || "Gallery media"}
                      imageClassName={cls("z-1 h-full object-cover", imageClassName)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroBillboardGallery.displayName = "HeroBillboardGallery";

export default HeroBillboardGallery;
