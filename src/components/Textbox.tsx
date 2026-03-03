"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import TextAnimation from "./text/TextAnimation";
import Button from "./button/Button";
import Tag from "./shared/Tag";
import AvatarGroup from "./shared/AvatarGroup";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { LucideIcon } from "lucide-react";
import type { AnimationType } from "./text/types";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { Avatar } from "./shared/AvatarGroup";
import type { TextboxLayout, InvertedBackground } from "@/providers/themeProvider/config/constants";
import { useButtonAnimation } from "./hooks/useButtonAnimation";

type TitleSegment =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt?: string };

interface TextBoxProps {
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  type?: AnimationType;
  textboxLayout?: TextboxLayout;
  useInvertedBackground?: InvertedBackground;
  className?: string;
  titleClassName?: string;
  titleImageWrapperClassName?: string;
  titleImageClassName?: string;
  descriptionClassName?: string;
  duration?: number;
  start?: string;
  end?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  children?: React.ReactNode;
  center?: boolean;
  tag?: string;
  tagIcon?: LucideIcon;
  tagClassName?: string;
  tagAnimation?: ButtonAnimationType;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
  avatars?: Avatar[];
  avatarText?: string;
  avatarGroupClassName?: string;
  avatarsAbove?: boolean;
}

const TextBox = ({
  title,
  titleSegments,
  description,
  type,
  textboxLayout = "default",
  useInvertedBackground,
  className = "",
  titleClassName = "",
  titleImageWrapperClassName = "",
  titleImageClassName = "",
  descriptionClassName = "",
  duration = 1,
  start = "top 80%",
  end = "top 20%",
  gradientColors,
  children,
  center = false,
  tag,
  tagIcon: TagIcon,
  tagClassName = "",
  tagAnimation = "none",
  buttons,
  buttonAnimation = "none",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
  avatars,
  avatarText,
  avatarGroupClassName = "",
  avatarsAbove = false,
}: TextBoxProps) => {
  const theme = useTheme();
  const { containerRef: tagContainerRef } = useButtonAnimation({
    animationType: tagAnimation
  });
  const { containerRef: buttonContainerRef } = useButtonAnimation({
    animationType: buttonAnimation
  });

  // Shared tag component
  const tagElement = tag ? (
    <div ref={tagContainerRef}>
      <Tag
        text={tag}
        icon={TagIcon}
        useInvertedBackground={useInvertedBackground}
        className={cls(textboxLayout === "default" && "mb-3", tagClassName)}
      />
    </div>
  ) : null;

  // Shared title component
  const titleElement = useMemo(() => (
    <TextAnimation
      type={type || theme.defaultTextAnimation}
      text={title}
      variant="trigger"
      as="h2"
      className={cls(
        textboxLayout === "split" || textboxLayout === "split-actions" || textboxLayout === "split-description" ? "text-7xl font-medium text-balance" : "text-6xl font-medium",
        center && textboxLayout === "default" && "text-center",
        useInvertedBackground && "text-background",
        titleClassName
      )}
      duration={duration}
      start={start}
      end={end}
      gradientColors={gradientColors}
    />
  ), [type, theme.defaultTextAnimation, title, textboxLayout, center, useInvertedBackground, titleClassName, duration, start, end, gradientColors]);

  // Inline image title component (used when textboxLayout === "inline-image")
  const inlineImageTitleElement = useMemo(() => titleSegments && titleSegments.length > 0 ? (
    <h2
      className={cls(
        "text-4xl md:text-5xl font-medium text-center leading-[1.15] text-balance",
        useInvertedBackground && "text-background",
        titleClassName
      )}
    >
      {titleSegments.map((segment, index) => {
        const imageIndex = titleSegments
          .slice(0, index + 1)
          .filter(s => s.type === "image").length - 1;

        const element = segment.type === "text" ? (
          <span key={index}>{segment.content}</span>
        ) : (
          <span
            key={index}
            className={cls(
              "inline-block relative primary-button -mt-[0.2em] h-[1.1em] w-auto aspect-square align-middle mx-1 p-0.5 rounded-theme",
              imageIndex % 2 === 0 ? "-rotate-12" : "rotate-12",
              titleImageWrapperClassName
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={segment.src}
                alt={segment.alt || ""}
                width={24}
                height={24}
                className={cls(
                  "absolute inset-0 m-auto h-full w-full rounded-theme",
                  titleImageClassName
                )}
                unoptimized={segment.src.startsWith("http") || segment.src.startsWith("//")}
                aria-hidden={!segment.alt || segment.alt === ""}
              />
            </div>
          </span>
        );

        return (
          <span key={index}>
            {index > 0 && " "}
            {element}
          </span>
        );
      })}
    </h2>
  ) : null, [titleSegments, useInvertedBackground, titleClassName, titleImageWrapperClassName, titleImageClassName]);

  // Shared description component
  const descriptionElement = useMemo(() => (
    <TextAnimation
      type={type || theme.defaultTextAnimation}
      text={description}
      variant="words-trigger"
      as="p"
      className={cls(
        "text-lg leading-[1.2]",
        center && textboxLayout === "default" && "text-center",
        (textboxLayout === "split" || textboxLayout === "split-description") && "text-balance",
        useInvertedBackground && "text-background",
        descriptionClassName
      )}
      duration={duration}
      start={start}
      end={end}
      gradientColors={gradientColors}
    />
  ), [type, theme.defaultTextAnimation, description, center, textboxLayout, useInvertedBackground, descriptionClassName, duration, start, end, gradientColors]);

  // Shared avatars component
  const avatarsElement = useMemo(() => avatars && avatars.length > 0 ? (
    <AvatarGroup
      avatars={avatars}
      text={avatarText}
      className={cls(
        textboxLayout === "default" && !avatarsAbove && "mt-3",
        textboxLayout === "default" && avatarsAbove && "mb-3",
        center && textboxLayout === "default" && "justify-center",
        avatarGroupClassName
      )}
    />
  ) : null, [avatars, avatarText, textboxLayout, center, avatarGroupClassName, avatarsAbove]);

  // Shared buttons/children component
  const actionsElement = buttons && buttons.length > 0 ? (
    <div
      ref={buttonContainerRef}
      className={cls(
        "flex flex-wrap gap-4 max-md:justify-center",
        textboxLayout === "default" && "w-full mt-3",
        (textboxLayout === "split" || textboxLayout === "split-actions") && "w-fit",
        center && textboxLayout === "default" && "justify-center",
        buttonContainerClassName
      )}
    >
      {/* Limit to 2 buttons for optimal layout */}
      {buttons.slice(0, 2).map((button, index) => (
        <Button key={`${button.text}-${index}`} {...getButtonProps(button, index, theme.defaultButtonVariant, buttonClassName, buttonTextClassName)} />
      ))}
    </div>
  ) : (
    children
  );

  // Split layout
  if (textboxLayout === "split") {
    return (
      <div className={cls("flex flex-col md:flex-row gap-3 md:gap-15 md:items-end", className)}>
        <div className="w-full md:w-6/10 flex flex-col gap-3">
          {tagElement}
          {titleElement}
          {descriptionElement}
        </div>
        <div className="w-full md:w-4/10 flex flex-col gap-3 md:items-end">
          {actionsElement}
        </div>
      </div>
    );
  }

  // Split actions layout - tag and buttons required, no description
  if (textboxLayout === "split-actions") {
    return (
      <div className={cls("flex flex-col md:flex-row gap-3 md:gap-15 md:items-end", className)}>
        <div className="w-full md:w-6/10 flex flex-col gap-3">
          {tagElement}
          {titleElement}
        </div>
        <div className="w-full md:w-4/10 flex flex-col gap-3 md:items-end">
          {actionsElement}
        </div>
      </div>
    );
  }

  // Split description layout - tag + title left, description only right (no buttons)
  if (textboxLayout === "split-description") {
    return (
      <div className={cls("flex flex-col md:flex-row gap-3 md:gap-15 md:items-end", className)}>
        <div className="w-full md:w-6/10 flex flex-col gap-3">
          {tagElement}
          {titleElement}
        </div>
        <div className="w-full md:w-4/10 flex flex-col gap-3 md:items-end">
          {descriptionElement}
        </div>
      </div>
    );
  }

  // Inline image layout - centered heading with inline images and optional buttons
  if (textboxLayout === "inline-image") {
    return (
      <div className={cls("flex flex-col gap-3 md:gap-1", center && "items-center text-center", className)}>
        {tagElement}
        {inlineImageTitleElement || titleElement}
        {descriptionElement}
        {actionsElement}
      </div>
    );
  }

  // Default layout
  return (
    <div className={cls("flex flex-col gap-3 md:gap-1", center && "items-center text-center", className)}>
      {avatarsAbove && avatarsElement}
      {tagElement}
      {titleElement}
      {descriptionElement}
      {actionsElement}
      {!avatarsAbove && avatarsElement}
    </div>
  );
};

TextBox.displayName = "TextBox";

export default memo(TextBox);