"use client";

import FillWidthText, { hasDescenders } from "@/components/shared/FillWidthText/FillWidthText";
import SocialLinks from "@/components/shared/SocialLinks";
import { cls } from "@/lib/utils";
import type { SocialLink } from "@/components/shared/SocialLinks";

interface FooterCardProps {
  // logoSrc?: string;
  // logoAlt?: string;
  logoText?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  logoClassName?: string;
  dividerClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  socialContainerClassName?: string;
  socialIconClassName?: string;
}

const FooterCard = ({
  // logoSrc,
  // logoAlt = "Logo",
  logoText = "Webild",
  copyrightText = `© 2025 | Webild`,
  socialLinks,
  ariaLabel = "Site footer",
  className = "",
  containerClassName = "",
  cardClassName = "",
  logoClassName = "",
  dividerClassName = "",
  copyrightContainerClassName = "",
  copyrightTextClassName = "",
  socialContainerClassName = "",
  socialIconClassName = "",
}: FooterCardProps) => {
  return (
    <footer
      role="contentinfo"
      aria-label={ariaLabel}
      className={cls("relative w-full h-fit py-20", className)}
    >
      <div className={cls("relative w-content-width h-fit mx-auto card rounded-theme-capped px-10 pb-6 flex flex-col", containerClassName, cardClassName)}>
        <div className={cls("relative z-1 w-full", logoClassName)}>
          <FillWidthText className={cls(!hasDescenders(logoText ?? "") && "my-10")}>
            {logoText}
          </FillWidthText>
        </div>

        <div className={cls("relative z-1 w-full h-px bg-accent/20 mb-6", dividerClassName)} />

        <div
          className={cls("relative z-1 w-full flex flex-col md:flex-row items-center justify-between gap-4", copyrightContainerClassName)}
        >
          <span className={cls("text-accent/75 text-sm", copyrightTextClassName)}>
            {copyrightText}
          </span>
          {socialLinks && socialLinks.length > 0 && (
            <SocialLinks
              socialLinks={socialLinks}
              className={socialContainerClassName}
              iconClassName={socialIconClassName}
            />
          )}
        </div>
      </div>
    </footer>
  );
};

FooterCard.displayName = "FooterCard";

export default FooterCard;
