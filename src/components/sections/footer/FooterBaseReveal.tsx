"use client";

import { useRef, useEffect, useState } from "react";
import FooterBase from "./FooterBase";
import { cls } from "@/lib/utils";

interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

interface FooterBaseRevealProps {
  // logoSrc?: string;
  // logoWidth?: number;
  // logoHeight?: number;
  columns: FooterColumn[];
  copyrightText?: string;
  onPrivacyClick?: () => void;
  ariaLabel?: string;
  className?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  footerClassName?: string;
  footerContainerClassName?: string;
  // logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  copyrightContainerClassName?: string;
  copyrightTextClassName?: string;
  privacyButtonClassName?: string;
}

const FooterBaseReveal = ({
  // logoSrc,
  // logoWidth,
  // logoHeight,
  columns,
  copyrightText,
  onPrivacyClick,
  ariaLabel,
  className = "",
  wrapperClassName = "",
  containerClassName = "",
  footerClassName,
  footerContainerClassName,
  // logoClassName,
  columnsClassName,
  columnClassName,
  columnTitleClassName,
  columnItemClassName,
  copyrightContainerClassName,
  copyrightTextClassName,
  privacyButtonClassName,
}: FooterBaseRevealProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    const currentFooter = footerRef.current;

    if (currentFooter) {
      resizeObserver.observe(currentFooter);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      className={cls("relative z-0 w-full mt-20", className)}
      style={{
        height: footerHeight ? `${footerHeight}px` : "auto",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className={cls("fixed bottom-0 w-full flex items-center justify-center overflow-hidden", wrapperClassName)}
        style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
      >
        <div ref={footerRef} className={cls("w-full", containerClassName)}>
          <FooterBase
            // logoSrc={logoSrc}
            // logoWidth={logoWidth}
            // logoHeight={logoHeight}
            columns={columns}
            copyrightText={copyrightText}
            onPrivacyClick={onPrivacyClick}
            ariaLabel={ariaLabel}
            className={cls("mt-0", footerClassName)}
            containerClassName={footerContainerClassName}
            // logoClassName={logoClassName}
            columnsClassName={columnsClassName}
            columnClassName={columnClassName}
            columnTitleClassName={columnTitleClassName}
            columnItemClassName={columnItemClassName}
            copyrightContainerClassName={copyrightContainerClassName}
            copyrightTextClassName={copyrightTextClassName}
            privacyButtonClassName={privacyButtonClassName}
          />
        </div>
      </div>
    </section>
  );
};

FooterBaseReveal.displayName = "FooterBaseReveal";

export default FooterBaseReveal;
