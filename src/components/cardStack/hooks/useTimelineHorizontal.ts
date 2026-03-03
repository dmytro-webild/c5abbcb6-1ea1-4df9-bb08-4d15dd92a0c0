import { useState, useEffect, useRef, useCallback } from "react";

const ANIMATION_CONFIG = {
  PROGRESS_DURATION: 5000,
  TRANSITION_DURATION: 500,
  ANIMATION_START_DELAY: 100,
  IMAGE_TRANSITION_DELAY: 300,
} as const;

export interface MediaItem {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  videoAriaLabel?: string;
}

interface UseTimelineHorizontalProps {
  itemCount: number;
  mediaItems?: MediaItem[];
}

export const useTimelineHorizontal = ({ itemCount, mediaItems }: UseTimelineHorizontalProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [currentMediaSrc, setCurrentMediaSrc] = useState<{ imageSrc?: string; videoSrc?: string }>(() => {
    if (mediaItems && mediaItems[0]) {
      return {
        imageSrc: mediaItems[0].imageSrc,
        videoSrc: mediaItems[0].videoSrc,
      };
    }
    return {};
  });
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const imageTransitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const resetAllProgressBars = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    progressRefs.current.forEach((bar) => {
      if (bar) {
        bar.style.transition = `transform ${ANIMATION_CONFIG.TRANSITION_DURATION}ms ease-in-out`;
        bar.style.transform = "scaleX(0)";

        setTimeout(() => {
          if (bar) {
            bar.style.transition = "none";
          }
        }, ANIMATION_CONFIG.TRANSITION_DURATION);
      }
    });
  }, []);

  const animateProgress = useCallback(
    (index: number) => {
      if (!progressRefs.current[index]) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const progressBar = progressRefs.current[index];
      progressBar.style.transition = "none";
      progressBar.style.transform = "scaleX(0)";

      const easeInOut = (t: number): number => {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      };

      setTimeout(() => {
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const linearProgress = Math.min(elapsed / ANIMATION_CONFIG.PROGRESS_DURATION, 1);
          const easedProgress = easeInOut(linearProgress);

          if (progressRefs.current[index]) {
            progressRefs.current[index]!.style.transform = `scaleX(${easedProgress})`;
          }

          if (linearProgress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            setActiveIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              if (nextIndex >= itemCount) {
                resetAllProgressBars();
                return 0;
              }
              return nextIndex;
            });
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      }, ANIMATION_CONFIG.ANIMATION_START_DELAY);
    },
    [itemCount, resetAllProgressBars]
  );

  useEffect(() => {
    for (let i = 0; i < activeIndex; i++) {
      const bar = progressRefs.current[i];
      if (bar) {
        bar.style.transform = "scaleX(1)";
      }
    }

    if (isMountedRef.current) {
      animateProgress(activeIndex);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [activeIndex, animateProgress]);

  useEffect(() => {
    isMountedRef.current = true;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;

      if (mediaItems && mediaItems[0]) {
        setCurrentMediaSrc({
          imageSrc: mediaItems[0].imageSrc,
          videoSrc: mediaItems[0].videoSrc,
        });
        setImageOpacity(1);
      }

      setTimeout(() => {
        if (isMountedRef.current) {
          animateProgress(0);
        }
      }, ANIMATION_CONFIG.ANIMATION_START_DELAY);
    }

    return () => {
      isMountedRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (imageTransitionTimeoutRef.current) {
        clearTimeout(imageTransitionTimeoutRef.current);
        imageTransitionTimeoutRef.current = null;
      }
    };
  }, [animateProgress, mediaItems]);

  useEffect(() => {
    if (!isMountedRef.current || !mediaItems) return;

    const currentItem = mediaItems[activeIndex];
    if (!currentItem) return;

    const newMediaSrc = {
      imageSrc: currentItem.imageSrc,
      videoSrc: currentItem.videoSrc,
    };

    if (
      (newMediaSrc.imageSrc && newMediaSrc.imageSrc !== currentMediaSrc.imageSrc) ||
      (newMediaSrc.videoSrc && newMediaSrc.videoSrc !== currentMediaSrc.videoSrc)
    ) {
      if (imageTransitionTimeoutRef.current) {
        clearTimeout(imageTransitionTimeoutRef.current);
      }

      setImageOpacity(0);

      imageTransitionTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setCurrentMediaSrc(newMediaSrc);
          setTimeout(() => {
            if (isMountedRef.current) {
              setImageOpacity(1);
            }
          }, 50);
        }
      }, ANIMATION_CONFIG.IMAGE_TRANSITION_DELAY);
    }

    return () => {
      if (imageTransitionTimeoutRef.current) {
        clearTimeout(imageTransitionTimeoutRef.current);
      }
    };
  }, [activeIndex, mediaItems, currentMediaSrc]);

  const handleImageLoad = useCallback(() => {
    setImageOpacity(1);
  }, []);

  const handleItemClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      for (let i = 0; i < index; i++) {
        const bar = progressRefs.current[i];
        if (bar) {
          bar.style.transition = `transform ${ANIMATION_CONFIG.TRANSITION_DURATION}ms ease-in-out`;
          bar.style.transform = "scaleX(1)";
        }
      }

      for (let i = index; i < progressRefs.current.length; i++) {
        const bar = progressRefs.current[i];
        if (bar) {
          bar.style.transition = `transform ${ANIMATION_CONFIG.TRANSITION_DURATION}ms ease-in-out`;
          bar.style.transform = "scaleX(0)";
        }
      }

      setActiveIndex(index);
    },
    [activeIndex]
  );

  return {
    activeIndex,
    progressRefs,
    handleItemClick,
    imageOpacity,
    currentMediaSrc,
    handleImageLoad,
  };
};
