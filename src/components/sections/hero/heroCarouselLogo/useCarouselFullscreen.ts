import { useEffect, useRef, useState, useCallback } from "react";

interface UseCarouselFullscreenProps {
    totalSlides: number;
    autoplayDelay?: number;
}

interface UseCarouselFullscreenReturn {
    currentSlide: number;
    progressRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    goToSlide: (index: number) => void;
}

export const useCarouselFullscreen = ({
    totalSlides,
    autoplayDelay = 3000,
}: UseCarouselFullscreenProps): UseCarouselFullscreenReturn => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousSlideRef = useRef<number>(0);

    const resetProgressBars = useCallback(
        (fromIndex: number, isLooping: boolean = false) => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            progressRefs.current.forEach((bar, index) => {
                if (bar) {
                    if (isLooping || index >= fromIndex) {
                        bar.style.transform = "translateX(-100%)";
                    } else {
                        bar.style.transform = "translateX(0%)";
                    }
                }
            });
        },
        []
    );

    const animateProgress = useCallback(
        (index: number, prevIndex: number) => {
            const isLooping = prevIndex === totalSlides - 1 && index === 0;
            resetProgressBars(index, isLooping);

            if (!progressRefs.current[index]) return;

            let startTime: number | null = null;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / autoplayDelay, 1);

                const translateValue = -100 + progress * 100;
                if (progressRefs.current[index]) {
                    progressRefs.current[index]!.style.transform = `translateX(${translateValue}%)`;
                }

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animate);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animate);
        },
        [autoplayDelay, resetProgressBars, totalSlides]
    );

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    useEffect(() => {
        animateProgress(currentSlide, previousSlideRef.current);
        previousSlideRef.current = currentSlide;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, autoplayDelay);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [currentSlide, totalSlides, autoplayDelay, animateProgress]);

    return {
        currentSlide,
        progressRefs,
        goToSlide,
    };
};