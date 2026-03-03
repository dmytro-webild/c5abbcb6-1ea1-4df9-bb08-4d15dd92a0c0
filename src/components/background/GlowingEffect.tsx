"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cls } from "@/lib/utils";
import { animate } from "motion/react";

const MOBILE_BREAKPOINT = 768;
const INACTIVE_ZONE_MULTIPLIER = 0.5;
const CENTER_MULTIPLIER = 0.5;
const ANGLE_CONVERSION_FACTOR = 180 / Math.PI;
const ANGLE_OFFSET = 90;
const ANGLE_NORMALIZATION = 180;
const FULL_CIRCLE = 360;
const REPEATING_GRADIENT_TIMES = 5;
const GRADIENT_DIVISION = 25;

const ANIMATION_EASING = [0.16, 1, 0.3, 1] as const;

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

interface Position {
  x: number;
  y: number;
}

type MouseEventLike = MouseEvent | Position;
const getIsSSR = () => typeof window === "undefined";

const getViewportCenter = (): Position => {
  if (getIsSSR()) return { x: 0, y: 0 };
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
};

const getIsMobileDevice = (): boolean => {
  if (getIsSSR()) return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
};

const calculateAngleDiff = (current: number, target: number): number => {
  return ((target - current + ANGLE_NORMALIZATION) % FULL_CIRCLE) - ANGLE_NORMALIZATION;
};

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef<Position>({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const [isMobile, setIsMobile] = useState(() => getIsMobileDevice());

    const updateElementStyles = useCallback(
      (element: HTMLElement, property: string, value: string) => {
        element.style.setProperty(property, value);
      },
      []
    );

    const calculateMousePosition = useCallback(
      (e?: MouseEventLike): Position => {
        if (isMobile) {
          return getViewportCenter();
        }
        return {
          x: e?.x ?? lastPosition.current.x,
          y: e?.y ?? lastPosition.current.y,
        };
      },
      [isMobile]
    );

    const animateAngleTransition = useCallback(
      (element: HTMLElement, currentAngle: number, targetAngle: number) => {
        const angleDiff = calculateAngleDiff(currentAngle, targetAngle);
        const newAngle = currentAngle + angleDiff;

        animate(currentAngle, newAngle, {
          duration: movementDuration,
          ease: ANIMATION_EASING,
          onUpdate: (value) => {
            updateElementStyles(element, "--start", String(value));
          },
        });
      },
      [movementDuration, updateElementStyles]
    );

    const handleMove = useCallback(
      (e?: MouseEventLike) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mousePosition = calculateMousePosition(e);

          if (e) {
            lastPosition.current = mousePosition;
          }

          const centerX = left + width * CENTER_MULTIPLIER;
          const centerY = top + height * CENTER_MULTIPLIER;
          const distanceFromCenter = Math.hypot(
            mousePosition.x - centerX,
            mousePosition.y - centerY
          );
          const inactiveRadius = INACTIVE_ZONE_MULTIPLIER * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            updateElementStyles(element, "--active", "0");
            return;
          }

          const isActive =
            mousePosition.x > left - proximity &&
            mousePosition.x < left + width + proximity &&
            mousePosition.y > top - proximity &&
            mousePosition.y < top + height + proximity;

          updateElementStyles(element, "--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            ANGLE_CONVERSION_FACTOR * Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX) +
            ANGLE_OFFSET;

          animateAngleTransition(element, currentAngle, targetAngle);
        });
      },
      [inactiveZone, proximity, calculateMousePosition, updateElementStyles, animateAngleTransition]
    );

    useEffect(() => {
      if (getIsSSR()) return;

      const checkMobile = () => {
        setIsMobile(getIsMobileDevice());
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }, []);

    useEffect(() => {
      if (disabled || getIsSSR()) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => {
        if (!isMobile) {
          handleMove(e);
        }
      };

      if (isMobile) {
        handleMove();
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled, isMobile]);

    const gradient = useMemo(
      () => `radial-gradient(circle, var(--accent) 10%, transparent 20%),
        radial-gradient(circle at 40% 40%, var(--background-accent) 5%, transparent 15%),
        repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          var(--accent) 0%,
          var(--background-accent) calc(${GRADIENT_DIVISION}% / var(--repeating-conic-gradient-times)),
          var(--accent) calc(${GRADIENT_DIVISION * 2}% / var(--repeating-conic-gradient-times))
        )`,
      []
    );

    const containerStyle = useMemo(
      () => ({
        "--blur": `${blur}px`,
        "--spread": spread,
        "--start": "0",
        "--active": "0",
        "--glowingeffect-border-width": `${borderWidth}px`,
        "--repeating-conic-gradient-times": String(REPEATING_GRADIENT_TIMES),
        "--gradient": gradient,
      } as React.CSSProperties),
      [blur, spread, borderWidth, gradient]
    );

    return (
      <>
        <div
          className={cls(
            "pointer-events-none absolute inset-0 hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={containerStyle}
          className={cls(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cls(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
