"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type TeamCardOneGridVariant = Exclude<GridVariant, "timeline">;

type TeamMember = {
    id: string;
    name: string;
    role: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

interface TeamCardOneProps {
    members: TeamMember[];
    carouselMode?: "auto" | "buttons";
    gridVariant: TeamCardOneGridVariant;
    uniformGridCustomHeightClasses?: string;
    animationType: CardAnimationTypeWith3D;
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
    imageClassName?: string;
    overlayClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
    gridClassName?: string;
    carouselClassName?: string;
    controlsClassName?: string;
    textBoxClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
    cardClassName?: string;
    imageClassName?: string;
    overlayClassName?: string;
    nameClassName?: string;
    roleClassName?: string;
}

const TeamMemberCard = memo(({
    member,
    cardClassName = "",
    imageClassName = "",
    overlayClassName = "",
    nameClassName = "",
    roleClassName = "",
}: TeamMemberCardProps) => {
    return (
        <div className={cls("relative h-full w-full max-w-full card rounded-theme-capped p-4 aspect-[8/10]", cardClassName)}>
            <div className="relative z-1 w-full h-full rounded-theme-capped overflow-hidden">
                <MediaContent
                    imageSrc={member.imageSrc}
                    videoSrc={member.videoSrc}
                    imageAlt={member.imageAlt || member.name}
                    videoAriaLabel={member.videoAriaLabel || member.name}
                    imageClassName={cls("w-full h-full object-cover", imageClassName)}
                />

                <div className={cls("!absolute z-1 bottom-4 left-4 right-4 card backdrop-blur-xs p-4 rounded-theme-capped flex items-center justify-between gap-3", overlayClassName)}>
                    <h3 className={cls("relative z-1 text-xl font-medium text-foreground leading-[1.1] truncate", nameClassName)}>
                        {member.name}
                    </h3>
                    <div className="min-w-0 max-w-full w-fit primary-button px-3 py-2 rounded-theme">
                        <p className={cls("text-sm text-primary-cta-text leading-[1.1] truncate", roleClassName)}>
                            {member.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

TeamMemberCard.displayName = "TeamMemberCard";

const TeamCardOne = ({
    members,
    carouselMode = "buttons",
    gridVariant,
    uniformGridCustomHeightClasses = "min-h-none",
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
    ariaLabel = "Team section",
    className = "",
    containerClassName = "",
    cardClassName = "",
    textBoxTitleClassName = "",
    textBoxTitleImageWrapperClassName = "",
    textBoxTitleImageClassName = "",
    textBoxDescriptionClassName = "",
    imageClassName = "",
    overlayClassName = "",
    nameClassName = "",
    roleClassName = "",
    gridClassName = "",
    carouselClassName = "",
    controlsClassName = "",
    textBoxClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
}: TeamCardOneProps) => {
    return (
        <CardStack
            mode={carouselMode}
            gridVariant={gridVariant}
            uniformGridCustomHeightClasses={uniformGridCustomHeightClasses}
            animationType={animationType}
            supports3DAnimation={true}

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
            {members.map((member, index) => (
                <TeamMemberCard
                    key={`${member.id}-${index}`}
                    member={member}
                    cardClassName={cardClassName}
                    imageClassName={imageClassName}
                    overlayClassName={overlayClassName}
                    nameClassName={nameClassName}
                    roleClassName={roleClassName}
                />
            ))}
        </CardStack>
    );
};

TeamCardOne.displayName = "TeamCardOne";

export default TeamCardOne;
