'use client';

import { memo } from 'react';
import { cls } from '@/lib/utils';
import { Sparkles } from './Sparkles';

interface GlowingOrbSparklesBackgroundProps {
  className?: string;
  blurAmount?: string;
  glowColor?: string;
  backgroundColor?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const GlowingOrbSparklesBackground = ({
  className = "",
  blurAmount = "57px",
  glowColor = "var(--color-primary-cta)",
  backgroundColor = "var(--background)",
  particleColor = "var(--color-primary-cta)",
  particleDensity = 80,
  minSize = 0.5,
  maxSize = 1.5,
  speed = 4,
}: GlowingOrbSparklesBackgroundProps) => {
  return (
    <div className="absolute z-0 top-0 left-0 w-full h-screen overflow-hidden pointer-events-none select-none [mask-image:linear-gradient(180deg,rgb(0,0,0)_0%,rgb(0,0,0)_80%,rgba(0,0,0,0)_100%)]" aria-hidden="true">
      {/* Sparkles layer with radial mask */}
      <div
        className="absolute inset-0 z-10"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, rgb(0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 50%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgb(0,0,0) 0%, rgb(0,0,0) 20%, rgba(0,0,0,0) 50%)',
        }}
      >
        <Sparkles
          className="absolute inset-0"
          particleColor={particleColor}
          particleDensity={particleDensity}
          minSize={minSize}
          maxSize={maxSize}
          speed={speed}
        />
      </div>

      {/* Glowing orb layer */}
      <div
        className={cls("absolute left-1/2 -translate-x-1/2 w-full h-[100vh] -bottom-[9vh] overflow-hidden z-0", className)}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[49vw] h-[12vh] bottom-[25vh] overflow-hidden"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, ${glowColor} 25%, transparent), transparent)`,
            filter: `blur(${blurAmount})`,
            WebkitFilter: `blur(${blurAmount})`,
          }}
        />
        <div
          className="absolute -bottom-[61vh] -left-[33vw] -right-[33vw] h-[100vh] rounded-[100%]"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, ${glowColor} 30%, transparent), transparent)`,
          }}
        />
        <div
          className="absolute -bottom-[62vh] -left-[36vw] -right-[36vw] h-[105vh] rounded-[100%]"
          style={{
            backgroundColor,
            boxShadow: `inset 0 2px 20px color-mix(in srgb, ${glowColor} 30%, transparent), 0 -10px 50px 1px color-mix(in srgb, ${glowColor} 25%, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

GlowingOrbSparklesBackground.displayName = 'GlowingOrbSparklesBackground';

export default memo(GlowingOrbSparklesBackground);
