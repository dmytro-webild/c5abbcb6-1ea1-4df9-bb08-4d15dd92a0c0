"use client";

import { memo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MediaContent from "@/components/shared/MediaContent";
import { cls } from "@/lib/utils";

interface AngledCarouselItem {
  id: string;
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

interface AngledCarouselProps {
  items: AngledCarouselItem[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const CARD_TRANSITION_DURATION = 0.8;
const CARD_TRANSITION_EASE = [0.65, 0, 0.35, 1] as const;

const cardVariants = {
  'hidden-0': { opacity: 0, y: '25px' },
  'hidden-1': { scale: 0.88, opacity: 0, x: 'calc(100% + 20px)', y: '5%', rotate: 2 },
  'hidden--1': { scale: 0.88, opacity: 0, x: 'calc(-100% - 20px)', y: '5%', rotate: -2 },
  '0': { scale: 1, opacity: 1, x: '0%', y: '0%', rotate: 0 },
  '1': { scale: 0.88, opacity: 1, x: '100%', y: '5%', rotate: 2 },
  '-1': { scale: 0.88, opacity: 1, x: '-100%', y: '5%', rotate: -2 },
  '2': { scale: 0.8, opacity: 0, x: '200%', y: '10%', rotate: 4 },
  '-2': { scale: 0.8, opacity: 0, x: '-200%', y: '10%', rotate: -4 },
};

const AngledCarousel = ({ items, className = "", autoPlay = true, autoPlayInterval = 4000 }: AngledCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const n = items.length;

  useEffect(() => {
    if (isFirstRender) {
      const timeout = setTimeout(() => {
        setIsFirstRender(false);
      }, CARD_TRANSITION_DURATION * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isFirstRender]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % n);
      }, autoPlayInterval);
    }
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval]);

  const positionFactors = [-2, -1, 0, 1, 2];

  return (
    <div className={cls("relative w-full flex justify-center items-center overflow-hidden", className)}>
      <div className="w-[70%] md:w-[40%] aspect-square md:aspect-[16/10] opacity-0" />
      {positionFactors.map((positionFactor) => {
        const itemIndex = (activeIndex + positionFactor + n) % n;
        const item = items[itemIndex];
        const isCenter = positionFactor === 0;
        const isVisible = Math.abs(positionFactor) <= 1;

        const getAnimateState = () => {
          const key = positionFactor.toString() as keyof typeof cardVariants;
          return cardVariants[key];
        };

        const getInitialState = () => {
          if (isVisible && isFirstRender) {
            const key = `hidden-${positionFactor}` as keyof typeof cardVariants;
            return cardVariants[key];
          }
          return getAnimateState();
        };

        const getDelay = () => {
          if (isVisible && isFirstRender) {
            const delays: { [key: string]: number } = { '-1': 0.6, '0': 0.45, '1': 0.6 };
            return delays[positionFactor.toString()] || 0;
          }
          return 0;
        };

        return (
          <motion.div
            key={item.id}
            className="!absolute w-[70%] md:w-[40%] aspect-square md:aspect-[16/10] card p-1 rounded-theme-capped overflow-hidden"
            style={{
              zIndex: positionFactor === 0 ? 10 : 5 - Math.abs(positionFactor),
            }}
            initial={getInitialState()}
            animate={getAnimateState()}
            transition={{
              duration: CARD_TRANSITION_DURATION,
              ease: CARD_TRANSITION_EASE,
              delay: getDelay(),
            }}
          >
            <MediaContent
              imageSrc={item.imageSrc}
              videoSrc={item.videoSrc}
              imageAlt={item.imageAlt}
              videoAriaLabel={item.videoAriaLabel}
              imageClassName="w-full h-full rounded-theme-capped object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none select-none"
              initial={{ opacity: isCenter ? 0 : 1 }}
              animate={{ opacity: isCenter ? 0 : 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

AngledCarousel.displayName = "AngledCarousel";

export default memo(AngledCarousel);
