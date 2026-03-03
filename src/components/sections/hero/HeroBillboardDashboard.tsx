"use client";

import TextBox from "@/components/Textbox";
import Dashboard from "@/components/shared/Dashboard";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { DashboardSidebarItem, DashboardStat, DashboardListItem } from "@/components/shared/Dashboard";
import type { ChartDataItem } from "@/components/bento/BentoLineChart/utils";

type HeroBillboardDashboardBackgroundProps = Extract<
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

interface HeroBillboardDashboardProps {
  title: string;
  description: string;
  background: HeroBillboardDashboardBackgroundProps;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  ariaLabel?: string;
  dashboard: {
    title: string;
    stats: [DashboardStat, DashboardStat, DashboardStat];
    logoIcon: LucideIcon;
    sidebarItems: DashboardSidebarItem[];
    searchPlaceholder?: string;
    buttons: ButtonConfig[];
    chartTitle?: string;
    chartData?: ChartDataItem[];
    listItems: DashboardListItem[];
    listTitle?: string;
    imageSrc: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
    className?: string;
    containerClassName?: string;
    sidebarClassName?: string;
    statClassName?: string;
    chartClassName?: string;
    listClassName?: string;
  };
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  dashboardClassName?: string;
}

const HeroBillboardDashboard = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  ariaLabel = "Hero section",
  dashboard,
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  dashboardClassName = "",
}: HeroBillboardDashboardProps) => {
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
          className={cls("flex flex-col gap-3 md:gap-3", textBoxClassName)}
          titleClassName={cls("text-6xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-base md:text-lg leading-tight", descriptionClassName)}
          tagClassName={cls("px-3 py-1 text-sm rounded-theme card text-foreground inline-flex items-center gap-2 mb-1", tagClassName)}
          buttonContainerClassName={cls("flex flex-wrap gap-4 max-md:justify-center mt-2", buttonContainerClassName)}
          buttonClassName={buttonClassName}
          buttonTextClassName={buttonTextClassName}
          center={true}
        />
        <Dashboard
          {...dashboard}
          className={cls(dashboard.className, dashboardClassName)}
        />
      </div>
    </section>
  );
};

HeroBillboardDashboard.displayName = "HeroBillboardDashboard";

export default HeroBillboardDashboard;
