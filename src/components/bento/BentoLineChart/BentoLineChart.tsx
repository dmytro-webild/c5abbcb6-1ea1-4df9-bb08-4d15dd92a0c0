"use client";

import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cls, shouldUseInvertedText } from "@/lib/utils";
import { useTheme } from "@/providers/themeProvider/ThemeProvider";
import { formatNumber, calculateYAxisWidth, type ChartDataItem } from "./utils";
import CustomTooltip from "./CustomTooltip";
import type { InvertedBackground } from "@/providers/themeProvider/config/constants";

interface BentoLineChartProps {
  data?: ChartDataItem[];
  dataKey?: string;
  metricLabel?: string;
  isPercentage?: boolean;
  useInvertedBackground: InvertedBackground;
  className?: string;
}

const defaultData: ChartDataItem[] = [
  { value: 120 },
  { value: 180 },
  { value: 150 },
  { value: 280 },
  { value: 220 },
  { value: 350 },
  { value: 300 },
  { value: 250 },
];

const BentoLineChart = memo<BentoLineChartProps>(
  ({
    data = defaultData,
    dataKey = "value",
    metricLabel = "Value",
    isPercentage = false,
    useInvertedBackground,
    className = "",
  }) => {
    const theme = useTheme();
    const shouldUseLightText = shouldUseInvertedText(useInvertedBackground, theme.cardStyle);
    const yAxisWidth = calculateYAxisWidth(data, isPercentage);

    const strokeColor = "var(--primary-cta)";
    const gridColor = "color-mix(in srgb, var(--background-accent) 30%, transparent)";
    const tickColor = shouldUseLightText ? "var(--background)" : "var(--foreground)";

    return (
      <div
        className={cls("w-full h-full **:outline-none **:focus:outline-none", className)}
        style={{
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: 0,
              bottom: 14,
            }}
          >
            <defs>
              <linearGradient id="bentoLineChartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="bentoFadeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="black" stopOpacity={0} />
                <stop offset="5%" stopColor="black" stopOpacity={0} />
                <stop offset="15%" stopColor="white" stopOpacity={1} />
                <stop offset="95%" stopColor="white" stopOpacity={1} />
                <stop offset="100%" stopColor="black" stopOpacity={0} />
              </linearGradient>
              <mask id="bentoFadeMask">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#bentoFadeGradient)"
                />
              </mask>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeWidth={1}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: tickColor,
                fontSize: 10,
              }}
              width={yAxisWidth}
              tickFormatter={(value) =>
                isPercentage ? `${value}%` : formatNumber(value)
              }
            />
            <Tooltip
              content={
                <CustomTooltip
                  metricLabel={metricLabel}
                  isPercentage={isPercentage}
                  totalItems={data.length}
                />
              }
              cursor={{
                stroke: gridColor,
              }}
            />
            <Area
              dataKey={dataKey}
              type="monotone"
              fill="url(#bentoLineChartFill)"
              stroke={strokeColor}
              strokeWidth={2}
              mask="url(#bentoFadeMask)"
              activeDot={{
                fill: strokeColor,
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

BentoLineChart.displayName = "BentoLineChart";

export default BentoLineChart;
