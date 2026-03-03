"use client";

import CardStackTextBox from "@/components/cardStack/CardStackTextBox";
import MediaContent from "@/components/shared/MediaContent";
import { useCardAnimation } from "@/components/cardStack/hooks/useCardAnimation";
import { cls } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ButtonConfig, CardAnimationType, TitleSegment, ButtonAnimationType } from "@/components/cardStack/types";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
};

interface TeamCardFiveProps {
  team: TeamMember[];
  animationType: CardAnimationType;
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  textboxLayout: TextboxLayout;
  useInvertedBackground: InvertedBackground;
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxTitleClassName?: string;
  textBoxTitleImageWrapperClassName?: string;
  textBoxTitleImageClassName?: string;
  textBoxDescriptionClassName?: string;
  textBoxClassName?: string;
  textBoxTagClassName?: string;
  textBoxButtonContainerClassName?: string;
  textBoxButtonClassName?: string;
  textBoxButtonTextClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  mediaWrapperClassName?: string;
  mediaClassName?: string;
  nameClassName?: string;
  roleClassName?: string;
}

const TeamCardFive = ({
  team,
  animationType,
  title,
  titleSegments,
  description,
  textboxLayout,
  useInvertedBackground,
  tag,
  tagIcon,
  tagAnimation,
  buttons,
  buttonAnimation,
  ariaLabel = "Team section",
  className = "",
  containerClassName = "",
  textBoxTitleClassName = "",
  textBoxTitleImageWrapperClassName = "",
  textBoxTitleImageClassName = "",
  textBoxDescriptionClassName = "",
  textBoxClassName = "",
  textBoxTagClassName = "",
  textBoxButtonContainerClassName = "",
  textBoxButtonClassName = "",
  textBoxButtonTextClassName = "",
  gridClassName = "",
  cardClassName = "",
  mediaWrapperClassName = "",
  mediaClassName = "",
  nameClassName = "",
  roleClassName = "",
}: TeamCardFiveProps) => {
  const { itemRefs } = useCardAnimation({ animationType, itemCount: team.length });

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
    >
      <div className={cls("w-content-width mx-auto flex flex-col gap-8", containerClassName)}>
        <CardStackTextBox
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
          textBoxClassName={textBoxClassName}
          titleClassName={textBoxTitleClassName}
          titleImageWrapperClassName={textBoxTitleImageWrapperClassName}
          titleImageClassName={textBoxTitleImageClassName}
          descriptionClassName={textBoxDescriptionClassName}
          tagClassName={textBoxTagClassName}
          buttonContainerClassName={textBoxButtonContainerClassName}
          buttonClassName={textBoxButtonClassName}
          buttonTextClassName={textBoxButtonTextClassName}
        />

        <div className={cls("flex flex-row flex-wrap gap-y-6 md:gap-x-0 justify-center", gridClassName)}>
          {team.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={cls("relative flex flex-col items-center text-center w-[55%] md:w-[28%] -mx-[4%] md:-mx-[2%]", cardClassName)}
            >
              <div className={cls("relative card w-full aspect-square rounded-theme overflow-hidden p-2 mb-4", mediaWrapperClassName)}>
                <MediaContent
                  imageSrc={member.imageSrc}
                  videoSrc={member.videoSrc}
                  imageAlt={member.imageAlt || member.name}
                  videoAriaLabel={member.videoAriaLabel || member.name}
                  imageClassName={cls("relative z-1 w-full h-full object-cover rounded-theme!", mediaClassName)}
                />
              </div>
              <h3 className={cls("relative z-1 w-8/10 text-2xl font-medium leading-tight truncate", useInvertedBackground ? "text-background" : "text-foreground", nameClassName)}>
                {member.name}
              </h3>
              <p className={cls("relative z-1 w-8/10 text-base leading-tight mt-1 truncate", useInvertedBackground ? "text-background/75" : "text-foreground/75", roleClassName)}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TeamCardFive.displayName = "TeamCardFive";

export default TeamCardFive;
