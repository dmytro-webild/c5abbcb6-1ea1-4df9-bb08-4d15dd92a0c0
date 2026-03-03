'use client';

import { useRef, useEffect, useState } from 'react';

interface UseSvgTextLogoReturn {
    svgRef: React.RefObject<SVGSVGElement | null>;
    textRef: React.RefObject<SVGTextElement | null>;
    viewBox: string;
    aspectRatio: number;
}

export default function useSvgTextLogo(logoText: string, hasLogoSrc: boolean, adjustHeightFactor?: number): UseSvgTextLogoReturn {
    const svgRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const [viewBox, setViewBox] = useState('0 0 100 20');
    const [aspectRatio, setAspectRatio] = useState(5);

    useEffect(() => {
        if (!hasLogoSrc && textRef.current && svgRef.current) {
            const bbox = textRef.current.getBBox();
            const height = adjustHeightFactor ? bbox.height * adjustHeightFactor : bbox.height;
            const yOffset = adjustHeightFactor ? bbox.y + (bbox.height - height) / 2 : bbox.y;
            setViewBox(`${bbox.x} ${yOffset} ${bbox.width} ${height}`);
            setAspectRatio(bbox.width / height);
        }
    }, [hasLogoSrc, logoText, adjustHeightFactor]);

    return {
        svgRef,
        textRef,
        viewBox,
        aspectRatio
    };
}
