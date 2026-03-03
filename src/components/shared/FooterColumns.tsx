"use client";

import { memo } from "react";
import ButtonTextUnderline from "@/components/button/ButtonTextUnderline";
import { cls } from "@/lib/utils";

export interface FooterColumn {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

interface FooterColumnsProps {
  columns: FooterColumn[];
  className?: string;
  columnClassName?: string;
  columnTitleClassName?: string;
  columnItemClassName?: string;
}

const FooterColumns = memo<FooterColumnsProps>(function FooterColumns({
  columns,
  className = "",
  columnClassName = "",
  columnTitleClassName = "",
  columnItemClassName = "",
}) {
  return (
    <div
      className={cls("w-full md:w-fit flex flex-wrap gap-y-[var(--width-10)] md:gap-[calc(var(--width-10)/1.5)]", className)}
    >
      {columns.map((column) => (
        <div
          key={column.title}
          className={cls("relative z-1 w-1/2 md:w-auto flex items-start flex-col gap-4", columnClassName)}
        >
          <h3
            className={cls("text-sm text-accent/75", columnTitleClassName)}
          >
            {column.title}
          </h3>
          {column.items.map((item) => (
            <ButtonTextUnderline
              key={item.label}
              text={item.label}
              href={item.href}
              onClick={item.onClick}
              className={cls("text-base text-foreground", columnItemClassName)}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

FooterColumns.displayName = "FooterColumns";

export default FooterColumns;
