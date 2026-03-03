"use client";

import CardStack from "@/components/cardStack/CardStack";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { BentoGlobe } from "@/components/bento/BentoGlobe";
import BentoIconInfoCards from "@/components/bento/BentoIconInfoCards";
import BentoAnimatedBarChart from "@/components/bento/BentoAnimatedBarChart";
import Bento3DStackCards from "@/components/bento/Bento3DStackCards";
import Bento3DTaskList, { type TaskItem } from "@/components/bento/Bento3DTaskList";
import BentoOrbitingIcons, { type OrbitingItem } from "@/components/bento/BentoOrbitingIcons";
import BentoMap from "@/components/bento/BentoMap";
import BentoMarquee from "@/components/bento/BentoMarquee";
import BentoLineChart from "@/components/bento/BentoLineChart/BentoLineChart";
import BentoPhoneAnimation, { type PhoneApp, type PhoneApps8 } from "@/components/bento/BentoPhoneAnimation";
import BentoChatAnimation, { type ChatExchange } from "@/components/bento/BentoChatAnimation";
import Bento3DCardGrid from "@/components/bento/Bento3DCardGrid";
import BentoRevealIcon from "@/components/bento/BentoRevealIcon";
import BentoTimeline, { type TimelineItem } from "@/components/bento/BentoTimeline";
import BentoMediaStack, { type MediaStackItem } from "@/components/bento/BentoMediaStack";
import type { LucideIcon } from "lucide-react";

export type { PhoneApp, PhoneApps8, ChatExchange, TimelineItem, MediaStackItem };
import type { ButtonConfig, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";

import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type BentoAnimationType = Exclude<CardAnimationTypeWith3D, "depth-3d" | "scale-rotate">;

export type BentoInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type Bento3DItem = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  detail: string;
};

type BaseFeatureCard = {
  title: string;
  description: string;
  button?: ButtonConfig;
};

export type FeatureCard = BaseFeatureCard & (
  | {
      bentoComponent: "icon-info-cards";
      items: BentoInfoItem[];
    }
  | {
      bentoComponent: "3d-stack-cards";
      items: [Bento3DItem, Bento3DItem, Bento3DItem];
    }
  | {
      bentoComponent: "3d-task-list";
      title: string;
      items: TaskItem[];
    }
  | {
      bentoComponent: "orbiting-icons";
      centerIcon: LucideIcon;
      items: OrbitingItem[];
    }
  | ({
      bentoComponent: "marquee";
      centerIcon: LucideIcon;
    } & (
      | { variant: "text"; texts: string[] }
      | { variant: "icon"; icons: LucideIcon[] }
    ))
  | {
      bentoComponent: "globe" | "animated-bar-chart" | "map" | "line-chart";
      items?: never;
    }
  | {
      bentoComponent: "3d-card-grid";
      items: [{ name: string; icon: LucideIcon }, { name: string; icon: LucideIcon }, { name: string; icon: LucideIcon }, { name: string; icon: LucideIcon }];
      centerIcon: LucideIcon;
    }
  | {
      bentoComponent: "phone";
      statusIcon: LucideIcon;
      alertIcon: LucideIcon;
      alertTitle: string;
      alertMessage: string;
      apps: PhoneApps8;
    }
  | {
      bentoComponent: "chat";
      aiIcon: LucideIcon;
      userIcon: LucideIcon;
      exchanges: ChatExchange[];
      placeholder: string;
    }
  | {
      bentoComponent: "reveal-icon";
      icon: LucideIcon;
    }
  | {
      bentoComponent: "timeline";
      heading: string;
      subheading: string;
      items: [TimelineItem, TimelineItem, TimelineItem];
      completedLabel: string;
    }
  | {
      bentoComponent: "media-stack";
      items: [MediaStackItem, MediaStackItem, MediaStackItem];
    }
);

interface FeatureBentoProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  animationType: BentoAnimationType;
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  textboxLayout: TextboxLayout;
  useInvertedBackground: InvertedBackground;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  textBoxTitleClassName?: string;
  textBoxTitleImageWrapperClassName?: string;
  textBoxTitleImageClassName?: string;
  textBoxDescriptionClassName?: string;
  cardTitleClassName?: string;
  cardDescriptionClassName?: string;
  cardButtonClassName?: string;
  cardButtonTextClassName?: string;
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
}

