"use client";

import { useEffect, useRef } from "react";
import TextBox from "@/components/Textbox";
import MediaContent from "@/components/shared/MediaContent";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import LogoMarquee, { type MarqueeItem } from "@/components/shared/LogoMarquee";
import { cls } from "@/lib/utils";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "@/components/shared/AvatarGroup";

const MOBILE_BREAKPOINT = 768;

const useKpiAnimation = (enableAnimation: boolean = true) => {
    const sectionRef = useRef<HTMLElement>(null);
    const boxRef1 = useRef<HTMLDivElement>(null);
    const boxRef2 = useRef<HTMLDivElement>(null);
    const boxRef3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enableAnimation) return;

        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        if (isMobile) return;

        let mouseX = 0;
        let mouseY = 0;

        let box1X = 0, box1Y = 0;
        let box2X = 0, box2Y = 0;
        let box3X = 0, box3Y = 0;

        const speed = 0.025;

        const handleMouseMove = (event: MouseEvent): void => {
            mouseX = (event.clientX / window.innerWidth) * 100 - 50;
            mouseY = (event.clientY / window.innerHeight) * 100 - 50;
        };

        const animate = (): void => {
            // Box 1 movement
            const distX1 = (mouseX * -0.25) - box1X;
            const distY1 = (mouseY * -0.25) - box1Y;
            box1X += distX1 * speed;
            box1Y += distY1 * speed;

            // Box 2 movement
            const distX2 = (mouseX * -0.5) - box2X;
            const distY2 = (mouseY * -0.5) - box2Y;
            box2X += distX2 * speed;
            box2Y += distY2 * speed;

            // Box 3 movement
            const distX3 = (mouseX * 0.25) - box3X;
            const distY3 = (mouseY * 0.25) - box3Y;
            box3X += distX3 * speed;
            box3Y += distY3 * speed;

            // Apply transforms
            if (boxRef1.current) {
                boxRef1.current.style.transform = `translate(${box1X}px, ${box1Y}px)`;
            }
            if (boxRef2.current) {
                boxRef2.current.style.transform = `translate(${box2X}px, ${box2Y}px)`;
            }
            if (boxRef3.current) {
                boxRef3.current.style.transform = `translate(${box3X}px, ${box3Y}px)`;
            }

            requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [enableAnimation]);

    return { sectionRef, boxRef1, boxRef2, boxRef3 };
};

type HeroSplitKpiBackgroundProps = Extract<
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

interface KpiItem {
    value: string;
    label: string;
}

interface HeroSplitKpiProps {
    title: string;
    description: string;
    background: HeroSplitKpiBackgroundProps;
    kpis: [KpiItem, KpiItem, KpiItem];
    enableKpiAnimation: boolean;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    avatars?: Avatar[];
    avatarText?: string;
    mediaAnimation: ButtonAnimationType;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    ariaLabel?: string;
    imagePosition?: "left" | "right";
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
    kpiClassName?: string;
    kpiValueClassName?: string;
    kpiLabelClassName?: string;
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

const HeroSplitKpi = ({
    title,
    description,
    background,
    kpis,
    enableKpiAnimation,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    avatars,
    avatarText,
    mediaAnimation,
    imageSrc,
    videoSrc,
    imageAlt = "",
    videoAriaLabel = "Hero video",
    ariaLabel = "Hero section",
    imagePosition = "right",
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
    kpiClassName = "",
    kpiValueClassName = "",
    kpiLabelClassName = "",
    marqueeItems,
    marqueeSpeed = 30,
    showMarqueeCard = true,
    marqueeClassName = "",
    marqueeItemClassName = "",
    marqueeCardClassName = "",
    marqueeImageClassName = "",
    marqueeTextClassName = "",
    marqueeIconClassName = "",
}: HeroSplitKpiProps) => {
    const { sectionRef, boxRef1, boxRef2, boxRef3 } = useKpiAnimation(enableKpiAnimation);
    const { containerRef: mediaContainerRef } = useButtonAnimation({ animationType: mediaAnimation });
    const boxRefs = [boxRef1, boxRef2, boxRef3];
    const mediaContent = (
        <div
            className={cls(
                "relative w-full h-fit md:w-1/2 aspect-square md:aspect-auto md:h-[65vh]",
                mediaWrapperClassName
            )}
        >
            <div ref={mediaContainerRef} className="relative h-full scale-75 w-full overflow-hidden rounded-theme-capped card p-4">
                <MediaContent
                    imageSrc={imageSrc}
                    videoSrc={videoSrc}
                    imageAlt={imageAlt}
                    videoAriaLabel={videoAriaLabel}
                    imageClassName={cls("h-full min-h-0", imageClassName)}
                />
            </div>

            {kpis.map((kpi, index) => (
                <div
                    key={index}
                    ref={boxRefs[index]}
                    className={cls(
                        "absolute! card backdrop-blur-xs rounded-theme-capped px-4 py-3 md:px-6 md:py-4 flex flex-col items-center",
                        index === 0 && "top-[5%] left-[5%] md:top-[0%] md:left-[0%]",
                        index === 1 && "top-[35%] right-[2.5%] md:top-[35%]",
                        index === 2 && "bottom-[7.5%] left-[10%] md:left-[7.5%] md:bottom-[0%]",
                        kpiClassName
                    )}
                >
                    <p className={cls("text-2xl md:text-4xl font-medium text-foreground", kpiValueClassName)}>
                        {kpi.value}
                    </p>
                    <p className={cls("text-sm md:text-base text-foreground/70", kpiLabelClassName)}>
                        {kpi.label}
                    </p>
                </div>
            ))}
        </div>
    );

    return (
        <section
            ref={sectionRef}
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
                        descriptionClassName={cls("max-w-8/10 text-lg md:text-xl leading-[1.2] text-center md:text-left", descriptionClassName)}
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

HeroSplitKpi.displayName = "HeroSplitKpi";

export default HeroSplitKpi;