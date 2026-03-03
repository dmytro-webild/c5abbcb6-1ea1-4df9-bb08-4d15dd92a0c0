'use client';

import { memo } from 'react';
import { cls } from '@/lib/utils';

interface GradientBarsBackgroundProps {
  className?: string;
  numBarsPerSide?: number;
  gradientFrom?: string;
  gradientTo?: string;
  opacity?: number;
  sideWidth?: string;
}

const GradientBarsBackground = ({
  className = "",
  numBarsPerSide = 8,
  gradientFrom = "var(--color-primary-cta)",
  gradientTo = "transparent",
  opacity = 0.075,
  sideWidth = "35%",
}: GradientBarsBackgroundProps) => {
  const getBarStyle = (side: 'left' | 'right') => ({
    flex: '1 0 0',
    minWidth: '30px',
    maxWidth: '82px',
    background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, ${gradientFrom}, ${gradientTo})`,
    opacity: opacity,
  });

  const renderBars = (side: 'left' | 'right') =>
    Array.from({ length: numBarsPerSide }).map((_, index) => (
      <div key={`${side}-${index}`} className="h-full" style={getBarStyle(side)} />
    ));

  return (
    <div
      className={cls("absolute inset-0 z-0 overflow-hidden pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <div
        className="flex h-8/10 w-full justify-between backface-hidden antialiased"
        style={{
          transform: 'translateZ(0)',
          mask: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)',
        }}
      >
        <div
          className="flex h-full overflow-hidden"
          style={{
            width: sideWidth,
            mask: 'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)',
          }}
        >
          {renderBars('left')}
        </div>

        <div
          className="flex h-full justify-end overflow-hidden"
          style={{
            width: sideWidth,
            mask: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)',
          }}
        >
          {renderBars('right')}
        </div>
      </div>
    </div>
  );
};

GradientBarsBackground.displayName = 'GradientBarsBackground';

export default memo(GradientBarsBackground);