const FeatureBento = ({
  features,
  carouselMode = "buttons",
  animationType,
  title,
  titleSegments,
  description,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  textboxLayout,
  useInvertedBackground,
  ariaLabel = "Feature section",
  className = "",
  containerClassName = "",
  cardClassName = "",
  textBoxTitleClassName = "",
  textBoxTitleImageWrapperClassName = "",
  textBoxTitleImageClassName = "",
  textBoxDescriptionClassName = "",
  cardTitleClassName = "",
  cardDescriptionClassName = "",
  cardButtonClassName = "",
  cardButtonTextClassName = "",
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
}: FeatureBentoProps) => {
  const theme = useTheme();
  const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

  const getBentoComponent = (feature: FeatureCard) => {
    switch (feature.bentoComponent) {
      case "globe":
        return (
          <div className="relative w-full h-full min-h-0" style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 40%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in"
          }}>
            <BentoGlobe className="w-full scale-150 mt-[15%]" />
          </div>
        );
      case "icon-info-cards":
        return <BentoIconInfoCards items={feature.items} useInvertedBackground={useInvertedBackground} />;
      case "animated-bar-chart":
        return <BentoAnimatedBarChart />;
      case "3d-stack-cards":
        return <Bento3DStackCards cards={feature.items.map(item => ({ Icon: item.icon, title: item.title, subtitle: item.subtitle, detail: item.detail }))} useInvertedBackground={useInvertedBackground} />;
      case "3d-task-list":
        return <Bento3DTaskList title={feature.title} items={feature.items} useInvertedBackground={useInvertedBackground} />;
      case "orbiting-icons":
        return <BentoOrbitingIcons centerIcon={feature.centerIcon} items={feature.items} useInvertedBackground={useInvertedBackground} />;
      case "marquee":
        return feature.variant === "text"
          ? <BentoMarquee centerIcon={feature.centerIcon} variant="text" texts={feature.texts} useInvertedBackground={useInvertedBackground} />
          : <BentoMarquee centerIcon={feature.centerIcon} variant="icon" icons={feature.icons} useInvertedBackground={useInvertedBackground} />;
      case "map":
        return <BentoMap useInvertedBackground={useInvertedBackground} />;
      case "line-chart":
        return <BentoLineChart useInvertedBackground={useInvertedBackground} />;
      case "3d-card-grid":
        return <Bento3DCardGrid items={feature.items} centerIcon={feature.centerIcon} useInvertedBackground={useInvertedBackground} />;
      case "phone":
        return <BentoPhoneAnimation statusIcon={feature.statusIcon} alertIcon={feature.alertIcon} alertTitle={feature.alertTitle} alertMessage={feature.alertMessage} apps={feature.apps} useInvertedBackground={useInvertedBackground} />;
      case "chat":
        return <BentoChatAnimation aiIcon={feature.aiIcon} userIcon={feature.userIcon} exchanges={feature.exchanges} placeholder={feature.placeholder} useInvertedBackground={useInvertedBackground} />;
      case "reveal-icon":
        return <BentoRevealIcon icon={feature.icon} useInvertedBackground={useInvertedBackground} />;
      case "timeline":
        return <BentoTimeline heading={feature.heading} subheading={feature.subheading} items={feature.items} completedLabel={feature.completedLabel} useInvertedBackground={useInvertedBackground} />;
      case "media-stack":
        return <BentoMediaStack items={feature.items} useInvertedBackground={useInvertedBackground} />;
    }
  };

  return (
    <CardStack
      mode={carouselMode}
      gridVariant="uniform-all-items-equal"
      uniformGridCustomHeightClasses="min-h-0"
      animationType={animationType}
      carouselThreshold={4}

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
      className={className}
      containerClassName={containerClassName}
      gridClassName={gridClassName}
      carouselClassName={carouselClassName}
      carouselItemClassName="w-carousel-item-3 xl:w-carousel-item-3!"
      controlsClassName={controlsClassName}
      textBoxClassName={textBoxClassName}
      titleClassName={textBoxTitleClassName}
      titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
      titleImageClassName={textBoxTitleImageClassName}
      descriptionClassName={textBoxDescriptionClassName}
      tagClassName={textBoxTagClassName}
      buttonContainerClassName={textBoxButtonContainerClassName}
      buttonClassName={textBoxButtonClassName}
      buttonTextClassName={textBoxButtonTextClassName}
      ariaLabel={ariaLabel}
    >
      {features.map((feature, index) => (
        <div
          key={`${feature.title}-${index}`}
          className={cls("card flex flex-col gap-4 p-5 rounded-theme-capped min-h-0 h-full", cardClassName)}
        >
          <div className="relative w-full h-70 min-h-0 overflow-hidden">
            {getBentoComponent(feature)}
          </div>
          <div className="relative z-1 flex flex-col gap-1">
            <h3 className={cls("text-2xl font-medium leading-tight", shouldUseLightText && "text-background", cardTitleClassName)}>
              {feature.title}
            </h3>
            <p className={cls("text-sm leading-tight", shouldUseLightText ? "text-background" : "text-foreground", cardDescriptionClassName)}>
              {feature.description}
            </p>
          </div>
          {feature.button && (
            <Button {...getButtonProps(feature.button, 0, theme.defaultButtonVariant, cls("w-full", cardButtonClassName), cardButtonTextClassName)} />
          )}
        </div>
      ))}
    </CardStack>
  );
};

FeatureBento.displayName = "FeatureBento";

export default FeatureBento;
