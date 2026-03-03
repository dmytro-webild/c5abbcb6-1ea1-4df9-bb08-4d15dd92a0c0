"use client";

// import Image from "next/image";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import FooterColumns from "@/components/shared/FooterColumns";
import { cls } from "@/lib/utils";
import type { FooterColumn } from "@/components/shared/FooterColumns";

interface FooterBaseCardProps {
  // logoSrc?: string;
  logoText?: string;
  // logoWidth?: number;
  // logoHeight?: number;
  columns: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  // logoClassName?: string;
  logoTextClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  privacyButtonClassName?: string;
}

const FooterBaseCard = ({
  // logoSrc = "/brand/logowhite.svg",
  logoText = "Webild",
  // logoWidth = 120,
  // logoHeight = 40,
  columns,
  copyrightText = `© 2025 | Webild`,
  onPrivacyClick,
  ariaLabel = "Site footer",
  className = "",
  containerClassName = "",
  cardClassName = "",
  // logoClassName = "",
  logoTextClassName = "",
  columnsClassName = "",
  columnClassName = "",
  columnTitleClassName = "",
  columnItemClassName = "",
  copyrightContainerClassName = "",
  copyrightTextClassName = "",
  privacyButtonClassName = "",
}: FooterBaseCardProps) => {
  return (
    <footer
      role="contentinfo"
      aria-label={ariaLabel}
      className={cls("relative w-full py-20", className)}
    >
      <div className={cls("relative w-content-width mx-auto card rounded-theme-capped p-10", containerClassName, cardClassName)}>
        <div className="relative z-1 flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start mb-10">
          {/* {logoSrc ? (
            <div className="flex-shrink-0">
              <Image
                src={logoSrc}
                alt="Logo"
                width={logoWidth}
                height={logoHeight}
                className={cls("object-contain", logoClassName)}
                unoptimized={logoSrc.startsWith('http') || logoSrc.startsWith('//')}
                aria-hidden={true}
              />
            </div>
          ) : ( */}
            <h2 className={cls("text-4xl font-medium", logoTextClassName)}>
              {logoText}
            </h2>
          {/* )} */}

          <FooterColumns
            columns={columns}
            className={columnsClassName}
            columnClassName={columnClassName}
            columnTitleClassName={columnTitleClassName}
            columnItemClassName={columnItemClassName}
          />
        </div>

        <div
          className={cls("relative z-1 w-full flex items-center justify-between pt-9 border-t border-foreground/20", copyrightContainerClassName)}
        >
          <span className={cls("text-foreground/50 text-sm", copyrightTextClassName)}>
            {copyrightText}
          </span>
          <ButtonTextUnderline
            text="Privacy Policy"
            onClick={onPrivacyClick}
            className={cls("text-foreground/50", privacyButtonClassName)}
          />
        </div>
      </div>
    </footer>
  );
};

FooterBaseCard.displayName = "FooterBaseCard";

export default FooterBaseCard;
