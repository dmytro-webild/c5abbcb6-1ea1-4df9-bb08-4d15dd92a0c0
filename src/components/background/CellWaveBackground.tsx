'use client';

import { memo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cls } from '@/lib/utils';

interface CellWaveBackgroundProps {
  columns?: number;
  rows?: number;
  cellColor?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

const CellWaveBackground = ({
  columns = 5,
  rows = 24,
  cellColor = 'var(--color-background-accent)',
  duration = 0.25,
  delay = 1.25,
  className = ''
}: CellWaveBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  const setCellRef = (colIndex: number, cellIndex: number) => (el: HTMLDivElement | null) => {
    if (!cellRefs.current[colIndex]) {
      cellRefs.current[colIndex] = [];
    }
    cellRefs.current[colIndex][cellIndex] = el;
  };

  const cellStyles = {
    backgroundColor: cellColor,
    boxShadow: `0px 0px 50px 16px color-mix(in srgb, ${cellColor} 12%, transparent), 0px 0px 7px 1px color-mix(in srgb, ${cellColor} 31%, transparent)`
  };

  useEffect(() => {
    timelinesRef.current.forEach(tl => tl.kill());
    timelinesRef.current = [];

    cellRefs.current.forEach((column, colIndex) => {
      const cells = [...column].filter(Boolean).reverse();
      const timeline = gsap.timeline({
        delay: delay * colIndex,
        repeat: -1,
        repeatDelay: 2
      });

      cells.forEach((cell, cellIndex) => {
        if (cell) {
          timeline.to(cell, {
            keyframes: [
              { opacity: 0, duration: 0 },
              { opacity: 0.05, duration: duration },
              { opacity: 0.15, duration: duration },
              { opacity: 0.25, duration: duration },
              { opacity: 0.5, duration: duration },
              { opacity: 0.25, duration: duration },
              { opacity: 0.15, duration: duration },
              { opacity: 0.05, duration: duration },
              { opacity: 0, duration: duration }
            ],
            ease: 'none'
          }, cellIndex * duration);
        }
      });

      timelinesRef.current.push(timeline);
    });

    return () => {
      timelinesRef.current.forEach(tl => tl.kill());
    };
  }, [duration, delay, columns, rows]);

  return (
    <div
      ref={containerRef}
      className={cls("absolute inset-0 z-0 flex items-end justify-between pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      {Array.from({ length: columns }).map((_, colIndex) => (
        <div className="relative flex flex-col gap-1 h-full" key={colIndex}>
          {Array.from({ length: rows }).map((_, cellIndex) => (
            <div
              ref={setCellRef(colIndex, cellIndex)}
              className="opacity-0 h-8 w-2"
              key={cellIndex}
              style={cellStyles}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

CellWaveBackground.displayName = 'CellWaveBackground';

export default memo(CellWaveBackground);
