"use client";

import { useState, useEffect } from "react";
import AvatarGroup from "@/components/shared/AvatarGroup";
import Tag from "@/components/shared/Tag";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonAnimationType } from "@/components/cardStack/types";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

type Testimonial = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt?: string;
};

interface TestimonialCardTwelveProps {
  testimonials: Testimonial[];
  cardTitle: string;
  cardTag: string;
  cardTagIcon?: LucideIcon;
  cardAnimation: ButtonAnimationType;
  useInvertedBackground: InvertedBackground;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  avatarGroupClassName?: string;
  avatarClassName?: string;
  cardTitleClassName?: string;
  cardTagClassName?: string;
}

const TestimonialCardTwelve = ({
  testimonials,
  cardTitle,
  cardTag,
  cardTagIcon,
  cardAnimation,
  useInvertedBackground,
  ariaLabel = "Testimonials section",
  className = "",
  containerClassName = "",
  cardClassName = "",
  avatarGroupClassName = "",
  avatarClassName = "",
  cardTitleClassName = "",
  cardTagClassName = "",
}: TestimonialCardTwelveProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
  const { containerRef: cardContainerRef } = useButtonAnimation({ animationType: cardAnimation });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const avatars = testimonials.map((testimonial) => ({
    src: testimonial.imageSrc,
    alt: testimonial.imageAlt || testimonial.name,
  }));

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
    >
      <div ref={cardContainerRef} className={cls("w-content-width mx-auto", containerClassName)}>
        <div className={cls("w-full card rounded-theme-capped p-8 flex flex-col items-center justify-between gap-8", cardClassName)}>
          <div className="flex flex-col gap-3 items-center">
            <Tag
              text={cardTag}
              icon={cardTagIcon}
              useInvertedBackground={useInvertedBackground}
              className={cardTagClassName}
            />
            <h3 className={cls("relative md:max-w-7/10 text-3xl md:text-5xl font-medium leading-tight text-center text-balance", shouldUseLightText ? "text-background" : "text-foreground", cardTitleClassName)}>
              {cardTitle}
            </h3>
          </div>
          <AvatarGroup
            avatars={avatars}
            className={avatarGroupClassName}
            avatarClassName={avatarClassName}
            maxVisible={isMobile ? 3 : 4}
            ariaLabel="Customer testimonials"
            avatarImageClassName="h-[var(--width-17_5)] md:h-[var(--width-12_5)]"
            avatarOverlapClassName="-ml-8"
          />
        </div>
      </div>
    </section>
  );
};

TestimonialCardTwelve.displayName = "TestimonialCardTwelve";

export default TestimonialCardTwelve;
