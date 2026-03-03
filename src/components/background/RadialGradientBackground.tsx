'use client';

import React, { memo } from 'react';
import { cls } from '@/lib/utils';

interface RadialGradientBackgroundProps {
  className?: string;
  centerColor?: string;
  edgeColor?: string;
  size?: string;
  position?: string;
}

const RadialGradientBackground = ({
  className = "",
  centerColor = "var(--background)",
  edgeColor = "var(--color-background-accent)",
  size = "130% 130%",
  position = "50% 15%",
}: RadialGradientBackgroundProps) => {
  return (
    <div
      className={cls("absolute inset-0 z-0 pointer-events-none select-none md:px-5 md:pb-5", className)}
    >
      <div
        className="relative w-full h-full rounded-b-theme-capped"
        style={{
          background: `radial-gradient(${size} at ${position}, ${centerColor} 40%, ${edgeColor} 100%)`,
          mask: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 15%, rgb(0, 0, 0) 55%, rgb(0, 0, 0) 100%)',
          WebkitMask: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 15%, rgb(0, 0, 0) 55%, rgb(0, 0, 0) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

RadialGradientBackground.displayName = 'RadialGradientBackground';

export default memo(RadialGradientBackground);
