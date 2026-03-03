"use client";

import { memo, Children } from "react";
import { CardStackProps } from "./types";
import GridLayout from "./layouts/grid/GridLayout";
import AutoCarousel from "./layouts/carousels/AutoCarousel";
import ButtonCarousel from "./layouts/carousels/ButtonCarousel";
import TimelineBase from "./layouts/timelines/TimelineBase";
import { gridConfigs } from "./layouts/grid/gridConfigs";

const CardStack = ({
    children,
    mode = "buttons",
    gridVariant = "uniform-all-items-equal",
    uniformGridCustomHeightClasses,
    gridRowsClassName,
    itemHeightClassesOverride,
    animationType,
    supports3DAnimation = false,
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    textboxLayout = "default",
    useInvertedBackground,
    carouselThreshold = 5,
    bottomContent,
    className = "",
    containerClassName = "",
    gridClassName = "",
    carouselClassName = "",
    carouselItemClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    titleClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    descriptionClassName = "",
    tagClassName = "",
    buttonContainerClassName = "",
    buttonClassName = "",
    buttonTextClassName = "",
    ariaLabel = "Card stack",
}: CardStackProps) => {
    const childrenArray = Children.toArray(children);
    const itemCount = childrenArray.length;

    // Check if the current grid config has gridRows defined
    const gridConfig = gridConfigs[gridVariant]?.[itemCount];
    const hasFixedGridRows = gridConfig && 'gridRows' in gridConfig && gridConfig.gridRows;

    // If grid has fixed row heights and we have uniformGridCustomHeightClasses,
    // we need to use min-h-0 on md+ to prevent conflicts
    let adjustedHeightClasses = uniformGridCustomHeightClasses;
    if (hasFixedGridRows && uniformGridCustomHeightClasses) {
        // Extract the mobile min-height and add md:min-h-0
        const mobileMinHeight = uniformGridCustomHeightClasses.split(' ')[0];
        adjustedHeightClasses = `${mobileMinHeight} md:min-h-0`;
    }

    // Timeline layout for zigzag pattern (works best with 3-6 items)
    if (gridVariant === "timeline" && itemCount >= 3 && itemCount <= 6) {
        // Convert depth-3d to scale-rotate for timeline (doesn't support 3D)
        const timelineAnimationType = animationType === "depth-3d" ? "scale-rotate" : animationType;

        return (
            <TimelineBase
                variant={gridVariant}
                uniformGridCustomHeightClasses={adjustedHeightClasses}
                animationType={timelineAnimationType}
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
                textBoxClassName={textBoxClassName}
                titleClassName={titleClassName}
                titleImageWrapperClassName={titleImageWrapperClassName}
                titleImageClassName={titleImageClassName}
                descriptionClassName={descriptionClassName}
                tagClassName={tagClassName}
                buttonContainerClassName={buttonContainerClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                ariaLabel={ariaLabel}
            >
                {childrenArray}
            </TimelineBase>
        );
    }

    // Use grid for items below threshold, carousel for items at or above threshold
    // Timeline with 7+ items will also use carousel
    const useCarousel = itemCount >= carouselThreshold || (gridVariant === "timeline" && itemCount > 6);

    // Grid layout for 1-4 items
    if (!useCarousel) {
        return (
            <GridLayout
                itemCount={itemCount}
                gridVariant={gridVariant}
                uniformGridCustomHeightClasses={adjustedHeightClasses}
                gridRowsClassName={gridRowsClassName}
                itemHeightClassesOverride={itemHeightClassesOverride}
                animationType={animationType}
                supports3DAnimation={supports3DAnimation}
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
                bottomContent={bottomContent}
                className={className}
                containerClassName={containerClassName}
                gridClassName={gridClassName}
                textBoxClassName={textBoxClassName}
                titleClassName={titleClassName}
                titleImageWrapperClassName={titleImageWrapperClassName}
                titleImageClassName={titleImageClassName}
                descriptionClassName={descriptionClassName}
                tagClassName={tagClassName}
                buttonContainerClassName={buttonContainerClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                ariaLabel={ariaLabel}
            >
                {childrenArray}
            </GridLayout>
        );
    }

    // Auto-scroll carousel for 5+ items
    if (mode === "auto") {
        // Convert depth-3d to scale-rotate for carousel (doesn't support 3D)
        const carouselAnimationType = animationType === "depth-3d" ? "scale-rotate" : animationType;

        return (
            <AutoCarousel
                uniformGridCustomHeightClasses={adjustedHeightClasses}
                animationType={carouselAnimationType}
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
                bottomContent={bottomContent}
                className={className}
                containerClassName={containerClassName}
                carouselClassName={carouselClassName}
                textBoxClassName={textBoxClassName}
                titleClassName={titleClassName}
                titleImageWrapperClassName={titleImageWrapperClassName}
                titleImageClassName={titleImageClassName}
                descriptionClassName={descriptionClassName}
                tagClassName={tagClassName}
                buttonContainerClassName={buttonContainerClassName}
                buttonClassName={buttonClassName}
                buttonTextClassName={buttonTextClassName}
                ariaLabel={ariaLabel}
            >
                {childrenArray}
            </AutoCarousel>
        );
    }

    // Button-controlled carousel for 5+ items
    // Convert depth-3d to scale-rotate for carousel (doesn't support 3D)
    const carouselAnimationType = animationType === "depth-3d" ? "scale-rotate" : animationType;

    return (
        <ButtonCarousel
            uniformGridCustomHeightClasses={adjustedHeightClasses}
            animationType={carouselAnimationType}
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
            bottomContent={bottomContent}
            className={className}
            containerClassName={containerClassName}
            carouselClassName={carouselClassName}
            carouselItemClassName={carouselItemClassName}
            controlsClassName={controlsClassName}
            textBoxClassName={textBoxClassName}
            titleClassName={titleClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            descriptionClassName={descriptionClassName}
            tagClassName={tagClassName}
            buttonContainerClassName={buttonContainerClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
            ariaLabel={ariaLabel}
        >
            {childrenArray}
        </ButtonCarousel>
    );
};

CardStack.displayName = "CardStack";

export default memo(CardStack);
