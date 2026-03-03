import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TimelinePhoneViewItem {
  trigger: string;
  content: React.ReactNode;
  imageOne?: string;
  videoOne?: string;
  imageAltOne?: string;
  videoAriaLabelOne?: string;
  imageTwo?: string;
  videoTwo?: string;
  imageAltTwo?: string;
  videoAriaLabelTwo?: string;
}

const getImageAnimationConfig = (itemIndex: number, imageIndex: number) => {
  const isFirstImage = imageIndex === 0;
  const isOddItem = itemIndex % 2 === 1;

  if (isFirstImage) {
    return {
      from: { xPercent: -200, rotation: -45 },
      to: { rotation: isOddItem ? 10 : -10 },
    };
  } else {
    return {
      from: { xPercent: 200, rotation: 45 },
      to: { rotation: isOddItem ? -10 : 10 },
    };
  }
};

export const usePhoneAnimations = (items: TimelinePhoneViewItem[]) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const animatePhones = (isMobile: boolean) => {
      items.forEach((item, itemIndex) => {
        const images = [item.imageOne || item.videoOne, item.imageTwo || item.videoTwo];

        images.forEach((_, imageIndex) => {
          const refIndex = itemIndex * 2 + imageIndex;
          const element = isMobile
            ? mobileImageRefs.current[refIndex]
            : imageRefs.current[refIndex];

          if (element) {
            const isFirstImage = imageIndex === 0;

            const fromConfig = isMobile
              ? {
                  xPercent: isFirstImage ? -150 : 150,
                  rotation: isFirstImage ? -25 : 25,
                }
              : getImageAnimationConfig(itemIndex, imageIndex).from;

            const toConfig = isMobile
              ? {
                  xPercent: 0,
                  rotation: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1,
                  },
                }
              : {
                  xPercent: 0,
                  rotation: getImageAnimationConfig(itemIndex, imageIndex).to
                    .rotation,
                  scrollTrigger: {
                    trigger: `.${item.trigger}`,
                    start: "top bottom",
                    end: "top top",
                    scrub: 1,
                  },
                };

            gsap.fromTo(element, fromConfig, toConfig);
          }
        });
      });
    };

    mm.add("(max-width: 767px)", () => animatePhones(true));
    mm.add("(min-width: 768px)", () => animatePhones(false));

    return () => {
      mm.revert();
      imageRefs.current = [];
      mobileImageRefs.current = [];
    };
  }, [items]);

  return {
    imageRefs,
    mobileImageRefs,
  };
};
