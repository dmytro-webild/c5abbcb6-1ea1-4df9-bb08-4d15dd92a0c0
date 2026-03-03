"use client";

import TextBox from "@/components/Textbox";
import HeroBackgrounds, { type HeroBackgroundVariantProps } from "@/components/background/HeroBackgrounds";
import EmailSignupForm from "@/components/form/EmailSignupForm";
import { cls } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import type { ButtonAnimationType } from "@/types/button";

type HeroSignupBackgroundProps = Extract<
  HeroBackgroundVariantProps,
  | { variant: "plain" }
  | { variant: "animated-grid" }
  | { variant: "canvas-reveal" }
  | { variant: "cell-wave" }
  | { variant: "downward-rays-animated" }
  | { variant: "downward-rays-animated-grid" }
  | { variant: "downward-rays-static" }
  | { variant: "downward-rays-static-grid" }
  | { variant: "glowing-orb" }
  | { variant: "glowing-orb-sparkles" }
  | { variant: "gradient-bars" }
  | { variant: "radial-gradient" }
  | { variant: "rotated-rays-animated" }
  | { variant: "rotated-rays-animated-grid" }
  | { variant: "rotated-rays-static" }
  | { variant: "rotated-rays-static-grid" }
  | { variant: "sparkles-gradient" }
>;

interface HeroSignupProps {
  title: string;
  description: string;
  background: HeroSignupBackgroundProps;
  tag: string;
  tagIcon?: LucideIcon;
  tagAnimation?: ButtonAnimationType;
  inputPlaceholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  textBoxClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tagClassName?: string;
  formWrapperClassName?: string;
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}

const HeroSignup = ({
  title,
  description,
  background,
  tag,
  tagIcon,
  tagAnimation,
  inputPlaceholder = "Enter your email",
  buttonText = "Get Started",
  onSubmit,
  ariaLabel = "Hero section",
  className = "",
  containerClassName = "",
  textBoxClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  tagClassName = "",
  formWrapperClassName = "",
  formClassName = "",
  inputClassName = "",
  buttonClassName = "",
  buttonTextClassName = "",
}: HeroSignupProps) => {
  return (
    <section
      aria-label={ariaLabel}
      className={cls("relative w-full h-svh md:h-screen flex items-center justify-center", className)}
    >
      <HeroBackgrounds {...background} />
      <div className={cls("w-content-width mx-auto relative z-10", containerClassName)}>
        <TextBox
          title={title}
          description={description}
          tag={tag}
          tagIcon={tagIcon}
          tagAnimation={tagAnimation}
          className={cls("md:max-w-6/10 xl:max-w-45/100 mx-auto flex flex-col gap-3 md:gap-6", textBoxClassName)}
          titleClassName={cls("text-7xl font-medium text-balance", titleClassName)}
          descriptionClassName={cls("text-lg md:text-xl leading-tight text-balance", descriptionClassName)}
          tagClassName={cls("mb-0", tagClassName)}
          center={true}
        />
        <div className={cls("md:max-w-6/10 xl:max-w-45/100 mx-auto mt-6", formWrapperClassName)}>
          <EmailSignupForm
            inputPlaceholder={inputPlaceholder}
            buttonText={buttonText}
            onSubmit={onSubmit}
            className={cls("w-full mx-auto", formClassName)}
            inputClassName={inputClassName}
            buttonClassName={buttonClassName}
            buttonTextClassName={buttonTextClassName}
          />
        </div>
      </div>
    </section>
  );
};

HeroSignup.displayName = "HeroSignup";

export default HeroSignup;
