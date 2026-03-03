"use client";

import TextAnimation from "@/components/text/TextAnimation";
import Tag from "@/components/shared/Tag";
import Button from "@/components/button/Button";
import { cls } from "@/lib/utils";
import { getButtonProps } from "@/lib/buttonUtils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { useButtonAnimation } from "@/components/hooks/useButtonAnimation";
import type { ButtonConfig, ButtonAnimationType } from "@/types/button";
import type { LucideIcon } from "lucide-react";

interface TextAboutProps {
  tag?: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  title: string;
  buttons?: ButtonConfig[];
  buttonAnimation?: ButtonAnimationType;
  useInvertedBackground: boolean;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const TextAbout = ({
  tag,
  tagIcon,
  tagAnimation = "none",
  title,
  buttons,
  buttonAnimation = "none",
  useInvertedBackground,
  ariaLabel = "About section",
  className = "",
  containerClassName = "",
  titleClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
}: TextAboutProps) => {
  const theme = useTheme();
  const { containerRef: tagContainerRef } = useButtonAnimation({ animationType: tagAnimation });
  const { containerRef: buttonContainerRef } = useButtonAnimation({ animationType: buttonAnimation });

  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative py-20 w-full", useInvertedBackground && "bg-foreground", className)}
    >
      <div className={cls("w-content-width mx-auto flex flex-col gap-6 items-center", containerClassName)}>
        {tag && (
          <div ref={tagContainerRef}>
            <Tag text={tag} icon={tagIcon} useInvertedBackground={useInvertedBackground} />
          </div>
        )}
        <TextAnimation
          type={theme.defaultTextAnimation}
          text={title}
          variant="words-trigger"
          className={cls("text-2xl md:text-5xl font-medium text-center leading-[1.175]", useInvertedBackground && "text-background", titleClassName)}
        />

        {buttons && buttons.length > 0 && (
          <div ref={buttonContainerRef} className={cls("flex flex-wrap gap-4 max-md:justify-center", tag && "mt-2", buttonContainerClassName)}>
            {buttons.slice(0, 2).map((button, index) => (
              <Button key={index} {...getButtonProps(button, index, theme.defaultButtonVariant, cls("", buttonClassName), cls("text-base", buttonTextClassName))} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

TextAbout.displayName = "TextAbout";

export default TextAbout;
