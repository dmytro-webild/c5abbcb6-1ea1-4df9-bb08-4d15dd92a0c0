"use client";

import { memo } from "react";
import { cls } from "@/lib/utils";

interface PlainBackgroundProps {
  className?: string;
}

const PlainBackground = ({ className = "" }: PlainBackgroundProps) => {
  return (
    <div
      className={cls("fixed inset-0 -z-10 bg-background", className)}
      aria-hidden="true"
    />
  );
};

PlainBackground.displayName = "PlainBackground";

export default memo(PlainBackground);
