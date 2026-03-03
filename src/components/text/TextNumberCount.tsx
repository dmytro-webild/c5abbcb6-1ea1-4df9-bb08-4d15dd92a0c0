"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import { AnimateNumber } from "motion-number";

interface TextNumberCountProps {
  value: number;
  format?: Omit<Intl.NumberFormatOptions, "notation"> & {
    notation?: Exclude<
      Intl.NumberFormatOptions["notation"],
      "scientific" | "engineering"
    >;
  };
  locales?: Intl.LocalesArgument;
  className?: string;
  suffix?: string;
  prefix?: string;
  animateOnScroll?: boolean;
  startFrom?: number;
  duration?: number;
  threshold?: number;
}

const TextNumberCount = ({
  value,
  format,
  locales = "en-US",
  className = "",
  suffix,
  prefix,
  animateOnScroll = false,
  startFrom,
  duration = 2,
  threshold = 0.5,
}: TextNumberCountProps) => {
  const initialValue = animateOnScroll ? (startFrom ?? 0) : value;
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && !hasAnimated) {
        setDisplayValue(value);
        setHasAnimated(true);
        observerRef.current?.disconnect();
      }
    },
    [value, hasAnimated]
  );

  useEffect(() => {
    if (!animateOnScroll || hasAnimated || typeof window === "undefined") {
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: Math.min(Math.max(threshold, 0), 1),
      rootMargin: "0px",
    });

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animateOnScroll, hasAnimated, threshold, handleIntersection]);

  useEffect(() => {
    if (!animateOnScroll) {
      setDisplayValue(value);
    }
  }, [value, animateOnScroll]);

  const animateProps = animateOnScroll
    ? { animate: { duration } }
    : {};

  const content = (
    <AnimateNumber
      format={format}
      locales={locales}
      className={className}
      suffix={suffix}
      prefix={prefix}
      {...animateProps}
    >
      {displayValue}
    </AnimateNumber>
  );

  if (animateOnScroll) {
    return <span ref={containerRef}>{content}</span>;
  }

  return content;
};

TextNumberCount.displayName = "TextNumberCount";

export default memo(TextNumberCount);