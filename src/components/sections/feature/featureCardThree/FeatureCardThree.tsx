"use client";

import "./FeatureCardThree.css";
import { useRef, useCallback, useState } from "react";
import CardStack from "@/components/cardStack/CardStack";
import FeatureCardThreeItem from "./FeatureCardThreeItem";
import { useDynamicDimensions } from "./useDynamicDimensions";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
};

interface FeatureCardThreeProps {
  features: FeatureCard[];
  carouselMode?: "auto" | "buttons";
  gridVariant: GridVariant;
  uniformGridCustomHeightClasses?: string;
  animationType: CardAnimationType;
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
  gridClassName?: string;
  carouselClassName?: string;
  controlsClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  itemContentClassName?: string;
}

const FeatureCardThree = ({
  features,
  carouselMode = "buttons",
  gridVariant,
  uniformGridCustomHeightClasses,
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
  gridClassName = "",
  carouselClassName = "",
  controlsClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  itemContentClassName = "",
}: FeatureCardThreeProps) => {
  const featureCardThreeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (featureCardThreeRefs.current) {
        featureCardThreeRefs.current[index] = el;
      }
    },
    []
  );

  // Check if device supports hover (desktop) or not (mobile/touch)
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  // Handle click outside to deactivate on mobile
  useClickOutside(
    containerRef,
    () => setActiveIndex(null),
    activeIndex !== null && isTouchDevice
  );

  const handleItemClick = useCallback((index: number) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: none)").matches) return;
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  useDynamicDimensions([featureCardThreeRefs], {
    titleSelector: ".feature-card-three-title-row .feature-card-three-title",
    descriptionSelector: ".feature-card-three-description-wrapper .feature-card-three-description",
  });

  return (
    <div ref={containerRef}>
      <CardStack
        mode={carouselMode}
        gridVariant={gridVariant}
        uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
        animationType={animationType}
        
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
          <FeatureCardThreeItem
            key={`${feature.id}-${index}`}
            ref={setRef(index)}
            item={feature}
            isActive={activeIndex === index}
            onItemClick={() => handleItemClick(index)}
            className={cardClassName}
            itemContentClassName={itemContentClassName}
            itemTitleClassName={cardTitleClassName}
            itemDescriptionClassName={cardDescriptionClassName}
          />
        ))}
      </CardStack>
    </div>
  );
};

FeatureCardThree.displayName = "FeatureCardThree";

export default FeatureCardThree;
