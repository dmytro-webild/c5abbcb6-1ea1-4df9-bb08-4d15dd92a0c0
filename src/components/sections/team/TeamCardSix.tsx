"use client";

import { memo } from "react";
import CardStack from "@/components/cardStack/CardStack";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, GridVariant, CardAnimationTypeWith3D, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type TeamCardSixGridVariant = Exclude<GridVariant, "timeline" | "two-columns-alternating-heights" | "four-items-2x2-equal-grid">;

const MASK_GRADIENT = "linear-gradient(to bottom, transparent, black 60%)";

type TeamMember = {
    id: string;
    name: string;
    role: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    videoAriaLabel?: string;
};

interface TeamCardSixProps {
    members: TeamMember[];
    carouselMode?: "auto" | "buttons";
    gridVariant: TeamCardSixGridVariant;
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
        <div className={cls("relative h-full rounded-theme-capped", cardClassName)}>
            <div className="relative w-full h-full rounded-theme-capped overflow-hidden">
                <MediaContent
                    imageSrc={member.imageSrc}
                    videoSrc={member.videoSrc}
                    imageAlt={member.imageAlt || member.name}
                    videoAriaLabel={member.videoAriaLabel || member.name}
                    imageClassName={cls("w-full h-full object-cover", imageClassName)}
                />

                <div className={cls("absolute z-10 bottom-4 left-4 right-4 p-4 flex flex-col gap-0 text-background", overlayClassName)}>
                    <h3 className={cls("text-2xl font-medium leading-tight truncate", nameClassName)}>
                        {member.name}
                    </h3>
                    <p className={cls("text-base leading-tight truncate", roleClassName)}>
                        {member.role}
                    </p>
                </div>

                <div
                    className="absolute z-0 backdrop-blur-xl opacity-100 w-full h-1/3 left-0 bottom-0"
                    style={{ maskImage: MASK_GRADIENT }}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
});

TeamMemberCard.displayName = "TeamMemberCard";

const TeamCardSix = ({
    members,
    carouselMode = "buttons",
    gridVariant,
    uniformGridCustomHeightClasses = "min-h-95 2xl:min-h-105",
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
}: TeamCardSixProps) => {
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

TeamCardSix.displayName = "TeamCardSix";

export default TeamCardSix;