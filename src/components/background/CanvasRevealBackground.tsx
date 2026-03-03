'use client';

import { memo, useState, useEffect } from 'react';
import { cls } from '@/lib/utils';
import CanvasRevealEffect from './CanvasRevealEffect';

interface CanvasRevealBackgroundProps {
  className?: string;
  animationSpeed?: number;
  dotSize?: number;
  height?: string;
}

const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 255, 255];
};

const CanvasRevealBackground = ({
  className = "",
  animationSpeed = 5,
  dotSize = 3,
  height = "30%",
}: CanvasRevealBackgroundProps) => {
  const [colors, setColors] = useState<number[][]>([[0, 255, 255]]);

  useEffect(() => {
    const primaryCta = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background-accent')
      .trim();

    if (primaryCta) {
      setColors([hexToRgb(primaryCta)]);
    }
  }, []);

  return (
    <div
      className={cls("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 top-0 w-full"
        style={{
          height: height,
          mask: `
            radial-gradient(ellipse 60% 120% at 50% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 80%),
            linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)
          `,
          maskComposite: 'intersect',
          WebkitMask: `
            radial-gradient(ellipse 60% 120% at 50% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 80%),
            linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 10%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)
          `,
          WebkitMaskComposite: 'source-in',
        }}
      >
        <CanvasRevealEffect
          animationSpeed={animationSpeed}
          colors={colors}
          dotSize={dotSize}
          showGradient={false}
          containerClassName="bg-transparent"
        />
      </div>
    </div>
  );
};

CanvasRevealBackground.displayName = 'CanvasRevealBackground';

export default memo(CanvasRevealBackground);
