import { useEffect, useState, useRef, RefObject } from "react";

const MOBILE_BREAKPOINT = 768;
const ANIMATION_SPEED = 0.05;
const ROTATION_SPEED = 0.1;
const MOUSE_MULTIPLIER = 0.5;
const ROTATION_MULTIPLIER = 0.25;

interface UseDepth3DAnimationProps {
  itemRefs: RefObject<(HTMLElement | null)[]>;
  containerRef: RefObject<HTMLDivElement | null>;
  perspectiveRef?: RefObject<HTMLDivElement | null>;
  isEnabled: boolean;
}

export const useDepth3DAnimation = ({
  itemRefs,
  containerRef,
  perspectiveRef,
  isEnabled,
}: UseDepth3DAnimationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // 3D mouse-tracking effect (desktop only)
  useEffect(() => {
    if (!isEnabled || isMobile) return;

    let animationFrameId: number;
    let isAnimating = true;

    // Apply perspective to the perspective ref (grid) if provided, otherwise to container (section)
    const perspectiveElement = perspectiveRef?.current || containerRef.current;
    if (perspectiveElement) {
      perspectiveElement.style.perspective = "1200px";
      perspectiveElement.style.transformStyle = "preserve-3d";
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseInSection = false;

    let currentX = 0;
    let currentY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        isMouseInSection =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
      }

      if (isMouseInSection) {
        mouseX = (event.clientX / window.innerWidth) * 100 - 50;
        mouseY = (event.clientY / window.innerHeight) * 100 - 50;
      }
    };

    const animate = (): void => {
      if (!isAnimating) return;

      if (isMouseInSection) {
        const distX = mouseX * MOUSE_MULTIPLIER - currentX;
        const distY = mouseY * MOUSE_MULTIPLIER - currentY;
        currentX += distX * ANIMATION_SPEED;
        currentY += distY * ANIMATION_SPEED;

        const distRotX = -mouseY * ROTATION_MULTIPLIER - currentRotationX;
        const distRotY = mouseX * ROTATION_MULTIPLIER - currentRotationY;
        currentRotationX += distRotX * ROTATION_SPEED;
        currentRotationY += distRotY * ROTATION_SPEED;
      } else {
        currentX += -currentX * ANIMATION_SPEED;
        currentY += -currentY * ANIMATION_SPEED;
        currentRotationX += -currentRotationX * ROTATION_SPEED;
        currentRotationY += -currentRotationY * ROTATION_SPEED;
      }

      itemRefs.current?.forEach((ref) => {
        if (!ref) return;
        ref.style.transform = `translate(${currentX}px, ${currentY}px) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      isAnimating = false;
    };
  }, [isEnabled, isMobile, itemRefs, containerRef]);

  return { isMobile };
};
