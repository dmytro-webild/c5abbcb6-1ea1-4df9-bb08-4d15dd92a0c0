"use client";

import { memo } from "react";
import FooterColumns from "@/components/shared/FooterColumns";
import { cls } from "@/lib/utils";
import type { FooterColumn } from "@/components/shared/FooterColumns";

interface FooterSimpleProps {
  columns: FooterColumn[];
  bottomLeftText: string;
  bottomRightText: string;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  columnsClassName?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
  dividerClassName?: string;
  bottomContainerClassName?: string;
  bottomLeftTextClassName?: string;
  bottomRightTextClassName?: string;
}

const FooterSimple = ({
  columns,
  bottomLeftText,
  bottomRightText,
  ariaLabel = "Site footer",
  className = "",
  containerClassName = "",
  columnsClassName = "",
  columnClassName = "",
  columnTitleClassName = "",
  columnItemClassName = "",
  dividerClassName = "",
  bottomContainerClassName = "",
  bottomLeftTextClassName = "",
  bottomRightTextClassName = "",
}: FooterSimpleProps) => {
  return (
    <footer
      role="contentinfo"
      aria-label={ariaLabel}
      className={cls("relative w-full pt-20 pb-10", className)}
    >
      <div className={cls("w-content-width mx-auto", containerClassName)}>
        <FooterColumns
          columns={columns}
          className={cls("w-full! justify-between mb-10", columnsClassName)}
          columnClassName={columnClassName}
          columnTitleClassName={columnTitleClassName}
          columnItemClassName={columnItemClassName}
        />
        <div
          className={cls("w-full h-px bg-foreground/20", dividerClassName)}
        />
        <div
          className={cls("w-full flex items-center justify-between pt-6", bottomContainerClassName)}
        >
          <p className={cls("text-foreground/50 text-sm", bottomLeftTextClassName)}>
            {bottomLeftText}
          </p>
          <p className={cls("text-foreground/50 text-sm", bottomRightTextClassName)}>
            {bottomRightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

FooterSimple.displayName = "FooterSimple";

export default memo(FooterSimple);
