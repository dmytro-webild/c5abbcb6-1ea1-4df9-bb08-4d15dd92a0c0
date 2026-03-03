"use client";

import { useEffect, useRef } from "react";

const useMagneticEffect = (strengthFactor = 10) => {
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        import("gsap").then((gsap) => {
            const element = elementRef.current;

            if (!element || window.innerWidth < 768) return;

            const resetEl = (el: HTMLElement, immediate: boolean) => {
                if (!el) return;
                gsap.default.killTweensOf(el);
                (immediate ? gsap.default.set : gsap.default.to)(el, {
                    x: "0vw",
                    y: "0vw",
                    rotate: "0deg",
                    clearProps: "all",
                    ...(!immediate && { ease: "elastic.out(1, 0.3)", duration: 1.6 })
                });
            };

            const resetOnEnter = () => {
                resetEl(element, true);
            };

            const moveMagnet = (e: MouseEvent) => {
                const b = element.getBoundingClientRect();
                const strength = strengthFactor;

                const offsetX = ((e.clientX - b.left) / element.offsetWidth - 0.5) * (strength / 16);
                const offsetY = ((e.clientY - b.top) / element.offsetHeight - 0.5) * (strength / 16);

                gsap.default.to(element, {
                    x: offsetX + "vw",
                    y: offsetY + "vw",
                    rotate: "0.001deg",
                    ease: "power4.out",
                    duration: 1.6
                });
            };

            const resetMagnet = () => {
                gsap.default.to(element, {
                    x: "0vw",
                    y: "0vw",
                    ease: "elastic.out(1, 0.3)",
                    duration: 1.6,
                    clearProps: "all"
                });
            };

            element.addEventListener("mouseenter", resetOnEnter);
            element.addEventListener("mousemove", moveMagnet);
            element.addEventListener("mouseleave", resetMagnet);

            return () => {
                element.removeEventListener("mouseenter", resetOnEnter);
                element.removeEventListener("mousemove", moveMagnet);
                element.removeEventListener("mouseleave", resetMagnet);
            };
        });
    }, [strengthFactor]);

    return elementRef;
};

export default useMagneticEffect;