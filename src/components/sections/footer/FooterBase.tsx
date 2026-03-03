"use client";

// import Image from "next/image";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import FooterColumns from "@/components/shared/FooterColumns";
import { cls } from "@/lib/utils";
import type { FooterColumn } from "@/components/shared/FooterColumns";

interface FooterBaseProps {
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

const FooterBase = ({
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
  // logoClassName = "",
  logoTextClassName = "",
  columnsClassName = "",
  columnClassName = "",
  columnTitleClassName = "",
  columnItemClassName = "",
  copyrightContainerClassName = "",
  copyrightTextClassName = "",
  privacyButtonClassName = "",
}: FooterBaseProps) => {
  return (
    <footer
      role="contentinfo"
      aria-label={ariaLabel}
      className={cls("relative overflow-hidden w-full primary-button text-primary-cta-text py-15 mt-20", className)}
    >
      <div
        className={cls("relative w-content-width mx-auto z-10", containerClassName)}
      >
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start mb-10">
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
            <h2 className={cls("text-4xl font-medium text-primary-cta-text", logoTextClassName)}>
              {logoText}
            </h2>
          {/* )} */}

          <FooterColumns
            columns={columns}
            className={columnsClassName}
            columnClassName={columnClassName}
            columnTitleClassName={cls("text-primary-cta-text/50", columnTitleClassName)}
            columnItemClassName={cls("text-primary-cta-text", columnItemClassName)}
          />
        </div>

        <div
          className={cls("w-full flex items-center justify-between pt-9 border-t border-primary-cta-text/20", copyrightContainerClassName)}
        >
          <span className={cls("text-primary-cta-text/50 text-sm", copyrightTextClassName)}>
            {copyrightText}
          </span>
          <ButtonTextUnderline
            text="Privacy Policy"
            onClick={onPrivacyClick}
            className={cls("text-primary-cta-text/50", privacyButtonClassName)}
          />
        </div>
      </div>
    </footer>
  );
};

FooterBase.displayName = "FooterBase";

export default FooterBase;
