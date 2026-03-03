'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface UseFillWidthTextReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    textRef: React.RefObject<HTMLElement | null>;
    fontSize: number;
    isReady: boolean;
}

const BASE_FONT_SIZE = 100;

// Shared canvas for text measurement (no DOM manipulation needed)
let measureCanvas: HTMLCanvasElement | null = null;

function getMeasureCanvas(): CanvasRenderingContext2D | null {
    if (typeof document === 'undefined') return null;
    if (!measureCanvas) {
        measureCanvas = document.createElement('canvas');
    }
    return measureCanvas.getContext('2d');
}

export default function useFillWidthText(text: string): UseFillWidthTextReturn {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLElement>(null);
    const [fontSize, setFontSize] = useState(BASE_FONT_SIZE);
    const [isReady, setIsReady] = useState(false);

    // Cache for computed styles
    const stylesRef = useRef<{ fontFamily: string; fontWeight: string } | null>(null);

    const calculateFontSize = useCallback(() => {
        if (!containerRef.current || !textRef.current) return;

        const container = containerRef.current;
        const textElement = textRef.current;

        const containerWidth = container.offsetWidth;
        if (containerWidth === 0) return;

        // Cache styles on first calculation
        if (!stylesRef.current) {
            const computed = getComputedStyle(textElement);
            stylesRef.current = {
                fontFamily: computed.fontFamily,
                fontWeight: computed.fontWeight,
            };
        }

        const ctx = getMeasureCanvas();
        if (!ctx) return;

        // Measure text using canvas (fast, no reflow)
        const { fontFamily, fontWeight } = stylesRef.current;
        ctx.font = `${fontWeight} ${BASE_FONT_SIZE}px ${fontFamily}`;
        const textWidth = ctx.measureText(text).width;

        if (textWidth === 0) return;

        const newFontSize = (containerWidth / textWidth) * BASE_FONT_SIZE;

        setFontSize(newFontSize);
        setIsReady(true);
    }, [text]);

    // Initial calculation
    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            calculateFontSize();
        });
        return () => cancelAnimationFrame(rafId);
    }, [text, calculateFontSize]);

    // Debounced resize observer
    useEffect(() => {
        if (!containerRef.current) return;

        let rafId: number | null = null;

        const resizeObserver = new ResizeObserver(() => {
            // Debounce using RAF - only calculate once per frame
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                calculateFontSize();
            });
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
        };
    }, [calculateFontSize]);

    // Reset style cache if text changes (might have different element)
    useEffect(() => {
        stylesRef.current = null;
    }, [text]);

    return {
        containerRef,
        textRef,
        fontSize,
        isReady
    };
}
