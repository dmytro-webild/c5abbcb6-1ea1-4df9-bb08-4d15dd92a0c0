'use client';

import { memo } from 'react';
import { cls } from '@/lib/utils';
import { Sparkles } from './Sparkles';

interface SparklesGradientBackgroundProps {
  className?: string;
  gradientColor?: string;
  accentColor?: string;
  blurAmount?: string;
}

const SparklesGradientBackground = ({
  className = "",
  gradientColor = "var(--color-background-accent)",
  accentColor = "var(--color-background-accent)",
  blurAmount = "6vw",
}: SparklesGradientBackgroundProps) => {
  return (
    <div
      className={cls("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}
      style={{
        mask: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 70%)',
        WebkitMask: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 70%)',
      }}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[65vw] h-[88vh] -top-[59vh] overflow-visible z-0"
      >
        <div
          className="absolute inset-0 rounded-[100%] overflow-hidden"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, ${gradientColor}, color-mix(in srgb, ${gradientColor} 25%, transparent) 41%, color-mix(in srgb, ${gradientColor} 20%, transparent))`,
            filter: `blur(${blurAmount})`,
            WebkitFilter: `blur(${blurAmount})`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[33vw] h-[53vh] rounded-[100%] overflow-hidden"
          style={{
            background: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
            filter: `blur(${blurAmount})`,
            WebkitFilter: `blur(${blurAmount})`,
          }}
        />
      </div>
      <Sparkles />
    </div>
  );
};

SparklesGradientBackground.displayName = 'SparklesGradientBackground';

export default memo(SparklesGradientBackground);
