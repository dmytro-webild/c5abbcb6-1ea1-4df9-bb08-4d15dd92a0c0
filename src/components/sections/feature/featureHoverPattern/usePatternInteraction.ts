"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MouseEvent,
  RefObject,
} from "react";
import { MotionValue } from "framer-motion";
import {
  MOBILE_BREAKPOINT,
  VIEW_CHECK_INTERVAL,
  PATTERN_VISIBILITY_THRESHOLD,
  ICON_VISIBILITY_THRESHOLD,
  THROTTLE_DELAY,
  RANDOM_STRING_LENGTH,
  generateRandomString,
} from "./constants";

interface InteractionState {
  randomString: string;
  isMobile: boolean;
  isInView: boolean;
  isIconActive: boolean;
}

export function usePatternInteraction(
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  containerRef: RefObject<HTMLDivElement | null>
) {
  const lastRandomUpdateRef = useRef<number>(0);

  const [state, setState] = useState<InteractionState>({
    randomString: "",
    isMobile: false,
    isInView: false,
    isIconActive: false,
  });

  const checkMobile = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMobile: window.innerWidth < MOBILE_BREAKPOINT,
    }));
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      randomString: generateRandomString(RANDOM_STRING_LENGTH),
      isMobile: window.innerWidth < MOBILE_BREAKPOINT,
    }));

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const updateRandomString = useCallback(() => {
    const now = Date.now();
    if (now - lastRandomUpdateRef.current > THROTTLE_DELAY) {
      setState((prev) => ({
        ...prev,
        randomString: generateRandomString(RANDOM_STRING_LENGTH),
      }));
      lastRandomUpdateRef.current = now;
    }
  }, []);

  const updateMobilePosition = useCallback(() => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    mouseX.set(viewportCenterX - left);
    mouseY.set(viewportCenterY - top);
    updateRandomString();
  }, [mouseX, mouseY, updateRandomString, containerRef]);

  const checkInView = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * PATTERN_VISIBILITY_THRESHOLD;
    const iconThreshold = viewportHeight * ICON_VISIBILITY_THRESHOLD;

    const inView =
      rect.top < viewportHeight - threshold && rect.bottom > threshold;
    const iconActive =
      rect.top < viewportHeight - iconThreshold &&
      rect.bottom > iconThreshold;

    setState((prev) => ({ ...prev, isInView: inView, isIconActive: iconActive }));

    if (inView) {
      updateMobilePosition();
    }
  }, [updateMobilePosition, containerRef]);

  useEffect(() => {
    if (!state.isMobile) {
      setState((prev) => ({ ...prev, isInView: false, isIconActive: false }));
      return;
    }

    checkInView();
    const interval = setInterval(checkInView, VIEW_CHECK_INTERVAL);
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, [state.isMobile, checkInView]);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (state.isMobile) return;

      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
      updateRandomString();
    },
    [state.isMobile, mouseX, mouseY, updateRandomString]
  );

  return {
    state,
    onMouseMove,
  };
}
