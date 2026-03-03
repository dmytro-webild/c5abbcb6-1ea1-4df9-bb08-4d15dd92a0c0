export const formatNumber = (value: number): string => {
  if (value >= 100000) {
    const millions = value / 1000000;
    return `${millions.toFixed(1)}M`;
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    const rounded = Math.round(thousands * 10) / 10;
    return `${rounded}K`;
  }
  return value.toString();
};

export interface ChartDataItem {
  value: number;
}

export const calculateYAxisWidth = (
  data: ChartDataItem[],
  isPercentage: boolean
): number => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const formattedMax = isPercentage ? `${maxValue}%` : formatNumber(maxValue);

  let multiplier = 9;
  if (formattedMax.length === 2) {
    multiplier = 11;
  } else if (formattedMax.length === 3) {
    multiplier = 13;
  }

  return formattedMax.length * multiplier;
};
