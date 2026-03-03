"use client";

import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cls } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollTriggerConfig {
  trigger: HTMLElement;
  start: string;
  end: string;
  markers: boolean;
  toggleActions: string;
}

type AnimationType = "entrance-slide" | "reveal-blur" | "background-highlight";
type VariantType = "trigger" | "words-trigger";

interface TextAnimationProps {
  type?: AnimationType;
  text: string;
  children?: React.ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  variant?: VariantType;
  ariaLabel?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  gradientColors?: {
    from: string;
    to: string;
  };
}

const ANIMATION_CONFIG = {
  trigger: {
    stagger: 0.0075,
    useDuration: false,
    duration: 0.6,
  },
  "words-trigger": {
    stagger: 0.03,
    useDuration: false,
    duration: 0.6,
  },
} as const;

const ANIMATION_TYPES = {
  "entrance-slide": {
    classPrefix: "slide",
    fromVars: {
      opacity: 0,
      yPercent: 50,
    },
    toVars: {
      opacity: 1,
      yPercent: 0,
      ease: "power1",
    },
  },
  "reveal-blur": {
    classPrefix: "blur",
    fromVars: {
      autoAlpha: 0,
      filter: "blur(10px)",
    },
    toVars: {
      autoAlpha: 1,
      filter: "blur(0px)",
      ease: "power1.inOut",
    },
  },
  "background-highlight": {
    classPrefix: "highlight",
    fromVars: {
      opacity: 0.25,
    },
    toVars: {
      opacity: 1,
      ease: "power2.inOut",
    },
  },
} as const;

const TextAnimation = ({
  type = "entrance-slide",
  text,
  children,
  className = "",
  duration = 1,
  stagger,
  start = "top 80%",
  end = "top 20%",
  variant = "trigger",
  ariaLabel,
  as = "div",
  gradientColors,
}: TextAnimationProps) => {
  const textRef = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const isWords = variant === "words-trigger";
      const animConfig = ANIMATION_TYPES[type];
      const classPrefix = animConfig.classPrefix;

      splitRef.current = new SplitText(textRef.current!, {
        type: isWords ? "lines,words" : "lines,words,chars",
        linesClass: `${classPrefix}-line`,
        wordsClass: `${classPrefix}-word`,
        charsClass: isWords ? undefined : `${classPrefix}-char`,
      });

      const lines = splitRef.current.lines;
      if (type === "entrance-slide") {
        gsap.set(lines, {
          overflow: "hidden",
          display: as === "span" ? "inline" : undefined,
        });
      } else if (as === "span") {
        gsap.set(lines, {
          display: "inline",
        });
      }

      const words = splitRef.current.words;
      gsap.set(words, {
        display: "inline-block",
        whiteSpace: "nowrap",
      });

      const animateTarget = isWords
        ? splitRef.current.words
        : splitRef.current.chars;
      const config = ANIMATION_CONFIG[variant];
      const animationDuration = config.useDuration
        ? duration
        : config.duration!;
      const animationStagger = stagger ?? config.stagger;

      if (gradientColors) {
        animateTarget.forEach((element) => {
          gsap.set(element as HTMLElement, {
            backgroundImage: `linear-gradient(180deg, ${gradientColors.from} 0%, ${gradientColors.to} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          });
        });
      }

      const scrollTriggerConfig: ScrollTriggerConfig = {
        trigger: textRef.current!,
        start: start,
        end: end,
        markers: false,
        toggleActions: "play none none none",
      };

      if (type === "reveal-blur") {
        const tl = gsap.timeline({
          scrollTrigger: scrollTriggerConfig,
        });

        const parentElement = textRef.current;
        const splitInstance = splitRef.current;

        tl.fromTo(
          animateTarget,
          animConfig.fromVars,
          {
            ...animConfig.toVars,
            duration: animationDuration,
            stagger: animationStagger,
            force3D: true,
            onStart: function () {
              if (this._targets && this._targets.length > 0) {
                this._targets.forEach((target: HTMLElement) => {
                  target.style.willChange = "filter, opacity, transform";
                });
              }
            },
            onComplete: function () {
              if (this._targets && this._targets.length > 0) {
                this._targets.forEach((target: HTMLElement) => {
                  target.style.willChange = "auto";
                });
              }

              if (parentElement && splitInstance) {
                gsap.set(parentElement, {
                  opacity: 1,
                  visibility: 'visible',
                  filter: 'blur(0px)',
                  transform: 'none'
                });

                splitInstance.revert();
                splitRef.current = null;
              }
            },
          }
        );

        scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;
      } else {
        const parentElement = textRef.current;
        const splitInstance = splitRef.current;

        gsap.fromTo(
          animateTarget,
          animConfig.fromVars,
          {
            ...animConfig.toVars,
            duration: animationDuration,
            stagger: animationStagger,
            force3D: true,
            scrollTrigger: scrollTriggerConfig,
            onComplete: () => {
              if (parentElement && splitInstance) {
                gsap.set(parentElement, {
                  opacity: 1,
                  transform: 'none'
                });

                splitInstance.revert();
                splitRef.current = null;
              }
            },
          }
        );
      }
    }, textRef);

    const currentTextRef = textRef.current;

    return () => {
      if (
        type === "reveal-blur" &&
        scrollTriggerRef.current &&
        scrollTriggerRef.current.trigger === currentTextRef
      ) {
        scrollTriggerRef.current.kill();
      }
      ctx.revert();
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [text, type, duration, stagger, start, end, variant, as, gradientColors]);

  const animConfig = ANIMATION_TYPES[type];
  const Component = as;

  return (
    <Component
      // @ts-expect-error - Dynamic component type requires flexible ref
      ref={textRef}
      className={cls(
        `${animConfig.classPrefix}-text`,
        className
      )}
      style={{
        fontKerning: 'none',
        textRendering: 'optimizeSpeed',
      }}
      aria-label={ariaLabel || text || undefined}
    >
      {children || text?.replace(/-/g, '\u2011')}
    </Component>
  );
};

TextAnimation.displayName = "TextAnimation";

export default memo(TextAnimation);