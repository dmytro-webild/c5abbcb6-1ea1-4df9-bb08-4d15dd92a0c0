"use client";

import CardList from "@/components/cardStack/CardList";
import MediaContent from "@/components/shared/MediaContent";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type TeamMember = {
    id: string;
    title: string;
    subtitle: string;
    detail: string;
    imageSrc?: string;
    imageAlt?: string;
    videoSrc?: string;
    videoAriaLabel?: string;
};

type TeamGroup = {
    id: string;
    groupTitle: string;
    members: TeamMember[];
};

interface TeamCardElevenProps {
    groups: TeamGroup[];
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
    textBoxClassName?: string;
    textBoxTitleClassName?: string;
    textBoxDescriptionClassName?: string;
    textBoxTagClassName?: string;
    textBoxButtonContainerClassName?: string;
    textBoxButtonClassName?: string;
    textBoxButtonTextClassName?: string;
    titleImageWrapperClassName?: string;
    titleImageClassName?: string;
    groupTitleClassName?: string;
    memberClassName?: string;
    memberImageClassName?: string;
    memberTitleClassName?: string;
    memberSubtitleClassName?: string;
    memberDetailClassName?: string;
}

const TeamCardEleven = ({
    groups,
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
    textBoxClassName = "",
    textBoxTitleClassName = "",
    textBoxDescriptionClassName = "",
    textBoxTagClassName = "",
    textBoxButtonContainerClassName = "",
    textBoxButtonClassName = "",
    textBoxButtonTextClassName = "",
    titleImageWrapperClassName = "",
    titleImageClassName = "",
    groupTitleClassName = "",
    memberClassName = "",
    memberImageClassName = "",
    memberTitleClassName = "",
    memberSubtitleClassName = "",
    memberDetailClassName = "",
}: TeamCardElevenProps) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);

    const renderMemberRow = (member: TeamMember) => (
        <div
            key={member.id}
            className={cls(
                "flex flex-col md:flex-row md:items-center gap-4 py-6",
                memberClassName
            )}
        >
            <div className="flex items-center gap-4 flex-1">
                <div className={cls(
                    "relative h-14 w-auto md:h-16 aspect-square rounded-theme overflow-hidden shrink-0",
                    memberImageClassName
                )}>
                    <MediaContent
                        imageSrc={member.imageSrc}
                        imageAlt={member.imageAlt || member.title}
                        videoSrc={member.videoSrc}
                        videoAriaLabel={member.videoAriaLabel}
                        imageClassName="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <p className={cls(
                        "text-lg md:text-xl font-medium",
                        shouldUseLightText ? "text-background" : "text-foreground",
                        memberTitleClassName
                    )}>
                        {member.title}
                    </p>
                    <p className={cls(
                        "text-base",
                        shouldUseLightText ? "text-background/60" : "text-foreground/60",
                        memberSubtitleClassName
                    )}>
                        {member.subtitle}
                    </p>
                </div>
            </div>

            <p className={cls(
                "text-base md:text-lg font-medium",
                shouldUseLightText ? "text-background" : "text-foreground",
                memberDetailClassName
            )}>
                {member.detail}
            </p>
        </div>
    );

    return (
        <CardList
            title={title}
            titleSegments={titleSegments}
            description={description}
            tag={tag}
            tagIcon={tagIcon}
            tagAnimation={tagAnimation}
            buttons={buttons}
            buttonAnimation={buttonAnimation}
            textboxLayout={textboxLayout}
            animationType={animationType}
            useInvertedBackground={useInvertedBackground}
            className={className}
            containerClassName={containerClassName}
            cardClassName={cardClassName}
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
            {groups.map((group) => (
                <div key={group.id} className="p-6 md:p-8">
                    <h3 className={cls(
                        "text-2xl md:text-3xl font-medium mb-2",
                        shouldUseLightText ? "text-background" : "text-foreground",
                        groupTitleClassName
                    )}>
                        {group.groupTitle}
                    </h3>

                    <div className="flex flex-col divide-y divide-accent/40 border-y border-accent/40">
                        {group.members.map(renderMemberRow)}
                    </div>
                </div>
            ))}
        </CardList>
    );
};

TeamCardEleven.displayName = "TeamCardEleven";

export default TeamCardEleven;
