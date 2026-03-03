"use client";

import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import FillWidthText from "@/components/shared/FillWidthText/FillWidthText";
import { ChevronRight } from "lucide-react";
import { cls } from "@/lib/utils";

interface FooterColumn {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

interface FooterLogoEmphasisProps {
  // logoSrc?: string;
  // logoAlt?: string;
  columns: FooterColumn[];
  logoText: string;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  buttonClassName?: string;
}

const FooterLogoEmphasis = ({
  // logoSrc,
  // logoAlt = "Logo",
  columns,
  logoText,
  ariaLabel = "Site footer",
  className = "",
  containerClassName = "",
  logoClassName = "",
  columnsClassName = "",
  columnClassName = "",
  itemClassName = "",
  iconClassName = "",
  buttonClassName = "",
}: FooterLogoEmphasisProps) => {
    const columnCount = columns.length;
    const useFlex = columnCount <= 3;
    const gridColsClass = columnCount === 4
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-2 md:grid-cols-5";

    return (
      <footer
        className={cls(
          "w-full py-15 mt-20 flex justify-center relative z-1 overflow-hidden primary-button text-primary-cta-text rounded-t-theme-capped",
          className
        )}
        role="contentinfo"
        aria-label={ariaLabel}
      >
        <div
          className={cls(
            "w-content-width mx-auto flex flex-col relative z-10",
            "gap-10 md:gap-20",
            containerClassName
          )}
        >
          <div className={cls("relative z-1 w-full", logoClassName)}>
            <FillWidthText>
              {logoText}
            </FillWidthText>
          </div>

          <div
            className={cls(
              "w-full mb-10",
              useFlex
                ? cls(
                    "flex flex-col md:flex-row gap-8 md:gap-[var(--width-10)]",
                    columnCount === 1 ? "md:justify-center" : "md:justify-between"
                  )
                : cls("grid gap-[var(--width-10)] md:gap-[calc(var(--width-10)/2)]", gridColsClass),
              columnsClassName
            )}
          >
            {columns.map((column, index) => (
              <div
                key={`column-${index}`}
                className={cls("flex items-start flex-col gap-4", columnClassName)}
              >
                {column.items.map((item) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={cls("flex items-center gap-2 text-base", itemClassName)}
                  >
                    <ChevronRight
                      className={cls("h-[1em] w-auto", iconClassName)}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <ButtonTextUnderline
                      text={item.label}
                      href={item.href}
                      onClick={item.onClick}
                      className={cls("font-medium text-base", buttonClassName)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
  );
};

FooterLogoEmphasis.displayName = "FooterLogoEmphasis";

export default FooterLogoEmphasis;
