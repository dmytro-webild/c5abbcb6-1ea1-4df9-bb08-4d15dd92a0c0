"use client";

import TimelineCardStack from "@/components/cardStack/layouts/timelines/TimelineCardStack";
import MediaContent from "@/components/shared/MediaContent";
import Tag from "@/components/shared/Tag";
import Button from "@/components/button/Button";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, ButtonAnimationType, TitleSegment } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type FeatureCard = {
    id: number;
    tag: string;
    title: string;
    subtitle: string;
    description: string;
    buttons?: ButtonConfig[];
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

interface FeatureCardNineteenProps {
    features: FeatureCard[];
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
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    cardContentClassName?: string;
    cardTagClassName?: string;
    cardTitleClassName?: string;
    cardDescriptionClassName?: string;
    cardButtonClassName?: string;
    cardButtonTextClassName?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
}

const FeatureCardNineteen = ({
    features,
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
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    cardContentClassName = "",
    cardTagClassName = "",
    cardTitleClassName = "",
    cardDescriptionClassName = "",
    cardButtonClassName = "",
    cardButtonTextClassName = "",
    imageContainerClassName = "",
    imageClassName = "",
}: FeatureCardNineteenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    return (
        <TimelineCardStack
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
            titleClassName={textBoxTitleClassName}
            descriptionClassName={textBoxDescriptionClassName}
            textBoxClassName={textBoxClassName}
            tagClassName={textBoxTagClassName}
            buttonContainerClassName={textBoxButtonContainerClassName}
            buttonClassName={textBoxButtonClassName}
            buttonTextClassName={textBoxButtonTextClassName}
            titleImageWrapperClassName={titleImageWrapperClassName}
            titleImageClassName={titleImageClassName}
            ariaLabel={ariaLabel}
        >
            {features.map((feature) => {
                const stepNumber = String(feature.id).padStart(2, "0");
                return (
                    <div
                        key={feature.id}
                        className={cls("relative z-1 w-full min-h-0 h-full flex flex-col md:flex-row justify-between overflow-hidden", cardContentClassName)}
                    >
                        <div className="relative w-full md:w-1/2 md:h-full flex flex-col justify-between p-8 md:p-12">
                            <div className="flex flex-col gap-4 md:gap-6">
                                <Tag
                                    text={feature.tag}
                                    useInvertedBackground={useInvertedBackground}
                                    className={cardTagClassName}
                                />
                                <h2 className={cls(
                                    "text-5xl md:text-7xl font-medium leading-none",
                                    shouldUseLightText ? "text-background" : "text-foreground",
                                    cardTitleClassName
                                )}>
                                    {feature.title}
                                </h2>
                            </div>
                            <div className="block md:hidden w-full h-px my-6 bg-accent/20" />
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h3 className={cls(
                                    "text-xl md:text-4xl font-medium",
                                    shouldUseLightText ? "text-background" : "text-foreground"
                                )}>
                                    {feature.subtitle}
                                </h3>
                                <p className={cls(
                                    "text-base md:text-lg leading-tight",
                                    shouldUseLightText ? "text-background/80" : "text-foreground/80",
                                    cardDescriptionClassName
                                )}>
                                    {feature.description}
                                </p>
                                {feature.buttons && feature.buttons.length > 0 && (
                                    <div className="flex flex-wrap gap-4 max-md:justify-center mt-2">
                                        {feature.buttons.slice(0, 2).map((button, buttonIndex) => (
                                            <Button
                                                key={`${button.text}-${buttonIndex}`}
                                                {...getButtonProps(button, buttonIndex, theme.defaultButtonVariant, cardButtonClassName, cardButtonTextClassName)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="relative w-full md:w-4/10 min-h-0 h-full flex flex-col gap-10 p-8 md:p-12">
                            <h3 className="hidden md:block text-8xl font-medium text-accent/20 self-end">
                                {stepNumber}
                            </h3>
                            <div
                                className={cls(
                                    "relative max-h-full min-h-0 w-full h-full min-w-0 max-w-full md:aspect-[4/5] rounded-theme-capped overflow-hidden rotate-3",
                                    imageContainerClassName
                                )}
                            >
                                <MediaContent
                                    imageSrc={feature.imageSrc}
                                    videoSrc={feature.videoSrc}
                                    imageAlt={feature.imageAlt || feature.title}
                                    videoAriaLabel={feature.videoAriaLabel || feature.title}
                                    imageClassName={cls("w-full h-full object-cover", imageClassName)}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </TimelineCardStack>
    );
};

FeatureCardNineteen.displayName = "FeatureCardNineteen";

export default FeatureCardNineteen;
