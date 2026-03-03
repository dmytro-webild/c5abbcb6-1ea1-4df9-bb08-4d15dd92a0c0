"use client";

import TimelinePhoneView from "@/components/cardStack/layouts/timelines/TimelinePhoneView";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment, CardAnimationType } from "@/components/cardStack/types";
import type { TimelinePhoneViewItem } from "@/components/cardStack/hooks/usePhoneAnimations";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeaturePhone = {
    imageAlt?: string;
    videoAriaLabel?: string;
} & (
        | { imageSrc: string; videoSrc?: never }
        | { videoSrc: string; imageSrc?: never }
    );

type FeatureCard = {
    id: number;
    title: string;
    description: string;
    buttons?: ButtonConfig[];
    phoneOne: FeaturePhone;
    phoneTwo: FeaturePhone;
};

interface FeatureCardNineProps {
    features: FeatureCard[];
    showStepNumbers: boolean;
    title: string;
    titleSegments?: TitleSegment[];
    description: string;
    tag?: string;
    tagIcon?: LucideIcon;
    tagAnimation?: ButtonAnimationType;
    buttons?: ButtonConfig[];
    buttonAnimation?: ButtonAnimationType;
    animationType: CardAnimationType;
    textboxLayout: TextboxLayout;
    useInvertedBackground: InvertedBackground;
    ariaLabel?: string;
    className?: string;
    containerClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    desktopContainerClassName?: string;
    mobileContainerClassName?: string;
    desktopContentClassName?: string;
    desktopWrapperClassName?: string;
    mobileWrapperClassName?: string;
    phoneFrameClassName?: string;
    mobilePhoneFrameClassName?: string;
    featureContentClassName?: string;
    stepNumberClassName?: string;
    featureTitleClassName?: string;
    featureDescriptionClassName?: string;
    cardButtonClassName?: string;
    cardButtonTextClassName?: string;
}

interface FeatureContentProps {
    feature: FeatureCard;
    showStepNumbers: boolean;
    useInvertedBackground: InvertedBackground;
    featureContentClassName: string;
    stepNumberClassName: string;
    featureTitleClassName: string;
    featureDescriptionClassName: string;
    cardButtonClassName: string;
    cardButtonTextClassName: string;
}

const FeatureContent = ({
    feature,
    showStepNumbers,
    useInvertedBackground,
    featureContentClassName,
    stepNumberClassName,
    featureTitleClassName,
    featureDescriptionClassName,
    cardButtonClassName,
    cardButtonTextClassName,
}: FeatureContentProps) => {
    const theme = useTheme();

    return (
    <div className={cls("relative z-1 h-full w-content-width mx-auto md:w-full flex flex-col items-center text-center gap-3 md:px-5", featureContentClassName)}>
        {showStepNumbers && (
            <div
                className={cls(
                    "h-8 w-[var(--height-8)] primary-button text-primary-cta-text rounded-theme flex items-center justify-center",
                    stepNumberClassName
                )}
            >
                <p className="text-sm truncate">
                    {feature.id}
                </p>
            </div>
        )}
        <h2 className={cls("text-5xl font-medium leading-[1.15] text-balance", useInvertedBackground && "text-background", featureTitleClassName)}>
            {feature.title}
        </h2>
        <p className={cls("text-base leading-[1.2] text-balance", useInvertedBackground ? "text-background/75" : "text-foreground/75", featureDescriptionClassName)}>
            {feature.description}
        </p>
        {feature.buttons && feature.buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
                {feature.buttons.slice(0, 2).map((button, index) => (
                    <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, cardButtonClassName, cardButtonTextClassName)} />
                ))}
            </div>
        )}
    </div>
    );
};

const FeatureCardNine = ({
    features,
    showStepNumbers,
    title,
    titleSegments,
    description,
    tag,
    tagIcon,
    tagAnimation,
    buttons,
    buttonAnimation,
    animationType,
    textboxLayout,
    useInvertedBackground,
    ariaLabel = "Feature section",
    className = "",
    containerClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    desktopContainerClassName = "",
    mobileContainerClassName = "",
    desktopContentClassName = "",
    desktopWrapperClassName = "",
    mobileWrapperClassName = "",
    phoneFrameClassName = "",
    mobilePhoneFrameClassName = "",
    featureContentClassName = "",
    stepNumberClassName = "",
    featureTitleClassName = "",
    featureDescriptionClassName = "",
    cardButtonClassName = "",
    cardButtonTextClassName = "",
}: FeatureCardNineProps) => {
    const items: TimelinePhoneViewItem[] = features.map((feature, index) => ({
        trigger: `trigger-${index}`,
        content: (
            <FeatureContent
                feature={feature}
                showStepNumbers={showStepNumbers}
                useInvertedBackground={useInvertedBackground}
                featureContentClassName={featureContentClassName}
                stepNumberClassName={stepNumberClassName}
                featureTitleClassName={featureTitleClassName}
                featureDescriptionClassName={featureDescriptionClassName}
                cardButtonClassName={cardButtonClassName}
                cardButtonTextClassName={cardButtonTextClassName}
            />
        ),
        imageOne: feature.phoneOne.imageSrc,
        videoOne: feature.phoneOne.videoSrc,
        imageAltOne: feature.phoneOne.imageAlt || `${feature.title} - Phone 1`,
        videoAriaLabelOne: feature.phoneOne.videoAriaLabel || `${feature.title} - Phone 1 video`,
        imageTwo: feature.phoneTwo.imageSrc,
        videoTwo: feature.phoneTwo.videoSrc,
        imageAltTwo: feature.phoneTwo.imageAlt || `${feature.title} - Phone 2`,
        videoAriaLabelTwo: feature.phoneTwo.videoAriaLabel || `${feature.title} - Phone 2 video`,
    }));

    return (
        <TimelinePhoneView
            items={items}
            showTextBox={true}
            showDivider={true}
            title={title}
            titleSegments={titleSegments}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            animationType={animationType}
            textboxLayout={textboxLayout}
            useInvertedBackground={useInvertedBackground}
            className={className}
            containerClassName={containerClassName}
            textBoxClassName={textBoxClassName}
            titleClassName={textBoxTitleClassName}
            descriptionClassName={textBoxDescriptionClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            desktopContainerClassName={desktopContainerClassName}
            mobileContainerClassName={mobileContainerClassName}
            desktopContentClassName={desktopContentClassName}
            desktopWrapperClassName={desktopWrapperClassName}
            mobileWrapperClassName={mobileWrapperClassName}
            phoneFrameClassName={phoneFrameClassName}
            mobilePhoneFrameClassName={mobilePhoneFrameClassName}
            ariaLabel={ariaLabel}
        />
    );
};

FeatureCardNine.displayName = "FeatureCardNine";

export default FeatureCardNine;
