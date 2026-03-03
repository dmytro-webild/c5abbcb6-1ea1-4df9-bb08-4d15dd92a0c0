"use client";

import { memo } from "react";
import { formatNumber } from "./utils";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    color: string;
  }>;
  label?: number;
  metricLabel?: string;
  isPercentage?: boolean;
  totalItems: number;
}

const CustomTooltip = memo<CustomTooltipProps>(
  ({
    active,
    payload,
    label = 0,
    metricLabel = "Value",
    isPercentage = false,
    totalItems,
  }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const value = isPercentage
        ? `${payload[0].value}%`
        : formatNumber(payload[0].value);
      const today = new Date();
      const daysAgo = totalItems - 1 - label;
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);
      return (
        <div className="card rounded-theme-capped p-3">
          <p className="text-xs text-foreground mb-2">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 aspect-square rounded-full"
              style={{
                backgroundColor: payload[0].color,
              }}
            />
            <span className="text-xs text-foreground">
              {metricLabel}: {value}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }
);

CustomTooltip.displayName = "CustomTooltip";

export default CustomTooltip;
