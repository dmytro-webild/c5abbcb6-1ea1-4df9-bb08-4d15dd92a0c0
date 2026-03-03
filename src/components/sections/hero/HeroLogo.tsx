"use client";

import MediaContent from "@/components/shared/MediaContent";
import FillWidthText, { hasDescenders } from "@/components/shared/FillWidthText/FillWidthText";
import TextAnimation from "@/components/text/TextAnimation";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";

interface HeroLogoProps {
  logoText: string;
  description: string;
  buttons: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
  showDimOverlay?: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  contentContainerClassName?: string;
  descriptionClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  logoContainerClassName?: string;
  logoClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
  blurClassName?: string;
  dimOverlayClassName?: string;
}

const HeroLogo = ({
  logoText,
  description,
  buttons,
  buttonAnimation = "none",
  imageSrc,
  videoSrc,
  imageAlt = "",
  videoAriaLabel = "Hero video",
  showDimOverlay = false,
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  contentContainerClassName = "",
  descriptionClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  logoContainerClassName = "",
  logoClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
  blurClassName = "",
  dimOverlayClassName = "",
}: HeroLogoProps) => {
  const theme = useTheme();
  const { containerRef: buttonContainerRef } = useButtonAnimation({ animationType: buttonAnimation });

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-svh overflow-hidden flex flex-col justify-end", className)}
    >
      <div className={cls("absolute inset-0 w-full h-full", mediaWrapperClassName)}>
        {showDimOverlay && (
          <div className={cls("absolute top-0 left-0 w-full h-full bg-background/20 pointer-events-none select-none", dimOverlayClassName)} />
        )}
        <MediaContent
          imageSrc={imageSrc}
          videoSrc={videoSrc}
          imageAlt={imageAlt}
          videoAriaLabel={videoAriaLabel}
          imageClassName={cls("w-full h-full object-cover !rounded-none", imageClassName)}
        />
      </div>

      <div
        className={cls(
          "absolute z-10 backdrop-blur-xl opacity-100 w-full h-[50svh] md:h-[75svh] left-0 bottom-0 pointer-events-none select-none",
          blurClassName
        )}
        style={{ maskImage: MASK_GRADIENT }}
        aria-hidden="true"
      />

      <div className={cls("relative z-20 w-content-width mx-auto h-fit flex items-end", containerClassName)}>
        <div className={cls("w-full flex flex-col", logoContainerClassName)}>
          <div className={cls("w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-6", contentContainerClassName)}>
            <div className="w-full md:w-1/2" >
              <TextAnimation
                type={theme.defaultTextAnimation}
                text={description}
                variant="words-trigger"
                start="top 100%"
                className={cls("text-lg md:text-2xl text-background text-balance font-medium leading-[1.2] md:max-w-1/2", descriptionClassName)}
              />
            </div>
            <div className="w-full md:w-1/2 flex justify-start md:justify-end" >
              <div ref={buttonContainerRef} className={cls("flex flex-wrap gap-4 max-md:justify-center", buttonContainerClassName)}>
                {buttons.slice(0, 2).map((button, index) => (
                  <Button key={index} {...getButtonProps(button, index, theme.defaultButtonVariant, cls("", buttonClassName), cls("text-base", buttonTextClassName))} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex">
            <FillWidthText className={cls("font-bold text-background", !hasDescenders(logoText) && "my-10", logoClassName)}>
              {logoText}
            </FillWidthText>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroLogo.displayName = "HeroLogo";

export default HeroLogo;
