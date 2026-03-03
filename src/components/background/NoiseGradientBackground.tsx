"use client";

import React, { memo } from "react";
import { cls } from "@/lib/utils";

interface NoiseGradientBackgroundProps {
    className?: string;
}

const NoiseGradientBackground = ({ className = "" }: NoiseGradientBackgroundProps) => {
    return (
        <div
            className={cls("fixed inset-0 -z-10 bg-accent/10",
                className
            )}
        >
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none opacity-100 bg-gradient-to-r from-background via-accent/20 to-primary-cta/20"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 bg-repeat mix-blend-overlay opacity-12"
                style={{
                    backgroundImage: "url(/images/noise.webp)",
                    backgroundSize: "512px"
                }}
                aria-hidden="true"
            />
        </div>
    );
};

NoiseGradientBackground.displayName = "NoiseGradientBackground";

export default memo(NoiseGradientBackground);
