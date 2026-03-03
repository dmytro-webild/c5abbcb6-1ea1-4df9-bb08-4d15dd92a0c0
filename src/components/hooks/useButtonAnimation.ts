import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ButtonAnimationType } from "@/types/button";

gsap.registerPlugin(ScrollTrigger);

export const useButtonAnimation = ({ animationType }: { animationType: ButtonAnimationType }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (animationType === "none" || !containerRef.current) return;

    // First try to find buttons/links, otherwise animate direct children
    let elements: NodeListOf<Element> | HTMLCollection = containerRef.current.querySelectorAll("button, a");
    if (elements.length === 0) {
      // For non-button elements (like Tag), animate the direct children
      elements = containerRef.current.children;
    }
    if (elements.length === 0) return;

    if (animationType === "opacity") {
      gsap.fromTo(
        elements,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.25,
          stagger: 0.15,
          ease: "sine",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (animationType === "slide-up") {
      gsap.fromTo(
        elements,
        { opacity: 0, yPercent: 30 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          stagger: 0.15,
          ease: "sine",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (animationType === "blur-reveal") {
      gsap.fromTo(
        elements,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [animationType]);

  return { containerRef };
};
