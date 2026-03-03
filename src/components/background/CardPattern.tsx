"use client";

import { memo, useMemo } from "react";
import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

const GRADIENT_SIZE = 250;

interface CardPatternProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
  isActive?: boolean;
  gradientClassName?: string;
}

function CardPatternComponent({
  mouseX,
  mouseY,
  randomString,
  isActive = false,
  gradientClassName,
}: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(${GRADIENT_SIZE}px at ${mouseX}px ${mouseY}px, white, transparent)`;

  const style = useMemo(
    () => ({
      maskImage,
      WebkitMaskImage: maskImage,
    }),
    [maskImage]
  );

  return (
    <div className="pointer-events-none">
      <div
        className={`absolute inset-0 rounded-theme-capped [mask-image:linear-gradient(white,transparent)] ${isActive ? "opacity-50" : "group-hover/primary-button:opacity-50"}`}
      />
      <motion.div
        className={`absolute inset-0 rounded-theme-capped ${gradientClassName} backdrop-blur-xl transition duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover/primary-button:opacity-100"}`}
        style={style}
      />
      <motion.div
        className={`absolute inset-0 rounded-theme-capped mix-blend-overlay ${isActive ? "opacity-100" : "opacity-0 group-hover/primary-button:opacity-100"}`}
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

CardPatternComponent.displayName = "CardPattern";

export const CardPattern = memo(CardPatternComponent);
