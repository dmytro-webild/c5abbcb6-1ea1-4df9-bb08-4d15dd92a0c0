'use client';

import { memo } from 'react';
import { cls } from '@/lib/utils';
import { Sparkles } from './Sparkles';

interface RotatingGradientBackgroundProps {
  className?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  bigCircleSize?: string;
  smallCircleSize?: string;
  blurAmount?: string;
  opacity?: number;
  showSparkles?: boolean;
}

const RotatingGradientBackground = ({
  className = "",
  gradientColorStart = "var(--color-background-accent)",
  gradientColorEnd = "var(--color-background-accent)",
  bigCircleSize = "28vw",
  smallCircleSize = "21vw",
  blurAmount = "10px",
  opacity = 0.6,
  showSparkles = true,
}: RotatingGradientBackgroundProps) => {
  return (
    <div
      className={cls("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          filter: `blur(${blurAmount})`,
          WebkitFilter: `blur(${blurAmount})`,
          opacity,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square animate-spin-slow opacity-75"
          style={{
            width: bigCircleSize,
            height: bigCircleSize,
            background: `linear-gradient(229deg, ${gradientColorStart} 10%, color-mix(in srgb, ${gradientColorStart} 0%, transparent) 40%, color-mix(in srgb, ${gradientColorEnd} 0%, transparent) 64%, ${gradientColorEnd} 88%)`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square animate-spin-reverse opacity-75"
          style={{
            width: smallCircleSize,
            height: smallCircleSize,
            background: `linear-gradient(141deg, ${gradientColorStart} 13%, color-mix(in srgb, ${gradientColorStart} 0%, transparent) 37.5%, color-mix(in srgb, ${gradientColorEnd} 0%, transparent) 64%, ${gradientColorEnd} 88%)`,
          }}
        />
      </div>
      {showSparkles && (
        <div
          className="absolute inset-0"
          style={{
            mask: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 22%, rgb(0, 0, 0) 32%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)',
            maskComposite: 'intersect',
            WebkitMask: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 22%, rgb(0, 0, 0) 32%, rgb(0, 0, 0) 55%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskComposite: 'source-in',
          }}
        >
          <Sparkles particleDensity={60} minSize={0.3} maxSize={0.8} speed={3} />
        </div>
      )}
    </div>
  );
};

RotatingGradientBackground.displayName = 'RotatingGradientBackground';

export default memo(RotatingGradientBackground);
