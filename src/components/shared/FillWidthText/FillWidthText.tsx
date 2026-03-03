"use client";

import React, { useMemo } from "react";
import useFillWidthText from "./useFillWidthText";
import { cls } from "@/lib/utils";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

// Lowercase characters that have descenders (extend below the baseline)
// Uppercase versions (G, J, P, Q, Y) don't have descenders
const DESCENDER_CHARS = /[gjpqy]/;

// Utility function to check if text has descender characters
export const hasDescenders = (text: string): boolean => DESCENDER_CHARS.test(text);

interface FillWidthTextProps {
    children: string;
    as?: TextElement;
    className?: string;
}

const FillWidthText = ({
    children,
    as: Component = "h1",
    className = "",
}: FillWidthTextProps) => {
    const { containerRef, textRef, fontSize, isReady } = useFillWidthText(children);

    // Use tighter line height if text has no descender characters
    const lineHeight = useMemo(() => {
        return DESCENDER_CHARS.test(children) ? 1.2 : 0.8;
    }, [children]);

    return (
        <div
            ref={containerRef}
            className="w-full min-w-0 flex-1"
        >
            <Component
                ref={textRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
                className={cls(
                    "whitespace-nowrap transition-opacity duration-150",
                    isReady ? "opacity-100" : "opacity-0",
                    className
                )}
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight,
                }}
            >
                {children}
            </Component>
        </div>
    );
};

FillWidthText.displayName = "FillWidthText";

export default React.memo(FillWidthText);
